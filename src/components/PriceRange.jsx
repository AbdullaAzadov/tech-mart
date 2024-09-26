import { useSearchParams } from "react-router-dom";
import styles from "./PriceRange.module.css";

export default function PriceRange() {
    const [params, setParams] = useSearchParams();
    const min = params.get("min") ?? 0;
    const max = params.get("max") ?? 1000;

    function setMin(value) {
        if (isNaN(value)) return;
        params.set("min", value);
        setParams(params);
    }
    function setMax(value) {
        if (isNaN(value)) return;
        params.set("max", value);
        setParams(params);
    }

    return (
        <div className={styles.container}>
            <b>Цены: </b>
            <div className={styles.input}>
                <span>от:</span>
                <input
                    type="text"
                    value={min}
                    onChange={(e) => setMin(+e.target.value)}
                />
                <hr />
                <span>до:</span>
                <input
                    type="text"
                    value={max}
                    onChange={(e) => setMax(+e.target.value)}
                />
            </div>
        </div>
    );
}
