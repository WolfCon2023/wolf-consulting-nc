import { Laptop, Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/use-theme";
import type { ThemeMode } from "@/lib/theme";
import { Button } from "@/components/ui/button";

function nextTheme(mode: ThemeMode): ThemeMode {
  if (mode === "system") return "light";
  if (mode === "light") return "dark";
  return "system";
}

export function ThemeToggle({ showLabel = false }: { showLabel?: boolean }) {
  const { mode, setTheme } = useTheme();

  const Icon = mode === "dark" ? Moon : mode === "light" ? Sun : Laptop;

  const modeLabel =
    mode === "dark" ? "Dark" : mode === "light" ? "Light" : "System";

  const label =
    mode === "dark"
      ? "Theme: Dark (click to switch)"
      : mode === "light"
        ? "Theme: Light (click to switch)"
        : "Theme: System (click to switch)";

  return (
    <Button
      type="button"
      variant="outline"
      size={showLabel ? "default" : "icon"}
      aria-label={label}
      title={label}
      onClick={() => setTheme(nextTheme(mode))}
    >
      <Icon />
      {showLabel ? (
        <span className="hidden sm:inline">
          Theme: <span className="font-semibold">{modeLabel}</span>
        </span>
      ) : null}
    </Button>
  );
}


