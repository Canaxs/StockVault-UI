import { ErrorPageLayout } from "../../layouts/ErrorPageLayout";

export function NotFound() {
  return (
    <ErrorPageLayout
      headTitle="Sayfa Bulunamadı"
      title="Oops!"
      message="Üzgünüz, aradığınız sayfaya ulaşılamıyor."
    />
  );
}
