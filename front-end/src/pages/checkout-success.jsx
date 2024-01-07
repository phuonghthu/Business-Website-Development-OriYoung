import Footer from "../components/footer";
import Header from "../components/header";
import Navbar from "../components/navbar";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <Navbar />
      <div className="container mx-auto flex items-center justify-center">
        <Result
          status="success"
          title="Đặt hàng thành công"
          subTitle="Cảm ơn bạn đã đặt hàng tại Oriyoung"
          extra={[
            <Button type="primary" key="buy" onClick={() => navigate("/")}>
              Home
            </Button>,
          ]}
        />
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
