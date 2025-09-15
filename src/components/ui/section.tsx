import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  centered?: boolean;
}

export function Section({
  title,
  subtitle,
  centered = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-12 md:py-16 lg:py-24",
        centered && "text-center",
        className
      )}
      {...props}
    >
      <div className="container px-4 md:px-6 lg:px-8 mx-auto">
        {title && (
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}