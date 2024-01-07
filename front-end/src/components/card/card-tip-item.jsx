import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CardTipItem = ({ title, description, image }) => {
  return (
    <Link
      to="/tips"
      className="flex flex-col gap-4 overflow-hidden shadow-md rounded-xl"
    >
      <div className="relative">
        <a href="#">
          <img className="w-full" alt="Sunset in the mountains" src={image} />
          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0  opacity-25"></div>
        </a>
      </div>
      <div className="px-4 py-3 flex flex-col gap-2 grow">
        <h3 className="text-xl font-semibold text-[#222529]">{title}</h3>
        <p className="text-base text-[#222529] flex-1">{description}</p>
        <Link to="/tips" className="text-base text-primary-color">
          Xem thêm...
        </Link>
      </div>
    </Link>
  );
};

export default CardTipItem;
