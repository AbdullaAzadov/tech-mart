import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.headerWrapper}>
            <section className={styles.header}>
                <Link to={"/"} className={styles.logo}>
                    techMart
                </Link>
            </section>
        </header>
    );
}
