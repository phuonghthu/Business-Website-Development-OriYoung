import { Button, Checkbox, Form, Input, Spin, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "../../hooks/use-sign-in";

const getInitialValues = () => {
  return JSON.parse(localStorage.getItem("skinFoodShopAuth"));
};

const AdminSignIn = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { mutate, isPending } = useSignIn();

  const onFinish = (values) => {
    mutate(values, {
      onSuccess(response) {
        if (response.data.role === "admin") {
          localStorage.setItem(
            "skinFoodShopUser",
            JSON.stringify(response.data)
          );
          navigate("/admin/products");
        }
        messageApi.open({
          type: "error",
          content: "Tài khoản không có quyền đăng nhập vào trang quản trị",
        });
      },
      onError() {
        messageApi.open({
          type: "error",
          content: "Đăng nhập thật bại",
        });
      },
    });
  };

  const onValuesChange = (_, allValues) => {
    if (allValues.remember) {
      localStorage.setItem("skinFoodShopAuth", JSON.stringify(allValues));
    } else {
      localStorage.removeItem("skinFoodShopAuth");
    }
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
            <h1 className="text-4xl font-bold mb-10">Đăng nhập</h1>
            <Form
              name="basic"
              autoComplete="off"
              initialValues={getInitialValues()}
              layout="vertical"
              size="large"
              onFinish={onFinish}
              onValuesChange={onValuesChange}
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
                label="Password"
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

              <div className="flex items-center justify-between my-10">
                <Form.Item noStyle name="remember" valuePropName="checked">
                  <Checkbox>Ghi nhớ</Checkbox>
                </Form.Item>
                <Link>Quên mật khẩu?</Link>
              </div>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Đăng nhập
                </Button>
              </Form.Item>

              <Button
                className="w-full"
                onClick={() => navigate("/admin/sign-up")}
              >
                Đăng ký
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default AdminSignIn;
