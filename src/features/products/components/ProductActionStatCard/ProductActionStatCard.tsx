import { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import { Button } from "../../../../components/Form/Button";
import { TextInput } from "../../../../components/Form/TextInput";
import { useLazyGetProductStockByProductIdAndWarehouseIdQuery } from "../../../productStocks/api/productStockApi";
import toast from "react-hot-toast";
import { useUpdateProductStock } from "../../../productStocks/hooks/useUpdateProductStock";

export function ProductActionStatCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [productId, setProductId] = useState<number>(0);
  const [warehouseId, setWarehouseId] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [getProductStock, productStockByProductIdAndWarehouseIdQuery] =
    useLazyGetProductStockByProductIdAndWarehouseIdQuery();

  const response = productStockByProductIdAndWarehouseIdQuery.data;

  const [quantityValue, setQuantityValue] = useState<number>(0);

  useEffect(() => {
    if (response?.quantity != null) {
      setQuantityValue(response.quantity);
    }
  }, [response]);

  const { updateProductStock, isLoading: isLoadingStock } =
    useUpdateProductStock();

  const handleSubmit = async () => {
    if (!productId || !warehouseId) {
      toast.error("Lütfen ürün ve depo numarasını giriniz.");
      return;
    }
    await getProductStock({ productId, warehouseId });
    setOpen(true);
  };

  const handleSave = async () => {
    await updateProductStock({
      id: response?.id || 0,
      quantity: quantityValue,
    });
  };

  return (
    <div className="flex flex-col relative justify-between rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all duration-300">
      <p className="text-transparent bg-clip-text bg-gradient-to-t from-green-400 to-emerald-700 text-base md:text-lg mb-3">
        Ürün Stok Durumu
      </p>

      <div className="flex flex-col">
        <div className="flex gap-3 w-full">
          <div className="flex-1">
            <TextInput
              label="Ürün Numarası"
              value={productId}
              onChange={(val) => setProductId(parseInt(val))}
              placeholder="Ürün Numarası giriniz..."
              inputClassName="h-10 p-3 shadow-sm w-full"
            />
          </div>

          <div className="flex-1">
            <TextInput
              label="Depo Numarası"
              value={warehouseId}
              onChange={(val) => setWarehouseId(parseInt(val))}
              placeholder="Depo Numarası giriniz..."
              inputClassName="h-10 p-3 shadow-sm w-full"
            />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          variant="secondary"
          className="mt-2 text-xs md:text-sm rounded-xl bg-gradient-to-t from-green-400 to-emerald-700 w-full hover:shadow-md transition-all duration-300"
        >
          Görüntüle
        </Button>
      </div>

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setIsEditing(false);
          productStockByProductIdAndWarehouseIdQuery.reset();
          setQuantityValue(0);
        }}
        center
      >
        <div className="flex flex-col gap-3 p-5 min-w-[350px]">
          <h2 className="font-semibold text-lg text-gray-800">
            Ürün Stok Bilgisi
          </h2>

          {response ? (
            <div className="flex flex-col divide-gray-200">
              <div className="mt-2 text-base text-gray-600 bg-gray-50 p-3 rounded-lg flex flex-col gap-2">
                <p>
                  <strong>Ürün ID:</strong> {response.productId}
                </p>
                <p>
                  <strong>Ürün Adı:</strong> {response.productName}
                </p>
                <p>
                  <strong>Depo ID:</strong> {response.warehouseId}
                </p>
                <p>
                  <strong>Depo Adı:</strong> {response.warehouseName}
                </p>
                {isEditing ? (
                  <TextInput
                    label="Miktar"
                    value={quantityValue}
                    inputClassName="p-1"
                    onChange={(v) => setQuantityValue(Number(v))}
                  />
                ) : (
                  <p>
                    <strong>Miktar:</strong> {response.quantity}
                  </p>
                )}
                <p>
                  <strong>Oluşturulma:</strong>{" "}
                  {new Date(response.createdDate).toLocaleString()}
                </p>
                <Button
                  className="mt-2"
                  variant={isEditing ? "primary" : "secondary"}
                  onClick={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                  }
                  disabled={isLoadingStock}
                >
                  {isLoadingStock
                    ? "Güncelleniyor..."
                    : isEditing
                    ? "Güncelle"
                    : "Düzenle"}
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm mt-3">
              Gösterilecek veri bulunamadı.
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
}
