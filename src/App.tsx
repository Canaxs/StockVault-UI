import { AppRoutes } from "./routes";
import { MainLayout } from "./layouts/MainLayout";
import { Suspense } from "react";

export function App() {
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </MainLayout>
  );
}
