import { useState } from "react";
import { PaginateTable } from "../../../../components/PaginateTable/PaginateTable";
import { LayoutDashboard } from "../../../../layouts/LayoutDashboard/LayoutDashboard";
import {
  useGetListByDynamicNameQuery,
  useGetListCustomerByProductIdQuery,
  useGetListProductQuery,
  useGetListShipmentByProductIdQuery,
  useGetListWarehouseByProductIdQuery,
} from "../../api/productApi";
import { ProductHeader } from "../../components/ProductHeader/ProductHeader";
import { ActionStatCard } from "../../../../components/ActionStatCard/ActionStatCard";
import type { GetListWarehouseByProductIdListItemDto } from "../../types/GetListWarehouseByProductIdListItemDto";
import type { GetListShipmentByProductIdListItemDto } from "../../types/GetListShipmentByProductIdListItemDto";
import type { GetListCustomerByProductIdListItemDto } from "../../types/GetListCustomerByProductIdListItemDto";
import { ProductDetailModal } from "../../components/ProductDetailModal/ProductDetailModal";
import { ProductActionStatCard } from "../../components/ProductActionStatCard/ProductActionStatCard";
import Modal from "react-responsive-modal";
import type { GetListByDynamicNameListItemDto } from "../../types/GetListByDynamicNameListItemDto";

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
  { key: "warehouseId", label: "Depo Numarası" },
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
  const [searchValue, setSearchValue] = useState<string>("");
  const [warehouseProductId, setWarehouseProductId] = useState<number>(0);
  const [shipmentProductId, setShipmentProductId] = useState<number>(0);
  const [customerProductId, setCustomerProductId] = useState<number>(0);

  const [searchSelectItem, setSearchSelectItem] =
    useState<GetListByDynamicNameListItemDto>();
  const [searchModal, setSearchModal] = useState(false);

  const [page, setPage] = useState(0);
  const pageSize = 10;

  const productQuery = useGetListProductQuery({
    PageIndex: page,
    PageSize: pageSize,
  });

  const response = productQuery.data;

  const warehouseByProductIdQuery = useGetListWarehouseByProductIdQuery({
    Id: warehouseProductId,
    PageIndex: 0,
    PageSize: 20,
  });

  const shipmentByProductIdQuery = useGetListShipmentByProductIdQuery({
    Id: shipmentProductId,
    PageIndex: 0,
    PageSize: 20,
  });

  const customerByProductIdQuery = useGetListCustomerByProductIdQuery({
    Id: customerProductId,
    PageIndex: 0,
    PageSize: 20,
  });

  const { data: searchData } = useGetListByDynamicNameQuery(
    {
      PageIndex: 0,
      PageSize: 10,
      FieldValue: searchValue,
      FieldOperator: "startswith",
      SortDir: "asc",
      SortField: "Name",
    },
    {
      skip: !searchValue,
    }
  );

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
            renderModalContent={(item) => <ProductDetailModal item={item} />}
          />
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2 xl:col-span-1 flex flex-col gap-3">
          <ActionStatCard
            title="Stok Durumu"
            gradient="from-green-600 to-emerald-800"
            inputLabel="Ürün Numarası"
            placeholder="Ürün Numarası giriniz..."
            columns={warehouseByProductIdColumns}
            buttonLabel="Görüntüle"
            items={warehouseByProductIdQuery.data?.items}
            onSubmit={(value) => setWarehouseProductId(parseInt(value))}
          />
          <ActionStatCard
            title="Müşteri Durumu"
            gradient="from-gray-500 to-gray-900"
            inputLabel="Ürün Numarası"
            placeholder="Ürün Numarası giriniz..."
            columns={customerByProductIdColumns}
            buttonLabel="Görüntüle"
            items={customerByProductIdQuery.data?.items}
            onSubmit={(value) => setCustomerProductId(parseInt(value))}
          />
        </div>
        <div className="col-span-5 md:col-span-4  lg:col-span-2 xl:col-span-1 flex flex-col gap-3">
          <ActionStatCard
            title="Sipariş Durumu"
            gradient="from-orange-400 to-red-800"
            inputLabel="Ürün Numarası"
            placeholder="Ürün Numarası giriniz..."
            columns={shipmentByProductIdColumns}
            buttonLabel="Görüntüle"
            items={shipmentByProductIdQuery.data?.items}
            onSubmit={(value) => setShipmentProductId(parseInt(value))}
          />
          <ProductActionStatCard />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <LayoutDashboard
        children={content}
        searchValue={searchValue}
        searchPlaceHolder={"Ürün Ara..."}
        searchOnChange={(value) => setSearchValue(value)}
        searchResults={searchValue ? searchData?.items || [] : []}
        searchRenderResults={(item) => <div>{item.name}</div>}
        searchOnSelect={(item) => {
          setSearchSelectItem(item);
          setSearchModal(true);
          setSearchValue("");
        }}
      />
      {searchModal && (
        <Modal open={searchModal} onClose={() => setSearchModal(false)} center>
          <div className="p-4">
            <h2 className="text-lg font-semibold">Ürün Detayı</h2>
            <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <p>
                <strong>Ürün Adı: </strong>
                {searchSelectItem?.name}
              </p>
              <p className="line-clamp-1">
                <strong>Ürün Açıklaması: </strong>
                {searchSelectItem?.description}
              </p>
              <p>
                <strong>Ürün Fiyatı: </strong>
                {searchSelectItem?.price}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
