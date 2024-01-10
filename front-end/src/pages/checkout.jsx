import Footer from "../components/footer";
import Header from "../components/header";
import Navbar from "../components/navbar";
import {
  Row,
  Col,
  Input,
  Select,
  Space,
  Radio,
  Button,
  Form,
  Divider,
} from "antd";
import { useCarts } from "../hooks/cart/use-carts";
import { formatPriceVND } from "./product-detail";
import { useProfile } from "../hooks/user/use-profile";
import { useCheckout } from "../hooks/payment/use-checkout";
import {
  useNavigate,
  Link,
} from "react-router-dom";
import Loading from "../components/loading";

const Checkout = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data, isLoading } =
    useCarts();
  const { data: profile } =
    useProfile();
  const { mutate } = useCheckout();

  const totalPrice = (
    data?.data ?? []
  ).reduce((total, current) => {
    return (total +=
      current.capacityPrice *
      current.quantity);
  }, 0);

  const onCheckout = () => {
    mutate(null, {
      onSuccess() {
        navigate("/checkout-success");
      },
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <Header />
      <Navbar />
      <Form form={form} size="large">
        <div className="container mx-auto">
          <div className="flex gap-8 flex-col-reverse md:flex-row overflow-hidden mx-4 md:mx-[4rem]">
            <div className="flex-grow">
              <p className="font-bold text-3xl mb-6">
                Hi, {profile.data.name}
              </p>
              <p className="font-bold text-3xl mb-6">
                Thông tin vận chuyển
              </p>
              <Row gutter={[32, 16]}>
                <Col span={12}>
                  <Input placeholder="Họ và tên" />
                </Col>
                <Col span={12}>
                  <Input placeholder="Số điện thoại" />
                </Col>
                <Col span={24}>
                  <Input placeholder="Email" />
                </Col>
                <Col span={24}>
                  <Input placeholder="Địa chỉ" />
                </Col>
                <Col span={8}>
                  <Select
                    className="w-full"
                    placeholder="Chọn tỉnh thành"
                  />
                </Col>
                <Col span={8}>
                  <Select
                    className="w-full"
                    placeholder="Chọn quận huyện"
                  />
                </Col>
                <Col span={8}>
                  <Select
                    className="w-full"
                    placeholder="Chọn phường xã"
                  />
                </Col>
                <Col span={24}>
                  <Input.TextArea placeholder="Ghi chú thêm (Ví dụ: giao hàng giờ hành chính)" />
                </Col>
              </Row>
              <p className="font-bold text-3xl my-6">
                Hình thức thanh toán
              </p>
              <Radio.Group
                className="w-full mb-4"
                defaultValue={1}
              >
                <Space
                  className="w-full"
                  direction="vertical"
                >
                  <div className="p-4 border border-primary-color rounded-md w-full">
                    <Radio value={1}>
                      <p>COD</p>
                      <p>
                        Thanh toán khi
                        nhận hàng
                      </p>
                    </Radio>
                  </div>
                  <div className="p-4 border border-primary-color rounded-md w-full">
                    <Radio value={2}>
                      Thanh toán MoMo
                    </Radio>
                  </div>
                  <div className="p-4 border border-primary-color rounded-md w-full">
                    <Radio value={3}>
                      Thẻ ATM/Thẻ tín
                      dụng (Credit
                      card/Thẻ ghi nợ
                      (Debit card)
                    </Radio>
                  </div>
                </Space>
              </Radio.Group>
              <div className="my-6">
                Nếu bạn không hài lòng
                với sản phẩm của chúng
                tôi? Bạn hoàn toàn có
                thể trả lại sản phẩm.
                Tìm hiểu thêm{" "}
                <Link to="/policy">
                  Tại đây
                </Link>
              </div>
              <Button
                size="large"
                className="w-full mb-6"
                type="primary"
                onClick={onCheckout}
              >
                Thanh toán
              </Button>
            </div>
            <div className="min-w-[300px] lg:min-w-[400px]">
              <h1 className="font-bold text-3xl mb-6">
                Giỏ hàng
              </h1>
              <div className="flex flex-col gap-4 mb-6 max-h-[422px] overflow-auto">
                {(
                  data?.data ?? []
                )?.map((item) => {
                  return (
                    <div
                      key={item}
                      className="flex items-center gap-4"
                    >
                      <img
                        className="w-[130px] h-[130px]"
                        src={
                          item
                            .productInfo
                            .image
                        }
                        alt="Logo"
                      />
                      <div>
                        <p className="font-semibold text-lg">
                          {
                            item
                              .productInfo
                              .name
                          }{" "}
                          x
                          {
                            item.quantity
                          }
                        </p>
                        {/* <div className="text-base">Biến thể</div> */}
                        <div className="text-lg font-bold">
                          {formatPriceVND(
                            item.capacityPrice *
                              item.quantity
                          )}
                        </div>
                        {/* <div className="text-sm text-gray-400 line-through">
                          215.000 ₫{" "}
                        </div> */}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between gap-6">
                <Input placeholder="Nhập mã giảm giá" />
                <Button type="primary">
                  Áp dụng
                </Button>
              </div>
              <Divider />
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-xl">
                  Tạm tính
                </span>
                <span className="font-semibold text-base">
                  {formatPriceVND(
                    totalPrice
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-xl">
                  Giảm giá
                </span>
                <span className="font-semibold text-base">
                  0
                </span>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-xl">
                  Phí giao hàng
                </span>
                <span className="font-semibold text-base">
                  0
                </span>
              </div>
              <Divider />
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-xl">
                  Tổng
                </span>
                <span className="font-semibold text-base">
                  {formatPriceVND(
                    totalPrice
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Form>
      <Footer />
    </div>
  );
};

export default Checkout;
