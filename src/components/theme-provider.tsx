import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
    [key: string]: any;
};

export function ThemeProvider({
    children,
    // Force dark as the global default theme
    defaultTheme = "dark",
    storageKey = "vite-ui-theme",
    ...props
}: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme={defaultTheme}
            // We still allow toggling, but we don't auto-switch based on OS theme
            enableSystem={false}
            disableTransitionOnChange
            {...props}
        >
            {children}
        </NextThemesProvider>
    );
}
