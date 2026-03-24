"use client";

import { createContext, useContext, ReactNode } from "react";

const SiteBasePathContext = createContext<string>("");

export function SiteBasePathProvider({
  basePath,
  children,
}: {
  basePath: string;
  children: ReactNode;
}) {
  return (
    <SiteBasePathContext value={basePath}>
      {children}
    </SiteBasePathContext>
  );
}

export function useSiteBasePath() {
  return useContext(SiteBasePathContext);
}
