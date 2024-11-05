import { IoMdRemoveCircleOutline } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useOrderContext } from "../context/orderContext";
import { useEffect } from "react";

const ProductPreviewCard = () => {
  const { order, setOrder } = useOrderContext();

  // Function to increment quantity
  const incrementQuantity = () => {
    const newQuantity = order.productQuentity + 1;
    const updatedOrder = {
      ...order,
      productQuentity: newQuantity,
      productPrice: order.productPrice + order.productBasePrice, // Adjust price based on quantity
    };
    setOrder(updatedOrder);
    localStorage.setItem("order", JSON.stringify(updatedOrder)); // Update localStorage
  };

  // Function to decrement quantity
  const decrementQuantity = () => {
    const quentity = order.productQuentity;
    if (quentity > 1) {
      const updatedOrder = {
        ...order,
        productQuentity: quentity - 1,
        productPrice: order.productPrice - order.productBasePrice, // Adjust price based on quantity
      };
      setOrder(updatedOrder);
      localStorage.setItem("order", JSON.stringify(updatedOrder)); // Update localStorage
    }
  };

  // Load order data from localStorage on component mount
  useEffect(() => {
    const storedOrder = localStorage.getItem("order");
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
  }, [setOrder]);

  return (
    <div className="p-5 shadow-lg border rounded-md mb-4">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            src={order.productImage}
            className="w-full h-full object-cover object-top"
            alt=""
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">{order.productTitle}</p>
          <p className="opacity-70">Size: {order.productSize}</p>
          <p className="opacity-70 mt-2">Seller: {order.productBrand}</p>
          <div className="flex space-x-5 items-center text-gray-900 pt-6">
            <p className="font-semibold">{order.productPrice}</p>
            <p className="opacity-50 line-through">{order.productDisPrice}</p>
            <p className="text-green-600 font-semibold">
              {order.productDisc}% off
            </p>
          </div>
        </div>
      </div>
      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2">
          <button onClick={decrementQuantity}>
            <IoMdRemoveCircleOutline />
          </button>
          <span className="py-1 px-7 border rounded-md">
            {order.productQuentity}
          </span>
          <button onClick={incrementQuantity}>
            <IoMdAddCircleOutline />
          </button>
        </div>
        <div>
          <button>remove</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPreviewCard;
