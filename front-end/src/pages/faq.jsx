import Footer from "../components/footer";
import Header from "../components/header";
import Navbar from "../components/navbar";

const Faq = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6 mt-6">
          Câu hỏi thường gặp khi mua sắm tại OriYoung
        </h1>
        <div className="mb-4">
          <div className="mb-4">
            Hỏi:
            <span className="font-bold">
              OriYoung có cửa hàng trực tiếp không?
            </span>
          </div>
          <div className="mb-4">
            Đáp: Tại thời điểm này, chúng tôi chưa có cửa hàng bán trực tiếp.
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-4">
            Hỏi:
            <span className="font-bold">
              Bao lâu từ lúc đặt hàng thì tôi có thể nhận được hàng?
            </span>
          </div>
          <div className="mb-4">
            Đáp: Nếu ở nội thành Hà Nội và Hồ Chí Minh, khách hàng sẽ được nhận
            hàng trong vòng 24h kể từ khi có cuộc gọi hoặc tin nhắn xác nhận trừ
            trường hợp đơn chưa đủ tồn kho OriYoung sẽ gửi đi từ kho vận hành
            khác tỉnh thì thời gian sẽ là 2-3 ngày. Nếu ở tỉnh khác, khách hàng
            sẽ nhận được hàng trong 2-3 ngày. Các trường hợp đơn hàng đặt trước
            (Pre-order) sẽ được thông báo về ngày giao hàng ở mỗi chương trình.
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-4">
            Hỏi:
            <span className="font-bold">
              Làm thế nào để tôi có thể theo dõi đơn hàng?
            </span>
          </div>
          <div className="mb-4">
            Đáp: Khách hàng có thể inbox vào fanpage OriYoung với thông tin mã
            đơn hàng hoặc số điện thoại đặt hàng, chăm sóc khách hàng sẽ gửi đến
            khách hàng mã vận đơn trong thời gian sớm nhất.
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-4">
            Hỏi:
            <span className="font-bold">Khung giờ giao hàng của OriYoung?</span>
          </div>
          <div className="mb-4">
            Đáp: OriYoung giao giờ hành chính, một số khu vực có thể hỗ trợ giao
            tối cho khách hàng. OriYoung không cam kết có thể hỗ trợ các trường
            hợp giao tối 100% tuy nhiên OriYoung chắc chắn sẽ làm mọi cách có
            thể hỗ trợ cho khách hàng.
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-4">
            Hỏi:
            <span className="font-bold">Thế nào là đơn hàng 2 chiều?</span>
          </div>
          <div className="mb-4">
            Đáp: Đơn hàng 2 chiều điển hình ở đơn đổi hàng ở OriYoung, khách
            hàng sẽ nhận hàng mới và đồng thời gửi hàng đổi cho bưu tá giao
            hàng.
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-4">
            Hỏi:
            <span className="font-bold">
              Tôi đổi hàng tại kho có tính ship không?
            </span>
          </div>
          <div className="mb-4">
            Đáp: Không. OriYoung luôn hỗ trợ khách hàng với trải nghiệm tốt
            nhất, khách hàng có thể báo với Coolmate về tình trạng đổi của đơn
            hàng OriYoung sẽ đóng sẵn hàng khách hàng chỉ cần ghé kho và đổi
            hàng ngay.
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-4">
            Hỏi:
            <span className="font-bold">
              ôi trả hàng, OriYoung hoàn tiền cho tôi như thế nào?
            </span>
          </div>
          <div className="mb-4">
            Đáp: Tại OriYoung, ngay khi có yêu cầu trả hàng hoàn tiền, chúng tôi
            sẽ hoàn tiền cho khách hàng trong vòng 24h, hàng sẽ được nhận lại
            sau đó. Cụ thể: Bước 1: Khách hàng thông báo với OriYoung về đơn
            hàng cần trả tại đây. Sau khi nhận thông tin OriYoung sẽ liên hệ xác
            nhận và thực hiện thủ tục hoàn tiền qua STK Ngân hàng – tiền sẽ được
            hoàn trong tối đa 24h (không tính thứ 7 và chủ nhật). Bạn lưu ý giúp
            OriYoung, các yêu cầu hoàn tiền được tổng hợp muộn nhất là 16h hàng
            ngày. Các yêu cầu hoàn tiền sau 16h được chuyển vào ngày hôm sau nên
            chậm nhất là ngày hôm sau khách nhận được tiền. Bước 2: OriYoung
            nhận lại hàng trả bằng 2 cách: OriYoung đến tận nơi lấy hàng hoặc
            khách hàng gửi trả hàng.
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-4">
            Hỏi:
            <span className="font-bold">
              Tôi muốn thay đổi thông tin với đơn hàng đã đặt (SĐT nhận hàng,
              địa chỉ, hình thức thanh toán,...)
            </span>
          </div>
          <div className="mb-4">
            Đáp: Khách hàng inbox vào fanpage OriYoung hoặc gọi hotline 1900
            272737 để chăm sóc khách hàng hỗ trợ thay đổi thông tin đơn hàng của
            khách hàng.
          </div>
        </div>
        <div className="mb-10">
          <div className="mb-4">
            Hỏi:
            <span className="font-bold">
              Tôi muốn huỷ đơn hàng đã thanh toán trước?
            </span>
          </div>
          <div className="mb-4">
            Đáp: Hiện tại OriYoung chưa thể hoàn tiền tự động cho khách hàng.
            Khách hàng điền thông tin ở đây hoặc inbox Fanpage hoặc gọi hotline
            1900 1818 1818, OriYoung sẽ hoàn lại tiền trong vòng 24h sau khi
            nhận được thông tin.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Faq;
