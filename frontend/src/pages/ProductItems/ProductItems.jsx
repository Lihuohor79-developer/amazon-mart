import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ProductItemsPage from "../../components/ProductItemsPage/ProductItemsPage";
import Footer from "../../components/Footer/Footer";
import SearchResults from "../../components/SearchResults/SearchResults";

const ProductItems = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const isSearching = query.trim().length > 0;

  return (
    <div>
      <Navbar />
      {isSearching ? <SearchResults query={query} /> : <ProductItemsPage />}
      <Footer />
    </div>
  );
};

export default ProductItems;
