import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

interface AccessibilitySettings {
    highContrast: boolean;
    softContrast: boolean;
    biggerText: number;
    textSpacing: boolean;
    lineHeight: boolean;
    leftAlign: boolean;
    highlightLinks: boolean;
    pauseAnimations: boolean;
    hideImages: boolean;
    enhancedCursor: boolean;
    dyslexiaFont: boolean;
    lowSaturation: boolean;
    readingGuide: boolean;
}

interface AccessibilityFeatureFlags {
    contrast?: boolean;
    textSize?: boolean;
    textSpacing?: boolean;
    lineHeight?: boolean;
    textAlign?: boolean;
    highlightLinks?: boolean;
    pauseAnimations?: boolean;
    hideImages?: boolean;
    cursorEnhancement?: boolean;
    dyslexiaFont?: boolean;
    saturation?: boolean;
    readingGuide?: boolean;
}
interface AccessibilityWidgetConfig {
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
        subtitle?: string;
        footerNote?: string;
    };
    features?: AccessibilityFeatureFlags;
    storageKey?: string;
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
        subtitle: string;
        footerNote: string;
    };
    features: Required<AccessibilityFeatureFlags>;
    storageKey: string;
}

interface AccessibilityContextType {
    settings: AccessibilitySettings;
    updateSetting: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
    resetAll: () => void;
    isAllDefault: boolean;
    activeCount: number;
    config: ResolvedConfig;
}
interface AccessibilityProviderProps {
    children: ReactNode;
    config?: AccessibilityWidgetConfig;
}
declare function AccessibilityProviderInner({ children, config: userConfig }: AccessibilityProviderProps): react_jsx_runtime.JSX.Element;
declare namespace AccessibilityProviderInner {
    var displayName: string;
}
declare const AccessibilityProvider: typeof AccessibilityProviderInner;

declare function AccessibilityLauncherInner(): react_jsx_runtime.JSX.Element;
declare namespace AccessibilityLauncherInner {
    var displayName: string;
}
declare const AccessibilityLauncher: typeof AccessibilityLauncherInner;

declare function useAccessibility(): AccessibilityContextType;

export { type AccessibilityContextType, type AccessibilityFeatureFlags, AccessibilityLauncher, AccessibilityProvider, type AccessibilitySettings, type AccessibilityWidgetConfig, useAccessibility };
