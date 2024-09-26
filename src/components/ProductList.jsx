import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import styles from "./ProductList.module.css";
import Search from "./Search";
import PriceRange from "./PriceRange";
import Sort from "./Sort";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [params, setParams] = useSearchParams();
    const search = params.get("search");
    const minPrice = params.get("min");
    const maxPrice = params.get("max");
    const sortType = params.get("sort");
    const sortOrder = params.get("order");

    //Fetch products
    useEffect(() => {
        try {
            fetch("http://localhost:3004/products")
                .then((response) => response.json())
                .then((data) => {
                    setProducts(data);
                    setFilteredProducts(data);
                    if (minPrice === null) {
                        params.set(
                            "min",
                            Math.min(...data.map((v) => v.price))
                        );
                        params.set(
                            "max",
                            Math.max(...data.map((v) => v.price))
                        );
                        setParams(params);
                    }
                    setIsLoading(false);
                });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            throw error;
        }
    }, []);

    // Filter and Sort
    useEffect(() => {
        function filterPrice(products) {
            return products.filter(
                (p) => p.price >= +minPrice && p.price <= +maxPrice
            );
        }
        function filterSearch(products) {
            if (!search.trim().length) return products;
            return products.filter((p) =>
                p.name.toLowerCase().includes(search.trim().toLowerCase())
            );
        }
        function sortProducts(products, asc) {
            const compareNum = (a, b) => (asc ? b - a : a - b);
            const compareStr = (a, b) => {
                if (asc) return a > b ? -1 : a === b ? 0 : 1;
                else return a > b ? 1 : a === b ? 0 : -1;
            };

            switch (sortType) {
                case "name":
                    products.sort((p, n) =>
                        compareStr(p.name.toLowerCase(), n.name.toLowerCase())
                    );
                    return products;

                case "date":
                    products.sort((p, n) => compareNum(p.id, n.id));
                    return products;

                case "price":
                    products.sort((p, n) => compareNum(p.price, n.price));
                    return products;

                default:
                    return products;
            }
        }

        let filtered = products;
        if (minPrice !== null) filtered = filterPrice(filtered);
        if (search !== null) filtered = filterSearch(filtered);
        if (sortOrder !== null && sortType !== null)
            filtered = sortProducts(filtered, sortOrder === "asc");

        setFilteredProducts(filtered);
    }, [minPrice, maxPrice, search, sortType, sortOrder, products]);

    return (
        <main className={styles.main}>
            <nav>
                <div className={styles.filter}>
                    <CiFilter size={24} />
                    <Search />
                    <PriceRange />
                </div>
                <Sort />
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
