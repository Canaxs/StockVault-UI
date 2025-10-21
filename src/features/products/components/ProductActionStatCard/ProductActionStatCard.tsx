import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Modal from "react-responsive-modal";
import { Button } from "../../../../components/Form/Button";
import { TextInput } from "../../../../components/Form/TextInput";
import { useLazyGetProductStockByProductIdAndWarehouseIdQuery } from "../../../productStocks/api/productStockApi";
import toast from "react-hot-toast";

export function ProductActionStatCard() {
  const [productId, setProductId] = useState<number>(0);
  const [warehouseId, setWarehouseId] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [getProductStock, productStockByProductIdAndWarehouseIdQuery] =
    useLazyGetProductStockByProductIdAndWarehouseIdQuery();

  const response = productStockByProductIdAndWarehouseIdQuery.data;

  const handleSubmit = async () => {
    if (!productId || !warehouseId) {
      toast.error("Lütfen ürün ve depo numarasını giriniz.");
      return;
    }
    await getProductStock({ productId, warehouseId });
    setOpen(true);
  };

  return (
    <div className="flex flex-col relative justify-between rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all duration-300">
      <p className="text-transparent bg-clip-text bg-gradient-to-t from-green-400 to-emerald-700 text-base md:text-lg mb-3">
        Ürün Stok Durumu
      </p>

      <div className="flex flex-col gap-3">
        <TextInput
          label="Ürün Numarası"
          value={productId}
          onChange={(val) => setProductId(parseInt(val))}
          placeholder="Ürün Numarası giriniz..."
          inputClassName="h-10 p-3 shadow-sm"
        />

        <TextInput
          label="Depo Numarası"
          value={warehouseId}
          onChange={(val) => setWarehouseId(parseInt(val))}
          placeholder="Depo Numarası giriniz..."
          inputClassName="h-10 p-3 shadow-sm"
        />

        <Button
          onClick={handleSubmit}
          variant="secondary"
          className="mt-2 text-xs md:text-sm rounded-xl bg-gradient-to-t from-green-400 to-emerald-700 w-full hover:shadow-md transition-all duration-300"
        >
          Görüntüle
        </Button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} center>
        <div className="flex flex-col gap-3 p-5 min-w-[350px]">
          <h2 className="font-semibold text-lg text-gray-800">
            Ürün Stok Bilgisi
          </h2>

          {response && (
            <div className="flex flex-col divide-y divide-gray-200">
              <button
                className="flex justify-between items-center w-full text-left font-medium text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={() => setExpanded(!expanded)}
              >
                <span>{response.productName}</span>
                {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {expanded && (
                <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
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
                  <p>
                    <strong>Miktar:</strong> {response.quantity}
                  </p>
                  <p>
                    <strong>Oluşturulma:</strong>{" "}
                    {new Date(response.createdDate).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
