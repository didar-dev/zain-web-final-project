import Categories from "@/components/Home/Categories";
import { Suspense } from "react";
export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading categories...</div>}>
        <Categories />
      </Suspense>
    </div>
  );
}
