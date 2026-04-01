# @wolfconsulting/accessibility-widget

A premium, configurable accessibility widget for React applications. Drop a floating launcher button into any React app to give users control over contrast, text size, spacing, animations, cursor behavior, reading guides, and more — all persisted to localStorage.

Built by **Wolf Consulting Group, LLC**.

---

## Features

- **12 accessibility controls** — high contrast, soft contrast, text size (3 levels), text spacing, line height, left-align, highlight links, pause animations, hide images, enhanced cursor, dyslexia-friendly font, low saturation, and reading guide.
- **Configurable** — position the launcher in any corner, customize brand colors, toggle individual features on/off, set custom panel text, and namespace localStorage keys.
- **Framework-agnostic styling** — ships pre-compiled CSS. Works in any React project regardless of whether the host uses Tailwind CSS.
- **Keyboard accessible** — full focus trap in the panel, Escape to close, focus return on close, proper ARIA roles and attributes.
- **Persisted settings** — user preferences saved to localStorage and restored on every visit.
- **DOM-level overrides** — settings applied via `data-a11y-*` attributes on `<html>`, so they affect the entire page without requiring component-level integration.
- **Panel isolation** — the widget panel protects itself from its own global overrides (contrast, font changes, etc. don't break the panel UI).
- **Reduced motion** — respects `prefers-reduced-motion` for the launcher animation.
- **Zero runtime dependencies bundled** — React, Framer Motion, Lucide, clsx, and tailwind-merge are peer dependencies.

---

## Installation

```bash
npm install @wolfconsulting/accessibility-widget
```

### Peer Dependencies

Ensure these are installed in your project:

```bash
npm install react react-dom framer-motion lucide-react clsx tailwind-merge
```

| Package          | Version  |
| ---------------- | -------- |
| `react`          | >= 18    |
| `react-dom`      | >= 18    |
| `framer-motion`  | >= 12    |
| `lucide-react`   | >= 0.300 |
| `clsx`           | >= 2     |
| `tailwind-merge` | >= 2     |

---

## Quick Start

```tsx
import { AccessibilityProvider, AccessibilityLauncher } from "@wolfconsulting/accessibility-widget";
import "@wolfconsulting/accessibility-widget/styles.css";

function App() {
  return (
    <AccessibilityProvider>
      <YourAppContent />
      <AccessibilityLauncher />
    </AccessibilityProvider>
  );
}
```

That's it. A floating button appears in the bottom-left corner. Clicking it opens the accessibility panel.

---

## Configuration

Pass a `config` prop to `<AccessibilityProvider>` to customize the widget:

```tsx
<AccessibilityProvider
  config={{
    position: "bottom-right",
    brandColors: {
      primary: "#2563eb",
      secondary: "#1e293b",
      accent: "#f59e0b",
    },
    launcher: {
      size: "lg",
      tooltip: "Accessibility",
      zIndex: 50000,
    },
    panel: {
      title: "Accessibility Settings",
      subtitle: "Adjust the page to your preferences.",
      footerNote: "Settings are saved automatically.",
    },
    features: {
      hideImages: false,
      saturation: false,
    },
    storageKey: "myapp-a11y",
  }}
>
  ...
</AccessibilityProvider>
```

### Full Configuration Reference

```ts
interface AccessibilityWidgetConfig {
  // Position of the floating launcher button
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";

  // Brand colors (any valid CSS color value)
  brandColors?: {
    primary?: string;     // default: "#0d9488" (teal)
    secondary?: string;   // default: "#1e3a5f" (navy)
    accent?: string;      // default: "#f59e0b" (amber)
  };

  // Launcher button appearance
  launcher?: {
    size?: "sm" | "md" | "lg";          // default: "md"
    tooltip?: string;                    // default: "Accessibility Options"
    zIndex?: number;                     // default: 9999
  };

  // Panel content text
  panel?: {
    title?: string;                      // default: "Accessibility Options"
    subtitle?: string;                   // default: "Customize the site..."
    footerNote?: string;                 // default: "This menu helps..."
  };

  // Toggle individual features on or off
  features?: {
    contrast?: boolean;                  // default: true — high + soft contrast
    textSize?: boolean;                  // default: true
    textSpacing?: boolean;               // default: true
    lineHeight?: boolean;                // default: true
    textAlign?: boolean;                 // default: true
    highlightLinks?: boolean;            // default: true
    pauseAnimations?: boolean;           // default: true
    hideImages?: boolean;                // default: true
    cursorEnhancement?: boolean;         // default: true
    dyslexiaFont?: boolean;              // default: true
    saturation?: boolean;                // default: true
    readingGuide?: boolean;              // default: true
  };

  // localStorage key (to avoid collisions between sites)
  storageKey?: string;                   // default: "a11y-settings"
}
```

---

## Brand Color Customization

The widget uses three brand colors set via CSS custom properties:

| Color       | Default     | Usage                                          |
| ----------- | ----------- | ---------------------------------------------- |
| `primary`   | `#0d9488`   | Launcher background, active toggle, focus rings |
| `secondary` | `#1e3a5f`   | Launcher background when panel is open          |
| `accent`    | `#f59e0b`   | Active settings count badge                     |

These are set via `brandColors` in the config and applied as `--a11y-primary`, `--a11y-secondary`, and `--a11y-accent` CSS custom properties on the widget elements.

---

## Accessibility Features

| Feature               | Setting Key       | Description                                       |
| --------------------- | ----------------- | ------------------------------------------------- |
| High Contrast         | `highContrast`    | Black background with white text, yellow links     |
| Soft Contrast         | `softContrast`    | Warm sepia-toned background                        |
| Larger Text           | `biggerText`      | 3 levels: 112.5%, 125%, 137.5%                    |
| Text Spacing          | `textSpacing`     | Increased letter and word spacing                  |
| Line Height           | `lineHeight`      | Double line height for body text                   |
| Left Align            | `leftAlign`       | Force all text to left alignment                   |
| Highlight Links       | `highlightLinks`  | Outline and underline all links                    |
| Pause Animations      | `pauseAnimations` | Stop all CSS animations and transitions            |
| Hide Images           | `hideImages`      | Fade out decorative images                         |
| Enhanced Cursor       | `enhancedCursor`  | Large circle cursor + stronger focus outlines      |
| Dyslexia Font         | `dyslexiaFont`    | Switch to a dyslexia-friendly font stack           |
| Low Saturation        | `lowSaturation`   | Reduce page color saturation to 30%                |
| Reading Guide         | `readingGuide`    | Mouse-following horizontal highlight bar           |

---

## Using the Hook

Access accessibility state in your own components:

```tsx
import { useAccessibility } from "@wolfconsulting/accessibility-widget";

function MyComponent() {
  const { settings, updateSetting, activeCount } = useAccessibility();

  return (
    <div>
      <p>Active settings: {activeCount}</p>
      <button onClick={() => updateSetting("highContrast", !settings.highContrast)}>
        Toggle Contrast
      </button>
    </div>
  );
}
```

The hook must be used within an `<AccessibilityProvider>`.

---

## How It Works

1. `<AccessibilityProvider>` loads saved settings from localStorage on mount.
2. Settings are applied to `document.documentElement` as `data-a11y-*` attributes.
3. The imported `styles.css` contains CSS rules that target those attributes with `!important` overrides.
4. The widget panel is isolated from its own overrides via `[data-a11y-panel]` selectors.
5. On setting change, the new state is persisted to localStorage and the DOM attributes are updated immediately.

---

## Browser Support

Designed for modern browsers:

- Chrome / Edge 90+
- Firefox 90+
- Safari 15+

---

## License

Proprietary — Wolf Consulting Group, LLC. All rights reserved.
