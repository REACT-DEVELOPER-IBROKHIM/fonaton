class CustomerModal {
  constructor(config = {}) {
    this.modal = document.getElementById("customerModal");
    this.form = document.getElementById("customerForm");
    this.closeBtn = this.modal?.querySelector(".customer-modal__close");
    this.overlay = this.modal?.querySelector(".customer-modal__overlay");
    this.phoneInput = this.form?.querySelector("#phone");
    this.isOpen = false;
    this.isModalDismissed = false;
    this.isSubmitting = false;

    // Configuration
    this.apiEndpoint = config.apiEndpoint || this.getConfigFromHTML() || "https://hook.us2.make.com/pg9j1lyvvs0sil6vomh8tz5smlznsv77";
    this.autoShowDelay = config.autoShowDelay || 5000; // 5 seconds
    this.localStorageKey = "customerModalDismissed";

    // Phone masking configuration
    this.phoneMaskPattern = config.phoneMaskPattern || "+1 (XXX) XXX-XXXX";

    if (this.modal) {
      this.init();
    }
  }

  /**
   * Get API endpoint from HTML data attribute if available
   */
  getConfigFromHTML() {
    return this.modal?.dataset.apiEndpoint || null;
  }

  init() {
    // Restore dismissal state
    this.checkDismissalState();

    // Attach event listeners
    this.closeBtn?.addEventListener("click", () => this.handleClose());
    this.overlay?.addEventListener("click", () => this.handleClose());
    this.form?.addEventListener("submit", (e) => this.handleSubmit(e));

    // Handle phone input masking
    this.phoneInput?.addEventListener("input", (e) => this.maskPhoneNumber(e));
    this.phoneInput?.addEventListener("keydown", (e) => this.handlePhoneKeydown(e));

    // Handle Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.handleClose();
      }
    });

    // Show modal on page load if not dismissed
    if (!this.isModalDismissed) {
      this.showOnPageLoad();
    }

    // Attach to timer button if it exists
    this.attachToTimerButton();

    // Ensure focus management for accessibility
    this.setupFocusManagement();
  }

  /**
   * Check if modal has been dismissed by user
   */
  checkDismissalState() {
    this.isModalDismissed = localStorage.getItem(this.localStorageKey) === "true";
  }

  /**
   * Set up focus trap for accessibility
   */
  setupFocusManagement() {
    const focusableElements = this.modal?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements && focusableElements.length > 0) {
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      this.modal?.addEventListener("keydown", (e) => {
        if (e.key === "Tab" && this.isOpen) {
          if (e.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      });
    }
  }

  showOnPageLoad() {
    // Delay showing modal to ensure smooth UX
    setTimeout(() => {
      this.open();
    }, this.autoShowDelay);
  }

  attachToTimerButton() {
    const timerButton = document.querySelector(".timer__button");
    if (timerButton) {
      timerButton.addEventListener("click", (e) => {
        e.preventDefault();
        // Reset dismissal state so modal can be shown again
        this.isModalDismissed = false;
        this.open();
      });
    }
  }

  open() {
    if (this.modal) {
      this.modal.classList.add("is-open");
      this.isOpen = true;
      document.body.style.overflow = "hidden";
      // Set focus to first input
      this.phoneInput?.focus();
      this.showFormContent();
    }
  }

  close() {
    if (this.modal) {
      this.modal.classList.remove("is-open");
      this.isOpen = false;
      document.body.style.overflow = "";
    }
  }

  /**
   * Handle close button click - dismiss modal and store preference
   */
  handleClose() {
    // Mark modal as dismissed
    this.isModalDismissed = true;
    localStorage.setItem(this.localStorageKey, "true");
    this.close();
  }

  /**
   * Format phone number based on pattern
   * Pattern: +1 (XXX) XXX-XXXX
   */
  maskPhoneNumber(event) {
    let input = event.target.value.replace(/\D/g, ""); // Remove non-digits

    // Apply formatting based on input length
    let formatted = "";
    if (input.length > 0) {
      if (input.length <= 3) {
        formatted = input;
      } else if (input.length <= 6) {
        formatted = `${input.slice(0, 3)} (${input.slice(3)}`;
      } else if (input.length <= 10) {
        formatted = `${input.slice(0, 3)} (${input.slice(3, 6)}) ${input.slice(6)}`;
      } else {
        formatted = `${input.slice(0, 1)} (${input.slice(1, 4)}) ${input.slice(4, 7)}-${input.slice(7, 11)}`;
      }
    }

    event.target.value = formatted;
  }

  /**
   * Handle phone input keydown for better UX
   */
  handlePhoneKeydown(event) {
    // Allow backspace, delete, and navigation keys
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
    if (!allowedKeys.includes(event.key) && !/\d/.test(event.key)) {
      event.preventDefault();
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.isSubmitting || !this.validateForm()) {
      return;
    }

    const formData = new FormData(this.form);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone").replace(/\D/g, ""), // Store only digits
    };

    this.submitCustomerData(data);
  }

  validateForm() {
    let isValid = true;
    const firstName = this.form.querySelector("#firstName");
    const lastName = this.form.querySelector("#lastName");
    const phone = this.form.querySelector("#phone");

    // Clear previous errors
    this.clearErrors();

    // Validate first name
    if (!firstName.value.trim()) {
      this.showError("firstNameError", "First name is required");
      firstName.setAttribute("aria-invalid", "true");
      isValid = false;
    } else {
      firstName.setAttribute("aria-invalid", "false");
    }

    // Validate last name
    if (!lastName.value.trim()) {
      this.showError("lastNameError", "Last name is required");
      lastName.setAttribute("aria-invalid", "true");
      isValid = false;
    } else {
      lastName.setAttribute("aria-invalid", "false");
    }

    // Validate phone
    if (!phone.value.trim()) {
      this.showError("phoneError", "Phone is required");
      phone.setAttribute("aria-invalid", "true");
      isValid = false;
    } else if (!this.isValidPhone(phone.value)) {
      this.showError("phoneError", "Please enter a valid phone number (at least 10 digits)");
      phone.setAttribute("aria-invalid", "true");
      isValid = false;
    } else {
      phone.setAttribute("aria-invalid", "false");
    }

    return isValid;
  }

  isValidPhone(phone) {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, "");
    // Check if it has at least 10 digits
    return digitsOnly.length >= 10;
  }

  showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.setAttribute("role", "alert");
    }
  }

  clearErrors() {
    ["firstNameError", "lastNameError", "phoneError"].forEach((id) => {
      const errorElement = document.getElementById(id);
      if (errorElement) {
        errorElement.textContent = "";
      }
    });
  }

  showLoadingState() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.classList.add("is-loading");
    submitBtn.setAttribute("aria-busy", "true");
    submitBtn.innerHTML = '<span class="loading-spinner"></span> Submitting...';
  }

  hideLoadingState() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    submitBtn.disabled = false;
    submitBtn.classList.remove("is-loading");
    submitBtn.setAttribute("aria-busy", "false");
    submitBtn.textContent = "Get Free Consultation";
  }

  async submitCustomerData(data) {
    this.isSubmitting = true;
    this.showLoadingState();

    try {
      await this.sendToAPI(data);
      this.showFormSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
      this.showFormError(error.message || "An error occurred. Please try again.");
      this.hideLoadingState();
    } finally {
      this.isSubmitting = false;
    }
  }

  async sendToAPI(data) {
    const payload = {
      phone: data.phone,
      name: data.firstName,
      surname: data.lastName,
      created_at: new Date().toISOString(),
    };

    try {
      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok && response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json().catch(() => ({ success: true }));
      return result;
    } catch (error) {
      console.error("Error sending to API:", error);
      throw error;
    }
  }

  showFormContent() {
    const formContainer = this.modal.querySelector(".customer-modal__form-container");
    if (formContainer) {
      formContainer.classList.remove("is-hidden");
    }
  }

  showFormSuccess() {
    const formContainer = this.modal.querySelector(".customer-modal__form-container");
    const successContainer = this.modal.querySelector(".customer-modal__success");

    if (formContainer) {
      formContainer.classList.add("is-hidden");
    }

    if (successContainer) {
      successContainer.classList.remove("is-hidden");
      successContainer.setAttribute("role", "alert");
    }

    // Close modal after 3 seconds
    setTimeout(() => {
      this.close();
      // Reset form for next use
      this.form.reset();
      // Reset to form view
      if (formContainer) {
        formContainer.classList.remove("is-hidden");
      }
      if (successContainer) {
        successContainer.classList.add("is-hidden");
      }
    }, 3000);
  }

  showFormError(message) {
    const errorContainer = this.modal.querySelector(".customer-modal__error");
    if (errorContainer) {
      errorContainer.querySelector(".error-message").textContent = message;
      errorContainer.classList.remove("is-hidden");
      errorContainer.setAttribute("role", "alert");

      // Auto-hide error after 5 seconds
      setTimeout(() => {
        errorContainer.classList.add("is-hidden");
      }, 5000);
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new CustomerModal();
  });
} else {
  new CustomerModal();
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new CustomerModal();
  });
} else {
  new CustomerModal();
}
