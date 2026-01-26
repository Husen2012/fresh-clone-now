import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Upload, ChevronDown, ChevronUp, Edit2 } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface OrderLine {
  id: string;
  image?: string;
  productName: string;
  description: string;
  qty: number;
  unitPrice: number;
  vendor: string;
  [key: string]: any;
}

interface MobileOrderLineCardProps {
  line: OrderLine;
  customColumns: string[];
  onEdit: (line: OrderLine) => void;
  onDelete: (id: string) => void;
}

export const MobileOrderLineCard = ({
  line,
  customColumns,
  onEdit,
  onDelete,
}: MobileOrderLineCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const subtotal = (line.qty || 0) * (line.unitPrice || 0);

  return (
    <Card className="mb-3 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-start gap-3 p-3">
          {/* Product Image */}
          <div className="w-16 h-16 rounded bg-muted/30 border border-border flex items-center justify-center flex-shrink-0 overflow-hidden">
            {line.image ? (
              <img
                src={line.image}
                alt={line.productName}
                className="w-full h-full object-cover"
              />
            ) : (
              <Upload className="h-5 w-5 text-muted-foreground" />
            )}
          </div>

          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate">
              {line.productName || "Untitled Product"}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {line.vendor || "No vendor"}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs bg-muted/50 px-2 py-0.5 rounded">
                Qty: {line.qty}
              </span>
              <span className="text-xs bg-muted/50 px-2 py-0.5 rounded">
                ${line.unitPrice.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-primary">
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(line)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(line.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Expandable Details */}
        {(line.description || customColumns.length > 0) && (
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full h-8 rounded-none border-t border-border text-xs text-muted-foreground hover:bg-muted/20"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-3 w-3 mr-1" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" />
                    Show Details
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-3 pb-3 pt-2 border-t border-border bg-muted/10 space-y-2">
                {line.description && (
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                      Description
                    </p>
                    <p className="text-xs">{line.description}</p>
                  </div>
                )}
                {customColumns.map((col) => (
                  <div key={col}>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                      {col}
                    </p>
                    <p className="text-xs">{line[col] || "-"}</p>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
};
