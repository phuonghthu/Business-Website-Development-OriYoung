import { MailIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Collapse } from "antd";

const Footer = () => {
  const items = [
    {
      key: "1",
      label: "VỀ ORIYOUNG",
      children: (
        <Link
          to="/about-ori"
          className="text-white text-base"
          style={{
            color: "white",
            paddingLeft: "26px",
          }}
        >
          Chuyện nhà Ori
        </Link>
      ),
    },
    {
      key: "2",
      label: "CHÍNH SÁCH",
      children: (
        <div className="flex flex-col gap-2">
          <Link
            to="/policy"
            className="text-white text-base"
            style={{
              color: "white",
              paddingLeft: "26px",
            }}
          >
            Chính sách đổi trả
          </Link>
          <Link
            to="/delivery"
            className="text-white text-base"
            style={{
              color: "white",
              paddingLeft: "26px",
            }}
          >
            Chính sách giao hàng
          </Link>
          <Link
            to="/private-policy"
            className="text-white text-base"
            style={{
              color: "white",
              paddingLeft: "26px",
            }}
          >
            Chính sách bảo mật
          </Link>
        </div>
      ),
    },
    {
      key: "3",
      label: "CHĂM SÓC KHÁCH HÀNG",
      children: (
        <div className="flex flex-col gap-2">
          <Link
            to="/faq"
            className="text-white text-base"
            style={{
              color: "white",
              paddingLeft: "26px",
            }}
          >
            Hỏi đáp - FAQs
          </Link>
          <Link
            to="/contact"
            className="text-white text-base"
            style={{
              color: "white",
              paddingLeft: "26px",
            }}
          >
            Liên hệ
          </Link>
        </div>
      ),
    },
  ];
  return (
    <div className="bg-primary-color">
      <div className="container mx-auto  pt-12 pb-1 px-4">
        <div className="bg-white flex flex-col md:flex-row text-center md:text-start items-center justify-between px-12 py-6 rounded mb-10">
          <div>
            <div className="text-sm font-bold">
              NHẬN BẢN TIN LÀM ĐẸP
            </div>
            <div className="text-xs w-full text-secondary-t-black">
              Đừng bỏ lỡ hàng ngàn sản
              phẩm và chương trình siêu
              hấp dẫn
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="group relative">
              <MailIcon
                size={20}
                strokeWidth={1.5}
                className="absolute left-3 top-1/2 -mt-2.5  pointer-events-none "
              />
              <input
                className="focus:ring-2 focus:ring-transparent focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900  rounded-xl py-2 pl-10 ring-1 ring-transparent"
                type="text"
                aria-label="email"
                placeholder="Điền email của bạn..."
              />
            </div>
            <button className="font-bold text-[#697077] text-xs">
              THEO DÕI
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-4 md:gap-6 pb-12 border-b border-white">
          <div className="flex justify-between md:flex-col md:gap-6">
            <div className="relative -top-[10px] w-full flex justify-center md:justify-start">
              <img
                className="w-[230px] h-[90px]"
                src="/images/logo-white.png"
                alt="Logo"
              />
              <div className="hidden md:block absolute bottom-0 left-0 text-white font-semibold">
                Kết nối với Ori
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <a href="">
                <img
                  className="w-6 h-6 min-w-6 min-h-6"
                  src="/images/facebook-icon.png"
                  alt="Facebook Logo"
                />
              </a>
              <a href="#">
                <img
                  className="w-6 h-6 min-w-6 min-h-6"
                  src="/images/tiktok-icon.png"
                  alt="TikTok Logo"
                />
              </a>
              <a href="#">
                <img
                  className="w-6 h-6 min-w-6 min-h-6"
                  src="/images/instagram-icon.png"
                  alt="Instagram Logo"
                />
              </a>
            </div>
          </div>
          <div className="mb-10 flex md:hidden flex-row justify-center items-center gap-4">
            <div className=" text-white text-lg font-semibold">
              Kết nối với Ori
            </div>
            <a href="">
              <img
                className="w-6 h-6 min-w-6 min-h-6"
                src="/images/facebook-icon.png"
                alt="Facebook Logo"
              />
            </a>
            <a href="#">
              <img
                className="w-6 h-6 min-w-6 min-h-6"
                src="/images/tiktok-icon.png"
                alt="TikTok Logo"
              />
            </a>
            <a href="#">
              <img
                className="w-6 h-6 min-w-6 min-h-6"
                src="/images/instagram-icon.png"
                alt="Instagram Logo"
              />
            </a>
          </div>
          <Collapse
            className="md:hidden"
            ghost
            items={items}
            size="middle"
            style={{
              fontSize: "18px",
            }}
          />
          <div className="hidden md:flex flex-col gap-3 ">
            <h3 className="text-white text-base font-bold mb-2">
              VỀ ORIYOUNG
            </h3>
            <Link
              to="/about-ori"
              className="text-white text-base"
            >
              Chuyện nhà Ori
            </Link>
          </div>
          <div className="hidden md:flex flex-col gap-3">
            <h3 className="text-white text-base font-bold mb-2">
              CHÍNH SÁCH
            </h3>
            <Link
              to="/policy"
              className="text-white text-base"
            >
              Chính sách đổi trả
            </Link>
            <Link
              to="/delivery"
              className="text-white text-base"
            >
              Chính sách giao hàng
            </Link>
            <Link
              to="/private-policy"
              className="text-white text-base"
            >
              Chính sách bảo mật
            </Link>
          </div>
          <div className="hidden md:flex flex-col gap-3">
            <h3 className="text-white text-base font-bold mb-2">
              CHĂM SÓC KHÁCH HÀNG
            </h3>
            <Link
              to="/faq"
              className="text-white text-base"
            >
              Hỏi đáp - FAQs
            </Link>
            <Link
              to="/contact"
              className="text-white text-base"
            >
              Liên hệ
            </Link>
            {/* <a href="#" className="text-white text-base">
              Địa chỉ: 669 QL1A, khu phố 3, Thủ Đức, Thành phố Hồ Chí Minh
            </a>
            <a href="#" className="text-white text-base">
              Số điện thoại: 9999999999
            </a>
            <a href="#" className="text-white text-base">
              Email: contact@ori.com
            </a> */}
          </div>
        </div>
        <div className="text-base font-semibold text-white mt-12 text-center mb-12">
          Copyright © 2023 ORIYOUNG. All
          rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
