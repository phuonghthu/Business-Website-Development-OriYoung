import CardList from "../components/card/card-list";
import Footer from "../components/footer";
import Header from "../components/header";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import {
  Pagination,
  Radio,
  Space,
} from "antd";
import { useProductsByCategory } from "../hooks/use-products-by-category";
import { useSearchParams } from "react-router-dom";
import { useCategories } from "../hooks/use-categories";
import Loading from "../components/loading";

const priceOptions = [
  {
    label: "Dưới 100.000₫ ",
    value: "maxPrice=100000",
  },
  {
    label: "100.000₫ - 250.000₫ ",
    value:
      "minPrice=100000&maxPrice=250000",
  },
  {
    label: "250.000₫ - 500.000₫ ",
    value:
      "minPrice=250000&maxPrice=500000",
  },
  {
    label: "Trên 500.000₫",
    value: "minPrice=500000",
  },
];

const ItemByCategory = () => {
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();
  const { data, isLoading } =
    useProductsByCategory();
  const {
    data: {
      data: categories = [],
    } = {},
    isCategoryLoading,
  } = useCategories();

  const options = categories.map(
    (item) => ({
      label: item.name,
      value: item.name,
    })
  );

  const onCategoryChange = (e) => {
    searchParams.set(
      "category",
      e.target.value
    );
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };
  const onPriceChange = (e) => {
    searchParams.set(
      "price",
      e.target.value
    );
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const onPageChange = (values) => {
    searchParams.set("page", values);
    setSearchParams(searchParams);
  };

  if (isLoading || isCategoryLoading)
    return <Loading />;

  return (
    <div>
      <Header />
      <Navbar />
      <Hero />
      <div className="container mx-auto mt-10 mb-10">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="bg-[#84BC4E0D] py-6 px-4 w-full md:w-fit min-w-[300px] md:min-w-[240px]">
            <h3 className="text-xl mb-4 font-bold">
              Danh mục sản phẩm
            </h3>
            <Radio.Group
              onChange={
                onCategoryChange
              }
              value={
                searchParams.get(
                  "category"
                ) ?? "all"
              }
            >
              <Space direction="vertical">
                <Radio value="all">
                  <span className="text-lg font-normal">
                    Tất cả
                  </span>
                </Radio>
                {options.map((item) => {
                  return (
                    <Radio
                      key={item.value}
                      value={item.value}
                    >
                      <span className="text-lg font-normal">
                        {item.label}
                      </span>
                    </Radio>
                  );
                })}
              </Space>
            </Radio.Group>

            <h3 className="text-xl mb-4 mt-4 font-bold">
              GIÁ SẢN PHẨM{" "}
            </h3>
            <Radio.Group
              onChange={onPriceChange}
              value={searchParams.get(
                "price"
              )}
            >
              <Space direction="vertical">
                {priceOptions.map(
                  (item) => {
                    return (
                      <Radio
                        key={item.value}
                        value={
                          item.value
                        }
                      >
                        <span className="text-lg font-normal">
                          {item.label}
                        </span>
                      </Radio>
                    );
                  }
                )}
              </Space>
            </Radio.Group>
          </div>
          <div className="bg-[#84BC4E0D] p-8 w-full">
            <CardList
              items={data?.data ?? []}
            />

            <div className="w-full h-full flex items-center justify-center p-8">
              {Boolean(
                data?.data?.length
              ) && (
                <Pagination
                  size="large"
                  pageSize={12}
                  defaultCurrent={
                    searchParams.get(
                      "page"
                    ) ?? 1
                  }
                  total={
                    data.totalRecord
                  }
                  showSizeChanger={
                    false
                  }
                  onChange={
                    onPageChange
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ItemByCategory;
