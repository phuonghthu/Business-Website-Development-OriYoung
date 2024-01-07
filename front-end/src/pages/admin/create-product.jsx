import { Form, Row, Col, Input, Button, message, Spin, Select } from "antd";
import { ArrowLeftSquareIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAddProduct } from "../../hooks/use-add-product";
import { useQueryClient } from "@tanstack/react-query";
import MarkdownEditor from "../../components/markdown-editor";
import UploadImage from "../../components/upload-image";
import { useState } from "react";
import { useCategories } from "../../hooks/use-categories";

const CreateProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");

  const { mutate } = useAddProduct();

  const { data, isLoading: isCategoriesLoading } = useCategories();

  const onSubmit = async (values) => {
    try {
      const updatedValues = {
        categoryName: values.categoryName,
        product: {
          name: values.name,
          price: parseFloat(values.price),
          capacity: values.capacity,
          productCode: values.productCode,
          quantity: parseInt(values.quantity),
          description,
        },
      };
      setIsLoading(true);
      if (values.image.length > 0) {
        const formData = new FormData();
        values.image.forEach((file) => {
          formData.append("image", file);
        });
        const res = await fetch(
          "https://skin-food-store.onrender.com/api/product/upload-image",
          {
            method: "POST",
            body: formData,
          }
        );
        const response = await res.json();
        updatedValues.product["image"] = response.data;
      }
      const formData = new FormData();
      values.image.forEach((file) => {
        formData.append("image", file);
      });
      mutate(updatedValues, {
        onSuccess() {
          messageApi.success("Thêm mới thành công");
          queryClient.invalidateQueries({ queryKey: ["products"] });
          navigate("/admin/products");
        },
        onError() {
          messageApi.error("Thêm mới thất bại");
        },
        onSettled() {
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const onValuesChange = (updateFields) => {
    if (
      updateFields?.description &&
      typeof updateFields?.description === "string"
    ) {
      setDescription(updateFields.description);
    }
  };

  if (isCategoriesLoading) return <div>Loading...</div>;

  return (
    <Spin spinning={isLoading}>
      {contextHolder}
      <div className="flex items-center gap-4 mb-10 mt-5">
        <ArrowLeftSquareIcon
          className="cursor-pointer"
          strokeWidth={1}
          size={36}
          onClick={() => navigate(-1)}
        />
        <span className="font-bold text-2xl">Thêm sản phẩm mới</span>
      </div>
      <Form
        form={form}
        layout="vertical"
        size="large"
        onFinish={onSubmit}
        onValuesChange={onValuesChange}
      >
        <div className="flex gap-6 mb-10">
          <div className="border border-primary-color rounded p-4">
            <Row gutter={[28, 0]}>
              <Col span={24}>
                <Form.Item
                  label="Tên sản phẩm"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống trường này!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Danh mục"
                  name="categoryName"
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống trường này!",
                    },
                  ]}
                >
                  <Select
                    options={(data?.data ?? []).map((i) => ({
                      label: i.name,
                      value: i.name,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Giá"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống trường này!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Dung tích"
                  name="capacity"
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống trường này!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="SKU"
                  name="productCode"
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống trường này!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Số lượng"
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống trường này!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Mô tả"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống trường này!",
                    },
                  ]}
                >
                  <MarkdownEditor />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div className="min-w-[30%] border border-primary-color rounded p-4">
            <Form.Item
              name="image"
              rules={[
                { required: true, message: "Không được để trống trường này!" },
              ]}
            >
              <UploadImage />
            </Form.Item>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button onClick={() => navigate("/admin/products")}>Huỷ</Button>
          <Button htmlType="submit" type="primary">
            Lưu
          </Button>
        </div>
      </Form>
    </Spin>
  );
};

export default CreateProduct;
