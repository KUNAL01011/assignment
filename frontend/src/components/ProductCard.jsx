import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="productCard w-[15rem] m-3 transition-all cursor-pointer">
        <div className="h-[20rem]">
          <img
            src={product.imageUrl}
            alt=""
            className="h-full w-full object-cover object-left-top"
          />
        </div>
        <div className="textPard bg-white p-3">
          <div>
            <p className="font-bold opacity-60">{product.brand}</p>
            <p>{product.title}</p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="font-semibold ">{product.discountedPrice}</p>
            <p className="line-through opacity-50">{product.price}</p>
            <p className="text-green-600 font-semibold">
              {product.discountedPersent} % off
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
