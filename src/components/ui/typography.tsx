import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl dark:text-white",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 dark:text-white",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight dark:text-white",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight dark:text-white",
      paragraph: "leading-7 [&:not(:first-child)]:mt-6 dark:text-white",
      blockquote:
        "mt-6 border-l-2 pl-6 italic dark:text-white border-secondary",
      list: "my-6 ml-6 list-disc [&>li]:mt-2 dark:text-white",
      inlineCode:
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold dark:text-white",
      lead: "text-xl text-muted-foreground dark:text-white",
      large: "text-lg font-semibold dark:text-white",
      smallTitle: "text-base font-normal dark:text-white",
      small: "text-sm font-medium leading-none dark:text-white",
      extraSmall: "text-xs font-normal text-muted-foreground dark:text-white",
      muted: "text-[#00000066] dark:text-white/40",
      heroTiles: "text-md text-white/80 font-semibold",
      navbarTitle: "text-lg text-[#FF8F8F] font-semibold",
      navbarMuted: "text-sm text-[#FF8F8F] dark:text-white/40 text-black/40",
      footerLink:
        "text-base font-normal dark:text-black hover:text-white/80 dark:hover:text-black/80 hover:underline",
    },
  },
  defaultVariants: {
    variant: "paragraph",
  },
});

type VariantPropType = VariantProps<typeof typographyVariants>;

const variantElementMap: Record<
  NonNullable<VariantPropType["variant"]>,
  string
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  paragraph: "p",
  blockquote: "blockquote",
  list: "ul",
  inlineCode: "code",
  lead: "p",
  large: "div",
  smallTitle: "small",
  small: "small",
  extraSmall: "small",
  muted: "p",
  heroTiles: "span",
  navbarTitle: "span",
  navbarMuted: "p",
  footerLink: "small",
};

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  as?: string;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, asChild, ...props }, ref) => {
    const Comp = asChild
      ? Slot
      : as ?? (variant ? variantElementMap[variant] : undefined) ?? "div";
    return (
      // @ts-ignore
      <Comp
        className={cn(
          typographyVariants({ variant, className }),
          "font-raleway"
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
