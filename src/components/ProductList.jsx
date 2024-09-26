import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import styles from "./ProductList.module.css";
import Search from "./Search";
import PriceRange from "./PriceRange";
import Sort from "./Sort";
import Error from "./Error";
import ProductsLoader from "./ProductsLoader";

function ProductList() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [params, setParams] = useSearchParams();
    const search = params.get("search");
    const minPrice = params.get("min");
    const maxPrice = params.get("max");
    const sortType = params.get("sort");
    const sortOrder = params.get("order");

    //Fetch products
    useEffect(() => {
        try {
            fetch(
                "https://abdullaazadov.github.io/tech-mart-json-server/products.json"
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Ошибка при выполнении запроса");
                    }
                    return response.json();
                })
                .then((data) => {
                    setProducts(data.products);
                    setFilteredProducts(data.products);
                    if (minPrice === null) {
                        params.set(
                            "min",
                            Math.min(...data.products.map((v) => v.price))
                        );
                        params.set(
                            "max",
                            Math.max(...data.products.map((v) => v.price))
                        );
                        setParams(params);
                    }
                    setTimeout(() => {
                        console.log("time", Date.date);

                        setIsLoading(false);
                    }, 200);
                })
                .catch((error) => {
                    setIsError(true);
                    setIsLoading(false);
                });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            throw error;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    if (isError) return <Error causer={"error"} />;
    if (isLoading) return <ProductsLoader />;

    return (
        <main className={styles.main}>
            <nav>
                <div className={styles.filter}>
                    <CiFilter size={24} className="icon" />
                    <Search />
                    <PriceRange />
                </div>
                <Sort />
            </nav>
            <ul className={styles.products}>
                {filteredProducts.map((product) => (
                    <li
                        className={styles["product-card"]}
                        key={product.id}
                        onClick={() => navigate(`${product.id}`)}
                    >
                        <div className="product-image">
                            <img src={product.image[0]} alt={product.name} />
                        </div>
                        <div className="product-info">
                            <h4>{product.name}</h4>
                            <h5>${product.price}</h5>
                        </div>
                    </li>
                ))}
            </ul>
            {!filteredProducts.length && search?.length && (
                <Error causer={"search"} search={search} />
            )}
            {!filteredProducts.length && !search?.length && sortType && (
                <Error causer={"filter"} />
            )}
            {!filteredProducts.length && !search?.length && !sortType && (
                <Error causer={"noItems"} />
            )}
        </main>
    );
}

export default ProductList;
