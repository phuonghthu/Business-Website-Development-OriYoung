import Footer from "../components/footer";
import Header from "../components/header";
import Navbar from "../components/navbar";

import {
  List,
  Breadcrumb,
  Divider,
  Button,
  Input,
  message,
} from "antd";
import { useCarts } from "../hooks/cart/use-carts";
import { formatPriceVND } from "./product-detail";
import { useNavigate } from "react-router-dom";
import { useUpdateCart } from "../hooks/cart/use-update-cart";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "../components/loading";

const Cart = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: cart, isLoading } =
    useCarts();
  const { mutate: updateCart } =
    useUpdateCart();
  const [messageApi, context] =
    message.useMessage();

  const totalPrice = (
    cart?.data ?? []
  ).reduce((acc, current) => {
    return (acc += current.price);
  }, 0);

  const updateQuantityProduct = (
    quantity,
    item
  ) => {
    updateCart(
      {
        productId: item.productId,
        quantity: parseInt(quantity),
      },
      {
        onSuccess() {
          queryClient.invalidateQueries(
            ["carts"]
          );
          messageApi.success(
            "Cập nhật giỏ hàng thành công"
          );
        },
        onError() {
          messageApi.error(
            "Cập nhật giỏ hàng thất bại"
          );
        },
      }
    );
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {context}
      <Header />
      <Navbar />
      <div className="container mx-auto">
        <div>
          <div className="px-4">
            <Breadcrumb
              separator=">"
              items={[
                {
                  title: "Giỏ hàng",
                },
                {
                  title: "Thanh toán",
                },
              ]}
            />
          </div>
          <div className="flex gap-4 flex-col xl:flex-row my-10">
            <div className="flex-grow ">
              {cart?.data.length >
                0 && (
                <div className="hidden lg:block pl-[310px] px-4 py-4">
                  <div className="grid grid-cols-4 w-full">
                    <div className="justify-self-center">
                      Sản phẩm{" "}
                    </div>
                    <div className="justify-self-center">
                      Giá{" "}
                    </div>
                    <div className="justify-self-center">
                      Số lượng{" "}
                    </div>
                    <div className="justify-self-center">
                      Tạm tính{" "}
                    </div>
                  </div>
                </div>
              )}
              <List
                itemLayout="vertical"
                size="large"
                dataSource={
                  cart?.data ?? []
                }
                renderItem={(item) => (
                  <List.Item
                    key={item.title}
                  >
                    <div className="flex gap-4 flex-col lg:flex-row items-center">
                      <img
                        width={272}
                        alt="logo"
                        src={
                          item
                            .productInfo
                            .image
                        }
                      />
                      <div className="grid lg:hidden grid-cols-4 w-full">
                        <div className="justify-self-center">
                          Sản phẩm{" "}
                        </div>
                        <div className="justify-self-center">
                          Giá{" "}
                        </div>
                        <div className="justify-self-center">
                          Số lượng{" "}
                        </div>
                        <div className="justify-self-center">
                          Tạm tính{" "}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 w-full">
                        <div className="flex items-center text-base md:text-lg">
                          {
                            item
                              .productInfo
                              .name
                          }
                        </div>
                        <div className="flex justify-center items-center text-lg">
                          {formatPriceVND(
                            item.capacityPrice
                          )}
                        </div>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                          <Button
                            onClick={() =>
                              updateQuantityProduct(
                                item.quantity -
                                  1,
                                item
                              )
                            }
                          >
                            -
                          </Button>
                          <Input
                            defaultValue={
                              item.quantity
                            }
                            // value={item.quantity}
                            className="max-w-[50px] min-w-[50px] text-center"
                            onChange={(
                              e
                            ) =>
                              updateQuantityProduct(
                                e.target
                                  .value,
                                item
                              )
                            }
                          />
                          <Button
                            onClick={() =>
                              updateQuantityProduct(
                                item.quantity +
                                  1,
                                item
                              )
                            }
                          >
                            +
                          </Button>
                        </div>
                        <div className="flex justify-center items-center text-lg">
                          {formatPriceVND(
                            item.price
                          )}
                        </div>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </div>
            <div className="min-w-[300px] mx-5">
              <h3>
                Thông tin đơn hàng{" "}
              </h3>
              <Divider />
              <ul className="flex flex-col gap-4">
                <li>
                  <div className="flex items-center justify-between">
                    <span>
                      Tạm tính{" "}
                    </span>
                    <span>
                      {formatPriceVND(
                        totalPrice
                      )}
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <span>
                      Giảm giá{" "}
                    </span>
                    <span>0</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <span>
                      Phí vận chuyển{" "}
                    </span>
                    <span>0</span>
                  </div>
                </li>
              </ul>
              <Divider />
              <div className="flex items-center justify-between">
                <span>TỔNG CỘNG: </span>
                <span className="font-bold text-base">
                  {formatPriceVND(
                    totalPrice
                  )}
                </span>
              </div>
              <div className="flex justify-center mt-10">
                <Button
                  size="large"
                  type="primary"
                  onClick={() =>
                    navigate(
                      "/checkout"
                    )
                  }
                >
                  Tiến hành thanh toán{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-items justify-center lg:justify-start gap-4 mb-10">
          <Input
            size="large"
            placeholder="Nhập mã giảm giá"
            className="max-w-[230px]"
          />
          <Button
            size="large"
            type="primary"
          >
            Áp dụng
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
