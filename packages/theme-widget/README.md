# @wolfconsulting/theme-widget

A configurable light / dark / system theme switcher widget for React applications. Provides a floating launcher button that opens a compact panel with three theme options.

Built by **Wolf Consulting Group, LLC**.

## Features

- System, Light, and Dark mode switching
- Persists selection to `localStorage`
- Toggles the `dark` CSS class on `<html>` (works with Tailwind CSS `darkMode: ["class"]`)
- Sets `document.documentElement.style.colorScheme` for native browser hints
- Listens for OS-level `prefers-color-scheme` changes in system mode
- Fully keyboard accessible (focus trap, Escape to close)
- Respects `prefers-reduced-motion`
- Brand-configurable via props (colors, position, labels)
- Pre-compiled CSS — no Tailwind dependency required by the host app

## Installation

Add as a local dependency:

```json
"@wolfconsulting/theme-widget": "file:./packages/theme-widget"
```

Then run `npm install`.

## Quick Start

```tsx
import { ThemeProvider, ThemeLauncher } from "@wolfconsulting/theme-widget";
import "@wolfconsulting/theme-widget/styles.css";

export default function App() {
  return (
    <ThemeProvider
      config={{
        position: "bottom-left",
        brandColors: {
          primary: "#0f172a",
          secondary: "#1e3a5f",
          accent: "#e8b008",
        },
        storageKey: "my-app-theme",
      }}
    >
      {/* your app */}
      <ThemeLauncher />
    </ThemeProvider>
  );
}
```

### Flash Prevention

Add this inline script to your `<head>` **before** any stylesheets to prevent a flash of incorrect theme on load. Replace `my-app-theme` with your `storageKey`:

```html
<script>
  (function () {
    try {
      var mode = localStorage.getItem("my-app-theme") || "system";
      var prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      var resolved =
        mode === "system" ? (prefersDark ? "dark" : "light") : mode;
      var root = document.documentElement;
      if (resolved === "dark") root.classList.add("dark");
      else root.classList.remove("dark");
      root.style.colorScheme = resolved;
    } catch (e) {}
  })();
</script>
```

## Configuration API

All config properties are optional.

```typescript
interface ThemeWidgetConfig {
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  brandColors?: {
    primary?: string;   // default: "#0d9488"
    secondary?: string; // default: "#1e3a5f"
    accent?: string;    // default: "#f59e0b"
  };
  launcher?: {
    size?: "sm" | "md" | "lg";
    tooltip?: string;   // default: "Theme"
    zIndex?: number;    // default: 9998
  };
  panel?: {
    title?: string;     // default: "Choose Theme"
  };
  storageKey?: string;  // default: "theme-mode"
  defaultMode?: ThemeMode; // default: "system"
}

type ThemeMode = "system" | "light" | "dark";
```

## Exported Hook

Use `useTheme()` anywhere inside `<ThemeProvider>` to read or change the theme programmatically:

```tsx
import { useTheme } from "@wolfconsulting/theme-widget";

function MyComponent() {
  const { mode, resolved, setTheme } = useTheme();
  // mode: "system" | "light" | "dark"  (user's selection)
  // resolved: "light" | "dark"          (actual applied theme)
  // setTheme: (mode) => void            (change theme)
}
```

## Peer Dependencies

The host application must have these installed:

- `react` >= 18
- `react-dom` >= 18
- `framer-motion` >= 12
- `lucide-react` >= 0.300
- `clsx` >= 2
- `tailwind-merge` >= 2

## License

Proprietary — Wolf Consulting Group, LLC. See [LICENSE](./LICENSE).
