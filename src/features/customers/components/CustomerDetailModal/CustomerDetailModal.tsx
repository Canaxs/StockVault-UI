import { useState } from "react";
import { TextInput } from "../../../../components/Form/TextInput";
import { Button } from "../../../../components/Form/Button";
import type { GetListCustomerListItemDto } from "../../types/GetListCustomerListItemDto";
import { useUpdateCustomer } from "../../hooks/useUpdateCustomer";

interface CustomerDetailModalProps {
  item: GetListCustomerListItemDto;
}

export const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  item,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({
    name: item.name,
    companyName: item.companyName,
    address: item.address,
    city: item.city,
    phoneNumber: item.phoneNumber,
  });
  const { updateCustomer, isLoading } = useUpdateCustomer();

  const handleChange = (key: string, value: string | number) => {
    setEditedItem((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    await updateCustomer({
      id: item.id,
      name: editedItem.name,
      companyName: editedItem.companyName,
      address: editedItem.address,
      city: editedItem.city,
      phoneNumber: editedItem.phoneNumber,
    });
    console.log("Güncellendi:", editedItem);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-3 p-5 min-w-[300px]">
      <h2 className="font-medium text-lg">Müşteri Detayı</h2>

      {isEditing ? (
        <>
          <TextInput
            label="İsim"
            value={editedItem.name}
            inputClassName="p-1"
            onChange={(v) => handleChange("name", v)}
          />
          <TextInput
            label="Çalıştığı Şirket"
            value={editedItem.companyName}
            inputClassName="p-1"
            onChange={(v) => handleChange("companyName", v)}
          />
          <TextInput
            label="Adresi"
            value={editedItem.address}
            inputClassName="p-1"
            onChange={(v) => handleChange("address", v)}
          />
          <TextInput
            label="Yaşadığı Şehir"
            value={editedItem.city}
            inputClassName="p-1"
            onChange={(v) => handleChange("city", v)}
          />
          <TextInput
            label="Telefon Numarası"
            value={editedItem.phoneNumber}
            inputClassName="p-1"
            onChange={(v) => handleChange("phoneNumber", v)}
          />
        </>
      ) : (
        <>
          <p>
            <strong>Ad:</strong> {item.name}
          </p>
          <p>
            <strong>Çalıştığı Şirket:</strong> {item.companyName}
          </p>
          <p>
            <strong>Adresi:</strong> {item.address}
          </p>
          <p>
            <strong>Yaşadığı Şehir:</strong> {item.city}
          </p>
          <p>
            <strong>Telefon Numarası:</strong> {item.phoneNumber}
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
