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
    <tr className="border-b border-border">
      <td className="p-3">
        <div className="w-24 h-24 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer relative overflow-hidden">
          {imagePreview ? (
            <img src={imagePreview} alt="Product" className="w-full h-full object-cover" />
          ) : (
            <>
              <ImageIcon className="h-6 w-6 text-muted-foreground mb-1" />
              <span className="text-xs text-muted-foreground">Paste or</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        {!imagePreview && (
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <Upload className="h-3 w-3" />
            <span>Upload</span>
          </div>
        )}
      </td>
      <td className="p-3">
        <Input
          value={line.productName}
          onChange={(e) => onUpdate(line.id, 'productName', e.target.value)}
          placeholder="Product name"
          className="bg-card"
        />
      </td>
      <td className="p-3">
        <Input
          value={line.description}
          onChange={(e) => onUpdate(line.id, 'description', e.target.value)}
          placeholder="Description"
          className="bg-card"
        />
      </td>
      <td className="p-3">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={line.qty}
            onChange={(e) => onUpdate(line.id, 'qty', Number(e.target.value))}
            className="bg-card w-20"
          />
          <span className="text-xs text-muted-foreground">pcs</span>
        </div>
      </td>
      <td className="p-3">
        <Input
          type="number"
          value={line.unitPrice}
          onChange={(e) => onUpdate(line.id, 'unitPrice', Number(e.target.value))}
          className="bg-card"
        />
      </td>
      <td className="p-3">
        <Input
          value={line.vendor}
          onChange={(e) => onUpdate(line.id, 'vendor', e.target.value)}
          placeholder="Vendor"
          className="bg-card"
        />
      </td>
      <td className="p-3">
        <span className="text-muted-foreground">${subtotal.toFixed(2)}</span>
      </td>
      <td className="p-3">
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(line.id)}
          className="h-9 w-9"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
};
