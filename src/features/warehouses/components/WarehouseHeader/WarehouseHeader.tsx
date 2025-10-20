import Modal from "react-responsive-modal";
import { TextInput } from "../../../../components/Form/TextInput";
import { useState } from "react";
import { Button } from "../../../../components/Form/Button";
import { useCreateWarehouse } from "../../hooks/useCreateWarehouse";

export function WarehouseHeader() {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [maxCapacity, setMaxCapacity] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const { createWarehouse, isLoading } = useCreateWarehouse();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createWarehouse({
      name: name,
      location: location,
      maxCapacity: maxCapacity,
    });
  };

  return (
    <div className="flex justify-between">
      <div className="space-y-4 mb-7">
        <h1 className=" text-2xl lg:text-3xl xl:text-4xl text-gray-800 font-medium">
          Depolar
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
            <h2 className="font-medium">Depo Oluştur</h2>
            <div className="flex gap-4 flex-col">
              <TextInput
                label="Ad"
                value={name}
                inputClassName="h-10 p-3 shadow-md"
                onChange={(val) => setName(val)}
                placeholder="Depo Adı"
              />
              <TextInput
                label="Adres"
                value={location}
                inputClassName="h-10 p-3 shadow-md"
                onChange={(val) => setLocation(val)}
                placeholder="Depo Adresi"
              />
              <TextInput
                label="Maksimum Kapasite"
                value={maxCapacity}
                inputClassName="h-10 p-3 shadow-md"
                onChange={(val) => setMaxCapacity(parseFloat(val) || 0)}
                placeholder="Depo Kapasitesi"
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
