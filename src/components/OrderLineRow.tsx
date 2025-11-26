import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Upload, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

interface OrderLine {
  id: string;
  image?: string;
  productName: string;
  description: string;
  qty: number;
  unitPrice: number;
  vendor: string;
}

interface OrderLineRowProps {
  line: OrderLine;
  onUpdate: (id: string, field: keyof OrderLine, value: any) => void;
  onDelete: (id: string) => void;
  customColumns?: string[];
}

export const OrderLineRow = ({ line, onUpdate, onDelete, customColumns = [] }: OrderLineRowProps) => {
  const [imagePreview, setImagePreview] = useState<string | undefined>(line.image);
  
  const subtotal = (line.qty || 0) * (line.unitPrice || 0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        onUpdate(line.id, 'image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <tr className="hover:bg-muted/10">
      <td className="p-0 border border-border">
        <div className="w-full h-8 flex items-center justify-center bg-card hover:bg-muted/20 transition-colors cursor-pointer relative overflow-hidden">
          {imagePreview ? (
            <img src={imagePreview} alt="Product" className="w-full h-full object-cover" />
          ) : (
            <Upload className="h-3 w-3 text-muted-foreground" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </td>
      <td className="p-0 border border-border">
        <Input
          value={line.productName}
          onChange={(e) => onUpdate(line.id, 'productName', e.target.value)}
          placeholder="Product"
          className="h-8 text-xs border-0 rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-muted/20"
        />
      </td>
      <td className="p-0 border border-border">
        <Input
          value={line.description}
          onChange={(e) => onUpdate(line.id, 'description', e.target.value)}
          placeholder="Description"
          className="h-8 text-xs border-0 rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-muted/20"
        />
      </td>
      <td className="p-0 border border-border">
        <Input
          type="number"
          value={line.qty}
          onChange={(e) => onUpdate(line.id, 'qty', Number(e.target.value))}
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
          value={line.vendor}
          onChange={(e) => onUpdate(line.id, 'vendor', e.target.value)}
          placeholder="Vendor"
          className="h-8 text-xs border-0 rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-muted/20"
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
