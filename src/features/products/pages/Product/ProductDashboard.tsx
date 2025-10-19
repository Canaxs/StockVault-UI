import { useState } from "react";
import { PaginateTable } from "../../../../components/PaginateTable/PaginateTable";
import { LayoutDashboard } from "../../../../layouts/LayoutDashboard/LayoutDashboard";
import {
  useGetListCustomerByProductIdQuery,
  useGetListProductQuery,
  useGetListShipmentByProductIdQuery,
  useGetListWarehouseByProductIdQuery,
} from "../../api/productApi";
import { ProductHeader } from "../../components/ProductHeader/ProductHeader";
import { Button } from "../../../../components/Form/Button";
import { ActionStatCard } from "../../../../components/ActionStatCard/ActionStatCard";
import type { GetListWarehouseByProductIdListItemDto } from "../../types/GetListWarehouseByProductIdListItemDto";
import type { GetListShipmentByProductIdListItemDto } from "../../types/GetListShipmentByProductIdListItemDto";
import type { GetListCustomerByProductIdListItemDto } from "../../types/GetListCustomerByProductIdListItemDto";

const productColumns = [
  { key: "id", label: "Id" },
  { key: "name", label: "İsim" },
  { key: "description", label: "Açıklama" },
  { key: "price", label: "Fiyat" },
];

const warehouseByProductIdColumns: {
  key: keyof GetListWarehouseByProductIdListItemDto;
  label: string;
}[] = [
  { key: "warehouseName", label: "Depo Adı" },
  { key: "warehouseLocation", label: "Adresi" },
  { key: "quantity", label: "Miktar" },
];

const shipmentByProductIdColumns: {
  key: keyof GetListShipmentByProductIdListItemDto;
  label: string;
}[] = [
  { key: "id", label: "Id" },
  { key: "productId", label: "Ürün Id" },
  { key: "productName", label: "Ürün Adı" },
  { key: "warehouseId", label: "Depo Id" },
  { key: "warehouseName", label: "Depo Adı" },
  { key: "customerName", label: "Müşteri İsmi" },
  { key: "quantity", label: "Miktar" },
  { key: "deliveryStatus", label: "Sipariş Durumu" },
  { key: "createdDate", label: "Oluşturulma Tarihi" },
];

const customerByProductIdColumns: {
  key: keyof GetListCustomerByProductIdListItemDto;
  label: string;
}[] = [
  { key: "id", label: "Id" },
  { key: "productId", label: "Ürün Id" },
  { key: "productName", label: "Ürün Adı" },
  { key: "customerId", label: "Müşteri Id" },
  { key: "customerName", label: "Müşteri Adı" },
  { key: "customerPhoneNumber", label: "Müşteri Telefon" },
  { key: "totalQuantity", label: "Toplam Miktar" },
];

export function ProductDashboard() {
  const [productId, setProductId] = useState<number>(0);
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const productQuery = useGetListProductQuery({
    PageIndex: page,
    PageSize: pageSize,
  });

  const response = productQuery.data;

  const warehouseByProductIdQuery = useGetListWarehouseByProductIdQuery({
    Id: productId,
    PageIndex: 0,
    PageSize: 20,
  });

  const shipmentByProductIdQuery = useGetListShipmentByProductIdQuery({
    Id: productId,
    PageIndex: 0,
    PageSize: 20,
  });

  const customerByProductIdQuery = useGetListCustomerByProductIdQuery({
    Id: productId,
    PageIndex: 0,
    PageSize: 20,
  });

  const content = (
    <div className="flex flex-col p-7">
      <ProductHeader />
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-5 xl:col-span-3">
          <PaginateTable
            title="Ürünler"
            columns={productColumns}
            data={response?.items || []}
            totalCount={response?.count || 0}
            hasNext={response?.hasNext || false}
            hasPrevious={response?.hasPrevious || false}
            onNext={() => {
              if (response?.hasNext) setPage((prev) => prev + 1);
            }}
            onPrevious={() => {
              if (response?.hasPrevious) setPage((prev) => prev - 1);
            }}
            renderModalContent={(item) => (
              <div className="flex flex-col gap-3 p-5 min-w-[300px]">
                <h2 className="font-medium text-lg">Ürün Detayı</h2>
                <p>
                  <strong>Adı:</strong> {item.name}
                </p>
                <p>
                  <strong>Açıklama:</strong> {item.description}
                </p>
                <p>
                  <strong>Fiyat:</strong> {item.price} ₺
                </p>
                <Button
                  variant="secondary"
                  onClick={() => console.log(item.id)}
                >
                  Düzenle
                </Button>
              </div>
            )}
          />
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2 xl:col-span-1 flex flex-col gap-3">
          <ActionStatCard
            title="Stok Durumu"
            gradient="from-green-600 to-emerald-800"
            inputLabel="Ürün Id"
            placeholder="Ürün Id giriniz..."
            columns={warehouseByProductIdColumns}
            buttonLabel="Görüntüle"
            items={warehouseByProductIdQuery.data?.items}
            onSubmit={(value) => setProductId(parseInt(value))}
          />
          <ActionStatCard
            title="Müşteri Durumu"
            gradient="from-gray-500 to-gray-900"
            inputLabel="Ürün Id"
            placeholder="Ürün Id giriniz..."
            columns={customerByProductIdColumns}
            buttonLabel="Görüntüle"
            items={customerByProductIdQuery.data?.items}
            onSubmit={(value) => setProductId(parseInt(value))}
          />
        </div>
        <div className="col-span-5 md:col-span-4  lg:col-span-2 xl:col-span-1">
          <ActionStatCard
            title="Sipariş Durumu"
            gradient="from-orange-400 to-red-800"
            inputLabel="Ürün Id"
            placeholder="Ürün Id giriniz..."
            columns={shipmentByProductIdColumns}
            buttonLabel="Görüntüle"
            items={shipmentByProductIdQuery.data?.items}
            onSubmit={(value) => setProductId(parseInt(value))}
          />
        </div>
      </div>
    </div>
  );

  return <LayoutDashboard children={content} />;
}
