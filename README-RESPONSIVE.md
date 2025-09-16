# Staylo - Responsive Student Accommodation Platform

## Responsive Design Implementation

This project has been optimized for a wide range of devices using a mobile-first approach. Below is documentation on the responsive design patterns used throughout the application.

### Breakpoints

The project uses the following breakpoints:

- `xs`: 480px (extra small devices)
- `sm`: 640px (small devices)
- `md`: 768px (medium devices)
- `lg`: 1024px (large devices)
- `xl`: 1280px (extra large devices)
- `2xl`: 1536px (2x extra large devices)

### Responsive Utilities

We've created utility files to maintain consistency across components:

#### Typography

```tsx
// Examples of responsive typography classes from responsive-utils.ts
import { responsiveText } from "@/lib/responsive-utils";

// In components:
<h1 className={responsiveText.h1}>Page Title</h1>
<p className={responsiveText.body}>Normal text content</p>
```

#### Spacing and Layout

```tsx
// Examples of responsive spacing classes
import { responsiveSpacing } from "@/lib/responsive-utils";

// In components:
<div className={responsiveSpacing.container}>
  <section className={responsiveSpacing.section}>...</section>
</div>
```

#### Component-Specific Helpers

```tsx
// Direct string exports for common patterns
import { 
  flexResponsive, 
  gridThreeCol, 
  formInput, 
  mobileOnly,
  desktopOnly 
} from "@/lib/responsive-utils";

// In components:
<div className={flexResponsive}>
  <div>Left content on desktop, top on mobile</div>
  <div>Right content on desktop, bottom on mobile</div>
</div>

// Show/hide based on screen size
<div className={mobileOnly}>Only visible on mobile</div>
<div className={desktopOnly}>Only visible on desktop</div>
```

### Mobile-Specific Components

Some features have mobile-specific implementations for optimal user experience:

1. `MobileFilters.tsx` - A bottom sheet UI for filtering on mobile screens
2. `MobileContactInfo.tsx` - Compact contact information for mobile layouts

### Responsive Images

Images use responsive techniques:

```tsx
<img 
  className="w-full h-48 xs:h-56 sm:h-64 md:h-72 lg:h-96 object-cover" 
  src="image-url.jpg" 
  alt="Description" 
/>
```

### Form Elements

Form elements adapt to different screen sizes:

```tsx
<Input 
  className="h-9 sm:h-11 text-xs sm:text-sm" 
  placeholder="Enter details" 
/>

<Button
  className="h-9 sm:h-11 text-xs sm:text-sm"
>
  Submit
</Button>
```

### Testing Responsive Behavior

For testing responsive behavior:
1. Use browser dev tools to simulate different screen sizes
2. Test on actual mobile devices when possible
3. Check critical UI elements and functionality at breakpoints

### Mobile UX Considerations

1. Touch targets are sized appropriately (minimum 44x44px)
2. Font sizes are readable (minimum 16px for body text on mobile)
3. Important actions have adequate spacing to prevent accidental taps
4. Fixed bottom navigation on detailed pages for easy access to primary actions
5. Reduced padding/margins on smaller screens for more content space
6. Simplified layouts at mobile breakpoints