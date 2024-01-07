import Footer from "../components/footer";
import Header from "../components/header";
import Navbar from "../components/navbar";

const Policy = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="container mx-auto">
        <h1 className="font-bold text-4xl text-center my-6">
          Chính sách đổi trả
        </h1>
        <div className="grid grid-cols-2 items-center gap-4">
          <div className="min-w-[50%]">
            <img src="/images/policy-img-1.png" alt="Policy 1" />
          </div>
          <div className="min-w-[50%]">
            <p className="text-primary-color text-4xl mb-4 font-bold">
              Chính sách đổi trả sản phẩm tại OriYoung như thế nào?
            </p>
            <p className="text-base">
              Chúng tôi trân trọng sự tin tưởng của khách hàng khi mua sản phẩm
              tại OriYoung với chính sách hậu mãi được xây dựng dựa trên cam kết
              bảo vệ quyền lợi của người tiêu dùng để quý khách có thể yên tâm
              mua sắm và trải nghiệm. Tất cả sản phẩm được bán tại OriYoung là
              sản phẩm mới và 100% chính hãng được cấp đầy đủ giấy chứng nhận
              nếu phát hiện hàng giả hàng nhái cam kết hoàn tiền X%. Trong
              trường hợp hiếm hoi sản phẩm quý khách nhận được có khiếm khuyết,
              hư hỏng hoặc không như mô tả. OriYoung cam kết bảo vệ khách hàng
              bằng chính sách đổi trả và bảo hành.
            </p>
          </div>
          <div className="min-w-[50%]">
            <p className="text-primary-color text-4xl mb-4 font-bold">
              Hình thức đổi trả hàng
            </p>
            <p className="text-base">
              Gửi qua đường bưu điện/chuyển phát nhanh. Nhân viên OriYoung sẽ
              kiểm tra điều kiện của sản phẩm và hỗ trợ đổi hàng. Mọi thông tin
              chi tiết, thắc mắc hoặc cần trợ giúp Quý khách vui lòng liên hệ
              Hotline: 1900 1818 1818
            </p>
          </div>
          <div className="min-w-[50%]">
            <img src="/images/policy-img-2.png" alt="Policy 2" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Policy;
