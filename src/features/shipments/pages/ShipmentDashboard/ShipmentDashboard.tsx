import { useState } from "react";
import { PaginateTable } from "../../../../components/PaginateTable/PaginateTable";
import { LayoutDashboard } from "../../../../layouts/LayoutDashboard/LayoutDashboard";
import { ShipmentHeader } from "../../components/ShipmentHeader/ShipmentHeader";
import { useGetListShipmentQuery } from "../../api/shipmentApi";
import { ShipmentDetailModal } from "../../components/ShipmentDetailModal/ShipmentDetailModal";

const shipmentColumns = [
  { key: "id", label: "Id" },
  { key: "productId", label: "Ürün Id" },
  { key: "productName", label: "Ürün Adı" },
  { key: "warehouseId", label: "Depo Id" },
  { key: "warehouseName", label: "Depo Adı" },
  { key: "customerId", label: "Müşteri Id" },
  { key: "quantity", label: "Miktar" },
  { key: "deliveryStatus", label: "Sipariş Durumu" },
];

export function ShipmentDashboard() {
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const shipmentQuery = useGetListShipmentQuery({
    PageIndex: page,
    PageSize: pageSize,
  });

  const response = shipmentQuery.data;

  const content = (
    <div className="flex flex-col p-7">
      <ShipmentHeader />
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-5">
          <PaginateTable
            title="Sevkiyatlar"
            columns={shipmentColumns}
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
            renderModalContent={(item) => <ShipmentDetailModal item={item} />}
          />
        </div>
      </div>
    </div>
  );

  return <LayoutDashboard children={content} />;
}
