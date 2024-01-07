import Categories from "../components/category/categories";
import ItemByCategory from "../components/category/items-by-category";
import Footer from "../components/footer";
import Header from "../components/header";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import ItemsByTip from "../components/tip/items-by-tip";

const Home = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <Hero />
      <Categories />
      <ItemByCategory />
      <ItemsByTip />
      <Footer />
    </div>
  );
};

export default Home;
