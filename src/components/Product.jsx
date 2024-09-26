import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import styles from "./Product.module.css";
import Error from "./Error";

export default function Product() {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split("/").reverse()[0];
    const [product, setProduct] = useState({});
    const [curImg, setCurImg] = useState(0);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    function handleOnBack() {
        navigate(-1);
    }

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3004/products`)
            .then((res) => res.json())
            .then((data) => {
                const target = data.filter((p) => p.id === +id);
                if (!target.length) throw new Error();
                setProduct(target[0]);
            })
            .catch(() => setIsError(true))
            .finally(() => setTimeout(() => setIsLoading(false), 300));
    }, [id]);

    if (isError) return <Error causer="error" />;
    if (isLoading) return <Error causer="loading" />;

    return (
        <main className={styles.wrapper}>
            <IoChevronBackCircleOutline
                onClick={handleOnBack}
                className={styles.backBtn}
            />
            <section className={styles.section}>
                <div className={styles.card}>
                    <img src={product.image[curImg]} alt={product.name} />
                </div>
                <nav className={styles.carousel}>
                    {product.image.map((src, i) => (
                        <div
                            className="miniCard"
                            key={i}
                            onClick={() => setCurImg(i)}
                        >
                            <img src={src} alt={product.name} />
                        </div>
                    ))}
                </nav>
            </section>
            <section className={`${styles.section} info`}>
                <div className={styles.title}>
                    <b className="name">{product.name}</b>
                    <b className="price">{product.price}$</b>
                    {/* lorem for dev */}
                </div>
                <p className={styles.desc}>
                    {product.description}. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Voluptas, alias, accusamus
                    eligendi reiciendis, perspiciatis suscipit obcaecati neque
                    hic aut atque fugiat. Veritatis, voluptatem vitae! Unde ipsa
                    modi rem excepturi ipsam, voluptate, atque voluptatum soluta
                    similique mollitia alias aliquam. Nesciunt, corporis?
                </p>
            </section>
        </main>
    );
}
