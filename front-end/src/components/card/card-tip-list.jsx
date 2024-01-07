import CardTipItem from "./card-tip-item";

const CardTipList = () => {
  return (
    <div className="gap-6 container mx-auto grid grid-cols-3 items-stretch">
      <CardTipItem
        title="Thoa kem chống nắng đúng cách"
        description="Thoa kem chống nắng đúng cách là một bước quan trọng để bảo vệ da khỏi tác động của tia UV."
        image="/images/tips-img-1.png"
      />
      <CardTipItem
        title="“Chấp” các loại kem chống nắng bóng dầu"
        description="Lựa chọn kem chống nắng có công thức nhẹ, không gây cảm giác nặng nề hoặc bết dính trên da."
        image="/images/tips-img-2.png"
      />
      <CardTipItem
        title="AHAs - Phân loại và các sản phẩm nổi bật"
        description="AHAs (Alpha Hydroxy Acids) là một nhóm axit hữu cơ được sử dụng phổ biến trong sản phẩm chăm sóc da. Chúng giúp loại bỏ tế bào chết và cải thiện tình trạng da..."
        image="/images/blog-3.png"
      />
      <CardTipItem
        title="Những điều nên biết trước khi peel da tại nhà"
        description="Peeling da tại nhà có thể là một phương pháp hiệu quả để loại bỏ tế bào chết và cải thiện tình trạng da."
        image="/images/blog-4.png"
      />
      <CardTipItem
        title="Các cách loại bỏ lông phổ biến"
        description="Điều này có thể giúp bạn cảm thấy tự tin hơn về ngoại hình của mình."
        image="/images/blog-5.png"
      />
      <CardTipItem
        title="Phân biệt 5 loại kem dưỡng Bioderma"
        description="Không chỉ nổi danh với các sản phẩm tẩy trang, nhà Bioderma vốn được các bác sĩ da liễu dành tình yêu thương đặc biệt nhờ dòn…"
        image="/images/blog-6.png"
      />
    </div>
  );
};

export default CardTipList;
