# Source Code Structure

## 📁 Recommended Folder Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header/
│   │   ├── Header.js
│   │   ├── Header.css
│   │   └── Header.test.js
│   ├── ProductCard/
│   │   ├── ProductCard.js
│   │   ├── ProductCard.css
│   │   └── ProductCard.test.js
│   └── CartItem/
│       ├── CartItem.js
│       ├── CartItem.css
│       └── CartItem.test.js
├── pages/               # Page components
│   ├── LandingPage/
│   │   ├── LandingPage.js
│   │   ├── LandingPage.css
│   │   └── LandingPage.test.js
│   ├── ProductListing/
│   │   ├── ProductListing.js
│   │   ├── ProductListing.css
│   │   └── ProductListing.test.js
│   └── ShoppingCart/
│       ├── ShoppingCart.js
│       ├── ShoppingCart.css
│       └── ShoppingCart.test.js
├── store/               # Redux store and slices
│   ├── store.js         # Configure store
│   └── cartSlice.js     # Cart state management
├── data/                # Static data
│   └── plants.js        # Plant information
├── styles/              # Global styles
│   ├── index.css        # Global styles
│   └── variables.css    # CSS custom properties
├── utils/               # Utility functions
│   ├── formatPrice.js   # Price formatting
│   └── helpers.js       # General helpers
├── hooks/               # Custom React hooks
│   └── useCart.js       # Cart-related hooks
├── App.js               # Main App component
├── App.css              # App-specific styles
└── index.js             # Application entry point
```

## 🔧 Key Files Description

### Core Application Files
- **App.js** - Main application component with routing
- **index.js** - Application entry point, renders App
- **store/store.js** - Redux store configuration
- **store/cartSlice.js** - Shopping cart state management

### Components
- **Header** - Navigation and cart icon
- **ProductCard** - Individual plant display
- **CartItem** - Shopping cart item display

### Pages
- **LandingPage** - Welcome page with company info
- **ProductListing** - Browse all available plants
- **ShoppingCart** - Manage cart items and checkout

### Data & Utils
- **data/plants.js** - Plant inventory data
- **utils/** - Helper functions for formatting, etc.

## 📋 File Naming Conventions

- **Components**: PascalCase (e.g., `ProductCard.js`)
- **Files**: camelCase (e.g., `cartSlice.js`)
- **Folders**: PascalCase for components, camelCase for others
- **CSS**: Match component name (e.g., `ProductCard.css`)

## 🎯 Best Practices

1. **Component Colocation** - Keep related files together
2. **Clear Naming** - Descriptive, consistent names
3. **Separation of Concerns** - Separate components, pages, and utilities
4. **Testing** - Include test files for components
5. **Documentation** - Comment complex logic

This structure ensures maintainable, scalable code that meets professional standards.
