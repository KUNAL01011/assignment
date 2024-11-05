import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";

function Home() {
  const { data: products } = useQuery({
    queryKey: ["get-all-products"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/v1/products");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });
  return (
    <>
      <h3 className="uppercase font-semibold mt-6">Products</h3>
      <main className="mt-2 flex flex-wrap justify-evenly">
        {products?.data?.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </main>
    </>
  );
}

export default Home;
