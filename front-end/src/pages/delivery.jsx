import Footer from "../components/footer";
import Header from "../components/header";
import Navbar from "../components/navbar";

const Delivery = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="container mx-auto">
        <div className="mx-4 md:mx-0">
          <h1 className="font-bold text-4xl mb-6">
            Dịch vụ giao hàng OriYoung{" "}
          </h1>
          <div className="mb-6">
            Giao hàng nhanh và đúng hẹn
            cho 95% đơn hàng là mục tiêu
            mà đội ngũ vận hành của
            OriYoung hướng tới. Khách
            hàng hãy tin ở OriYoung,
            chúng tôi sẽ làm được!
          </div>
          <h3 className="text-lg text-bold font-bold mb-6">
            ORIYOUNG CÓ HAI TRUNG TÂM
            VẬN HÀNH
          </h3>
          <ul className="list-disc list-inside mb-6">
            <li>
              Các đơn hàng phát sinh từ
              Đà Nẵng trở ra khu vực
              phía Bắc sẽ được gửi đi từ
              trung tâm vận hành phía
              Bắc của OriYoung.
            </li>
            <li>
              Các đơn còn lại sẽ được
              đóng gói và vận chuyển từ
              trung tâm phía Nam
            </li>
          </ul>
          <h3 className="text-lg text-bold font-bold mb-6">
            THỜI GIAN VẬN CHUYỂN TRUNG
            BÌNH
          </h3>
          <ul className="list-disc list-inside mb-6">
            <li>
              <span className="font-bold">
                Đơn nội thành Hà Nội và
                Hồ Chí Minh:
              </span>
              Khách hàng sẽ nhận được
              trong vòng 1 -2 ngày kể từ
              khi đơn hàng được xác nhận
              (trừ trường hợp đơn hàng
              dạng đặt trước hoặc chưa
              đủ tồn kho, OriYoung sẽ
              gửi đi từ kho vận hành
              khác tỉnh và CSKH của
              OriYoung sẽ thông báo cho
              khách hàng về vấn đề này).
              Thông thường có thể sớm
              hơn tuỳ thuộc vào thời
              gian khách hàng đặt (Không
              tính chủ nhật và ngày lễ)
            </li>
            <li>
              <span className="font-bold">
                Các khu vực khác:
              </span>
              2-5 ngày (thường là 2-4
              ngày), nếu sau 3 ngày kể
              từ khi đặt hàng mà Anh/Chị
              chưa nhận được cuộc gọi
              giao hàng của bưu tá thì
              vui lòng xin liên hệ
              Coolmate để được hỗ trợ
              (không bao gồm chủ nhật và
              ngày lễ).
            </li>
          </ul>
          <div className="mb-6">
            <span className="text-3xl font-bold">
              LƯU Ý:
            </span>{" "}
            Trong trường hợp khách hàng
            cần nhận hàng gấp thì có thể
            liên hệ Hotline OriYoung
            xxxx xxxx để được hỗ trợ.
            OriYoung không cam kết có
            thể hỗ trợ các trường hợp
            khẩn cấp 100%, tuy nhiên
            OriYoung chắc chắn sẽ làm
            mọi cách có thể để giúp
            khách hàng giải quyết công
            việc của mình.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Delivery;
