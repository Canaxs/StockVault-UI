import { useState } from "react";
import { Button } from "../../../../components/Form/Button";
import type { GetListShipmentListItemDto } from "../../types/GetListShipmentListItemDto";
import { useUpdateShipment } from "../../hooks/useUpdateShipment";
import toast from "react-hot-toast";

interface ShipmentDetailModalProps {
  item: GetListShipmentListItemDto;
}

export const ShipmentDetailModal: React.FC<ShipmentDetailModalProps> = ({
  item,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({
    deliveryStatus: item.deliveryStatus || 0,
  });
  const { updateShipment, isLoading } = useUpdateShipment();

  const handleChange = (key: string, value: string | number) => {
    setEditedItem((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (editedItem.deliveryStatus == 0) {
      toast.error("Lütfen Sipariş Durumu Seçiniz");
      return;
    }
    await updateShipment({
      id: item.id,
      deliveryStatus: editedItem.deliveryStatus,
    });
    console.log("Güncellendi:", editedItem);
    setIsEditing(false);
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return "Gönderiliyor";
      case 1:
        return "Tamamlandı";
      case 2:
        return "İptal Edildi";
      default:
        return "Bilinmiyor";
    }
  };

  const handleEditClick = () => {
    if (item.deliveryStatus !== 0) {
      toast.error("Tamamlanan veya iptal edilen sevkiyat güncellenemez!");
      return;
    }
    setIsEditing(true);
  };

  return (
    <div className="flex flex-col gap-3 p-5 min-w-[300px]">
      <h2 className="font-medium text-lg">Ürün Detayı</h2>

      {isEditing ? (
        <>
          <p>
            <strong>Ürün Adı:</strong> {item.productName}
          </p>
          <p>
            <strong>Depo Adı:</strong> {item.warehouseName}
          </p>
          <p>
            <strong>Miktar:</strong> {item.quantity}
          </p>
          <label className="text-sm font-medium text-gray-700">
            Sipariş Durumu
          </label>
          <select
            className="border border-gray-300 rounded p-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={editedItem.deliveryStatus}
            onChange={(e) =>
              handleChange("deliveryStatus", Number(e.target.value))
            }
          >
            <option value={0}>Seçiniz...</option>
            <option value={1}>Tamamlandı</option>
            <option value={2}>İptal Edildi</option>
          </select>
        </>
      ) : (
        <>
          <p>
            <strong>Ürün Adı:</strong> {item.productName}
          </p>
          <p>
            <strong>Depo Adı:</strong> {item.warehouseName}
          </p>
          <p>
            <strong>Miktar:</strong> {item.quantity}
          </p>
          <p>
            <strong>Sipariş Durumu:</strong>{" "}
            {getStatusText(Number(item.deliveryStatus))}
          </p>
        </>
      )}

      <Button
        variant={isEditing ? "primary" : "secondary"}
        onClick={() => (isEditing ? handleSave() : handleEditClick())}
        disabled={isLoading}
      >
        {isLoading ? "Güncelleniyor..." : isEditing ? "Güncelle" : "Düzenle"}
      </Button>
    </div>
  );
};
