import {
  HeartIcon,
  ShoppingCartIcon,
  Menu,
} from "lucide-react";
import {
  Avatar,
  Button,
  Dropdown,
  AutoComplete,
  message,
  Badge,
  Drawer,
  Space,
  Collapse,
  Divider,
} from "antd";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import {
  useEffect,
  useState,
} from "react";
import { productsApi } from "../api/products";
import { debounce } from "lodash";
import { useProfile } from "../hooks/user/use-profile";
import { useCarts } from "../hooks/cart/use-carts";
import { useCategories } from "../hooks/use-categories";

const isAuthentication = () => {
  const user = localStorage.getItem(
    "skinFoodShopUser"
  );
  return Boolean(user);
};

const items = [
  {
    key: "account",
    label: "Tài khoản",
  },
  // {
  //   key: "management",
  //   label: "Quản lý",
  // },
  {
    key: "logout",
    label: "Đăng xuất",
  },
];

const user = JSON.parse(
  localStorage.getItem(
    "skinFoodShopUser"
  )
);

// eslint-disable-next-line react/prop-types
const CartWrapper = ({ children }) => {
  const { data: carts } = useCarts();
  if (
    !carts?.data ||
    !isAuthentication()
  )
    return children;
  return (
    <Badge count={carts?.data?.length}>
      {children}
    </Badge>
  );
};

const Header = () => {
  const { data: categoriesList } =
    useCategories();
  const categories = (
    categoriesList?.data ?? []
  )?.map((item) => {
    return {
      key: item.id,
      tittle: item.name,
      link: `/products?category=${item.name}`,
    };
  });
  const productCollapse = [
    {
      key: "1",
      label: "Sản Phẩm",
      children: (
        <ul>
          <li
            key={"all"}
            className="px-4 pb-2"
          >
            <Link
              to={"/products"}
              style={{
                color: "white",
              }}
            >
              {"Tất cả sản phẩm"}
            </Link>
          </li>
          {categories &&
            categories.map((item) => {
              return (
                <li
                  key={item.key}
                  className="px-4 pb-2"
                >
                  <Link
                    to={item.link}
                    style={{
                      color: "white",
                    }}
                  >
                    {item.tittle}
                  </Link>
                </li>
              );
            })}
        </ul>
      ),
    },
  ];

  const [open, setOpen] =
    useState(false);
  const [messageApi, contextHolder] =
    message.useMessage();
  const navigate = useNavigate();
  const [search, setSearch] =
    useState("");
  const [
    completedOptions,
    setCompletedOptions,
  ] = useState([]);

  const showDrawer = () => {
    console.log("Clicked");
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const { data } = useProfile();

  const logout = ({ key }) => {
    if (key === "logout") {
      localStorage.removeItem(
        "skinFoodShopUser"
      );
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
      const response =
        await productsApi.getProductsByName(
          key
        );
      const mapped = response.data.map(
        (item) => ({
          label: item.name,
          value: item._id,
        })
      );
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
      messageApi.warning(
        "Bạn phải đăng nhập để mua hàng"
      );
      return;
    }
    navigate("/cart");
  };

  useEffect(() => {
    if (!search) return;
    const delayed = debounce(
      searchHandler,
      500
    );
    delayed(search);
  }, [search]);

  return (
    <>
      <header className="sticky md:static top-0 bg-white z-50 container mx-auto flex items-center h-[84px] justify-between px-4 sm:px-6 lg:px-8 border-b border-primary-color">
        {contextHolder}
        <div className="md:hidden min-w-[104px]">
          <Button
            type="ghost"
            onClick={showDrawer}
            style={{
              height: "fit-content",
            }}
          >
            <Menu className="w-[28px] h-[28px] text-primary-color" />
          </Button>
          <Drawer
            drawerStyle={{
              background: "#84BC4E",
            }}
            placement="left"
            width={500}
            onClose={onClose}
            open={open}
            extra={
              <Space>
                <img
                  className="w-[230px] h-[90px]"
                  src="../../public/images/logo-white.png"
                  alt="Logo"
                />
              </Space>
            }
          >
            <nav>
              <ul className="text-xl">
                <li className="px-4 py-3">
                  <Link
                    to={"/"}
                    style={{
                      color: "white",
                    }}
                  >
                    Trang chủ
                  </Link>
                </li>
                <Collapse
                  style={{
                    fontSize: "20px",
                  }}
                  ghost
                  expandIconPosition="end"
                  items={
                    productCollapse
                  }
                  defaultActiveKey={[
                    "1",
                  ]}
                />
                <li className="px-4 py-3">
                  <Link
                    to="/tips"
                    style={{
                      color: "white",
                    }}
                  >
                    Beauty Tips
                  </Link>
                </li>
                <li className="px-4 py-3">
                  <Link
                    to="/about-ori"
                    style={{
                      color: "white",
                    }}
                  >
                    Chuyện nhà Ori
                  </Link>
                </li>
              </ul>
              <Divider />
              <div className="block md:hidden">
                {isAuthentication() ? (
                  <div className="  flex items-center gap-2 text-white">
                    <div className="flex flex-col items-end">
                      <div>Hi,</div>
                      <div className="font-bold">
                        {data?.data
                          ?.name ??
                          "Người dùng"}
                      </div>
                    </div>
                    <Dropdown
                      menu={{
                        items,
                        onClick: logout,
                      }}
                      trigger={[
                        "click",
                      ]}
                    >
                      <Avatar
                        size="large"
                        src={
                          user?.avatar
                        }
                      />
                    </Dropdown>
                  </div>
                ) : (
                  <Button
                    size="large"
                    type="primary"
                    onClick={() =>
                      navigate(
                        "/sign-in"
                      )
                    }
                    style={{
                      fontSize: "22px",
                      color: "white",
                      fontWeight: "800",
                    }}
                  >
                    Đăng nhập
                  </Button>
                )}
              </div>
            </nav>
          </Drawer>
        </div>
        <div className="">
          <Link
            to="/"
            className="min-w-[214px]"
          >
            <img
              className="h-[60px]"
              src="/Logo.svg"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
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
          </div>
          <div className="flex justify-end md:gap-5 min-w-[104px]">
            <div className="cursor-pointer h-[48px] w-[48px]  rounded-full text-primary-color md:text-white md:bg-primary-color flex items-center justify-center">
              <HeartIcon />
            </div>
            <CartWrapper>
              <div className="cursor-pointer h-[48px] w-[48px]  rounded-full text-primary-color md:text-white md:bg-primary-color flex items-center justify-center">
                <ShoppingCartIcon
                  onClick={onCartClick}
                />
              </div>
            </CartWrapper>
          </div>
          <div className="hidden md:block">
            {isAuthentication() ? (
              <div className="  flex items-center gap-2">
                <div className="flex flex-col items-end">
                  <div>Hi,</div>
                  <div className="font-bold text-secondary-t-black">
                    {data?.data?.name ??
                      "Người dùng"}
                  </div>
                </div>
                <Dropdown
                  menu={{
                    items,
                    onClick: logout,
                  }}
                  trigger={["click"]}
                >
                  <Avatar
                    size="large"
                    src={user?.avatar}
                  />
                </Dropdown>
              </div>
            ) : (
              <Button
                size="large"
                type="primary"
                onClick={() =>
                  navigate("/sign-in")
                }
              >
                Đăng nhập
              </Button>
            )}
          </div>
        </div>
      </header>
      <div className="flex md:hidden w-full justify-center py-3">
        <AutoComplete
          value={search}
          onChange={onSearch}
          size="large"
          style={{
            width: 380,
            marginRight: "1rem",
            marginLeft: "1rem",
          }}
          placeholder="Freeship đơn hàng từ 199K"
          options={completedOptions}
          onSelect={onSelect}
        />
      </div>
    </>
  );
};

export default Header;
