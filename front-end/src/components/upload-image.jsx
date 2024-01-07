/* eslint-disable react/prop-types */
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
const UploadImage = (props) => {
  const [fileList, setFileList] = useState([]);

  const imageProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      props?.onChange(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      props?.onChange([...fileList, file]);
      return false;
    },
    fileList,
  };
  return (
    <>
      <Upload {...imageProps}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
    </>
  );
};
export default UploadImage;
