import { useState } from "react";
import { TextInput } from "../../../../components/Form/TextInput";
import { Button } from "../../../../components/Form/Button";
import type { GetListWarehouseListItemDto } from "../../types/GetListWarehouseListItemDto";
import { useUpdateWarehouse } from "../../hooks/useUpdateWarehouse";

interface WarehouseDetailModalProps {
  item: GetListWarehouseListItemDto;
}

export const WarehouseDetailModal: React.FC<WarehouseDetailModalProps> = ({
  item,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({
    name: item.name,
    location: item.location,
    maxCapacity: item.maxCapacity,
  });
  const { updateWarehouse, isLoading } = useUpdateWarehouse();

  const handleChange = (key: string, value: string | number) => {
    setEditedItem((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    await updateWarehouse({
      id: item.id,
      name: editedItem.name,
      location: editedItem.location,
      maxCapacity: editedItem.maxCapacity,
    });
    console.log("Güncellendi:", editedItem);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-3 p-5 min-w-[300px]">
      <h2 className="font-medium text-lg">Depo Detayı</h2>

      {isEditing ? (
        <>
          <TextInput
            label="Ad"
            value={editedItem.name}
            inputClassName="p-1"
            onChange={(v) => handleChange("name", v)}
          />
          <TextInput
            label="Lokasyon"
            value={editedItem.location}
            inputClassName="p-1"
            onChange={(v) => handleChange("location", v)}
          />
          <TextInput
            label="Kapasite"
            value={editedItem.maxCapacity}
            inputClassName="p-1"
            onChange={(v) => handleChange("maxCapacity", Number(v))}
          />
        </>
      ) : (
        <>
          <p>
            <strong>Ad:</strong> {item.name}
          </p>
          <p>
            <strong>Lokasyon:</strong> {item.location}
          </p>
          <p>
            <strong>Kapasite:</strong> {item.maxCapacity}
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
    </div>
  );
};
