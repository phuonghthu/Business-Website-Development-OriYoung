import Footer from "../components/footer";
import Header from "../components/header";
import Navbar from "../components/navbar";

const Blogs = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="container mx-auto my-10">
        <div className="bg-[#B2D38E17] mb-6 font-bold p-2 rounded-lg text-primary-color text-center text-3xl mx-4 md:mx-0">
          “Không chỉ nỗ lực và quan tâm
          đến vẻ đẹp của khách hàng,
          OriYoung còn hành động tích
          cực vì xã hội, đại diện cho
          thế hệ làm đẹp có ý thức“
        </div>
        <div className="mx-4 md:mx-10">
          <h2 className="font-bold text-center text-4xl mb-10">
            Ori và những con số
          </h2>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-t-red text-4xl font-bold">
                5000
              </p>
              <div className="font-bold">
                Đơn hàng trong Quý
                IV/2022
              </div>
            </div>
            <div className="text-center">
              <p className="text-t-red text-4xl font-bold">
                3500
              </p>
              <div className="font-bold">
                Khách hàng hài lòng
              </div>
            </div>
            <div className="text-center">
              <p className="text-t-red text-4xl font-bold">
                15000
              </p>
              <div className="font-bold">
                Lượt truy cập website{" "}
              </div>
            </div>
          </div>
        </div>
        <h2 className="font-bold text-center text-4xl mb-10 mt-10 mx-4 md:mx-0">
          Ori và hoạt động vì xã hội
        </h2>
        <div className="flex flex-col gap-4 mx-5 md:mx-10">
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <img
              className="md:w-[50%]"
              src="/images/blog-img-1.png"
            />
            <div className="flex  flex-col justify-center">
              <h3 className="text-4xl text-primary-color font-bold mb-6">
                #1. Beauty Loving
              </h3>
              <div>
                Ori Young không chỉ tập
                trung vào việc cải thiện
                và nâng cao vẻ đẹp của
                khách hàng mà còn chú
                trọng đến việc chung tay
                xây dựng một xã hội tốt
                đẹp hơn. Chúng tôi đại
                diện cho giá trị làm đẹp
                có ý thức, không chỉ đơn
                thuần là sự yêu thích vẻ
                đẹp mà còn là sự quan
                tâm đến cộng đồng. Với
                OriYoung, làm đẹp không
                chỉ là một sứ mệnh cá
                nhân, mà còn là một lối
                sống. Chúng tôi tin rằng
                bằng tình yêu và quan
                tâm đến vẻ đẹp của mỗi
                người, chúng ta có thể
                tạo nên một xã hội đẹp
                hơn, tươi đẹp hơn và
                tràn đầy niềm vui.
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex  flex-col justify-center">
              <h3 className="text-4xl text-primary-color font-bold mb-6">
                #2. Society Caring
              </h3>
              <div>
                Không chỉ nỗ lực và quan
                tâm đến vẻ đẹp của khách
                hàng, OriYoung còn hành
                động tích cực vì xã hội;
                đại diện cho giá trị làm
                đẹp có ý thức. Ori cam
                kết đóng góp tích cực
                vào cộng đồng và làm
                việc để xây dựng một xã
                hội tốt đẹp hơn.
                OriYoung thực hiện các
                hoạt động và chương
                trình để hỗ trợ và nâng
                cao chất lượng cuộc sống
                của cộng đồng, như hỗ
                trợ giáo dục, bảo vệ môi
                trường, và bình đẳng
                giới.
              </div>
            </div>
            <img src="/images/blog-img-2.png" />
          </div>
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <img
              className="md:w-[50%]"
              src="/images/blog-img-3.png"
            />
            <div className="flex flex-col justify-center">
              <h3 className="text-4xl text-primary-color font-bold mb-6">
                #3. Nature and Ori’s
                Home
              </h3>
              <div>
                OriYoung không ngừng nỗ
                lực và hành động tích
                cực để góp phần vào việc
                cải thiện xã hội. Chúng
                tôi thấu hiểu rằng làm
                đẹp không chỉ đơn thuần
                là vẻ bề ngoài, mà còn
                là một sự tự tin và tự
                yêu thương. Vì vậy,
                OriYoung luôn đồng hành
                cùng các hoạt động từ
                thiện và các dự án xã
                hội, nhằm mang lại niềm
                vui và sự tự tin cho
                cộng đồng. Đội ngũ nhân
                viên chuyên nghiệp và
                giàu kinh nghiệm của
                chúng tôi sẽ luôn đồng
                hành cùng bạn trên con
                đường chăm sóc vẻ đẹp và
                xây dựng một xã hội tốt
                đẹp hơn.
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <h2 className="text-t-red text-4xl font-bold mb-10 text-center">
            Đội ngũ Ori
          </h2>
          <div className="flex items-center gap-4 justify-evenly">
            <div className="w-[200px] h-[200px] rounded bg-primary-color"></div>
            <div className="w-[200px] h-[200px] rounded bg-primary-color"></div>
            <div className="w-[200px] h-[200px] rounded bg-primary-color"></div>
            <div className="w-[200px] h-[200px] rounded bg-primary-color"></div>
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
