/* eslint-disable react/prop-types */
import { Modal, Form, Input } from "antd";
import { useEffect } from "react";

const UpdatePasswordModal = ({ open, setOpen, onSubmit }) => {
  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        oldPassword: "",
        newPassword: "",
      });
    }
  }, [open, form]);
  return (
    <Modal
      destroyOnClose
      title="Cập nhật thông tin"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Cập nhật"
      cancelText="Huỷ"
    >
      <Form form={form} layout="vertical" size="large">
        <Form.Item
          label="Mật khẩu cũ"
          name="oldPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu cũ!",
            },
          ]}
        >
          <Input.Password placeholder="Nhập nhập khẩu cũ " />
        </Form.Item>
        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu mới!",
            },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu mới" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdatePasswordModal;
