import Modal from "react-responsive-modal";
import { TextInput } from "../../../../components/Form/TextInput";
import { useState } from "react";
import { Button } from "../../../../components/Form/Button";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { useCreateProductStock } from "../../../productStocks/hooks/useCreateProductStock";

export function ProductHeader() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [openStock, setOpenStock] = useState(false);
  const { createProduct, isLoading } = useCreateProduct();

  const { createProductStock, isLoading: isLoadingStock } =
    useCreateProductStock();

  const [productId, setProductId] = useState<number>(0);
  const [warehouseId, setWarehouseId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const onOpenStockModal = () => setOpenStock(true);
  const onCloseStockModal = () => setOpenStock(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProduct({
      name: name,
      description: description,
      price: price,
    });
  };

  const handleSubmitStock = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProductStock({
      productId: productId,
      warehouseId: warehouseId,
      quantity: quantity,
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
      <div className="flex gap-2">
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
            <h2 className="font-medium">Ürün Oluştur</h2>
            <div className="flex gap-4 flex-col">
              <TextInput
                label="Ad"
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
        <div
          onClick={onOpenStockModal}
          className="rounded-4xl lg:px-3 xl:px-4 px-2 h-10 lg:h-12 xl:h-14 bg-gradient-to-t from-orange-600 to-red-700 text-white flex items-center justify-center gap-1 lg:gap-2 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <span className="text-xl lg:text-2xl xl:text-3xl">+</span>
          <span className="font-medium text-xs lg:text-sm xl:text-base">
            Depoya Ekle
          </span>
        </div>
        <Modal open={openStock} onClose={onCloseStockModal} center>
          <div className="flex flex-col gap-5 p-5">
            <h2 className="font-medium">Stok Oluştur</h2>
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
                label="Ürün Miktarı"
                value={quantity}
                inputClassName="h-10 p-3 shadow-md"
                onChange={(val) => setQuantity(parseInt(val))}
                placeholder="Ürün Miktarı"
              />
              <Button
                onClick={handleSubmitStock}
                variant="secondary"
                disabled={isLoadingStock}
              >
                {isLoading ? "Oluşturuluyor..." : "Oluştur"}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
