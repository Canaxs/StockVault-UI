import { LayoutDashboard } from "../../../../layouts/LayoutDashboard/LayoutDashboard";
import { ProductHeader } from "../../components/ProductHeader/ProductHeader";

export function ProductDashboard() {
  const content = (
    <div className="flex flex-col p-7">
      <ProductHeader />
    </div>
  );

  return <LayoutDashboard children={content} />;
}
