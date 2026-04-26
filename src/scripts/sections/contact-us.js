document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const submitButton = form.querySelector(".contact-us__submit");
  const formMessage = document.getElementById("form-message");

  // Validation functions
  const validators = {
    first_name: (value) => {
      if (!value.trim()) return "First name is required";
      if (value.trim().length < 2) return "First name must be at least 2 characters";
      return "";
    },
    last_name: (value) => {
      if (!value.trim()) return "Last name is required";
      if (value.trim().length < 2) return "Last name must be at least 2 characters";
      return "";
    },
    email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) return "Email is required";
      if (!emailRegex.test(value)) return "Please enter a valid email address";
      return "";
    },
    phone: (value) => {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!value.trim()) return "Phone number is required";
      if (value.trim().length < 7) return "Please enter a valid phone number";
      if (!phoneRegex.test(value)) return "Phone number can only contain numbers, spaces, and symbols";
      return "";
    },
  };

  // Validate individual fields
  const validateField = (fieldName, value) => {
    const validator = validators[fieldName];
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (!errorElement) return true;

    const error = validator(value);
    if (error) {
      errorElement.textContent = error;
      return false;
    } else {
      errorElement.textContent = "";
      return true;
    }
  };

  // Clear error on field change
  form.querySelectorAll(".contact-us__input").forEach((input) => {
    input.addEventListener("input", () => {
      validateField(input.name, input.value);
    });

    input.addEventListener("blur", () => {
      validateField(input.name, input.value);
    });
  });

  // Form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    form.querySelectorAll(".contact-us__input").forEach((input) => {
      if (!validateField(input.name, input.value)) {
        isValid = false;
      }
    });

    if (!isValid) {
      showMessage("Please fix the errors above", "error");
      return;
    }

    // Prepare form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Disable submit button
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
      // Send to Shopify contact form
      const response = await fetch("/contact", {
        method: "POST",
        body: new URLSearchParams({
          form_type: "contact",
          contact: JSON.stringify(data),
          ...data,
        }),
      });

      if (response.ok) {
        showMessage("Thank you! We'll get back to you soon.", "success");
        form.reset();
        form.querySelectorAll(".contact-us__error").forEach((el) => {
          el.textContent = "";
        });
      } else {
        showMessage("There was an error sending your message. Please try again.", "error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showMessage("There was an error sending your message. Please try again.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    }
  });

  function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `contact-us__message ${type}`;

    if (type === "success") {
      setTimeout(() => {
        formMessage.className = "contact-us__message";
        formMessage.textContent = "";
      }, 5000);
    }
  }
});
