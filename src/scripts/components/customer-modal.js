class CustomerModal {
  constructor() {
    this.modal = document.getElementById('customerModal');
    this.form = document.getElementById('customerForm');
    this.closeBtn = this.modal?.querySelector('.customer-modal__close');
    this.overlay = this.modal?.querySelector('.customer-modal__overlay');
    this.isOpen = false;
    this.showedOnPageLoad = false;

    if (this.modal) {
      this.init();
    }
  }

  init() {
    // Attach event listeners
    this.closeBtn?.addEventListener('click', () => this.close());
    this.overlay?.addEventListener('click', () => this.close());
    this.form?.addEventListener('submit', (e) => this.handleSubmit(e));

    // Handle Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Show modal on page load (only once)
    this.showOnPageLoad();

    // Attach to timer button if it exists
    this.attachToTimerButton();
  }

  showOnPageLoad() {
    if (!this.showedOnPageLoad && !sessionStorage.getItem('customerModalShown')) {
      // Small delay to ensure smooth UX
      setTimeout(() => {
        this.open();
        sessionStorage.setItem('customerModalShown', 'true');
        this.showedOnPageLoad = true;
      }, 500);
    }
  }

  attachToTimerButton() {
    const timerButton = document.querySelector('.timer__button');
    if (timerButton) {
      timerButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    }
  }

  open() {
    if (this.modal) {
      this.modal.classList.add('is-open');
      this.isOpen = true;
      document.body.style.overflow = 'hidden';
    }
  }

  close() {
    if (this.modal) {
      this.modal.classList.remove('is-open');
      this.isOpen = false;
      document.body.style.overflow = '';
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    const formData = new FormData(this.form);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      phone: formData.get('phone'),
    };

    // Send data to your backend or service
    this.submitCustomerData(data);
  }

  validateForm() {
    let isValid = true;
    const firstName = this.form.querySelector('#firstName');
    const lastName = this.form.querySelector('#lastName');
    const phone = this.form.querySelector('#phone');

    // Clear previous errors
    this.clearErrors();

    // Validate first name
    if (!firstName.value.trim()) {
      this.showError('firstNameError', 'First name is required');
      isValid = false;
    }

    // Validate last name
    if (!lastName.value.trim()) {
      this.showError('lastNameError', 'Last name is required');
      isValid = false;
    }

    // Validate phone
    if (!phone.value.trim()) {
      this.showError('phoneError', 'Phone is required');
      isValid = false;
    } else if (!this.isValidPhone(phone.value)) {
      this.showError('phoneError', 'Please enter a valid phone number');
      isValid = false;
    }

    return isValid;
  }

  isValidPhone(phone) {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    // Check if it has at least 10 digits
    return digitsOnly.length >= 10;
  }

  showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  clearErrors() {
    ['firstNameError', 'lastNameError', 'phoneError'].forEach((id) => {
      const errorElement = document.getElementById(id);
      if (errorElement) {
        errorElement.textContent = '';
      }
    });
  }

  async submitCustomerData(data) {
    try {
      const submitBtn = this.form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      // Send data to Make.com webhook to create meta object in Shopify
      await this.saveToMetaObject(data);
      this.showFormSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
      const submitBtn = this.form.querySelector('button[type="submit"]');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit';
    }
  }

  async saveToMetaObject(data) {
    // Send data to Make.com webhook which will create a meta object entry in Shopify
    const makeWebhookURL = 'https://hook.us2.make.com/pg9j1lyvvs0sil6vomh8tz5smlznsv77';
    
    const payload = {
      phone: data.phone,
      name: data.firstName,
      surname: data.lastName,
      created_at: new Date().toISOString(),
    };
        
    try {
      const response = await fetch(makeWebhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Make.com response status:', response.status);
      console.log('Make.com response:', response);

      if (!response.ok && response.status !== 200) {
        // Make.com usually returns 200 for successful webhook receives
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json().catch(() => ({ success: true }));
      console.log('Make.com result:', result);
      return result;
    } catch (error) {
      console.error('Error sending to Make.com:', error);
      throw error;
    }
  }

  showFormSuccess() {
    const formBody = this.modal.querySelector('.customer-modal__body');
    formBody.innerHTML = `
      <div class="customer-modal__success">
        <div class="success-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 class="success-title">Thank you!</h3>
        <p class="success-message">Your information has been received. We'll contact you soon.</p>
      </div>
    `;

    // Close modal after 3 seconds
    setTimeout(() => {
      this.close();
      // Reset form
      this.form.reset();
      // Restore original content
      location.reload();
    }, 3000);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CustomerModal();
  });
} else {
  new CustomerModal();
}
