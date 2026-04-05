import { Suspense, lazy } from "react";
import Hero from "../components/Hero.jsx";
import ProductsPage from "./ProductsPage.jsx";

const TrustStats = lazy(() => import("../components/TrustStats.jsx"));
const BrandsStrip = lazy(() => import("../components/BrandsStrip.jsx"));

export default function HomePage() {
  return (
    <>
      <Hero />

      <Suspense fallback={null}>
        <TrustStats />
        <ProductsPage />
        <BrandsStrip />
      </Suspense>
    </>
  );
}
