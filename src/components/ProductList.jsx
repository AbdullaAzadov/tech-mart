import { useState, useEffect } from "react";
import { CiFilter } from "react-icons/ci";
import styles from "./ProductList.module.css";
import Search from "./Search";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

    function handleChangeSearch(value) {
        setSearch(value);
    }

    useEffect(() => {
        try {
            fetch("http://localhost:3004/products")
                .then((response) => response.json())
                .then((data) => {
                    const min = Math.min(...data.map((v) => v.price));
                    const max = Math.max(...data.map((v) => v.price));
                    setPriceRange({ min, max });
                    setProducts(data);
                    setFilteredProducts(data);
                    setIsLoading(false);
                });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            throw error;
        }
    }, []);

    useEffect(() => {
        console.log(search);

        if (!search.trim().length) {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(
                products.filter((p) =>
                    p.name.toLowerCase().includes(search.trim().toLowerCase())
                )
            );
        }
        console.log(filteredProducts);
    }, [search, products]);

    return (
        <main className={styles.main}>
            <nav>
                <div className={styles.filter}>
                    <CiFilter size={24} />
                    <Search search={search} onChange={handleChangeSearch} />
                </div>
            </nav>
            <div className={styles["products-container"]}>
                {filteredProducts.map((product) => (
                    <div className={styles["product-card"]} key={product.id}>
                        <div className="product-image">
                            <img src={product.image[0]} alt={product.name} />
                        </div>
                        <div className="product-info">
                            <h4>{product.name}</h4>
                            <h5>${product.price}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default ProductList;
