import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
      {items.map((item, index) => (
        <div key={index} className="flex items-center flex-shrink-0">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1 md:mx-2 flex-shrink-0" />}
          {item.href ? (
            <Link to={item.href} className="hover:text-foreground transition-colors truncate max-w-[100px] md:max-w-none">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground truncate max-w-[120px] md:max-w-none">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};
