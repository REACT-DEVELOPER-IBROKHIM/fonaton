# 🧪 Product Page - Testing Guide

## ✅ Quick Test Checklist

### 1. Webpack Compilation
- [ ] Run `npm run webpack-watch`
- [ ] Check that files compile without errors:
  - `assets/css-product-page.min.css` created
  - `assets/js-product-page.min.js` created
- [ ] No console errors

### 2. Desktop View (1024px+)
- [ ] Page loads correctly
- [ ] Gallery on left, info on right
- [ ] Click thumbnail → main image changes
- [ ] Fade transition smooth
- [ ] All text visible and readable
- [ ] Add to cart button clickable
- [ ] Quantity +/- buttons work
- [ ] Price displays correctly
- [ ] Rating stars display
- [ ] Features list shows
- [ ] Shipping info visible

### 3. Tablet View (768px-1023px)
- [ ] 2-column layout maintained
- [ ] Spacing adjusted appropriately
- [ ] Gallery thumbnails visible
- [ ] Touch-friendly sizes
- [ ] Form still accessible

### 4. Mobile View (480px-767px)
- [ ] Single column stacked layout
- [ ] Gallery at top
- [ ] Product info below
- [ ] Touch-friendly buttons
- [ ] Text readable without zoom
- [ ] Thumbnails in grid below image
- [ ] Add to cart accessible

### 5. Small Mobile (<480px)
- [ ] All content visible
- [ ] No horizontal scrolling
- [ ] Buttons easily tappable
- [ ] Text readable
- [ ] Images scale properly

### 6. Image Gallery Functionality
- [ ] Click each thumbnail → image updates
- [ ] Active thumbnail highlighted (blue border)
- [ ] Fade animation smooth
- [ ] All 5 thumbnails clickable
- [ ] Main image loads properly

### 7. Quantity Selector
- [ ] **+** button increases quantity
- [ ] **−** button decreases quantity
- [ ] Can't go below 1
- [ ] Direct number input works
- [ ] Arrow keys work (up/down)
- [ ] Invalid input handled
- [ ] Form submits with correct quantity

### 8. Responsiveness
- [ ] No content cut off
- [ ] No horizontal scrollbar
- [ ] Text always readable
- [ ] Images scale correctly
- [ ] Buttons always tappable
- [ ] Layout smooth at all breakpoints

### 9. Accessibility
- [ ] Tab through all elements
- [ ] Enter/Space activates buttons
- [ ] Hover states visible
- [ ] Focus states visible
- [ ] Screen reader reads content
- [ ] All images have alt text
- [ ] Aria labels present on buttons

### 10. Browser/Device Testing
- [ ] Chrome (Desktop)
- [ ] Firefox (Desktop)
- [ ] Safari (Desktop)
- [ ] Safari (iOS)
- [ ] Chrome (Android)
- [ ] Edge (Desktop)

---

## 📊 Performance Checks

### CSS Optimization
- [ ] CSS file is minified
- [ ] No unused CSS
- [ ] File size reasonable (<10KB)
- [ ] No layout shift (CLS)

### JavaScript Optimization
- [ ] JS file is minified
- [ ] Loads with `defer` attribute
- [ ] No console errors
- [ ] Gallery initializes on load
- [ ] Quantity selector works immediately

### Image Optimization
- [ ] Images lazy-load
- [ ] Responsive image sizes used
- [ ] No layout shifts from images
- [ ] Load time reasonable

---

## 🐛 Common Issues & Fixes

### Images not changing when clicking thumbnails
```
✓ Check: Is product-page.js loading?
✓ Check: Browser console for errors
✓ Check: Are thumbnails rendering in HTML?
✓ Fix: Ensure webpack has compiled js-product-page.min.js
```

### Styling not applied
```
✓ Check: Is product-page.scss compiled to css-product-page.min.css?
✓ Check: Are colors from variables.scss available?
✓ Check: Browser cache - hard refresh (Cmd+Shift+R)
✓ Fix: Re-run webpack watch
```

### Quantity buttons not working
```
✓ Check: Is JavaScript loading?
✓ Check: HTML has class product-info__quantity-selector?
✓ Check: Buttons have class quantity-btn?
✓ Fix: Clear browser cache, hard refresh
```

### Layout broken on mobile
```
✓ Check: Viewport meta tag in theme.liquid
✓ Check: Mobile breakpoint 768px in SCSS
✓ Check: No fixed width containers
✓ Fix: Add padding to container or remove max-widths
```

---

## 🎯 Test Cases

### Test Case 1: Image Gallery
**Steps:**
1. Navigate to product page
2. View 5 or more thumbnails below main image
3. Click second thumbnail
4. Main image updates to second image
5. Second thumbnail highlighted in blue
6. Repeat for all thumbnails

**Expected:** Image changes smoothly with fade effect

---

### Test Case 2: Mobile Responsiveness
**Steps:**
1. Open product page on mobile (480px viewport)
2. Scroll to see full layout
3. Click a thumbnail
4. Adjust screen size to tablet
5. Adjust back to mobile

**Expected:** Layout adapts smoothly, no broken layout

---

### Test Case 3: Quantity Selection
**Steps:**
1. Find quantity selector
2. Click + button 3 times
3. Verify quantity shows 4
4. Click − button twice
5. Verify quantity shows 2
6. Type 10 in input
7. Click + once
8. Verify quantity shows 11

**Expected:** All operations work correctly

---

### Test Case 4: Add to Cart
**Steps:**
1. Set quantity to 3
2. Click "Add to Cart"
3. Check cart

**Expected:** Product added with quantity 3

---

### Test Case 5: Keyboard Navigation
**Steps:**
1. Tab through page (no mouse)
2. Focus on thumbnail
3. Press Enter
4. Verify image changes
5. Tab to quantity buttons
6. Use arrow keys to change quantity

**Expected:** All operations work with keyboard

---

## 📸 Screenshots to Verify

Take screenshots of:
1. [ ] Desktop layout (1440px width)
2. [ ] Tablet layout (768px width)
3. [ ] Mobile layout (375px width)
4. [ ] Image gallery with active thumbnail
5. [ ] Product info fully visible
6. [ ] Add to cart button
7. [ ] Quantity selector

---

## ✨ Final Checklist

Before marking as complete:

- [ ] All files created successfully
- [ ] Webpack compiles without errors
- [ ] Product page loads without 404s
- [ ] Gallery functionality works
- [ ] Responsive on all screen sizes
- [ ] Add to cart form submits
- [ ] No console errors
- [ ] Accessible with keyboard
- [ ] Performance acceptable
- [ ] Matches design provided

---

## 🚀 Deployment Ready!

Once all tests pass, your product page is ready to deploy:
1. `git add .`
2. `git commit -m "feat: add responsive product page with image gallery"`
3. `git push origin feat/add-product-page`
4. Create pull request
5. Deploy to production

---

## 💬 Questions?

See full documentation: [PRODUCT_PAGE_README.md](./PRODUCT_PAGE_README.md)
