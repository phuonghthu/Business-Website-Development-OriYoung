/* eslint-disable react/prop-types */
import { Modal, Form, Input } from "antd";

const CategoryModal = ({
  selectedItem,
  isModalOpen,
  setIsModalOpen,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("values", values);
        onSubmit(values);
        setIsModalOpen(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  return (
    <Modal
      destroyOnClose
      title={selectedItem ? "Sửa danh mục" : "Thêm danh mục"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form form={form} layout="vertical" initialValues={selectedItem}>
        <Form.Item label="Tên danh mục" name="name">
          <Input placeholder="Tên danh mục" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
