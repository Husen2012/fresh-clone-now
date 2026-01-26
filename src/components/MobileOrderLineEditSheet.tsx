import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";

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

interface MobileOrderLineEditSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  line: OrderLine | null;
  customColumns: string[];
  onSave: (line: OrderLine) => void;
  isNew?: boolean;
}

export const MobileOrderLineEditSheet = ({
  open,
  onOpenChange,
  line,
  customColumns,
  onSave,
  isNew = false,
}: MobileOrderLineEditSheetProps) => {
  const [formData, setFormData] = useState<OrderLine>({
    id: "",
    productName: "",
    description: "",
    qty: 0,
    unitPrice: 0,
    vendor: "",
  });
  const [imagePreview, setImagePreview] = useState<string | undefined>();

  useEffect(() => {
    if (line) {
      setFormData(line);
      setImagePreview(line.image);
    } else {
      setFormData({
        id: Date.now().toString(),
        productName: "",
        description: "",
        qty: 0,
        unitPrice: 0,
        vendor: "",
      });
      setImagePreview(undefined);
    }
  }, [line, open]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  const subtotal = (formData.qty || 0) * (formData.unitPrice || 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] overflow-y-auto rounded-t-xl">
        <SheetHeader className="text-left pb-4">
          <SheetTitle>{isNew ? "Add Product" : "Edit Product"}</SheetTitle>
          <SheetDescription>
            {isNew ? "Add a new product to the order" : "Update product details"}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 pb-20">
          {/* Image Upload */}
          <div>
            <Label className="text-xs">Product Image</Label>
            <div className="mt-1.5 flex items-center gap-3">
              <div className="w-20 h-20 rounded-lg bg-muted/30 border border-border flex items-center justify-center overflow-hidden relative">
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-5 w-5"
                      onClick={() => {
                        setImagePreview(undefined);
                        setFormData({ ...formData, image: undefined });
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </>
                ) : (
                  <Upload className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="text-xs"
                />
              </div>
            </div>
          </div>

          {/* Product Name */}
          <div>
            <Label htmlFor="productName" className="text-xs">
              Product Name
            </Label>
            <Input
              id="productName"
              value={formData.productName}
              onChange={(e) =>
                setFormData({ ...formData, productName: e.target.value })
              }
              placeholder="Enter product name"
              className="mt-1.5"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-xs">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter description"
              className="mt-1.5 min-h-[80px]"
            />
          </div>

          {/* Quantity and Unit Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="qty" className="text-xs">
                Quantity
              </Label>
              <Input
                id="qty"
                type="number"
                value={formData.qty}
                onChange={(e) =>
                  setFormData({ ...formData, qty: Number(e.target.value) })
                }
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="unitPrice" className="text-xs">
                Unit Price
              </Label>
              <Input
                id="unitPrice"
                type="number"
                step="0.01"
                value={formData.unitPrice}
                onChange={(e) =>
                  setFormData({ ...formData, unitPrice: Number(e.target.value) })
                }
                className="mt-1.5"
              />
            </div>
          </div>

          {/* Vendor */}
          <div>
            <Label htmlFor="vendor" className="text-xs">
              Vendor
            </Label>
            <Input
              id="vendor"
              value={formData.vendor}
              onChange={(e) =>
                setFormData({ ...formData, vendor: e.target.value })
              }
              placeholder="Enter vendor name"
              className="mt-1.5"
            />
          </div>

          {/* Custom Columns */}
          {customColumns.map((col) => (
            <div key={col}>
              <Label htmlFor={col} className="text-xs">
                {col}
              </Label>
              <Input
                id={col}
                value={formData[col] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [col]: e.target.value })
                }
                placeholder={`Enter ${col}`}
                className="mt-1.5"
              />
            </div>
          ))}

          {/* Subtotal Display */}
          <div className="bg-muted/30 rounded-lg p-3 border border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-lg font-bold text-primary">
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <SheetFooter className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            {isNew ? "Add Product" : "Save Changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
