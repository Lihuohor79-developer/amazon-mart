import { useSearchParams } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import Navbar from "../../components/Navbar/Navbar";
import ProductsPage from "../../components/ProductPage/ProductPage";
import HookahPage from "../../components/HookahPage/HookahPage";
import Footer from "../../components/Footer/Footer";
import SearchResults from "../../components/SearchResults/SearchResults";

const Home = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const isSearching = query.trim().length > 0;

  return (
    <div>
      <Navbar />
      {isSearching ? (
        <SearchResults query={query} />
      ) : (
        <>
          <Banner />
          <ProductsPage />
          <HookahPage />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Home;
