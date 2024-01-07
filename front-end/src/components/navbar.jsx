import { ChevronDownIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";
import { useCategories } from "../hooks/use-categories";

const Navbar = () => {
  const { data } = useCategories();

  const categories = (data?.data ?? [])?.map((item) => {
    return {
      key: item.id,
      label: <Link to={`/products?category=${item.name}`}>{item.name}</Link>,
    };
  });

  return (
    <nav className="container mx-auto flex justify-center items-center bg-white py-4 px-10">
      <ul className="flex items-center gap-8">
        <li className="hover:text-primary-color font-bold text-xl">
          <Link to="/">Trang chủ</Link>
        </li>
        <li className="hover:text-primary-color font-bold text-xl">
          <Dropdown menu={{ items: categories }}>
            <Link to="/products" className="flex items-center gap-1">
              Sản phẩm <ChevronDownIcon size={18} />
            </Link>
          </Dropdown>
        </li>
        <li className="hover:text-primary-color font-bold text-xl">
          <Link to="/tips">Beauty Tips</Link>
        </li>
        <li className="hover:text-primary-color font-bold text-xl">
          <Link to="/about-ori">Chuyện nhà Ori</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
