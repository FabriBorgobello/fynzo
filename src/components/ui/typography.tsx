import { cn } from "@/lib/utils";

export function TypographyH1({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl", className)}>{children}</h1>
  );
}

export function TypographyH2({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 lg:text-5xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight lg:text-4xl", className)}>{children}</h3>;
}

export function TypographyH4({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight lg:text-3xl", className)}>{children}</h4>;
}

export function TypographyP({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>{children}</p>;
}

export function TypographyBlockquote({ children, className }: { children: React.ReactNode; className?: string }) {
  return <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>{children}</blockquote>;
}

export function TypographyList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>{children}</ul>;
}

export function TypographyInlineCode({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <code
      className={cn(
        "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold lg:text-lg",
        className,
      )}
    >
      {children}
    </code>
  );
}

export function TypographyLead({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-muted-foreground text-xl lg:text-2xl", className)}>{children}</p>;
}

export function TypographyLarge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("text-lg font-semibold lg:text-xl", className)}>{children}</div>;
}

export function TypographySmall({ children, className }: { children: React.ReactNode; className?: string }) {
  return <small className={cn("lg:text-md text-sm leading-none font-medium", className)}>{children}</small>;
}

export function TypographyMuted({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("lg:text-md text-muted-foreground text-sm", className)}>{children}</p>;
}
