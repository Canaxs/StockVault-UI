import { useState } from "react";
import { PaginateTable } from "../../../../components/PaginateTable/PaginateTable";
import { LayoutDashboard } from "../../../../layouts/LayoutDashboard/LayoutDashboard";
import {
  useGetListCustomerQuery,
  useGetListProductByCustomerIdQuery,
  useGetListShipmentByCustomerIdQuery,
} from "../../api/customerApi";
import { CustomerHeader } from "../../components/CustomerHeader/CustomerHeader";
import { ActionStatCard } from "../../../../components/ActionStatCard/ActionStatCard";
import type { GetListShipmentByCustomerIdListItemDto } from "../../types/GetListShipmentByCustomerIdListItemDto";
import type { GetListProductByCustomerIdListItemDto } from "../../types/GetListProductByCustomerIdListItemDto";
import { CustomerDetailModal } from "../../components/CustomerDetailModal/CustomerDetailModal";

const customerColumns = [
  { key: "id", label: "Id" },
  { key: "name", label: "İsim" },
  { key: "companyName", label: "Çalıştığı Şirket" },
  { key: "city", label: "Şehir" },
];

const shipmentByCustomerIdColumns: {
  key: keyof GetListShipmentByCustomerIdListItemDto;
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
  { key: "notes", label: "Açıklama" },
];

const productByCustomerIdColumns: {
  key: keyof GetListProductByCustomerIdListItemDto;
  label: string;
}[] = [
  { key: "id", label: "Id" },
  { key: "customerName", label: "Müşteri Adı" },
  { key: "productId", label: "Ürün Numarası" },
  { key: "productName", label: "Ürün İsmi" },
  { key: "productDescription", label: "Ürün Açıklaması" },
  { key: "productPrice", label: "Ürün Fiyatı" },
  { key: "totalQuantity", label: "Satın Alınan Miktar" },
  { key: "totalPrice", label: "Toplam Tutar" },
];

export function CustomerDashboard() {
  const [shipmentCustomerId, setShipmentCustomerId] = useState<number>(0);
  const [productCustomerId, setProductCustomerId] = useState<number>(0);
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const customerQuery = useGetListCustomerQuery({
    PageIndex: page,
    PageSize: pageSize,
  });

  const response = customerQuery.data;

  const shipmentByCustomerIdQuery = useGetListShipmentByCustomerIdQuery({
    Id: shipmentCustomerId,
    PageIndex: 0,
    PageSize: 20,
  });

  const productByCustomerIdQuery = useGetListProductByCustomerIdQuery({
    Id: productCustomerId,
    PageIndex: 0,
    PageSize: 20,
  });

  const content = (
    <div className="flex flex-col p-7">
      <CustomerHeader />
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-5 xl:col-span-3">
          <PaginateTable
            title="Müşteriler"
            columns={customerColumns}
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
            renderModalContent={(item) => <CustomerDetailModal item={item} />}
          />
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2 xl:col-span-1 flex flex-col gap-3">
          <ActionStatCard
            title="Sipariş Durumu"
            gradient="from-green-600 to-emerald-800"
            inputLabel="Müşteri Numarası"
            placeholder="Müşteri Numarası giriniz..."
            columns={shipmentByCustomerIdColumns}
            buttonLabel="Görüntüle"
            items={shipmentByCustomerIdQuery.data?.items}
            onSubmit={(value) => setShipmentCustomerId(parseInt(value))}
          />
        </div>
        <div className="col-span-5 md:col-span-4  lg:col-span-2 xl:col-span-1">
          <ActionStatCard
            title="Satın Alınan Ürünler"
            gradient="from-orange-400 to-red-800"
            inputLabel="Müşteri Numarası"
            placeholder="Müşteri Numarası giriniz..."
            columns={productByCustomerIdColumns}
            buttonLabel="Görüntüle"
            items={productByCustomerIdQuery.data?.items}
            onSubmit={(value) => setProductCustomerId(parseInt(value))}
          />
        </div>
      </div>
    </div>
  );
  return <LayoutDashboard children={content} />;
}
