import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import "./Contact.css";

const Contact = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="container mx-auto">
        <div className="bt-form-contact-simple flex flex-col md:flex-row lg:px-[4rem] xl:px-0">
          <div className="contact-item">
            <h2 className="contact-title">
              Liên hệ với chúng tôi
            </h2>
            <form
              className="form"
              autoComplete="off"
            >
              <div className="form-group-wrap">
                <div className="form-group">
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Họ và tên"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Số điện thoại"
                    className="form-input"
                    onInput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(..*?)..*/g, '$1');"
                  />
                </div>
              </div>
              <div className="form-group-wrap">
                <div className="form-group">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Địa chỉ"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="emailInfo"
                    id="emailInfo"
                    placeholder="Email"
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Tiêu đề"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <textarea
                  name="content"
                  id="content"
                  placeholder="Nội dung"
                  className="form-input form-content"
                ></textarea>
              </div>
              <div className="form-btn-wrap">
                <button
                  type="submit"
                  id="btnSubmit"
                  className="form-btn form-btn--submit"
                >
                  Gửi đi
                </button>
                <button
                  type="button"
                  id="btnRest"
                  className="form-btn form-btn--reset"
                >
                  Làm lại
                </button>
              </div>
            </form>
          </div>
          <div className="contact-item">
            <h2 className="contact-title">
              Thông tin
            </h2>
            {/* <p className="desc-info">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              aliquid amet
            </p> */}
            <ul className="info-list">
              <li className="info-item">
                <span className="icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.5904 22.2957C16.1746 20.1791 21 15.4917 21 10C21 5.02944 16.9706 1 12 1C7.02944 1 3 5.02944 3 10C3 15.4917 7.82537 20.1791 10.4096 22.2957C11.3466 23.0631 12.6534 23.0631 13.5904 22.2957ZM12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
                <p className="info-text">
                  <span>Địa chỉ:</span>
                  669 QL1A, khu phố 3,
                  Thủ Đức, Thành phố Hồ
                  Chí Minh
                </p>
              </li>
              <li className="info-item">
                <span className="icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1_27)">
                      <path
                        d="M21.3902 19.5804L19.4852 21.4853C19.4852 21.4853 14.5355 23.6066 7.46441 16.5356C0.39334 9.46451 2.51466 4.51476 2.51466 4.51476L4.41959 2.60983C5.28021 1.74921 6.70355 1.85036 7.43381 2.82404L9.25208 5.24841C9.84926 6.04465 9.77008 7.15884 9.06629 7.86262L7.46441 9.46451C7.46441 9.46451 7.46441 10.8787 10.2928 13.7071C13.1213 16.5356 14.5355 16.5356 14.5355 16.5356L16.1374 14.9337C16.8411 14.2299 17.9553 14.1507 18.7516 14.7479L21.1759 16.5662C22.1496 17.2964 22.2508 18.7198 21.3902 19.5804Z"
                        fill="currentColor"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_1_27">
                        <rect
                          width="24"
                          height="24"
                          fill="currentColor"
                        ></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <p className="info-text">
                  <span>
                    Số điện thoại:
                  </span>
                  0987654321
                </p>
              </li>
              <li className="info-item">
                <span className="icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 3C2.34315 3 1 4.34315 1 6V18C1 19.6569 2.34315 21 4 21H20C21.6569 21 23 19.6569 23 18V6C23 4.34315 21.6569 3 20 3H4ZM6.64021 7.2318C6.21593 6.87824 5.58537 6.93556 5.2318 7.35984C4.87824 7.78412 4.93556 8.41468 5.35984 8.76825L10.0795 12.7013C11.192 13.6284 12.808 13.6284 13.9206 12.7013L18.6402 8.76825C19.0645 8.41468 19.1218 7.78412 18.7682 7.35984C18.4147 6.93556 17.7841 6.87824 17.3598 7.2318L12.6402 11.1648C12.2694 11.4739 11.7307 11.4739 11.3598 11.1648L6.64021 7.2318Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
                <p className="info-text">
                  <span>email:</span>
                  contact@ori.com
                </p>
              </li>
            </ul>
            <div className="google-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2257958061973!2d106.77572991165786!3d10.870423489239483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175277dbe056e7b%3A0xb8a4ab9c55765e96!2zNjY5IFFMMUEsIGtodSBwaOG7kSAzLCBUaOG7pyDEkOG7qWMsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1704383139992!5m2!1sen!2s"
                width="600"
                height="450"
                allowfullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
