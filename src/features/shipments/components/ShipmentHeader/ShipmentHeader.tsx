import Modal from "react-responsive-modal";
import { TextInput } from "../../../../components/Form/TextInput";
import { useState } from "react";
import { Button } from "../../../../components/Form/Button";
import { useCreateShipment } from "../../hooks/useCreateShipment";

export function ShipmentHeader() {
  const [productId, setProductId] = useState<number>(0);
  const [warehouseId, setWarehouseId] = useState<number>(0);
  const [customerId, setCustomerId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");

  const [open, setOpen] = useState(false);
  const { createShipment, isLoading } = useCreateShipment();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createShipment({
      productId: productId,
      warehouseId: warehouseId,
      customerId: customerId,
      quantity: quantity,
      notes: notes,
    });
  };

  return (
    <div className="flex justify-between">
      <div className="space-y-4 mb-7">
        <h1 className=" text-2xl lg:text-3xl xl:text-4xl text-gray-800 font-medium">
          Sevkiyatlar
        </h1>
        <p className="text-gray-500 text-xs lg:text-sm xl:text-base">
          Tüm operasyonlarınız tek bakışta! Hızlı istatistikler, son işlemler ve
          kritik uyarılar ile işinizi en verimli şekilde yönetin.
        </p>
      </div>
      <div className="flex">
        <div
          onClick={onOpenModal}
          className="rounded-4xl lg:px-3 xl:px-4 px-2 h-10 lg:h-12 xl:h-14 bg-gradient-to-t from-green-500 to-emerald-600 text-white flex items-center justify-center gap-1 lg:gap-2 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <span className="text-xl lg:text-2xl xl:text-3xl">+</span>
          <span className="font-medium text-xs lg:text-sm xl:text-base">
            Yeni
          </span>
        </div>
        <Modal open={open} onClose={onCloseModal} center>
          <div className="flex flex-col gap-5 p-5">
            <h2 className="font-medium">Sipariş Oluştur</h2>
            <div className="flex gap-4 flex-col">
              <TextInput
                label="Ürün Numarası"
                value={productId}
                inputClassName="h-10 p-3 shadow-md"
                onChange={(val) => setProductId(parseInt(val))}
                placeholder="Ürün Numarası"
              />
              <TextInput
                label="Depo Numarası"
                value={warehouseId}
                inputClassName="h-10 p-3 shadow-md"
                onChange={(val) => setWarehouseId(parseInt(val))}
                placeholder="Depo Numarası"
              />
              <TextInput
                label="Müşteri Numarası"
                value={customerId}
                inputClassName="h-10 p-3 shadow-md"
                onChange={(val) => setCustomerId(parseFloat(val))}
                placeholder="Müşteri Numarası"
              />
              <TextInput
                label="Ürün Miktarı"
                value={quantity}
                inputClassName="h-10 p-3 shadow-md"
                onChange={(val) => setQuantity(parseFloat(val))}
                placeholder="Miktar"
              />
              <TextInput
                label="Sipariş Notu"
                value={notes}
                inputClassName="h-10 p-3 shadow-md"
                onChange={(val) => setNotes(val)}
                placeholder="Sipariş Notu"
              />
              <Button
                onClick={handleSubmit}
                variant="secondary"
                disabled={isLoading}
              >
                {isLoading ? "Oluşturuluyor..." : "Ekle"}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
