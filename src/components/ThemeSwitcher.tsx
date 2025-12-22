import { useTheme, ThemeName } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Palette, Check } from 'lucide-react';

const themes: { name: ThemeName; label: string; description: string }[] = [
  { name: 'default', label: 'Default', description: 'Clean modern theme' },
  { name: 'excel', label: 'Excel', description: 'Classic spreadsheet style' },
];

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
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
