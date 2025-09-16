// Responsive utilities for consistent styling across the application

// Re-export for convenience
export { cn } from './utils';

// Font size utility classes for responsive text
export const responsiveText = {
  // Headings
  h1: "text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold",
  h2: "text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold",
  h3: "text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold",
  h4: "text-base xs:text-lg sm:text-xl md:text-2xl font-semibold",
  h5: "text-sm xs:text-base sm:text-lg font-medium",
  
  // Body text
  body: "text-sm sm:text-base",
  bodyLarge: "text-base sm:text-lg md:text-xl",
  bodySmall: "text-xs sm:text-sm",
  
  // Special
  caption: "text-xs sm:text-sm text-muted-foreground",
  button: "text-sm sm:text-base font-medium",
  buttonLarge: "text-base sm:text-lg md:text-xl font-medium",
  
  // Direct string exports for easier usage
  headingLarge: "text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold",
  headingMedium: "text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold",
  headingSmall: "text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold",
  headingXSmall: "text-base xs:text-lg sm:text-xl md:text-2xl font-semibold",
};

// Spacing utility classes
export const responsiveSpacing = {
  // Padding
  section: "py-8 sm:py-12 md:py-16 lg:py-20",
  container: "px-3 sm:px-6 md:px-8 lg:px-12",
  card: "p-3 xs:p-4 sm:p-5 md:p-6",
  
  // Margins
  mb: {
    sm: "mb-2 sm:mb-3 md:mb-4",
    md: "mb-4 sm:mb-6 md:mb-8",
    lg: "mb-6 sm:mb-8 md:mb-12 lg:mb-16",
  },
  mt: {
    sm: "mt-2 sm:mt-3 md:mt-4",
    md: "mt-4 sm:mt-6 md:mt-8",
    lg: "mt-6 sm:mt-8 md:mt-12 lg:mt-16",
  },
  
  // Gaps
  gap: {
    sm: "gap-2 sm:gap-3 md:gap-4",
    md: "gap-3 sm:gap-4 md:gap-6",
    lg: "gap-4 sm:gap-6 md:gap-8",
  }
};

// Direct string exports for form elements
export const formInput = "h-9 sm:h-10 md:h-11 text-xs sm:text-sm";
export const formButton = "h-9 sm:h-10 md:h-11 text-xs sm:text-sm";
export const formLabel = "text-xs sm:text-sm font-medium mb-1 sm:mb-2";

// Grid layouts
export const gridAuto = "grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6";
export const gridTwoCol = "grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6";
export const gridThreeCol = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6";
export const gridFourCol = "grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6";

// Responsive flex layouts
export const flexResponsive = "flex flex-col sm:flex-row gap-3 sm:gap-4";
export const flexBetween = "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4";
export const flexCenter = "flex items-center justify-center gap-2 sm:gap-3";
export const flexStart = "flex items-start gap-2 sm:gap-3";

// Visibility controls
export const mobileOnly = "block sm:hidden";
export const tabletUp = "hidden sm:block";
export const desktopOnly = "hidden md:block";
export const notDesktop = "block md:hidden";

// Height and width utility classes
export const responsiveSizes = {
  buttonHeight: "h-9 sm:h-10 md:h-12",
  inputHeight: "h-9 sm:h-10 md:h-12",
  iconSize: {
    sm: "w-3 h-3 sm:w-4 sm:h-4",
    md: "w-4 h-4 sm:w-5 sm:h-5",
    lg: "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7",
  }
};

// Grid and layout utility classes
export const responsiveLayout = {
  grid: {
    responsive: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
    cards: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4",
    featured: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    forms: "grid grid-cols-1 md:grid-cols-2",
  }
};

// Usage example:
// import { cn, responsiveText } from "@/lib/responsive-utils";
// <h1 className={responsiveText.h1}>Responsive Heading</h1>
// <div className={cn(responsiveSpacing.container, responsiveSpacing.mb.lg)}>...</div>