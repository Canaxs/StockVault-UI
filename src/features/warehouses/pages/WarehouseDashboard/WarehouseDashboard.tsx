import { useState } from "react";
import { PaginateTable } from "../../../../components/PaginateTable/PaginateTable";
import { LayoutDashboard } from "../../../../layouts/LayoutDashboard/LayoutDashboard";
import {
  useGetListProductByWarehouseIdQuery,
  useGetListShipmentByWarehouseIdQuery,
  useGetListWarehouseQuery,
} from "../../api/warehouseApi";
import { WarehouseHeader } from "../../components/WarehouseHeader/WarehouseHeader";
import { ActionStatCard } from "../../../../components/ActionStatCard/ActionStatCard";
import type { GetListProductByWarehouseIdListItemDto } from "../../types/GetListProductByWarehouseIdListItemDto";
import type { GetListShipmentByWarehouseIdListItemDto } from "../../types/GetListShipmentByWarehouseIdListItemDto";
import { WarehouseDetailModal } from "../../components/WarehouseDetailModal/WarehouseDetailModal";

const warehouseColumns = [
  { key: "id", label: "Id" },
  { key: "name", label: "Ad" },
  { key: "location", label: "Lokasyon" },
  { key: "maxCapacity", label: "Kapasite" },
  { key: "currentCapacity", label: "Doluluk" },
];

const productByWarehouseIdColumns: {
  key: keyof GetListProductByWarehouseIdListItemDto;
  label: string;
}[] = [
  { key: "productId", label: "Id" },
  { key: "productName", label: "Adı" },
  { key: "productDescription", label: "Açıklaması" },
  { key: "productPrice", label: "Fiyatı" },
  { key: "quantity", label: "Miktarı" },
];

const shipmentByWarehouseIdColumns: {
  key: keyof GetListShipmentByWarehouseIdListItemDto;
  label: string;
}[] = [
  { key: "id", label: "Id" },
  { key: "productId", label: "Ürün Id" },
  { key: "productName", label: "Ürün Adı" },
  { key: "warehouseId", label: "Depo Id" },
  { key: "warehouseName", label: "Depo Adı" },
  { key: "customerName", label: "Müşteri Adı" },
  { key: "quantity", label: "Miktarı" },
  { key: "deliveryStatus", label: "Sipariş Durumu" },
  { key: "createdDate", label: "Oluşturulma Tarihi" },
];

export function WarehouseDashboard() {
  const [productWarehouseId, setProductWarehouseId] = useState<number>(0);
  const [shipmentWarehouseId, setShipmentWarehouseId] = useState<number>(0);
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const warehouseQuery = useGetListWarehouseQuery({
    PageIndex: page,
    PageSize: pageSize,
  });

  const response = warehouseQuery.data;

  const productByWarehouseIdQuery = useGetListProductByWarehouseIdQuery({
    Id: productWarehouseId,
    PageIndex: 0,
    PageSize: 20,
  });

  const shipmentByWarehouseIdQuery = useGetListShipmentByWarehouseIdQuery({
    Id: shipmentWarehouseId,
    PageIndex: 0,
    PageSize: 20,
  });

  const content = (
    <div className="flex flex-col p-7">
      <WarehouseHeader />
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-5 xl:col-span-3">
          <PaginateTable
            title="Depolar"
            columns={warehouseColumns}
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
            renderModalContent={(item) => <WarehouseDetailModal item={item} />}
          />
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2 xl:col-span-1 flex flex-col gap-3">
          <ActionStatCard
            title="Stok Durumu"
            gradient="from-green-600 to-emerald-800"
            inputLabel="Depo Numarası"
            placeholder="Depo Numarası giriniz..."
            columns={productByWarehouseIdColumns}
            buttonLabel="Görüntüle"
            items={productByWarehouseIdQuery.data?.items}
            onSubmit={(value) => setProductWarehouseId(parseInt(value))}
          />
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2 xl:col-span-1 flex flex-col">
          <ActionStatCard
            title="Sipariş Durumu"
            gradient="from-orange-400 to-red-800"
            inputLabel="Depo Numarası"
            placeholder="Depo Numarası giriniz..."
            columns={shipmentByWarehouseIdColumns}
            buttonLabel="Görüntüle"
            items={shipmentByWarehouseIdQuery.data?.items}
            onSubmit={(value) => setShipmentWarehouseId(parseInt(value))}
          />
        </div>
      </div>
    </div>
  );

  return <LayoutDashboard children={content} />;
}
