import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

type ThemeMode = "system" | "light" | "dark";

interface ThemeWidgetConfig {
    position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
    brandColors?: {
        primary?: string;
        secondary?: string;
        accent?: string;
    };
    launcher?: {
        size?: "sm" | "md" | "lg";
        tooltip?: string;
        zIndex?: number;
    };
    panel?: {
        title?: string;
    };
    storageKey?: string;
    defaultMode?: ThemeMode;
}
interface ResolvedConfig {
    position: "bottom-left" | "bottom-right" | "top-left" | "top-right";
    brandColors: {
        primary: string;
        secondary: string;
        accent: string;
    };
    launcher: {
        size: "sm" | "md" | "lg";
        tooltip: string;
        zIndex: number;
    };
    panel: {
        title: string;
    };
    storageKey: string;
    defaultMode: ThemeMode;
}

interface ThemeContextType {
    mode: ThemeMode;
    resolved: "light" | "dark";
    setTheme: (mode: ThemeMode) => void;
    config: ResolvedConfig;
}
interface ThemeProviderProps {
    children: ReactNode;
    config?: ThemeWidgetConfig;
}
declare function ThemeProviderInner({ children, config: userConfig, }: ThemeProviderProps): react_jsx_runtime.JSX.Element;
declare namespace ThemeProviderInner {
    var displayName: string;
}
declare const ThemeProvider: typeof ThemeProviderInner;

declare function ThemeLauncherInner(): react_jsx_runtime.JSX.Element;
declare namespace ThemeLauncherInner {
    var displayName: string;
}
declare const ThemeLauncher: typeof ThemeLauncherInner;

declare function useTheme(): ThemeContextType;

export { type ThemeContextType, ThemeLauncher, type ThemeMode, ThemeProvider, type ThemeWidgetConfig, useTheme };
