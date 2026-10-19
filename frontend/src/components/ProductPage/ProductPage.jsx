import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../../api/api";
import { productsPageStyles as s } from "../../assets/dummyStyles";

function ProductsPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchcategories = async () => {
      try {
        const { data } = await getCategories();
        setCategories(data.categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchcategories();
  }, []);

  return (
    <section id="products" className={s.section}>
      <div
        className="pointer-events-none absolute inset-0"
        style={s.gradientBackground}
      />
      <div className={s.innerContainer}>
        <div className={s.grid}>
          {categories.map((category, index) => (
            <Link
              key={category._id}
              to={`/product/${encodeURIComponent(category.categoryName)}`}
              className={s.categoryLink}
              style={{
                animation: `fadeUp 0.6s ease both`,
                animationDelay: `${index * 60}ms`,
              }}
            >
              <img src={category.image?.url} className={s.categoryImage} />
              <h3 className={s.categoryName}>{category.categoryName}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductsPage;
