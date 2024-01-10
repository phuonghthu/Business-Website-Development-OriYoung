import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spin
        tip="loading"
        size="large"
      />
    </div>
  );
};

export default Loading;
