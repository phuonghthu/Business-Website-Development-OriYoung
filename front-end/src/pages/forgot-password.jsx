import Header from "../components/header";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  message,
} from "antd";
import { useForgotPassword } from "../hooks/user/use-forgot-password";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] =
    message.useMessage();
  const { mutate } =
    useForgotPassword();

  const onForgotPassword = async (
    values
  ) => {
    mutate(values, {
      onSuccess() {
        navigate("/sign-in");
        messageApi.success(
          "Thành công!"
        );
      },
      onError() {
        messageApi.error("Thất bại!");
      },
    });
  };

  return (
    <div>
      {contextHolder}
      <Header />
      <Navbar />
      <div className="container md:mx-auto md:w-[574px] py-4">
        <div className="mx-4 md:mx-0">
          <Form
            layout="vertical"
            size="large"
            name="basic"
            onFinish={onForgotPassword}
          >
            <Form.Item
              label="Số điện thoại hoặc email"
              name="account"
              rules={[
                {
                  required: true,
                  message:
                    "Vui lòng nhập Số điện thoại hoặc email!",
                },
              ]}
            >
              <Input placeholder="Nhập email hoặc số điện thoại của bạn" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message:
                    "Vui lòng nhập mật khẩu mới!",
                },
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu mới" />
            </Form.Item>
            <Form.Item
              label="Xác nhận mật khẩu mới"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message:
                    "Vui lòng nhập lại mật khẩu mới!",
                },
                ({
                  getFieldValue,
                }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue(
                        "newPassword"
                      ) === value
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "Xác nhận mật khẩu không trùng khớp!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Nhập lại mật khẩu mới" />
            </Form.Item>

            <Button
              htmlType="submit"
              type="primary"
            >
              Gửi
            </Button>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
