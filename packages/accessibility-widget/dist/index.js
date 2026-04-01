'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var framerMotion = require('framer-motion');
var lucideReact = require('lucide-react');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');

// src/context/AccessibilityContext.tsx

// src/lib/accessibility.ts
var defaultSettings = {
  highContrast: false,
  softContrast: false,
  biggerText: 0,
  textSpacing: false,
  lineHeight: false,
  leftAlign: false,
  highlightLinks: false,
  pauseAnimations: false,
  hideImages: false,
  enhancedCursor: false,
  dyslexiaFont: false,
  lowSaturation: false,
  readingGuide: false
};
function loadSettings(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return { ...defaultSettings };
    const parsed = JSON.parse(raw);
    return { ...defaultSettings, ...parsed };
  } catch {
    return { ...defaultSettings };
  }
}
function saveSettings(storageKey, settings) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(settings));
  } catch {
  }
}
function clearSettings(storageKey) {
  try {
    localStorage.removeItem(storageKey);
  } catch {
  }
}
function isDefault(settings) {
  return Object.keys(defaultSettings).every(
    (key) => settings[key] === defaultSettings[key]
  );
}
function applySettingsToDOM(settings) {
  const root = document.documentElement;
  const toggle = (attr, value) => {
    if (value) {
      root.setAttribute(attr, "");
    } else {
      root.removeAttribute(attr);
    }
  };
  toggle("data-a11y-high-contrast", settings.highContrast);
  toggle("data-a11y-soft-contrast", settings.softContrast);
  toggle("data-a11y-text-spacing", settings.textSpacing);
  toggle("data-a11y-line-height", settings.lineHeight);
  toggle("data-a11y-left-align", settings.leftAlign);
  toggle("data-a11y-highlight-links", settings.highlightLinks);
  toggle("data-a11y-pause-animations", settings.pauseAnimations);
  toggle("data-a11y-hide-images", settings.hideImages);
  toggle("data-a11y-enhanced-cursor", settings.enhancedCursor);
  toggle("data-a11y-dyslexia-font", settings.dyslexiaFont);
  toggle("data-a11y-low-saturation", settings.lowSaturation);
  toggle("data-a11y-reading-guide", settings.readingGuide);
  if (settings.biggerText > 0) {
    root.setAttribute("data-a11y-bigger-text", String(settings.biggerText));
  } else {
    root.removeAttribute("data-a11y-bigger-text");
  }
}
function getActiveCount(settings) {
  let count = 0;
  if (settings.highContrast) count++;
  if (settings.softContrast) count++;
  if (settings.biggerText > 0) count++;
  if (settings.textSpacing) count++;
  if (settings.lineHeight) count++;
  if (settings.leftAlign) count++;
  if (settings.highlightLinks) count++;
  if (settings.pauseAnimations) count++;
  if (settings.hideImages) count++;
  if (settings.enhancedCursor) count++;
  if (settings.dyslexiaFont) count++;
  if (settings.lowSaturation) count++;
  if (settings.readingGuide) count++;
  return count;
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
    tooltip: "Accessibility Options",
    zIndex: 9999
  },
  panel: {
    title: "Accessibility Options",
    subtitle: "Customize the site experience for readability, visibility, and comfort.",
    footerNote: "This menu helps personalize your browsing experience."
  },
  features: {
    contrast: true,
    textSize: true,
    textSpacing: true,
    lineHeight: true,
    textAlign: true,
    highlightLinks: true,
    pauseAnimations: true,
    hideImages: true,
    cursorEnhancement: true,
    dyslexiaFont: true,
    saturation: true,
    readingGuide: true
  },
  storageKey: "a11y-settings"
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
    features: {
      ...DEFAULT_CONFIG.features,
      ...userConfig.features
    },
    storageKey: userConfig.storageKey ?? DEFAULT_CONFIG.storageKey
  };
}
var AccessibilityContext = react.createContext(null);
function AccessibilityProviderInner({ children, config: userConfig }) {
  const resolvedConfig = react.useMemo(() => resolveConfig(userConfig), [userConfig]);
  const [settings, setSettings] = react.useState(defaultSettings);
  const initialized = react.useRef(false);
  react.useEffect(() => {
    const loaded = loadSettings(resolvedConfig.storageKey);
    setSettings(loaded);
    applySettingsToDOM(loaded);
    initialized.current = true;
  }, [resolvedConfig.storageKey]);
  const updateSetting = react.useCallback(
    (key, value) => {
      setSettings((prev) => {
        const next = { ...prev, [key]: value };
        if (key === "highContrast" && value && next.softContrast) {
          next.softContrast = false;
        }
        if (key === "softContrast" && value && next.highContrast) {
          next.highContrast = false;
        }
        saveSettings(resolvedConfig.storageKey, next);
        applySettingsToDOM(next);
        return next;
      });
    },
    [resolvedConfig.storageKey]
  );
  const resetAll = react.useCallback(() => {
    setSettings({ ...defaultSettings });
    clearSettings(resolvedConfig.storageKey);
    applySettingsToDOM(defaultSettings);
  }, [resolvedConfig.storageKey]);
  const contextValue = react.useMemo(
    () => ({
      settings,
      updateSetting,
      resetAll,
      isAllDefault: isDefault(settings),
      activeCount: getActiveCount(settings),
      config: resolvedConfig
    }),
    [settings, updateSetting, resetAll, resolvedConfig]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(AccessibilityContext.Provider, { value: contextValue, children });
}
AccessibilityProviderInner.displayName = "AccessibilityProvider";
var AccessibilityProvider = AccessibilityProviderInner;
function useAccessibility() {
  const context = react.useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within an <AccessibilityProvider>. Wrap your component tree with <AccessibilityProvider> from @wolfconsulting/accessibility-widget."
    );
  }
  return context;
}
function AccessibilitySectionInner({ title, children }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "group", "aria-labelledby": `a11y-section-${title.replace(/\s+/g, "-").toLowerCase()}`, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "h3",
      {
        id: `a11y-section-${title.replace(/\s+/g, "-").toLowerCase()}`,
        className: "a11y-widget-section-title",
        children: title
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "a11y-widget-section-content", children })
  ] });
}
AccessibilitySectionInner.displayName = "AccessibilitySection";
var AccessibilitySection = AccessibilitySectionInner;
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
function AccessibilityToggleCardInner({
  icon,
  label,
  description,
  active,
  onToggle
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": active,
      "aria-label": label,
      onClick: onToggle,
      className: cn(
        "a11y-widget-toggle-card",
        active && "a11y-widget-toggle-card--active"
      ),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: cn(
              "a11y-widget-toggle-icon",
              active && "a11y-widget-toggle-icon--active"
            ),
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "a11y-widget-toggle-text", children: [
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: cn("a11y-widget-toggle-label", active && "a11y-widget-toggle-label--active"), children: label }),
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "a11y-widget-toggle-desc", children: description })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("a11y-widget-switch", active && "a11y-widget-switch--active"), children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("a11y-widget-switch-knob", active && "a11y-widget-switch-knob--active") }) })
      ]
    }
  );
}
AccessibilityToggleCardInner.displayName = "AccessibilityToggleCard";
var AccessibilityToggleCard = AccessibilityToggleCardInner;
function AccessibilityRangeControlInner({
  icon,
  label,
  description,
  value,
  min,
  max,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cn(
        "a11y-widget-range-card",
        value > min && "a11y-widget-range-card--active"
      ),
      role: "group",
      "aria-label": label,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: cn(
              "a11y-widget-toggle-icon",
              value > min && "a11y-widget-toggle-icon--active"
            ),
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "a11y-widget-toggle-text", children: [
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: cn("a11y-widget-toggle-label", value > min && "a11y-widget-toggle-label--active"), children: label }),
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "a11y-widget-toggle-desc", children: description }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "a11y-widget-range-controls", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: () => onChange(Math.max(min, value - 1)),
                disabled: value <= min,
                "aria-label": `Decrease ${label}`,
                className: "a11y-widget-range-btn",
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Minus, { className: "a11y-widget-range-btn-icon", "aria-hidden": "true" })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "a11y-widget-range-track", "aria-hidden": "true", children: Array.from({ length: max - min + 1 }).map((_, i) => /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                className: cn(
                  "a11y-widget-range-step",
                  i <= value - min - 1 && "a11y-widget-range-step--filled"
                )
              },
              i
            )) }),
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "a11y-widget-sr-only", "aria-live": "polite", children: [
              label,
              ": level ",
              value,
              " of ",
              max
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: () => onChange(Math.min(max, value + 1)),
                disabled: value >= max,
                "aria-label": `Increase ${label}`,
                className: "a11y-widget-range-btn",
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { className: "a11y-widget-range-btn-icon", "aria-hidden": "true" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
AccessibilityRangeControlInner.displayName = "AccessibilityRangeControl";
var AccessibilityRangeControl = AccessibilityRangeControlInner;
function AccessibilityResetButtonInner({ onReset, disabled }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "button",
    {
      type: "button",
      onClick: onReset,
      disabled,
      className: "a11y-widget-reset-btn",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.RotateCcw, { className: "a11y-widget-reset-icon", "aria-hidden": "true" }),
        "Reset All Settings"
      ]
    }
  );
}
AccessibilityResetButtonInner.displayName = "AccessibilityResetButton";
var AccessibilityResetButton = AccessibilityResetButtonInner;
function AccessibilityPanelInner({ onClose }) {
  const { settings, updateSetting, resetAll, isAllDefault, config } = useAccessibility();
  const panelRef = react.useRef(null);
  const closeRef = react.useRef(null);
  const { features, panel: panelConfig, position } = config;
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
    "a11y-widget-panel",
    position.includes("bottom") && "a11y-widget-panel--bottom",
    position.includes("top") && "a11y-widget-panel--top",
    position.includes("left") && "a11y-widget-panel--left",
    position.includes("right") && "a11y-widget-panel--right"
  );
  const yDirection = position.includes("bottom") ? 30 : -30;
  const hasVision = features.contrast || features.hideImages || features.saturation;
  const hasReading = features.textSize || features.textSpacing || features.lineHeight || features.textAlign || features.dyslexiaFont;
  const hasMotion = features.pauseAnimations;
  const hasNavigation = features.highlightLinks || features.cursorEnhancement || features.readingGuide;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      framerMotion.motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
        className: "a11y-widget-backdrop",
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
        "data-a11y-panel": true,
        initial: { opacity: 0, y: yDirection, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: yDirection * 0.66, scale: 0.97 },
        transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
        className: positionClasses,
        style: {
          zIndex: config.launcher.zIndex + 1,
          "--a11y-primary": config.brandColors.primary,
          "--a11y-secondary": config.brandColors.secondary,
          "--a11y-accent": config.brandColors.accent
        },
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "a11y-widget-panel-header", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntime.jsxs("h2", { className: "a11y-widget-panel-title", children: [
                /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Eye, { className: "a11y-widget-panel-title-icon", "aria-hidden": "true" }),
                panelConfig.title
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("p", { className: "a11y-widget-panel-subtitle", children: panelConfig.subtitle })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                ref: closeRef,
                type: "button",
                onClick: onClose,
                className: "a11y-widget-close-btn",
                "aria-label": "Close accessibility options",
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "a11y-widget-close-icon", "aria-hidden": "true" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "a11y-widget-panel-body", children: [
            hasVision && /* @__PURE__ */ jsxRuntime.jsxs(AccessibilitySection, { title: "Vision", children: [
              features.contrast && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  AccessibilityToggleCard,
                  {
                    icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Contrast, { className: "a11y-widget-icon" }),
                    label: "High Contrast",
                    description: "Black background with white text",
                    active: settings.highContrast,
                    onToggle: () => updateSetting("highContrast", !settings.highContrast)
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  AccessibilityToggleCard,
                  {
                    icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Palette, { className: "a11y-widget-icon" }),
                    label: "Soft Contrast",
                    description: "Warm background, easier on the eyes",
                    active: settings.softContrast,
                    onToggle: () => updateSetting("softContrast", !settings.softContrast)
                  }
                )
              ] }),
              features.hideImages && /* @__PURE__ */ jsxRuntime.jsx(
                AccessibilityToggleCard,
                {
                  icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ImageOff, { className: "a11y-widget-icon" }),
                  label: "Hide Decorative Images",
                  description: "Reduce visual distractions",
                  active: settings.hideImages,
                  onToggle: () => updateSetting("hideImages", !settings.hideImages)
                }
              ),
              features.saturation && /* @__PURE__ */ jsxRuntime.jsx(
                AccessibilityToggleCard,
                {
                  icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Palette, { className: "a11y-widget-icon" }),
                  label: "Lower Saturation",
                  description: "Reduce color intensity",
                  active: settings.lowSaturation,
                  onToggle: () => updateSetting("lowSaturation", !settings.lowSaturation)
                }
              )
            ] }),
            hasReading && /* @__PURE__ */ jsxRuntime.jsxs(AccessibilitySection, { title: "Reading", children: [
              features.textSize && /* @__PURE__ */ jsxRuntime.jsx(
                AccessibilityRangeControl,
                {
                  icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Type, { className: "a11y-widget-icon" }),
                  label: "Larger Text",
                  description: "Increase font size for readability",
                  value: settings.biggerText,
                  min: 0,
                  max: 3,
                  onChange: (v) => updateSetting("biggerText", v)
                }
              ),
              features.textSpacing && /* @__PURE__ */ jsxRuntime.jsx(
                AccessibilityToggleCard,
                {
                  icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Space, { className: "a11y-widget-icon" }),
                  label: "Text Spacing",
                  description: "Add spacing between letters and words",
                  active: settings.textSpacing,
                  onToggle: () => updateSetting("textSpacing", !settings.textSpacing)
                }
              ),
              features.lineHeight && /* @__PURE__ */ jsxRuntime.jsx(
                AccessibilityToggleCard,
                {
                  icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.MoveVertical, { className: "a11y-widget-icon" }),
                  label: "Increase Line Height",
                  description: "More space between lines of text",
                  active: settings.lineHeight,
                  onToggle: () => updateSetting("lineHeight", !settings.lineHeight)
                }
              ),
              features.textAlign && /* @__PURE__ */ jsxRuntime.jsx(
                AccessibilityToggleCard,
                {
                  icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.AlignLeft, { className: "a11y-widget-icon" }),
                  label: "Left Align Text",
                  description: "Force left-aligned text for easier reading",
                  active: settings.leftAlign,
                  onToggle: () => updateSetting("leftAlign", !settings.leftAlign)
                }
              ),
              features.dyslexiaFont && /* @__PURE__ */ jsxRuntime.jsx(
                AccessibilityToggleCard,
                {
                  icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CaseSensitive, { className: "a11y-widget-icon" }),
                  label: "Dyslexia-Friendly Text",
                  description: "Use a more readable font for body text",
                  active: settings.dyslexiaFont,
                  onToggle: () => updateSetting("dyslexiaFont", !settings.dyslexiaFont)
                }
              )
            ] }),
            hasMotion && /* @__PURE__ */ jsxRuntime.jsx(AccessibilitySection, { title: "Motion", children: /* @__PURE__ */ jsxRuntime.jsx(
              AccessibilityToggleCard,
              {
                icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Pause, { className: "a11y-widget-icon" }),
                label: "Pause Animations",
                description: "Stop decorative motion and transitions",
                active: settings.pauseAnimations,
                onToggle: () => updateSetting("pauseAnimations", !settings.pauseAnimations)
              }
            ) }),
            hasNavigation && /* @__PURE__ */ jsxRuntime.jsxs(AccessibilitySection, { title: "Navigation & Focus", children: [
              features.highlightLinks && /* @__PURE__ */ jsxRuntime.jsx(
                AccessibilityToggleCard,
                {
                  icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Link2, { className: "a11y-widget-icon" }),
                  label: "Highlight Links",
                  description: "Outline and underline all links",
                  active: settings.highlightLinks,
                  onToggle: () => updateSetting("highlightLinks", !settings.highlightLinks)
                }
              ),
              features.cursorEnhancement && /* @__PURE__ */ jsxRuntime.jsx(
                AccessibilityToggleCard,
                {
                  icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.MousePointer2, { className: "a11y-widget-icon" }),
                  label: "Enhanced Cursor",
                  description: "Larger cursor and stronger focus outlines",
                  active: settings.enhancedCursor,
                  onToggle: () => updateSetting("enhancedCursor", !settings.enhancedCursor)
                }
              ),
              features.readingGuide && /* @__PURE__ */ jsxRuntime.jsx(
                AccessibilityToggleCard,
                {
                  icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ScanLine, { className: "a11y-widget-icon" }),
                  label: "Reading Guide",
                  description: "Highlight the line you're reading",
                  active: settings.readingGuide,
                  onToggle: () => updateSetting("readingGuide", !settings.readingGuide)
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "a11y-widget-panel-footer", children: [
            /* @__PURE__ */ jsxRuntime.jsx(AccessibilityResetButton, { onReset: resetAll, disabled: isAllDefault }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "a11y-widget-footer-note", children: panelConfig.footerNote })
          ] })
        ]
      }
    )
  ] });
}
AccessibilityPanelInner.displayName = "AccessibilityPanel";
var AccessibilityPanel = AccessibilityPanelInner;
function ReadingGuideOverlayInner() {
  const { config } = useAccessibility();
  const [y, setY] = react.useState(0);
  react.useEffect(() => {
    const onMove = (e) => setY(e.clientY);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: "a11y-widget-reading-guide",
      style: { zIndex: config.launcher.zIndex - 1 },
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          className: "a11y-widget-reading-guide-bar",
          style: {
            top: `${y - 20}px`,
            background: `linear-gradient(to bottom, ${config.brandColors.primary}14 0%, ${config.brandColors.primary}1f 50%, ${config.brandColors.primary}14 100%)`,
            borderTop: `1.5px solid ${config.brandColors.primary}40`,
            borderBottom: `1.5px solid ${config.brandColors.primary}40`
          }
        }
      )
    }
  );
}
ReadingGuideOverlayInner.displayName = "ReadingGuideOverlay";
var ReadingGuideOverlay = ReadingGuideOverlayInner;
function AccessibilityLauncherInner() {
  const [open, setOpen] = react.useState(false);
  const { activeCount, settings, config } = useAccessibility();
  const triggerRef = react.useRef(null);
  const handleOpen = react.useCallback(() => setOpen(true), []);
  const handleClose = react.useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);
  const { position, launcher } = config;
  const sizeClasses = {
    sm: "a11y-widget-launcher--sm",
    md: "a11y-widget-launcher--md",
    lg: "a11y-widget-launcher--lg"
  }[launcher.size];
  const posClasses = cn(
    position.includes("bottom") && "a11y-widget-launcher--bottom",
    position.includes("top") && "a11y-widget-launcher--top",
    position.includes("left") && "a11y-widget-launcher--left",
    position.includes("right") && "a11y-widget-launcher--right"
  );
  const prefersReduced = typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    settings.readingGuide && !open && /* @__PURE__ */ jsxRuntime.jsx(ReadingGuideOverlay, {}),
    /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntime.jsx(AccessibilityPanel, { onClose: handleClose }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      framerMotion.motion.button,
      {
        ref: triggerRef,
        type: "button",
        onClick: open ? handleClose : handleOpen,
        "aria-label": open ? "Close accessibility options" : launcher.tooltip,
        "aria-expanded": open,
        "aria-haspopup": "dialog",
        title: launcher.tooltip,
        initial: prefersReduced ? false : { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: prefersReduced ? { duration: 0 } : { delay: 0.5, duration: 0.3, type: "spring", stiffness: 260, damping: 20 },
        className: cn(
          "a11y-widget-launcher",
          sizeClasses,
          posClasses,
          open && "a11y-widget-launcher--open"
        ),
        style: {
          zIndex: config.launcher.zIndex,
          "--a11y-primary": config.brandColors.primary,
          "--a11y-secondary": config.brandColors.secondary,
          "--a11y-accent": config.brandColors.accent
        },
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Accessibility, { className: "a11y-widget-launcher-icon", "aria-hidden": "true" }),
          activeCount > 0 && !open && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "a11y-widget-badge", "aria-label": `${activeCount} active settings`, children: activeCount })
        ]
      }
    )
  ] });
}
AccessibilityLauncherInner.displayName = "AccessibilityLauncher";
var AccessibilityLauncher = AccessibilityLauncherInner;

exports.AccessibilityLauncher = AccessibilityLauncher;
exports.AccessibilityProvider = AccessibilityProvider;
exports.useAccessibility = useAccessibility;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map