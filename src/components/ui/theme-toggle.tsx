import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-md bg-background dark:bg-background-dark border-border text-foreground hover:bg-secondary/20 group"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
      <span className="flex items-center gap-2 text-sm font-medium">
        {theme === "light" ? (
          <>
            <span className="text-lg group-hover:rotate-12 transition-transform duration-300">🌞</span>
            <span className="hidden sm:inline">Light</span>
          </>
        ) : (
          <>
            <span className="text-lg group-hover:-rotate-12 transition-transform duration-300">🌙</span>
            <span className="hidden sm:inline">Dark</span>
          </>
        )}
      </span>
    </Button>
  );
}