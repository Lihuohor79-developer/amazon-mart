import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "../../CartContext";
import { getProducts } from "../../api/api";
import { productItemsPageStyles as s } from "../../assets/dummyStyles";

const ProductItemsPage = () => {
  const { id } = useParams();
  const categoryName = decodeURIComponent(id);
  const [products, setProducts] = useState([]);
  const { addItem, decreaseItem, getQuantity } = useCart();

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const fetchProducts = async () => {
    try {
      const { data } = await getProducts({
        category: categoryName,
      });

      setProducts(data.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  if (products.length === 0) {
    return (
      <section className={s.emptySection}>
        <h1 className={s.emptyHeading}>No Products Found</h1>
        <Link to="/" className={s.emptyLink}>
          Back to Home
        </Link>
      </section>
    );
  }

  return (
    <section className={s.section}>
      <div className={s.container}>
        <Link to="/" className={s.backLink}>
          <ArrowLeft size={17} />
          Back to store
        </Link>

        <div className={s.contentWrapper}>
          <div>
            <p className={s.categoryLabel}>{categoryName}</p>
            <h2 className={s.categoryTitle}>
              {products.length} Related Products
            </h2>
          </div>

          <div className={s.productGrid}>
            {products.map((item) => {
              const cartItem = {
                cartId: item._id,
                source: "Product",
                category: categoryName,
                id: item._id,
                productModel: "Product",
                image: item.image?.url,
                name: item.name,
                company: item.company,
                price: item.sellingPrice,
                oldPrice: item.oldPrice,
                size: item.size,
              };

              const quantity = getQuantity(cartItem.cartId);

              return (
                <div key={item._id} className={s.productCard}>
                  <div className={s.cardOverlay1} />
                  <div className={s.cardOverlay2} />
                  <div className={s.cardOverlay3} />

                  <div className={s.cardContent}>
                    <div className={s.imageWrapper}>
                      <img
                        src={item.image?.url}
                        alt={item.name}
                        className={s.productImage}
                      />
                    </div>

                    <div className={s.productInfo}>
                      <h3 className={s.productName}>{item.name}</h3>
                      <p className={s.productCompany}>{item.company}</p>
                      <div className={s.sizeBadge}>{item.size}</div>

                      <div className={s.priceContainer}>
                        <div className={s.priceRow}>
                          <span className={s.priceCurrent}>
                            ₹{item.sellingPrice}
                          </span>
                          <span className={s.priceOld}>₹{item.oldPrice}</span>
                        </div>
                      </div>

                      <div className={s.actionWrapper}>
                        {quantity > 0 ? (
                          <div className={s.quantityControls}>
                            <button
                              onClick={() => decreaseItem(cartItem.cartId)}
                              className={s.qtyButton}
                            >
                              <Minus size={16} />
                            </button>
                            <span>{quantity}</span>
                            <button
                              onClick={() => addItem(cartItem)}
                              className={s.qtyButton}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addItem(cartItem)}
                            className={s.addButton}
                          >
                            <ShoppingCart size={16} />
                            Add to Cart
                            <ArrowRight size={16} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className={s.cardBottomBar} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductItemsPage;
