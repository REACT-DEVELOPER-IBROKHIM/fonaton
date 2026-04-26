# Customer Modal Component - Implementation Guide

## Overview
A fully-featured, accessible modal component built with Liquid and vanilla JavaScript that collects user information (name, surname, phone) for free consultation registrations.

## Features Implemented

### ✅ Core Functionality
- **Three-field form**: Collects Phone Number, Name (First Name), and Surname (Last Name)
- **API Integration**: Sends collected data to configurable backend endpoint
- **Auto-show on home page**: Modal appears 5 seconds after user lands on the page
- **Smart dismissal**: Once closed, modal won't appear again unless explicitly opened via the Register button
- **Persistent state**: Uses localStorage to remember user's dismissal preference

### ✅ User Experience
- **Phone Input Masking**: Automatically formats phone input (e.g., +1 (555) 123-4567)
- **Real-time Validation**: Validates all fields before submission
- **Loading States**: Shows loading indicator during form submission
- **Success/Error Feedback**: Displays success message or error details to the user
- **Focus Management**: Traps focus within modal for better accessibility
- **Keyboard Navigation**: Tab key properly cycles through form elements

### ✅ Accessibility
- **ARIA Labels**: Proper ARIA labels and descriptions on all form elements
- **Role Attributes**: Dialog, alerts, and live regions properly marked
- **Keyboard Support**: Full keyboard navigation and Escape key to close
- **Focus Management**: First input is focused when modal opens
- **Color Contrast**: Meets WCAG accessibility standards
- **High Contrast Mode**: Supports prefers-contrast media query
- **Reduced Motion**: Respects prefers-reduced-motion preference

### ✅ Responsive Design
- Mobile-optimized layout (95% width on mobile)
- Desktop layout with max-width of 500px
- Scrollable content for smaller screens
- Touch-friendly form elements

### ✅ Form Validation
- **Required Fields**: All three fields are mandatory
- **Phone Validation**: Requires minimum 10 digits
- **Error Messages**: Clear, actionable error feedback
- **Form State**: Disables submit button during submission

## File Structure

```
├── src/scripts/components/
│   └── customer-modal.js          # Main component logic
├── snippets/
│   └── customer-modal.liquid      # Modal HTML template
├── src/scss/blocks/
│   └── customer-modal.scss        # Styling
├── locales/
│   ├── en.json                    # English translations
│   ├── ru.json                    # Russian translations
│   └── uz.default.json            # Uzbek translations
└── layout/
    └── theme.liquid               # Layout (includes modal)
```

## Configuration

### API Endpoint
The modal sends data to a configurable API endpoint. By default, it uses:
```
https://hook.us2.make.com/pg9j1lyvvs0sil6vomh8tz5smlznsv77
```

To customize the endpoint, you can:

1. **Via HTML Data Attribute** (in customer-modal.liquid):
   ```liquid
   <div class="customer-modal" data-api-endpoint="YOUR_ENDPOINT_URL">
   ```

2. **Via JavaScript Config**:
   ```javascript
   new CustomerModal({
     apiEndpoint: 'https://your-endpoint.com/webhook',
     autoShowDelay: 5000,  // milliseconds
     phoneMaskPattern: '+1 (XXX) XXX-XXXX'
   });
   ```

### localStorage Key
The dismissal state is stored in localStorage with key: `customerModalDismissed`

## API Payload Format

The modal sends data in the following JSON format:

```json
{
  "phone": "5551234567",
  "name": "John",
  "surname": "Doe",
  "created_at": "2024-04-26T10:30:00.000Z"
}
```

**Note**: Phone number is stored with only digits (non-numeric characters removed).

## Styling Customization

Key CSS variables and classes you can customize:

```scss
// Primary button color
.form-submit {
  background-color: #007bff;  // Change this
  
  &:hover {
    background-color: #0056b3;  // Change this
  }
}

// Modal width and spacing
.customer-modal__content {
  max-width: 500px;  // Change this
  width: 90%;        // Change this
}

// Form spacing
.customer-modal__form {
  gap: 16px;  // Spacing between form fields
}
```

## JavaScript API

### Methods

#### `open()`
Opens the modal and focuses the first input field.
```javascript
const modal = new CustomerModal();
modal.open();
```

#### `close()`
Closes the modal without marking it as dismissed.
```javascript
modal.close();
```

#### `maskPhoneNumber(event)`
Automatically formats phone input with masking.
Called automatically on input event.

#### `validateForm()`
Validates all form fields and returns boolean.
```javascript
if (modal.validateForm()) {
  // Form is valid
}
```

#### `showFormSuccess()`
Displays success message and auto-closes after 3 seconds.

#### `showFormError(message)`
Displays error message with custom text.

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE 11: ⚠️ Requires polyfills (fetch, Promise)

## Translations

The component is fully internationalized with support for:
- **English** (en.json)
- **Russian** (ru.json)
- **Uzbek** (uz.default.json)

Translation keys:
```
modal.title
modal.description
modal.first_name
modal.first_name_placeholder
modal.last_name
modal.last_name_placeholder
modal.phone
modal.phone_placeholder
modal.submit
modal.success_title
modal.success_message
modal.error_title
modal.error_default
```

## Integration with Timer Section

The modal automatically integrates with the timer section's "Register" button:
- Located in: `sections/timer.liquid`
- Button class: `.timer__button`
- Clicking the button opens the modal and resets dismissal state

## Security Considerations

1. **HTTPS Only**: Ensure your API endpoint uses HTTPS
2. **CORS**: Configure proper CORS headers on your backend
3. **Rate Limiting**: Implement rate limiting on your backend
4. **Input Sanitization**: Sanitize and validate all data on your backend
5. **Data Privacy**: Store and handle personal data according to GDPR/privacy regulations

## Performance Optimizations

- Minimal JavaScript (no external dependencies)
- CSS animations use GPU acceleration
- Lazy loading of the component script
- debounced phone masking
- No re-renders on every keystroke

## Troubleshooting

### Modal doesn't appear
1. Check that `customer-modal.liquid` is rendered in `theme.liquid`
2. Verify browser console for JavaScript errors
3. Check localStorage to see if modal was dismissed

### Phone masking not working
1. Ensure the JavaScript component is loaded
2. Check browser console for errors
3. Verify input field has `id="phone"`

### API call fails
1. Check API endpoint URL is correct
2. Verify CORS headers are configured
3. Check network tab in browser dev tools
4. Ensure data format matches backend expectations

### Accessibility issues
1. Use browser accessibility audits (axe DevTools, Lighthouse)
2. Test keyboard navigation with Tab key
3. Test with screen readers (NVDA, JAWS, VoiceOver)

## Future Enhancements

- [ ] Support for additional fields
- [ ] CAPTCHA integration
- [ ] Multiple form templates
- [ ] Advanced phone number validation by country
- [ ] Analytics tracking
- [ ] A/B testing support
- [ ] Custom success/error pages instead of inline display

## Support

For issues or questions:
1. Check the browser console for error messages
2. Review this documentation
3. Check Shopify theme documentation for Liquid syntax
4. Verify API endpoint configuration and CORS headers

---

**Last Updated**: April 26, 2024
**Version**: 1.0
**Maintained By**: Fonaton Development Team
