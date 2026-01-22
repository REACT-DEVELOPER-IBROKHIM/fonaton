```
📦 PRODUCT PAGE IMPLEMENTATION
├── 📄 TEMPLATES
│   └── product.json                    ← Product page template configuration
│
├── 🧩 SECTIONS  
│   └── product-page.liquid             ← Main section (orchestrates components)
│       ├── Renders: product-gallery.liquid
│       └── Renders: product-info.liquid
│
├── 📋 SNIPPETS
│   ├── product-gallery.liquid          ← Image gallery component
│   │   ├── Main image display
│   │   ├── Thumbnail selector (up to 5)
│   │   └── Responsive grid layout
│   │
│   └── product-info.liquid             ← Product info component
│       ├── Title & metadata
│       ├── Rating display
│       ├── Price & discount
│       ├── Description
│       ├── Features list
│       ├── Shipping info
│       ├── Add to cart form
│       └── Quantity selector
│
├── 🎨 STYLESHEETS
│   └── src/scss/blocks/product-page.scss
│       ├── Gallery styling
│       ├── Info section styling
│       ├── Form styling
│       ├── Responsive breakpoints
│       │   ├── Desktop (1024px+)
│       │   ├── Tablet (768px-1023px)
│       │   ├── Mobile (480px-767px)
│       │   └── Small mobile (<480px)
│       └── Animations & transitions
│
├── ⚙️ JAVASCRIPT
│   └── src/scripts/sections/product-page.js
│       ├── ProductGallery class
│       ├── Image selection logic
│       ├── Quantity selector logic
│       ├── Keyboard support
│       └── Input validation
│
└── 📚 DOCUMENTATION
    ├── PRODUCT_PAGE_README.md          ← Full documentation
    ├── PRODUCT_PAGE_SUMMARY.md         ← Quick overview
    └── PRODUCT_PAGE_TESTING.md         ← Testing checklist
```

## 🔄 DATA FLOW

```
Product Page Request
    ↓
product.json template loads
    ↓
sections/product-page.liquid renders
    ↓
┌───────────────────────────────────┐
│   product-page.liquid             │
│                                   │
│  ┌──────────────┐  ┌───────────┐ │
│  │   GALLERY    │  │   INFO    │ │
│  │              │  │           │ │
│  │  -gallery.   │  │ -info.    │ │
│  │   liquid     │  │  liquid   │ │
│  └──────────────┘  └───────────┘ │
└───────────────────────────────────┘
    ↓ (CSS loads)
css-product-page.min.css (webpack compiled)
    ↓ (JS loads)
js-product-page.min.js (webpack compiled)
    ↓
ProductGallery class initializes
    ↓
Interactive page ready! ✨
```

## 📊 COMPONENT HIERARCHY

```
section-product-page
│
└── container
    │
    └── product-page__wrapper (Grid: 2 columns on desktop, 1 on mobile)
        │
        ├── product-gallery (Left column / Top on mobile)
        │   ├── product-gallery__main
        │   │   └── product-gallery__main-image
        │   └── product-gallery__thumbnails
        │       └── product-gallery__thumbnail (repeats for each image)
        │
        └── product-info (Right column / Bottom on mobile)
            ├── product-info__header
            │   └── product-info__title
            ├── product-info__rating
            ├── product-info__pricing
            ├── product-info__description
            ├── product-info__features
            │   └── product-info__feature-item (list items)
            ├── product-info__shipping
            │   └── product-info__shipping-item
            ├── product-info__form
            │   ├── product-info__quantity
            │   │   ├── .quantity-btn.minus
            │   │   ├── .quantity-input
            │   │   └── .quantity-btn.plus
            │   └── product-info__cta
            └── product-info__meta
```

## 🎯 RESPONSIVE BREAKPOINTS

```
┌─────────────────────────────────────────────────────────┐
│ DESKTOP (1024px+)                                       │
│ ┌────────────────┐  ┌──────────────────────────────┐   │
│ │  Image Gallery │  │  Product Information         │   │
│ │  (60px gap)    │  │  - 2 column layout           │   │
│ │                │  │  - Max container 1240px      │   │
│ └────────────────┘  └──────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────┐
│ TABLET (768px - 1023px)         │
│ ┌───────────────┐ ┌───────────┐ │
│ │  Gallery      │ │   Info    │ │
│ │  (40px gap)   │ │           │ │
│ └───────────────┘ └───────────┘ │
└─────────────────────────────────┘

┌──────────────────┐
│ MOBILE (< 768px) │
│ ┌──────────────┐ │
│ │   Gallery    │ │
│ │  (30px gap)  │ │
│ ├──────────────┤ │
│ │   Product    │ │
│ │   Info       │ │
│ └──────────────┘ │
└──────────────────┘
```

## ⚡ WEBPACK COMPILATION

```
Source Files                 Webpack               Output Assets
────────────────────────────────────────────────────────────
product-page.scss  ────┐
                        ├──→ SASS Loader   ─→  css-product-page.min.css
reset.scss         ────┘      Minifier
resources.scss 
variables.scss


product-page.js    ────┐
                        ├──→ Babel       ─→  js-product-page.min.js
(ES6 Classes)           ├──→ Minifier
                        └──→ Terser
```

## 🔌 INTERACTION FLOW

```
User Clicks Thumbnail
        ↓
selectThumbnail() called
        ↓
Remove 'active' class from all
        ↓
Add 'active' class to clicked thumbnail
        ↓
Update mainImage.src with new image
        ↓
Fade animation triggers
        ↓
Main image displays ✨


User Clicks + Button
        ↓
increaseQuantity() called
        ↓
currentValue + 1
        ↓
Update input value
        ↓
Quantity displays ✨


User Submits Form
        ↓
product ID + quantity sent to /cart/add
        ↓
Item added to cart ✨
```

## 🎨 STYLING LAYERS

```
CSS Specificity Hierarchy
─────────────────────────

1. Base Styles (HTML elements, reset)
   └── from: reset.scss, reset styles in product-page.scss

2. Container & Layout
   └── .container, .product-page__wrapper, grid systems

3. Component Styles  
   └── .product-gallery, .product-info, .product-info__*

4. Interactive States
   └── :hover, :active, .active, :focus

5. Responsive Overrides
   └── @media queries for tablets and mobile

6. Animations
   └── @keyframes, transitions
```

## 🔐 ACCESSIBILITY LAYERS

```
HTML Semantics
    ↓
Form elements (button, input, form)
    ↓
ARIA Labels (aria-label, for/id associations)
    ↓
Keyboard Support (tabindex, keydown events)
    ↓
Visual Feedback (focus states, hover, active)
    ↓
Screen Reader Ready ✓
```

## 📦 FILE SIZES (Estimated)

```
product-page.scss         ~7.9 KB  (will minify to ~2-3 KB)
product-page.js           ~3.1 KB  (will minify to ~1-1.5 KB)
product-gallery.liquid    ~1 KB
product-info.liquid       ~4.4 KB
product-page.liquid       ~548 B

Total uncompressed:       ~16.9 KB
Total minified + gzipped: ~3-4 KB
```

## 🚀 INITIALIZATION SEQUENCE

```
1. Page Load
   └── Browser parses HTML

2. CSS Loads
   └── css-product-page.min.css
   └── Page styled immediately

3. HTML Renders
   └── Gallery with thumbnails
   └── Product info with form

4. JS Loads (deferred)
   └── js-product-page.min.js starts downloading
   └── DOM not blocked

5. DOM Content Loaded
   └── ProductGallery class instantiates
   └── Event listeners attached to:
       └── Thumbnails (click, keydown)
       └── Quantity buttons (click)
       └── Quantity input (change, keydown)

6. Interactive! ✨
   └── Gallery responds to clicks
   └── Quantity selector works
   └── Form ready to submit
```

## 🎯 KEY IMPLEMENTATION DECISIONS

### 1. Modular Component Structure
```
✓ Gallery → product-gallery.liquid
✓ Info → product-info.liquid
✓ Page → product-page.liquid
Benefits: Reusable, testable, maintainable
```

### 2. Vanilla JavaScript (No jQuery/Libraries)
```
✓ ProductGallery ES6 class
✓ Event delegation
✓ Modern DOM APIs
Benefits: Lightweight, fast, no dependencies
```

### 3. CSS Grid for Layout
```
✓ Grid for 2-column layout
✓ Flexbox for components
✓ Media queries for responsive
Benefits: Performant, flexible, maintainable
```

### 4. Responsive Mobile-First
```
✓ Start with mobile styles
✓ Enhance for larger screens
Benefits: Better mobile experience, smaller CSS
```

### 5. Semantic HTML + ARIA
```
✓ <button> for buttons
✓ <form> for forms
✓ <input> with labels
✓ aria-label on interactions
Benefits: Accessible, SEO-friendly
```
