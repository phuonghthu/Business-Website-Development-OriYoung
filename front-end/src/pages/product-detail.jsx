import Footer from "../components/footer";
import Header from "../components/header";
import Navbar from "../components/navbar";
import { Breadcrumb, Divider, Button, message, Input } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { HeartIcon, CarIcon, ShieldCheckIcon, StarIcon } from "lucide-react";
import CardList from "../components/card/card-list";
import { useProduct } from "../hooks/use-product";
import { useNavigate } from "react-router-dom";
import { useProductsRelated } from "../hooks/use-products-related";
import { useUpdateCart } from "../hooks/cart/use-update-cart";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useAddProductCart } from "../hooks/cart/use-add-product-cart";

export function formatPriceVND(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

const ProductDetail = () => {
  const [messageApi, context] = message.useMessage();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading } = useProduct();
  const { data: productsRelated, isLoading: isProductsRelatedLoading } =
    useProductsRelated();
  const [quantity, setQuantity] = useState(1);

  const { mutate: updateCart } = useUpdateCart();

  const { mutate: addProductToCart } = useAddProductCart();

  const updateQuantityProduct = (quantity, item, isNavigate) => {
    updateCart(
      { productId: item._id, quantity: parseInt(quantity) },
      {
        onSuccess() {
          queryClient.invalidateQueries(["carts"]);
          messageApi.success("Cập nhật giỏ hàng thành công");
          if (isNavigate) {
            navigate("/cart");
          }
        },
        onError() {
          messageApi.error("Cập nhật giỏ hàng thất bại");
        },
      }
    );
  };
  const addProductToCarts = (quantity, item, isNavigate) => {
    addProductToCart(
      { productId: item._id, quantity: parseInt(quantity) },
      {
        onSuccess() {
          queryClient.invalidateQueries(["carts"]);
          messageApi.success("Cập nhật giỏ hàng thành công");
          if (isNavigate) {
            navigate("/cart");
          }
        },
        onError() {
          messageApi.error("Cập nhật giỏ hàng thất bại");
        },
      }
    );
  };

  if (isLoading || isProductsRelatedLoading) return <div>Loading...</div>;

  return (
    <div>
      {context}
      <Header />
      <Navbar />
      <div className="container mx-auto">
        <div className="w-full">
          <div className="w-full p-2 bg-[#F9FBF6] rounded-lg mb-6">
            <Breadcrumb
              items={[
                {
                  title: "Trang chủ ",
                },
                {
                  title: <a href="">Sản phẩm</a>,
                },
                {
                  title: (
                    <a className="font-bold" href="">
                      {data?.data?.name}
                    </a>
                  ),
                },
              ]}
            />
          </div>
          <div className="p-2 grid grid-cols-3 gap-6">
            <div>
              <img src={data.data.image} alt="" />
            </div>
            <div className="col-span-2">
              <h1 className="font-bold text-3xl mb-6">{data.data.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-t-red font-bold text-3xl">
                  {formatPriceVND(data.data.price)}
                </span>
                {/* <span className="text-gray-400">215.000 ₫ </span> */}
              </div>
              <Divider />
              <div className="flex items-center gap-4 mb-4">
                <div className="justify-self-center text-lg flex items-center gap-2">
                  <Button
                    onClick={() => {
                      setQuantity((prev) => {
                        if (prev === 1) return prev;
                        return prev - 1;
                      });
                    }}
                  >
                    -
                  </Button>
                  <Input
                    value={quantity}
                    className="max-w-[50px] min-w-[50px] text-center"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <Button onClick={() => setQuantity((prev) => prev + 1)}>
                    +
                  </Button>
                </div>
                <Button
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => updateQuantityProduct(quantity, data.data)}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  size="large"
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => addProductToCarts(1, data.data, true)}
                >
                  Mua ngay
                </Button>
              </div>
              <div className="flex items-center gap-4 mb-4 font-bold text-base">
                <HeartIcon />
                Thêm vào ưa thích
              </div>
              <Divider />
              <div>
                <ul className="flex flex-col gap-4">
                  <li>
                    <div className="flex items-center gap-4">
                      <div className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] flex items-center justify-center rounded-full bg-[#B2D38E8A]">
                        <CarIcon size={30} strokeWidth={1} />
                      </div>
                      <div>
                        <p className="font-bold">Giao hàng nhanh</p>
                        <div>
                          Miễn phí giao hàng với đơn hàng trên 1.000.000 đ
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4">
                      <div className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] grid place-content-center rounded-full bg-[#B2D38E8A]">
                        <StarIcon size={30} strokeWidth={1} />
                      </div>
                      <div>
                        <p className="font-bold">Bảo đảm chất lương</p>
                        <div>
                          Sản phẩm được vận chuyền bằng đường bay và luôn cố
                          gắng giải đáp mọi thắc mắc của KH về sản phẩm bằng
                          cách làm việc trực tiếp với các hãng
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4">
                      <div className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] grid place-content-center rounded-full bg-[#B2D38E8A]">
                        <ShieldCheckIcon strokeWidth={1} size={30} />
                      </div>
                      <div>
                        <p className="font-bold">Sản phẩm chính hãng</p>
                        <div>
                          Cam kết 100% là hàng chính hãng, nguồn gốc rõ ràng
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="p-2 bg-[#F9FBF6] rounded-lg mb-4 mt-10">
            <div className="bg-primary-color p-2 inline-block rounded-full text-white text-sm">
              Mô tả
            </div>
          </div>
          <div className="p-2 bg-[#F9FBF6] rounded-lg mb-10  w-full">
            <div
              className="min-w-full prose lg:prose-xl"
              dangerouslySetInnerHTML={{ __html: data.data.description }}
            />
          </div>
          <div className="mb-10">
            <h2 className="text-center font-bold text-3xl mb-10">
              SẢN PHẨM TƯƠNG TỰ{" "}
            </h2>
            <CardList items={productsRelated.data[0].products ?? []} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
