import Modal from "react-responsive-modal";
import { TextInput } from "../../../../components/Form/TextInput";
import { useState } from "react";
import { Button } from "../../../../components/Form/Button";
import { useCreateProduct } from "../../hooks/useCreateProduct";

export function ProductHeader() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const { createProduct, isLoading } = useCreateProduct();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProduct({
      name: name,
      description: description,
      price: price,
    });
  };

  return (
    <div className="flex justify-between">
      <div className="space-y-4 mb-7">
        <h1 className=" text-2xl lg:text-3xl xl:text-4xl text-gray-800 font-medium">
          Ürünler
        </h1>
        <p className="text-gray-500 text-xs lg:text-sm xl:text-base">
          Tüm operasyonlarınız tek bakışta! Hızlı istatistikler, son işlemler ve
          kritik uyarılar ile işinizi en verimli şekilde yönetin.
        </p>
      </div>
      <div className="flex">
        <div
          onClick={onOpenModal}
          className="rounded-4xl lg:px-3 xl:px-4 px-2 h-10 lg:h-12 xl:h-14 bg-gradient-to-t from-green-500 to-emerald-600 text-white flex items-center justify-center gap-1 lg:gap-2 xl:gap-3 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <span className="text-xl lg:text-2xl xl:text-3xl">+</span>
          <span className="font-medium text-xs lg:text-sm xl:text-base">
            Yeni
          </span>
        </div>
        <Modal open={open} onClose={onCloseModal} center>
          <div className="flex flex-col gap-5 p-5">
            <h2 className="font-medium">Ürün Oluştur</h2>
            <div className="flex gap-4 flex-col">
              <TextInput
                label="Adı"
                value={name}
                inputClassName="h-10 p-3 shadow-md"
                onChange={(val) => setName(val)}
                placeholder="Ürün Adı"
              />
              <TextInput
                label="Açıklama"
                value={description}
                inputClassName="h-10 p-3 shadow-md"
                onChange={(val) => setDescription(val)}
                placeholder="Ürün Açıklaması"
              />
              <TextInput
                label="Fiyat"
                value={price}
                inputClassName="h-10 p-3 shadow-md"
                onChange={(val) => setPrice(parseFloat(val) || 0)}
                placeholder="Ürün Fiyatı"
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
