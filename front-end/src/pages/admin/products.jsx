import { Select, Button, Table, Popconfirm, message, Avatar } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useProducts } from "../../hooks/use-products";
import { useNavigate } from "react-router-dom";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { formatPriceVND } from "../product-detail";

const Products = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading } = useProducts();
  const [messageApi, contextHolder] = message.useMessage();
  const [sortOrder, setSortOrder] = useState(null);

  const { mutate } = useDeleteProduct();

  const onConfirm = (id) => {
    mutate(id, {
      onSuccess() {
        messageApi.success("Xoá sản phẩm thành công");
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onError() {
        messageApi.error("Xoá sản phẩm thất bại");
      },
    });
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-4">
          <div className="border border-primary-color rounded-full">
            <Avatar size="large" src={record.image} />
          </div>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "SKU",
      dataIndex: "productCode",
      key: "productCode",
    },
    {
      title: "Danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>{formatPriceVND(text)}</span>,
    },
    {
      title: "Có sẵn",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      width: 50,
      render: (text, record) => {
        return (
          <div className="flex items-center justify-between gap-4">
            <EditOutlined
              style={{ fontSize: 20 }}
              onClick={() => navigate(`/admin/products/${record._id}`)}
            />
            <Popconfirm
              title="Xoá sản phẩm?"
              description="Bạn có chắc chắn muốn xoá sản phẩm này?"
              onConfirm={() => onConfirm(record._id)}
              okText="Có"
              cancelText="Không"
            >
              <DeleteOutlined style={{ fontSize: 20 }} />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const products = useMemo(() => {
    if (!data) return [];
    if (sortOrder === "descPrice") {
      return (data?.data ?? []).sort((a, b) => b.price - a.price);
    }
    return (data?.data ?? []).sort((a, b) => a.price - b.price);
  }, [sortOrder, data]);

  return (
    <div className="mt-4 h-[calc(100vh-75px)] overflow-auto">
      {contextHolder}
      <div className="flex items-center justify-between mb-6">
        <Select
          value={sortOrder}
          style={{
            width: 200,
          }}
          placeholder="Sắp xếp"
          options={[
            {
              value: "ascPrice",
              label: "Giá: Thấp - Cao",
            },
            {
              value: "descPrice",
              label: "Giá: Cao - Thấp",
            },
          ]}
          onChange={(value) => setSortOrder(value)}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/admin/products/create")}
        >
          Thêm
        </Button>
      </div>
      <div>
        <Table
          loading={isLoading}
          dataSource={products}
          columns={columns}
          rowKey="_id"
          // pagination={{ pageSize: 20 }}
        />
      </div>
    </div>
  );
};

export default Products;
