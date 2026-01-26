

# Mobile-First Master Order Page

## Overview
Transform the Master Order page to be fully mobile-responsive with a focus on easy product entry and column viewing on small screens. The current table-based layout is difficult to use on mobile because columns become too narrow and scrolling is cumbersome.

## Mobile Design Approach

### Key Changes

**1. Card-Based Product Lines (Mobile)**
Instead of a table with many columns, each order line will display as a card showing:
- Product image and name prominently
- Key details (qty, price, subtotal) in a readable format
- Tap to expand/edit all fields including custom columns
- Swipe or button to delete

**2. Collapsible Form Sections**
The 3-column header info (Basic Info, Timeline, Financial) will stack vertically on mobile with collapsible sections to save space.

**3. Floating Add Button**
A floating action button (FAB) at the bottom for quickly adding new products on mobile.

**4. Bottom Sheet for Editing**
When tapping a product card on mobile, a bottom sheet slides up with all editable fields in a vertical, touch-friendly layout.

---

## Implementation Plan

### Step 1: Create Mobile Order Line Card Component
**New File:** `src/components/MobileOrderLineCard.tsx`

A card component that displays order line data in a mobile-friendly format:
- Product image thumbnail with upload capability
- Product name and vendor as main info
- Qty, Unit Price, Subtotal in a row
- Expandable section for description and custom columns
- Delete button with confirmation

### Step 2: Create Mobile Order Line Edit Sheet
**New File:** `src/components/MobileOrderLineEditSheet.tsx`

A bottom sheet (using the Sheet component) for editing all fields:
- Full-width inputs for each field
- Image upload with preview
- All custom columns displayed vertically
- Save and Cancel buttons

### Step 3: Update MasterOrder.tsx Page

**Header Section Changes:**
- Action buttons collapse into a dropdown menu on mobile
- Order title and subtitle remain visible
- Virtual Inventory toggle stays accessible

**Form Fields Section:**
- Change from `grid-cols-3` to responsive: `grid-cols-1 md:grid-cols-3`
- Each info card is collapsible on mobile using Accordion
- Cards stack vertically on small screens

**Order Lines Section:**
- Detect mobile using `useIsMobile()` hook
- Show table view on desktop (existing behavior)
- Show card list view on mobile (new behavior)
- Floating "Add Product" button on mobile

**Tabs:**
- Make tabs scrollable horizontally on mobile
- Keep same functionality

### Step 4: Add Mobile-Specific Styles

Use Tailwind responsive classes:
- `hidden md:block` - Hide on mobile, show on desktop
- `block md:hidden` - Show on mobile, hide on desktop
- `grid-cols-1 md:grid-cols-3` - Responsive grid

---

## Visual Comparison

```text
DESKTOP (current):                    MOBILE (new):
+----------------------------------+  +------------------+
| [Info] [Timeline] [Financial]   |  | v Basic Info     |
+----------------------------------+  |   Project: ppr t |
| Order Lines Table               |  |   Client: Hammed |
| [Img][Name][Desc][Qty][Price]...|  +------------------+
|  ...                            |  | v Timeline       |
+----------------------------------+  | v Financial      |
                                      +------------------+
                                      | Order Lines      |
                                      +------------------+
                                      | +-------------+  |
                                      | | [img] Prod  |  |
                                      | | Qty:5 $10   |  |
                                      | | Total: $50  |  |
                                      | +-------------+  |
                                      | +-------------+  |
                                      | | [img] Prod2 |  |
                                      | | ...         |  |
                                      | +-------------+  |
                                      +------------------+
                                      |     (+) Add      |
                                      +------------------+
```

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/components/MobileOrderLineCard.tsx` | Create | Card component for mobile order lines |
| `src/components/MobileOrderLineEditSheet.tsx` | Create | Bottom sheet for editing order line on mobile |
| `src/pages/MasterOrder.tsx` | Modify | Add responsive layout and mobile view switching |
| `src/components/OrderLineRow.tsx` | Keep | No changes (used for desktop table view) |

---

## Technical Details

### Mobile Detection
```typescript
import { useIsMobile } from "@/hooks/use-mobile";
const isMobile = useIsMobile();
```

### Responsive Grid Example
```typescript
<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
```

### Collapsible Sections
```typescript
<Accordion type="single" collapsible>
  <AccordionItem value="basic-info">
    <AccordionTrigger>Basic Info</AccordionTrigger>
    <AccordionContent>
      {/* form fields */}
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Floating Add Button
```typescript
{isMobile && (
  <Button 
    className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
    onClick={handleAddLine}
  >
    <Plus className="h-6 w-6" />
  </Button>
)}
```

---

## Benefits

1. **Easy Product Entry** - Large touch targets and full-width inputs
2. **All Columns Visible** - Custom columns shown in expandable card sections
3. **No Horizontal Scrolling** - Everything fits on screen
4. **Fast Navigation** - Collapsible sections reduce scrolling
5. **Maintains Desktop Experience** - Table view preserved for larger screens

