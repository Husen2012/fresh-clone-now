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
}

export const OrderLineRow = ({ line, onUpdate, onDelete }: OrderLineRowProps) => {
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
    <tr className="border-b border-border hover:bg-muted/20">
      <td className="p-2">
        <div className="w-12 h-12 border border-dashed border-border rounded flex items-center justify-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer relative overflow-hidden">
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
      <td className="p-2">
        <Input
          value={line.productName}
          onChange={(e) => onUpdate(line.id, 'productName', e.target.value)}
          placeholder="Product"
          className="h-7 text-xs"
        />
      </td>
      <td className="p-2">
        <Input
          value={line.description}
          onChange={(e) => onUpdate(line.id, 'description', e.target.value)}
          placeholder="Description"
          className="h-7 text-xs"
        />
      </td>
      <td className="p-2">
        <Input
          type="number"
          value={line.qty}
          onChange={(e) => onUpdate(line.id, 'qty', Number(e.target.value))}
          className="w-14 h-7 text-xs"
        />
      </td>
      <td className="p-2">
        <Input
          type="number"
          value={line.unitPrice}
          onChange={(e) => onUpdate(line.id, 'unitPrice', Number(e.target.value))}
          className="w-20 h-7 text-xs"
        />
      </td>
      <td className="p-2">
        <Input
          value={line.vendor}
          onChange={(e) => onUpdate(line.id, 'vendor', e.target.value)}
          placeholder="Vendor"
          className="h-7 text-xs"
        />
      </td>
      <td className="p-2">
        <span className="text-xs font-medium">${subtotal.toFixed(2)}</span>
      </td>
      <td className="p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(line.id)}
          className="h-6 w-6"
        >
          <Trash2 className="h-3 w-3 text-destructive" />
        </Button>
      </td>
    </tr>
  );
};
