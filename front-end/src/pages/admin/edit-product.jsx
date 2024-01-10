import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Spin,
  message,
  Select,
} from "antd";
import { ArrowLeftSquareIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../hooks/use-product";
import { useUpdateProduct } from "../../hooks/use-update-product";
import { useQueryClient } from "@tanstack/react-query";
import MarkdownEditor from "../../components/markdown-editor";
import { useCategories } from "../../hooks/use-categories";
import UploadImage from "../../components/upload-image";
import { useState } from "react";
import Loading from "../../components/loading";

const EditProduct = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] =
    message.useMessage();
  const [description, setDescription] =
    useState("");

  const { data, isLoading } =
    useProduct();
  const {
    data: { data: categories } = {},
    isLoading: isCategoriesLoading,
  } = useCategories();

  const { mutate } = useUpdateProduct();

  const onSubmit = async (values) => {
    try {
      const updateFields = {
        ...{
          capacity: data.data.capacity,
          description:
            data.data.description,
          name: data.data.name,
          price: data.data.price,
          productCode:
            data.data.productCode,
          quantity: data.data.quantity,
          categoryName:
            data.data.categoryName,
          image: data.data.image,
          productId: data.data._id,
        },
        ...values,
        description:
          description ||
          data.data.description,
      };

      if (
        values?.image?.length > 0 &&
        !(
          typeof values.image ===
          "string"
        )
      ) {
        const formData = new FormData();
        values.image.forEach((file) => {
          formData.append(
            "image",
            file
          );
        });
        const res = await fetch(
          "https://skin-food-store.onrender.com/api/product/upload-image",
          {
            method: "POST",
            body: formData,
          }
        );
        const response =
          await res.json();
        updateFields.image =
          response.data;
      }

      mutate(updateFields, {
        onSuccess() {
          messageApi.success(
            "Cập nhật thành công"
          );
          queryClient.invalidateQueries(
            { queryKey: ["products"] }
          );
          navigate(-1);
        },
        onError() {
          messageApi.error(
            "Cập nhật thất bại"
          );
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const onValuesChange = (
    updateFields
  ) => {
    if (
      updateFields?.description &&
      typeof updateFields?.description ===
        "string"
    ) {
      setDescription(
        updateFields.description
      );
    }
  };

  if (isLoading || isCategoriesLoading)
    return <Loading />;

  return (
    <Spin spinning={false}>
      {contextHolder}
      <div className="flex items-center gap-4 mb-10 mt-5">
        <ArrowLeftSquareIcon
          className="cursor-pointer"
          strokeWidth={1}
          size={36}
          onClick={() => navigate(-1)}
        />
        <span className="font-bold text-2xl">
          Chỉnh sửa sản phẩm mới
        </span>
      </div>
      <Form
        form={form}
        layout="vertical"
        size="large"
        initialValues={data.data}
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
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Danh mục"
                  name="categoryName"
                >
                  <Select
                    options={(
                      categories ?? []
                    ).map((i) => ({
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
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Dung tích"
                  name="capacity"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="SKU"
                  name="productCode"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Số lượng"
                  name="quantity"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Mô tả"
                  name="description"
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
                {
                  required: true,
                  message:
                    "Không được để trống trường này!",
                },
              ]}
            >
              <UploadImage />
            </Form.Item>

            {/* <p>Trạng thái sản phẩm</p>
            <Divider />
            <Form.Item label="Trạng thái" name="status">
              <Radio.Group>
                <Radio value={1}>Cho phép</Radio>
                <Radio value={2}>Không cho phép</Radio>
              </Radio.Group>
            </Form.Item>
            <Divider />
            <Form.Item label="Hiển thị" name="isShow">
              <Radio.Group>
                <Radio value={1}>Hiển thị</Radio>
                <Radio value={2}>Không hiển thị</Radio>
              </Radio.Group>
            </Form.Item> */}
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            onClick={() =>
              navigate(
                "/admin/products"
              )
            }
          >
            Huỷ
          </Button>
          <Button
            htmlType="submit"
            type="primary"
          >
            Lưu
          </Button>
        </div>
      </Form>
    </Spin>
  );
};

export default EditProduct;
