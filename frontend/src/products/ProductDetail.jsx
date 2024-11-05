import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrderContext } from "../context/orderContext";

export default function ProductDetail() {
  const { order, setOrder } = useOrderContext();
  const navigate = useNavigate(); // Change here
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["get-single-product", id],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/v1/product/${id}`);
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

  const product = data?.data;
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSelect = (sizeName) => {
    setSelectedSize(sizeName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "order",
      JSON.stringify({
        productId: product?.id,
        productSize: selectedSize || "S",
        productPrice: product?.price,
        productImage: product?.imageUrl,
        productTitle: product?.title,
        productBrand: product?.brand,
        productDisPrice: product?.discountedPrice,
        productDisc: product?.discountPersent,
        productQuentity: 1,
        productBasePrice: product?.price
      })
    );
    setOrder({
      productId: product?.id,
      productSize: selectedSize || "S",
      productPrice: product?.price,
      productImage: product?.imageUrl,
      productTitle: product?.title,
      productBrand: product?.brand,
      productDisPrice: product?.discountedPrice,
      productDisc: product?.discountPersent,
      productQuentity: 1,
      productBasePrice: product?.price
    });
    navigate("/checkout"); // Updated to use navigate
  };

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                src={product?.imageUrl}
                alt={product?.imageUrl}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 max-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
                {product?.brand}
              </h1>
              <h1 className="text-lg lg:text-xl text-gray-900 opacity-60 pt-1">
                {product?.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
                <p className="font-semibold">{product?.price}</p>
                <p className="opacity-50 line-through">
                  {product?.discountedPrice}
                </p>
                <p className="text-green-600 font-semibold">
                  {product?.discountPersent} off
                </p>
              </div>
              <form className="mt-10" onSubmit={handleSubmit}>
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <div className="flex gap-4 mb-6">
                    {product?.size?.map((size) => (
                      <div
                        key={size.name}
                        onClick={() => handleSelect(size.name)}
                        className={`border p-4 rounded-lg text-center w-24 cursor-pointer 
            ${
              selectedSize === size.name
                ? "border-blue-500 bg-blue-100"
                : "border-gray-300"
            }`}
                      >
                        <h3 className="text-lg font-semibold">{size.name}</h3>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className="border-2 p-2 rounded-lg px-6 bg-yellow-400"
                  type="submit"
                >
                  Buy Now
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
