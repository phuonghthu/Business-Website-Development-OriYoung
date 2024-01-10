import {
  Select,
  Button,
  Table,
  Popconfirm,
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useCategories } from "../../hooks/use-categories";
import CategoryModal from "../../components/category/category-modal";
import { useAddCategory } from "../../hooks/use-add-category";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteCategory } from "../../hooks/use-delete-category";
import { useUpdateCategory } from "../../hooks/use-update-category";
import Loading from "../../components/loading";

const Categories = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] =
    useState(false);
  const [
    selectedItem,
    setSelectedItem,
  ] = useState(null);
  const [messageApi, holder] =
    message.useMessage();

  const { data, isLoading } =
    useCategories();
  const { mutate: addCategory } =
    useAddCategory();
  const { mutate: deleteCategory } =
    useDeleteCategory();
  const { mutate: updateCategory } =
    useUpdateCategory();

  const handleOk = (categoryName) => {
    if (!selectedItem) {
      addCategory(categoryName, {
        onSuccess: () => {
          setIsModalOpen(false);
          queryClient.invalidateQueries(
            ["categories"]
          );
          messageApi.success(
            "Thêm danh mục thành công"
          );
        },
        onError: () => {
          setIsModalOpen(false);
          messageApi.error(
            "Thêm danh mục thất bại"
          );
        },
      });
    } else {
      updateCategory(
        {
          id: selectedItem.id,
          name: categoryName.name,
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            queryClient.invalidateQueries(
              ["categories"]
            );
            messageApi.success(
              "Chỉnh sửa danh mục thành công"
            );
          },
          onError: () => {
            setIsModalOpen(false);
            messageApi.success(
              "Chỉnh sửa danh mục thất bại"
            );
          },
        }
      );
    }
  };

  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "totalProducts",
      key: "totalProducts",
    },

    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      width: 50,
      render: (text, record) => {
        return (
          <div className="flex items-center justify-between gap-4">
            {holder}
            <EditOutlined
              style={{ fontSize: 20 }}
              onClick={() => {
                setSelectedItem(record);
                setIsModalOpen(true);
              }}
            />
            <Popconfirm
              title="Xoá danh mục"
              description="Bạn có chắc chắn muốn xoá danh mục này?"
              onConfirm={() => {
                deleteCategory(
                  record.id,
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries(
                        ["categories"]
                      );
                      messageApi.success(
                        "Xoá danh mục thành công"
                      );
                    },
                    onError: () => {
                      queryClient.invalidateQueries(
                        ["categories"]
                      );
                      messageApi.error(
                        "Xoá danh mục thất bại"
                      );
                    },
                  }
                );
              }}
              okText="Có"
              cancelText="Không"
            >
              <DeleteOutlined
                style={{ fontSize: 20 }}
              />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  if (isLoading) return <Loading />;
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-6">
        <Select
          defaultValue="sort"
          style={{
            width: 120,
          }}
          options={[
            {
              value: "sort",
              label: "Sắp xếp",
            },
          ]}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() =>
            setIsModalOpen(true)
          }
        >
          Thêm
        </Button>
      </div>
      <Table
        dataSource={data?.data ?? []}
        columns={columns}
        rowKey="id"
      />
      <CategoryModal
        selectedItem={selectedItem}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onSubmit={handleOk}
      />
    </div>
  );
};

export default Categories;
