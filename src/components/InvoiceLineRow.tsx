import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface InvoiceLine {
  id: string;
  product: string;
  account: string;
  quantity: number;
  unitPrice: number;
  taxes: string;
  discount: number;
}

interface InvoiceLineRowProps {
  line: InvoiceLine;
  onUpdate: (id: string, field: keyof InvoiceLine, value: any) => void;
  onDelete: (id: string) => void;
  customColumns?: string[];
}

export const InvoiceLineRow = ({ line, onUpdate, onDelete, customColumns = [] }: InvoiceLineRowProps) => {
  const subtotal = (line.quantity || 0) * (line.unitPrice || 0) * (1 - (line.discount || 0) / 100);

  return (
    <tr className="hover:bg-muted/10">
      <td className="p-0 border border-border">
        <Input
          value={line.product}
          onChange={(e) => onUpdate(line.id, 'product', e.target.value)}
          placeholder="Product/Service"
          className="h-8 text-xs border-0 rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-muted/20"
        />
      </td>
      <td className="p-0 border border-border">
        <Input
          value={line.account}
          onChange={(e) => onUpdate(line.id, 'account', e.target.value)}
          placeholder="Account"
          className="h-8 text-xs border-0 rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-muted/20"
        />
      </td>
      <td className="p-0 border border-border">
        <Input
          type="number"
          value={line.quantity}
          onChange={(e) => onUpdate(line.id, 'quantity', Number(e.target.value))}
          className="h-8 text-xs border-0 rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-muted/20 text-center"
        />
      </td>
      <td className="p-0 border border-border">
        <Input
          type="number"
          value={line.unitPrice}
          onChange={(e) => onUpdate(line.id, 'unitPrice', Number(e.target.value))}
          className="h-8 text-xs border-0 rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-muted/20 text-right"
        />
      </td>
      <td className="p-0 border border-border">
        <Input
          value={line.taxes}
          onChange={(e) => onUpdate(line.id, 'taxes', e.target.value)}
          placeholder="15%"
          className="h-8 text-xs border-0 rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-muted/20 text-center"
        />
      </td>
      <td className="p-0 border border-border">
        <Input
          type="number"
          value={line.discount}
          onChange={(e) => onUpdate(line.id, 'discount', Number(e.target.value))}
          placeholder="0"
          className="h-8 text-xs border-0 rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-muted/20 text-center"
        />
      </td>
      {customColumns.map((col, idx) => (
        <td key={idx} className="p-0 border border-border">
          <Input
            placeholder={col}
            className="h-8 text-xs border-0 rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-muted/20"
          />
        </td>
      ))}
      <td className="p-0 border border-border">
        <div className="h-8 flex items-center justify-end px-2">
          <span className="text-xs font-medium">${subtotal.toFixed(2)}</span>
        </div>
      </td>
      <td className="p-0 border border-border">
        <div className="h-8 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(line.id)}
            className="h-7 w-7 hover:bg-destructive/10"
          >
            <Trash2 className="h-3 w-3 text-destructive" />
          </Button>
        </div>
      </td>
    </tr>
  );
};
