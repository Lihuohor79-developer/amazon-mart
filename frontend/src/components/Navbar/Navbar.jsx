import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  LogIn,
  MapPinPlus,
  PackageCheck,
  Search,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { useCart } from "../../CartContext";
import freshmartLogo from "../../assets/freshmart-logo.svg";
import { Link } from "react-router-dom";
import { navbarStyles as s } from "../../assets/dummyStyles";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [accountOpen, setAccountOpen] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("amazonmart-auth") === "true",
  );

  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(localStorage.getItem("amazonmart-auth") === "true");
    };
    window.addEventListener("storage", syncAuth);
    window.addEventListener("amazonmart-auth-change", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("amazonmart-auth-change", syncAuth);
    };
  }, []);

  useEffect(() => {
    setAccountOpen(false);
    setIsNavbarHidden(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      setIsNavbarHidden(isScrollingDown && currentScrollY > 120);
      if (isScrollingDown) setAccountOpen(false);
      lastScrollY.current = Math.max(currentScrollY, 0);
    };
    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateSearchQuery = (value, options = { replace: true }) => {
    const nextQuery = value.trim();

    navigate(
      {
        pathname: "/",
        search: nextQuery ? `?q=${encodeURIComponent(nextQuery)}` : "",
      },
      options,
    );
  };

  const handleSearchChange = (event) => {
    const nextValue = event.target.value;
    setSearchTerm(nextValue);
    updateSearchQuery(nextValue);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    updateSearchQuery(searchTerm, { replace: false });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("amazonmart-auth");
    localStorage.removeItem("amazonmart-user");
    window.dispatchEvent(new Event("amazonmart-auth-change"));
    setAccountOpen(false);
    navigate("/login");
  };

  return (
    <header
      className={`${s.headerBase} ${isNavbarHidden ? s.headerHidden : s.headerVisible}`}
    >
      <div className={s.container}>
        {/* Left: Logo + Store Name */}
        <Link to="/" className={s.logoLink}>
          <div className={s.logoWrapper}>
            <div className={s.logoImageWrapper}>
              <img
                src={freshmartLogo}
                alt="FreshMart Grocery logo"
                className={s.logoImage}
              />
            </div>

            <div className={s.logoTextWrapper}>
              <h1 className={s.logoTitle}>FreshMart Grocery</h1>
              <p className={s.logoSubtitle}>Fast Grocery Delivery</p>
            </div>
          </div>
        </Link>

        {/* Center: Search Bar */}
        <form onSubmit={handleSearch} className={s.searchForm}>
          <div className={s.searchContainer}>
            <div className={s.searchInputWrapper}>
              <Search className={s.searchIcon} />
              <input
                type="text"
                placeholder="Search for products, brands, categories..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={s.searchInput}
              />
            </div>

            <button type="submit" className={s.searchButton}>
              Search
            </button>
          </div>
        </form>

        {/* Right: Login + Cart */}
        <div className={s.actionsWrapper}>
          <button
            onClick={() => navigate("/orders")}
            className={s.actionButton}
          >
            <PackageCheck className={s.actionIcon} />
            <span className="truncate">My Orders</span>
          </button>

          <button onClick={() => navigate("/cart")} className={s.cartButton}>
            <ShoppingCart className={s.actionIcon} />
            <span>Cart</span>
            {totalItems > 0 ? (
              <span className={s.cartBadge}>{totalItems}</span>
            ) : null}
          </button>

          {isLoggedIn ? (
            <div className={s.accountDropdownWrapper}>
              <button
                type="button"
                onClick={() => setAccountOpen((open) => !open)}
                className={s.actionButton}
                aria-expanded={accountOpen}
              >
                <UserRound className={s.actionIcon} />
                <span className="truncate">Account</span>
                <ChevronDown className={s.dropdownChevron} />
              </button>

              <div
                className={`${s.dropdownMenu} ${accountOpen ? s.dropdownOpen : s.dropdownClosed}`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setAccountOpen(false);
                    navigate("/address");
                  }}
                  className={s.dropdownItem}
                >
                  <MapPinPlus className={s.dropdownIcon} />
                  Add Address
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className={s.dropdownItem}
                >
                  <LogOut className={s.dropdownIcon} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className={s.actionButton}
            >
              <LogIn className={s.actionIcon} />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
