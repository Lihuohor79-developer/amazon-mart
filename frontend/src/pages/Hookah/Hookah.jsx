import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import SearchResults from "../../components/SearchResults/SearchResults";
import HookahPage from "../../components/HookahPage/HookahPage";

const Hookah = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const isSearching = query.trim().length > 0;

  return (
    <div>
      <Navbar />
      {isSearching ? <SearchResults query={query} /> : <HookahPage expanded />}
    </div>
  );
};

export default Hookah;
