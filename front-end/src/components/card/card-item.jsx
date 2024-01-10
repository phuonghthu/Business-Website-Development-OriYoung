 /* eslint-disable react/prop-types */
import {
  HeartIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";

import { formatPriceVND } from "../../pages/product-detail";
import { useAddProductCart } from "../../hooks/cart/use-add-product-cart";

const CardItem = ({
  item,
  index,
} = {}) => {
  const queryClient = useQueryClient();
  const [messageApi, context] =
    message.useMessage();
  const navigate = useNavigate();

  const { mutate: addProductToCart } =
    useAddProductCart();

  const addToCart = (e) => {
    e.stopPropagation();
    addProductToCart(
      {
        productId: item._id,
        quantity: 1,
      },
      {
        onSuccess() {
          queryClient.invalidateQueries(
            { queryKey: ["carts"] }
          );
          messageApi.success(
            "Thêm sản phẩm vào giỏ hàng thành công"
          );
        },
        onError() {
          messageApi.error(
            "Thêm sản phẩm vào giỏ hàng thất bại. Bạn cần đăng nhập để tiếp tục"
          );
          setTimeout(() => {
            navigate("/sign-in");
          }, 2000);
        },
      }
    );
  };

  return (
    <div
      className={`${
        index === 4 &&
        "sm:translate-x-1/2 xl:translate-x-0"
      } ${
        index === 3 &&
        "lg:translate-x-1/2 xl:translate-x-0"
      } overflow-hidden border border-primary-color bg-white cursor-pointer shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl min-w-[200px]`}
      onClick={() =>
        navigate(
          `/products/${item?._id}`
        )
      }
    >
      {context}
      <div className="relative">
        <img
          className="w-full"
          src={item?.image}
          alt="Sunset in the mountains"
        />
      </div>
      <div className="px-4 py-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-base font-bold text-black truncate block capitalize ">
            {item?.name}
          </p>
          <HeartIcon
            strokeWidth={1.3}
            size={17}
            className="min-w-[17px] min-h-[17px]"
          />
        </div>
        <div className="grid grid-cols-2">
          <span className="text-base text-t-red font-semibold">
            {formatPriceVND(
              item?.price
            )}
          </span>
          {/* <span className="text-xs text-gray-400 flex items-center">
            {formatPriceVND(item?.price)}
          </span> */}
        </div>
        <button
          onClick={addToCart}
          className="text-primary-color text-xs font-semibold flex items-center justify-center gap-4 w-full border border-primary-color py-2 px-4 rounded"
        >
          Thêm vào giỏ hàng
          <ShoppingCartIcon
            className="text-primary-color"
            size={24}
          />
        </button>
      </div>
    </div>
  );
};

export default CardItem;
