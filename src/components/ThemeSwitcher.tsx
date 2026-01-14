import { useTheme, ThemeName } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { Palette, Check } from "lucide-react";

const themes: { name: ThemeName; label: string; description: string }[] = [
  { name: "default", label: "Default", description: "Clean modern theme" },
  { name: "excel", label: "Excel", description: "Classic spreadsheet style" },
  { name: "steel", label: "Steel Blue", description: "Professional blue theme" },
];

type ThemeSwitcherProps = {
  /** Better for narrow spaces (e.g. collapsed sidebar) */
  compact?: boolean;
};

export const ThemeSwitcher = ({ compact }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();
  const sidebar = useSidebar();
  const showText = !compact && sidebar.open;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={compact ? "icon" : "sm"} className={compact ? "h-9 w-9" : "gap-2"}>
          <Palette className="h-4 w-4" />
          {showText && <span>Theme</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-50 w-56 bg-popover">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.name}
            onClick={() => setTheme(t.name)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div>
              <div className="font-medium">{t.label}</div>
              <div className="text-xs text-muted-foreground">{t.description}</div>
            </div>
            {theme === t.name && <Check className="h-4 w-4 text-accent" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

