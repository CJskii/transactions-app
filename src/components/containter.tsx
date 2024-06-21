import { ComponentProps } from "react";

export function Container({ children }: ComponentProps<"section">) {
  return (
    <section className="font-raleway space-y-11 p-6 md:space-y-44 md:p-16">
      {children}
    </section>
  );
}
