import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import { Avatar, Button, Dropdown, AutoComplete, message, Badge } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { productsApi } from "../api/products";
import { debounce } from "lodash";
import { useProfile } from "../hooks/user/use-profile";
import { useCarts } from "../hooks/cart/use-carts";

const isAuthentication = () => {
  const user = localStorage.getItem("skinFoodShopUser");
  return Boolean(user);
};

const items = [
  {
    key: "account",
    label: "Tài khoản",
  },
  {
    key: "management",
    label: "Quản lý",
  },
  {
    key: "logout",
    label: "Sign out",
  },
];

const user = JSON.parse(localStorage.getItem("skinFoodShopUser"));

// eslint-disable-next-line react/prop-types
const CartWrapper = ({ children }) => {
  const { data: carts } = useCarts();
  if (!carts?.data || !isAuthentication()) return children;
  return <Badge count={carts?.data?.length}>{children}</Badge>;
};

const Header = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [completedOptions, setCompletedOptions] = useState([]);

  const { data } = useProfile();

  const logout = ({ key }) => {
    if (key === "logout") {
      localStorage.removeItem("skinFoodShopUser");
      navigate("/");
    }
    if (key === "account") {
      navigate("/profile");
    }
    if (key === "management") {
      navigate("/admin/products");
    }
  };
  const searchHandler = async (key) => {
    try {
      const response = await productsApi.getProductsByName(key);
      const mapped = response.data.map((item) => ({
        label: item.name,
        value: item._id,
      }));
      setCompletedOptions(mapped);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = (value) => {
    setSearch(value);
  };

  const onSelect = (value) => {
    setSearch("");
    navigate(`/products/${value}`);
  };

  const onCartClick = () => {
    if (!isAuthentication()) {
      messageApi.warning("Bạn phải đăng nhập để mua hàng");
      return;
    }
    navigate("/cart");
  };

  useEffect(() => {
    if (!search) return;
    const delayed = debounce(searchHandler, 500);
    delayed(search);
  }, [search]);

  return (
    <div className="container mx-auto flex items-center h-[84px] justify-between px-4 sm:px-6 lg:px-8 border-b border-primary-color">
      {contextHolder}
      <Link to="/">
        <img className="h-[80px]" src="/images/logo.png" alt="Logo" />
      </Link>
      <div className="flex items-center gap-4">
        <AutoComplete
          value={search}
          onChange={onSearch}
          size="large"
          style={{
            width: 200,
          }}
          placeholder="Tìm kiếm"
          options={completedOptions}
          onSelect={onSelect}
        />

        <div className="cursor-pointer h-[48px] w-[48px] min-h-[48px] min-w-[48px] rounded-full bg-primary-color flex items-center justify-center">
          <HeartIcon stroke="white" />
        </div>
        <CartWrapper>
          <div className="cursor-pointer h-[48px] w-[48px] min-h-[48px] min-w-[48px] rounded-full bg-primary-color flex items-center justify-center">
            <ShoppingCartIcon stroke="white" onClick={onCartClick} />
          </div>
        </CartWrapper>
        <div>
          {isAuthentication() ? (
            <div className="  flex items-center gap-2">
              <div className="flex flex-col items-end">
                <div>Hi,</div>
                <div className="font-bold text-secondary-t-black">
                  {data?.data?.name ?? "Người dùng"}
                </div>
              </div>
              <Dropdown menu={{ items, onClick: logout }} trigger={["click"]}>
                <Avatar size="large" src={user?.avatar} />
              </Dropdown>
            </div>
          ) : (
            <Button
              size="large"
              type="primary"
              onClick={() => navigate("/sign-in")}
            >
              Đăng nhập
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
