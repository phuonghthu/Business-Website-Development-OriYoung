import { Link, Outlet, Navigate, useNavigate, NavLink } from "react-router-dom";
import {
  ShoppingBagIcon,
  TablePropertiesIcon,
  CircleUserIcon,
} from "lucide-react";
import { Input, Avatar, Dropdown } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const items = [
  {
    key: "logout",
    label: "Sign out",
  },
];

const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("skinFoodShopUser"));
  return user && user.role === "admin";
};

const getUserInfo = () => {
  const user = JSON.parse(localStorage.getItem("skinFoodShopUser"));
  return user;
};

const AdminLayout = () => {
  const navigate = useNavigate();

  const logout = ({ key }) => {
    if (key === "logout") {
      localStorage.removeItem("skinFoodShopUser");
      navigate("/admin/sign-in");
    }
  };

  if (!isAuthenticated()) {
    return <Navigate to="/admin/sign-in" />;
  }
  return (
    <div className="h-screen w-full flex">
      <div className="min-w-[200px] bg-[#F9FBF6] px-4">
        <Link to="/">
          <img className="w-[200px]" src="/images/logo-green.png" alt="Logo" />
        </Link>
        <div>
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive
                    ? "bg-primary-color text-white flex items-center gap-2 rounded p-2 cursor-pointer"
                    : "flex items-center gap-2 rounded p-2 cursor-pointer";
                }}
                to="/admin/products"
              >
                <ShoppingBagIcon size={16} /> Sản phẩm
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive
                    ? "bg-primary-color text-white flex items-center gap-2 rounded p-2 cursor-pointer"
                    : "flex items-center gap-2 rounded p-2 cursor-pointer";
                }}
                to="/admin/categories"
              >
                <TablePropertiesIcon size={16} /> Danh mục
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive
                    ? "bg-primary-color text-white flex items-center gap-2 rounded p-2 cursor-pointer"
                    : "flex items-center gap-2 rounded p-2 cursor-pointer";
                }}
                to="/admin/users"
              >
                <CircleUserIcon size={16} /> Khách hàng
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-2 flex-1">
        <div className="flex items-center justify-between">
          <div>
            <Input
              prefix={<SearchOutlined />}
              size="large"
              placeholder="Tìm kiếm"
            />
          </div>

          <div className="  flex items-center gap-2">
            <div className="flex flex-col items-end">
              <div>Hi,</div>
              <div className="font-bold text-secondary-t-black">
                {getUserInfo()?.name ?? ""}
              </div>
            </div>
            <Dropdown menu={{ items, onClick: logout }} trigger={["click"]}>
              <Avatar size="large" src={getUserInfo()?.avatar ?? ""} />
            </Dropdown>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
