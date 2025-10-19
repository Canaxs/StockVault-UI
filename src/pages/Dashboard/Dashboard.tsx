import { ListTable } from "../../components/ListTable/ListTable";
import { StatCard } from "../../components/StatCard/StatCard";
import {
  useGetListProductQuery,
  useGetListTopSellingProductQuery,
} from "../../features/products/api/productApi";
import { LayoutDashboard } from "../../layouts/LayoutDashboard/LayoutDashboard";

const lastProductColumns = [
  { key: "name", label: "İsim" },
  { key: "description", label: "Açıklama" },
  { key: "price", label: "Fiyat" },
];

const topSellingProductcolumns = [
  { key: "productName", label: "İsim" },
  { key: "price", label: "Fiyat" },
  { key: "totalQuantity", label: "Toplam Satış" },
  { key: "totalPrice", label: "Toplam Kazanç" },
];

export function Dashboard() {
  const productQuery = useGetListProductQuery({
    PageIndex: 0,
    PageSize: 5,
  });

  const topSellingProductQuery = useGetListTopSellingProductQuery({
    PageIndex: 0,
    PageSize: 5,
    StartDate: null,
    EndDate: null,
  });

  const content = (
    <div className="flex flex-col p-7">
      <div className="space-y-4 mb-7">
        <h1 className=" text-2xl lg:text-3xl xl:text-4xl text-gray-800 font-medium">
          Gösterge Paneli
        </h1>
        <p className="text-gray-500 text-xs lg:text-sm xl:text-base">
          Tüm operasyonlarınız tek bakışta! Hızlı istatistikler, son işlemler ve
          kritik uyarılar ile işinizi en verimli şekilde yönetin.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-3 mb-5">
        <StatCard
          title="Toplam Ürün"
          value={245}
          description="Toplam kayıtlı ürün sayısı"
          gradient="from-green-400 to-emerald-600"
          link="/products"
        />
        <StatCard
          title="Toplam Müşteri"
          value={87}
          description="Aktif müşteri sayısı"
          gradient="from-emerald-300 to-emerald-500"
          link="/customers"
        />
        <StatCard
          title="Toplam Depolar"
          value={6}
          description="Aktif Depo Sayısı"
          gradient="from-purple-300 to-indigo-500"
          link="/warehouses"
        />
        <StatCard
          title="Bekleyen Sevkiyatlar"
          value={5}
          description="Henüz gönderilmemiş siparişler"
          gradient="from-indigo-300 to-blue-500"
          link="/shipments"
        />
        <StatCard
          title="İptal edilen Sevkiyatlar"
          value={15}
          description="İptal edilen Siparişler"
          gradient="from-gray-300 to-blue-700"
          link="/shipments"
        />
      </div>
      <div className="grid grid-cols-3 xl:grid-cols-5 gap-3">
        <div className="col-span-3">
          <ListTable
            columns={lastProductColumns}
            data={productQuery.data?.items ? [...productQuery.data.items] : []}
            title="Son Eklenen Ürünler"
          />
        </div>
        <div className="col-span-3 xl:col-span-2">
          <ListTable
            columns={topSellingProductcolumns}
            data={
              topSellingProductQuery.data?.items
                ? [...topSellingProductQuery.data.items]
                : []
            }
            title="En Çok Satılan Ürünler"
          />
        </div>
      </div>
    </div>
  );

  return <LayoutDashboard children={content} />;
}
