'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var framerMotion = require('framer-motion');
var lucideReact = require('lucide-react');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');

// src/context/ThemeContext.tsx

// src/lib/theme.ts
function getStoredTheme(storageKey) {
  try {
    const v = localStorage.getItem(storageKey);
    if (v === "light" || v === "dark" || v === "system") return v;
  } catch {
  }
  return "system";
}
function storeTheme(storageKey, mode) {
  try {
    localStorage.setItem(storageKey, mode);
  } catch {
  }
}
function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function resolveTheme(mode) {
  return mode === "system" ? getSystemTheme() : mode;
}
function applyTheme(mode) {
  const root = document.documentElement;
  const resolved = resolveTheme(mode);
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

// src/lib/config.ts
var DEFAULT_CONFIG = {
  position: "bottom-left",
  brandColors: {
    primary: "#0d9488",
    secondary: "#1e3a5f",
    accent: "#f59e0b"
  },
  launcher: {
    size: "md",
    tooltip: "Theme",
    zIndex: 9998
  },
  panel: {
    title: "Choose Theme"
  },
  storageKey: "theme-mode",
  defaultMode: "system"
};
function resolveConfig(userConfig) {
  if (!userConfig) return { ...DEFAULT_CONFIG };
  return {
    position: userConfig.position ?? DEFAULT_CONFIG.position,
    brandColors: {
      ...DEFAULT_CONFIG.brandColors,
      ...userConfig.brandColors
    },
    launcher: {
      ...DEFAULT_CONFIG.launcher,
      ...userConfig.launcher
    },
    panel: {
      ...DEFAULT_CONFIG.panel,
      ...userConfig.panel
    },
    storageKey: userConfig.storageKey ?? DEFAULT_CONFIG.storageKey,
    defaultMode: userConfig.defaultMode ?? DEFAULT_CONFIG.defaultMode
  };
}
var ThemeContext = react.createContext(null);
function ThemeProviderInner({
  children,
  config: userConfig
}) {
  const resolvedConfig = react.useMemo(
    () => resolveConfig(userConfig),
    [userConfig]
  );
  const [mode, setMode] = react.useState(() => {
    if (typeof window === "undefined") return resolvedConfig.defaultMode;
    return getStoredTheme(resolvedConfig.storageKey);
  });
  const [resolved, setResolved] = react.useState(
    () => resolveTheme(mode)
  );
  react.useEffect(() => {
    applyTheme(mode);
    setResolved(resolveTheme(mode));
  }, [mode]);
  react.useEffect(() => {
    const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mql) return;
    const onChange = () => {
      if (getStoredTheme(resolvedConfig.storageKey) === "system") {
        applyTheme("system");
        setResolved(resolveTheme("system"));
      }
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [resolvedConfig.storageKey]);
  const setTheme = react.useCallback(
    (next) => {
      setMode(next);
      storeTheme(resolvedConfig.storageKey, next);
      applyTheme(next);
      setResolved(resolveTheme(next));
    },
    [resolvedConfig.storageKey]
  );
  const contextValue = react.useMemo(
    () => ({ mode, resolved, setTheme, config: resolvedConfig }),
    [mode, resolved, setTheme, resolvedConfig]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(ThemeContext.Provider, { value: contextValue, children });
}
ThemeProviderInner.displayName = "ThemeProvider";
var ThemeProvider = ThemeProviderInner;
function useTheme() {
  const context = react.useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useTheme must be used within a <ThemeProvider>. Wrap your component tree with <ThemeProvider> from @wolfconsulting/theme-widget."
    );
  }
  return context;
}
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
function ThemeOptionInner({
  icon,
  label,
  description,
  active,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "button",
    {
      type: "button",
      role: "radio",
      "aria-checked": active,
      onClick: onSelect,
      className: cn(
        "theme-widget-option",
        active && "theme-widget-option--active"
      ),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            className: cn(
              "theme-widget-option-icon",
              active && "theme-widget-option-icon--active"
            ),
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "theme-widget-option-text", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: cn(
                "theme-widget-option-label",
                active && "theme-widget-option-label--active"
              ),
              children: label
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "theme-widget-option-desc", children: description })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            className: cn(
              "theme-widget-radio",
              active && "theme-widget-radio--active"
            ),
            children: active && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "theme-widget-radio-dot" })
          }
        )
      ]
    }
  );
}
ThemeOptionInner.displayName = "ThemeOption";
var ThemeOption = ThemeOptionInner;
function ThemePanelInner({ onClose }) {
  const { mode, setTheme, config } = useTheme();
  const panelRef = react.useRef(null);
  const closeRef = react.useRef(null);
  const { position, panel: panelConfig } = config;
  react.useEffect(() => {
    closeRef.current?.focus();
  }, []);
  react.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const el = panelRef.current;
        if (!el) return;
        const focusable = el.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const positionClasses = cn(
    "theme-widget-panel",
    position.includes("bottom") && "theme-widget-panel--bottom",
    position.includes("top") && "theme-widget-panel--top",
    position.includes("left") && "theme-widget-panel--left",
    position.includes("right") && "theme-widget-panel--right"
  );
  const yDirection = position.includes("bottom") ? 20 : -20;
  const prefersReduced = typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      framerMotion.motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: prefersReduced ? { duration: 0 } : { duration: 0.15 },
        className: "theme-widget-backdrop",
        style: { zIndex: config.launcher.zIndex },
        onClick: onClose,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(
      framerMotion.motion.div,
      {
        ref: panelRef,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": panelConfig.title,
        initial: prefersReduced ? false : { opacity: 0, y: yDirection, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: prefersReduced ? { opacity: 0 } : { opacity: 0, y: yDirection * 0.66, scale: 0.97 },
        transition: prefersReduced ? { duration: 0 } : { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
        className: positionClasses,
        style: {
          zIndex: config.launcher.zIndex + 1,
          "--theme-primary": config.brandColors.primary,
          "--theme-secondary": config.brandColors.secondary,
          "--theme-accent": config.brandColors.accent
        },
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "theme-widget-panel-header", children: [
            /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "theme-widget-panel-title", children: panelConfig.title }),
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                ref: closeRef,
                type: "button",
                onClick: onClose,
                className: "theme-widget-close-btn",
                "aria-label": "Close theme options",
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "theme-widget-close-icon", "aria-hidden": "true" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              className: "theme-widget-panel-body",
              role: "radiogroup",
              "aria-label": "Theme selection",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  ThemeOption,
                  {
                    icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Monitor, { className: "theme-widget-icon" }),
                    label: "System",
                    description: "Match your device settings",
                    active: mode === "system",
                    onSelect: () => setTheme("system")
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  ThemeOption,
                  {
                    icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Sun, { className: "theme-widget-icon" }),
                    label: "Light",
                    description: "Bright and airy appearance",
                    active: mode === "light",
                    onSelect: () => setTheme("light")
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  ThemeOption,
                  {
                    icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Moon, { className: "theme-widget-icon" }),
                    label: "Dark",
                    description: "Easy on the eyes at night",
                    active: mode === "dark",
                    onSelect: () => setTheme("dark")
                  }
                )
              ]
            }
          )
        ]
      }
    )
  ] });
}
ThemePanelInner.displayName = "ThemePanel";
var ThemePanel = ThemePanelInner;
function ThemeLauncherInner() {
  const [open, setOpen] = react.useState(false);
  const { mode, config } = useTheme();
  const triggerRef = react.useRef(null);
  const handleOpen = react.useCallback(() => setOpen(true), []);
  const handleClose = react.useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);
  const { position, launcher } = config;
  const sizeClasses = {
    sm: "theme-widget-launcher--sm",
    md: "theme-widget-launcher--md",
    lg: "theme-widget-launcher--lg"
  }[launcher.size];
  const posClasses = cn(
    position.includes("bottom") && "theme-widget-launcher--bottom",
    position.includes("top") && "theme-widget-launcher--top",
    position.includes("left") && "theme-widget-launcher--left",
    position.includes("right") && "theme-widget-launcher--right"
  );
  const Icon = mode === "system" ? lucideReact.Monitor : mode === "light" ? lucideReact.Sun : lucideReact.Moon;
  const prefersReduced = typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntime.jsx(ThemePanel, { onClose: handleClose }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      framerMotion.motion.button,
      {
        ref: triggerRef,
        type: "button",
        onClick: open ? handleClose : handleOpen,
        "aria-label": open ? "Close theme options" : launcher.tooltip,
        "aria-expanded": open,
        "aria-haspopup": "dialog",
        title: launcher.tooltip,
        initial: prefersReduced ? false : { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: prefersReduced ? { duration: 0 } : {
          delay: 0.5,
          duration: 0.3,
          type: "spring",
          stiffness: 260,
          damping: 20
        },
        className: cn(
          "theme-widget-launcher",
          sizeClasses,
          posClasses,
          open && "theme-widget-launcher--open"
        ),
        style: {
          zIndex: config.launcher.zIndex,
          "--theme-primary": config.brandColors.primary,
          "--theme-secondary": config.brandColors.secondary,
          "--theme-accent": config.brandColors.accent
        },
        children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { className: "theme-widget-launcher-icon", "aria-hidden": "true" })
      }
    )
  ] });
}
ThemeLauncherInner.displayName = "ThemeLauncher";
var ThemeLauncher = ThemeLauncherInner;

exports.ThemeLauncher = ThemeLauncher;
exports.ThemeProvider = ThemeProvider;
exports.useTheme = useTheme;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map