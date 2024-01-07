import CardTipList from "../components/card/card-tip-list";
import Footer from "../components/footer";
import Header from "../components/header";
import Navbar from "../components/navbar";

const Tips = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="container mx-auto my-10">
        <div className="p-2 bg-primary-color text-white text-3xl rounded-xl text-center mb-10">
          Beauty Tips
        </div>
        <CardTipList />
      </div>
      <Footer />
    </div>
  );
};

export default Tips;
