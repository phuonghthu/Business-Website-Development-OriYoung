import { Button, Form, Input, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../../hooks/use-sign-up";

const AdminSignUp = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { mutate, isPending } = useSignUp();

  const onFinish = (values) => {
    mutate(values, {
      onSuccess: () => {
        messageApi.success("Đăng ký thành công");
        navigate("/admin/sign-in");
      },
      onError: (error) => {
        messageApi.error(error.message);
      },
    });
  };

  return (
    <Spin spinning={isPending}>
      {contextHolder}
      <div className="flex h-screen">
        <div className="min-w-[30%] border-r bg-[#F9FBF6] flex items-center justify-center">
          <img src="/images/logo-green.png" alt="logo" className="h-32" />
        </div>
        <div className="flex-grow grid place-items-center h-full">
          <div className="min-w-[400px]">
            <h1 className="text-4xl font-bold mb-10">Đăng ký</h1>
            <Form
              name="basic"
              autoComplete="off"
              layout="vertical"
              size="large"
              onFinish={onFinish}
            >
              <Form.Item
                label="Phone & Email"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập lại mật khẩu!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Xác nhận mật khẩu không trùng khớp!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Đăng Ký
                </Button>
              </Form.Item>

              <Button
                className="w-full"
                onClick={() => navigate("/admin/sign-in")}
              >
                Đăng nhập
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default AdminSignUp;
