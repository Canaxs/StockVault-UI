import { useState } from "react";
import { TextInput } from "../../../../components/Form/TextInput";
import { Button } from "../../../../components/Form/Button";
import type { GetListProductListItemDto } from "../../types/GetListProductListItemDto";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";

interface ProductDetailModalProps {
  item: GetListProductListItemDto;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({
    name: item.name || "",
    description: item.description || "",
    price: item.price || 0,
  });
  const { updateProduct, isLoading } = useUpdateProduct();

  const { deleteProduct, isLoading: isLoadingDelete } = useDeleteProduct();

  const handleChange = (key: string, value: string | number) => {
    setEditedItem((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    await updateProduct({
      id: item.id,
      name: editedItem.name,
      description: editedItem.description,
      price: editedItem.price,
    });
    console.log("Güncellendi:", editedItem);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteProduct({
      id: item.id,
    });
    console.log("Silindi: ", editedItem);
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-3 p-5 min-w-[300px]">
      <h2 className="font-medium text-lg">Ürün Detayı</h2>

      {isEditing ? (
        <>
          <TextInput
            label="İsim"
            value={editedItem.name}
            inputClassName="p-1"
            onChange={(v) => handleChange("name", v)}
          />
          <TextInput
            label="Açıklama"
            value={editedItem.description}
            inputClassName="p-1"
            onChange={(v) => handleChange("description", v)}
          />
          <TextInput
            label="Fiyat"
            value={editedItem.price}
            inputClassName="p-1"
            onChange={(v) => handleChange("price", Number(v))}
          />
        </>
      ) : (
        <>
          <p>
            <strong>İsim:</strong> {item.name}
          </p>
          <p>
            <strong>Açıklama:</strong> {item.description}
          </p>
          <p>
            <strong>Fiyat:</strong> {item.price}
          </p>
        </>
      )}

      <Button
        variant={isEditing ? "primary" : "secondary"}
        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        disabled={isLoading}
      >
        {isLoading ? "Güncelleniyor..." : isEditing ? "Güncelle" : "Düzenle"}
      </Button>

      {!isEditing && (
        <Button variant="danger" onClick={handleDelete}>
          {isLoadingDelete ? "Siliniyor..." : "Sil"}
        </Button>
      )}
    </div>
  );
};
