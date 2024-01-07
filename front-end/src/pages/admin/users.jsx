import { Select, Button, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useUsers } from "../../hooks/use-users";

const columns = [
  {
    title: "Tên khách hàng",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "address",
  },
  // {
  //   title: "Số đơn hàng",
  //   dataIndex: "totalOrders",
  //   key: "totalOrders",
  // },
  {
    title: "Giới tính",
    dataIndex: "gender",
    key: "gender",
  },

  {
    title: "Chỉnh sửa",
    dataIndex: "action",
    key: "action",
    width: 100,
    render: () => {
      return (
        <div className="flex items-center justify-between gap-4">
          <EditOutlined style={{ fontSize: 20 }} />
          <DeleteOutlined style={{ fontSize: 20 }} />
        </div>
      );
    },
  },
];

const Users = () => {
  const { data, isLoading } = useUsers();

  if (isLoading) return <div>Loading...</div>;

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
        <Button type="primary" icon={<PlusOutlined />}>
          Thêm
        </Button>
      </div>
      <div>
        <Table
          rowSelection={{}}
          dataSource={data?.data ?? []}
          columns={columns}
          rowKey="_id"
        />
        ;
      </div>
    </div>
  );
};

export default Users;
