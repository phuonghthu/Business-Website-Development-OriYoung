/* eslint-disable react/prop-types */
import { Modal, Form, Input, DatePicker, Radio } from "antd";

const UpdateProfileModal = ({ open, setOpen, onSubmit, profile }) => {
  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Modal
      title="Thông tin tài khoản "
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Cập nhật"
      cancelText="Huỷ"
    >
      <Form
        form={form}
        layout="vertical"
        size="large"
        initialValues={{ name: profile.name, email: profile.email, gender: profile.gender, phone: profile.phone }}
      >
        <Form.Item label="Họ và tên" name="name">
          <Input placeholder="Họ và tên" />
        </Form.Item>
        <Form.Item label="Ngày sinh" name="birthday">
          <DatePicker placeholder="Ngày sinh" className="w-full" />
        </Form.Item>
        <Form.Item label="Giới tính" name="gender">
        <Radio.Group >
          <Radio value="Nam">Nam</Radio>
          <Radio value="Nữ">Nữ</Radio>
        </Radio.Group>
        </Form.Item>
        <Form.Item 
          label="Số điện thoại"
          name="phone"
          rules={[
            {
              pattern: /^(\+\d{1,3}[- ]?)?\d{10}$/,
              message: "Vui lòng nhập số điện thoại hợp lệ!",
            },
          ]}
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item 
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "Vui lòng nhập đúng định dạng email!",
            },
          ]}
          >
          <Input placeholder="Email" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateProfileModal;

