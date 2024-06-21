import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="overflow-hidden">
      <SiteHeader />
      <main className="mx-auto flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
