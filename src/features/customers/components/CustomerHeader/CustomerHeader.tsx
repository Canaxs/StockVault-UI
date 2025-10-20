import Modal from "react-responsive-modal";
import { TextInput } from "../../../../components/Form/TextInput";
import { useState } from "react";
import { Button } from "../../../../components/Form/Button";
import { useCreateCustomer } from "../../hooks/useCreateCustomer";

export function CustomerHeader() {
  const [name, setName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [open, setOpen] = useState(false);
  const { createCustomer, isLoading } = useCreateCustomer();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCustomer({
      name: name,
      companyName: companyName,
      address: address,
      city: city,
      phoneNumber: phoneNumber,
    });
  };

  return (
    <div className="flex justify-between">
      <div className="space-y-4 mb-7">
        <h1 className=" text-2xl lg:text-3xl xl:text-4xl text-gray-800 font-medium">
          Müşteriler
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
            <h2 className="font-medium">Müşteri Oluştur</h2>
            <div className="flex gap-4 flex-col">
              <TextInput
                label="Müşteri Adı"
                value={name}
                inputClassName="h-10 p-3 shadow-md"
                onChange={(val) => setName(val)}
                placeholder="Müşteri Adı"
              />
              <TextInput
                label="Çalıştığı Firma"
                value={companyName}
                inputClassName="h-10 p-3 shadow-md"
                onChange={(val) => setCompanyName(val)}
                placeholder="Çalıştığı Firma"
              />
              <TextInput
                label="Müşteri Adresi"
                value={address}
                inputClassName="h-10 p-3 shadow-md"
                onChange={(val) => setAddress(val)}
                placeholder="Adresi"
              />
              <TextInput
                label="Yaşadığı Şehir"
                value={city}
                inputClassName="h-10 p-3 shadow-md"
                onChange={(val) => setCity(val)}
                placeholder="Yaşadığı Şehir"
              />
              <TextInput
                label="Telefon Numarası"
                value={phoneNumber}
                inputClassName="h-10 p-3 shadow-md"
                onChange={(val) => setPhoneNumber(val)}
                placeholder="Telefon Numarası"
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
