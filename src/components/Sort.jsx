import { useSearchParams } from "react-router-dom";
import styles from "./Sort.module.css";
import { BsSortUp } from "react-icons/bs";
import { FaSortDown, FaSort, FaSortUp } from "react-icons/fa6";

export default function Sort() {
    const [params, setParams] = useSearchParams();
    const type = params.get("sort");
    const order = params.get("order");
    const sortList = [
        { id: 1, name: "По названию", type: "name" },
        { id: 2, name: "По цене", type: "price" },
        { id: 3, name: "По дате", type: "date" },
    ];

    function toggleOrder() {
        params.set("order", order === "asc" ? "desc" : "asc");
        setParams(params);
    }

    function setOrder(desc = true) {
        params.set("order", desc ? "desc" : "asc");
        setParams(params);
    }

    function handleOnClick(value) {
        if (value === type) {
            toggleOrder();
            return;
        }
        params.set("sort", value);
        setOrder();
        setParams(params);
    }

    return (
        <ul className={styles.sortList}>
            <BsSortUp color="rgb(52, 52, 52)" className="icon" />

            {sortList.map((item) => (
                <li
                    onClick={() => handleOnClick(item.type)}
                    className={type === item.type ? "active" : ""}
                    key={item.id}
                >
                    {item.name}
                    {type !== item.type ? (
                        <span>{<FaSort size={10} />}</span>
                    ) : (
                        <span className="active">
                            {order === "asc" ? (
                                <FaSortUp size={10} />
                            ) : (
                                <FaSortDown size={10} />
                            )}
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
}
