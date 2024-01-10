import {
  Button,
  Checkbox,
  Form,
  Input,
  Tabs,
  message,
} from "antd";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import Header from "../components/header";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useSignIn } from "../hooks/use-sign-in";
import { useSignUp } from "../hooks/use-sign-up";
import { useState } from "react";

const getInitialValues = () => {
  return JSON.parse(
    localStorage.getItem(
      "skinFoodShopCustomer"
    )
  );
};

const SignIn = () => {
  const [tab, setTab] = useState("1");
  const [signUpForm] = Form.useForm();
  const [messageApi, contextHolder] =
    message.useMessage();
  const { mutate } = useSignIn();
  const navigate = useNavigate();
  const { mutate: signUp } =
    useSignUp();

  const onFinish = (values) => {
    mutate(values, {
      onSuccess(response) {
        console.log(response);
        localStorage.setItem(
          "skinFoodShopUser",
          JSON.stringify(response.data)
        );
        messageApi.open({
          type: "success",
          content:
            "Đăng nhập thành công",
        });
        navigate("/");
      },

      onError(error) {
        const message =
          error.response.data.message;
        messageApi.open({
          type: "error",
          content: message,
        });
      },
    });
  };

  const onSignUp = (values) => {
    signUp(values, {
      onSuccess() {
        messageApi.success(
          "Đăng ký tài khoản thành công"
        );
        signUpForm.resetFields();
      },
      onError(error) {
        const message =
          error.response.data.message;
        messageApi.error(message);
      },
    });
  };

  const onValuesChange = (
    _,
    allValues
  ) => {
    if (allValues.remember) {
      localStorage.setItem(
        "skinFoodShopCustomer",
        JSON.stringify(allValues)
      );
    } else {
      localStorage.removeItem(
        "skinFoodShopCustomer"
      );
    }
  };

  const items = [
    {
      key: "1",
      label: "Đăng nhập",
      children: (
        <div>
          <div className="min-w-[92vw] md:min-w-[400px]">
            <h1 className="text-4xl font-bold mb-10">
              Đăng nhập
            </h1>
            <p className="text-base">
              Bạn chưa có tài khoản?{" "}
              <span
                className="cursor-pointer font-bold text-primary-color"
                onClick={() =>
                  setTab("2")
                }
              >
                Đăng kí ngay!
              </span>
            </p>
            <Form
              name="basic"
              autoComplete="off"
              layout="vertical"
              size="large"
              onValuesChange={
                onValuesChange
              }
              onFinish={onFinish}
              initialValues={getInitialValues()}
            >
              <Form.Item
                label="Phone & Email"
                name="phone"
                rules={[
                  {
                    required: true,
                    message:
                      "Vui lòng không để trống trường này!",
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
                    message:
                      "Vui lòng không để trống trường này!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <div className="flex items-center justify-between my-10">
                <Form.Item
                  noStyle
                  name="remember"
                  valuePropName="checked"
                >
                  <Checkbox>
                    Ghi nhớ
                  </Checkbox>
                </Form.Item>
                <Link to="/forgot-password">
                  Quên mật khẩu?
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
              <div className="flex items-center flex-col gap-2 md:flex-row md:gap-6">
                <Button className="w-full">
                  Đăng nhập với Google
                </Button>
                <Button className="w-full">
                  Đăng nhập bằng
                  Facebook{" "}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Đăng kí",
      children: (
        <div>
          <div className="min-w-[92vw] md:min-w-[400px] min-h-[534px] md:min-h-[486px]">
            <h1 className="text-4xl font-bold mb-10">
              Đăng ký
            </h1>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              layout="vertical"
              size="large"
              onFinish={onSignUp}
              form={signUpForm}
            >
              <Form.Item
                label="Phone & Email"
                name="phone"
                rules={[
                  {
                    required: true,
                    message:
                      "Vui lòng không để trống trường này!",
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
                    message:
                      "Vui lòng không để trống trường này!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                >
                  ĐĂNG KÝ
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Header />
      <Navbar />
      <div className="container mx-auto">
        {/* <div className="p-2 rounded bg-[#F9FBF6] mb-6">
          <Breadcrumb
            items={[
              {
                title: "Trang chủ ",
              },
              {
                title: <a href="">Tài khoản của tôi </a>,
              },
            ]}
          />
        </div> */}
        <div className="flex justify-center items-center py-10">
          <Tabs
            activeKey={tab}
            onChange={setTab}
            centered
            size="large"
            items={items}
          />
          {/* <div>
            <div className="min-w-[400px]">
              <h1 className="text-4xl font-bold mb-10">
                Đăng nhập
              </h1>
              <Form
                name="basic"
                autoComplete="off"
                layout="vertical"
                size="large"
                onValuesChange={
                  onValuesChange
                }
                onFinish={onFinish}
                initialValues={getInitialValues()}
              >
                <Form.Item
                  label="Phone & Email"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message:
                        "Vui lòng không để trống trường này!",
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
                      message:
                        "Vui lòng không để trống trường này!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <div className="flex items-center justify-between my-10">
                  <Form.Item
                    noStyle
                    name="remember"
                    valuePropName="checked"
                  >
                    <Checkbox>
                      Ghi nhớ
                    </Checkbox>
                  </Form.Item>
                  <Link to="/forgot-password">
                    Quên mật khẩu?
                  </Link>
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full"
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
                <div className="flex items-center gap-6">
                  <Button className="w-full">
                    Đăng nhập với Google
                  </Button>
                  <Button className="w-full">
                    Đăng nhập bằng
                    Facebook{" "}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
          <div>
            <div className="min-w-[400px]">
              <h1 className="text-4xl font-bold mb-10">
                Đăng ký
              </h1>
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                autoComplete="off"
                layout="vertical"
                size="large"
                onFinish={onSignUp}
                form={signUpForm}
              >
                <Form.Item
                  label="Phone & Email"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message:
                        "Vui lòng không để trống trường này!",
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
                      message:
                        "Vui lòng không để trống trường này!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full"
                  >
                    ĐĂNG KÝ
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
