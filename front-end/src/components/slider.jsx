import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Slider = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <Carousel
      // swipeable={false}
      // draggable={false}
      showDots={true}
      responsive={responsive}
      centerMode={true}
      // infinite={true}
      // autoPlaySpeed={1000}
      // keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      // containerClass="carousel-container"
      // removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
      // dotListClass="custom-dot-list-style"
      // itemClass="carousel-item-padding-40-px"
    >
      <div className="w-[160px] h-[160px] min-w-[160px] min-h-[160px] bg-gray-500 rounded-full flex items-center justify-center">
        Item 1
      </div>
      <div className="w-[160px] h-[160px] min-w-[160px] min-h-[160px] bg-gray-500 rounded-full flex items-center justify-center">
        Item 2
      </div>
      <div className="w-[160px] h-[160px] min-w-[160px] min-h-[160px] bg-gray-500 rounded-full flex items-center justify-center">
        Item 3
      </div>
      <div className="w-[160px] h-[160px] min-w-[160px] min-h-[160px] bg-gray-500 rounded-full flex items-center justify-center">
        Item 4
      </div>
      <div className="w-[160px] h-[160px] min-w-[160px] min-h-[160px] bg-gray-500 rounded-full flex items-center justify-center">
        Item 5
      </div>
      <div className="w-[160px] h-[160px] min-w-[160px] min-h-[160px] bg-gray-500 rounded-full flex items-center justify-center">
        Item 6
      </div>
      <div className="w-[160px] h-[160px] min-w-[160px] min-h-[160px] bg-gray-500 rounded-full flex items-center justify-center">
        Item 7
      </div>
      <div className="w-[160px] h-[160px] min-w-[160px] min-h-[160px] bg-gray-500 rounded-full flex items-center justify-center">
        Item 8
      </div>
    </Carousel>
  );
};

export default Slider;
