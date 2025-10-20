import { useState } from "react";
import { PaginateTable } from "../../../../components/PaginateTable/PaginateTable";
import { LayoutDashboard } from "../../../../layouts/LayoutDashboard/LayoutDashboard";
import { ShipmentHeader } from "../../components/ShipmentHeader/ShipmentHeader";
import { useGetListShipmentQuery } from "../../api/shipmentApi";
import { Button } from "../../../../components/Form/Button";

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
            renderModalContent={(item) => (
              <div className="flex flex-col gap-3 p-5 min-w-[300px]">
                <h2 className="font-medium text-lg">Depo Detayı</h2>
                <p>
                  <strong>Ürün Adı:</strong> {item.productName}
                </p>
                <p>
                  <strong>Depo Adı:</strong> {item.warehouseName}
                </p>
                <p>
                  <strong>Miktar:</strong> {item.quantity}
                </p>
                <p>
                  <strong>Sipariş Durumu:</strong> {item.deliveryStatus}
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
      </div>
    </div>
  );

  return <LayoutDashboard children={content} />;
}
