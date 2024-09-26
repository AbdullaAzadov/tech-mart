import { FaFilterCircleXmark } from "react-icons/fa6";
import { LuSearchX } from "react-icons/lu";
import { MdError } from "react-icons/md";
import { TbShoppingCartX } from "react-icons/tb";
import NotFound from "./NotFound";

export default function Error({ causer, search = "" }) {
    switch (causer) {
        case "search":
            return (
                <section className="not-found-wrapper">
                    <LuSearchX size={120} color="#344966" />
                    <h3>По запросу "{search}" ничего не найдено!</h3>
                </section>
            );

        case "filter":
            return (
                <section className="not-found-wrapper">
                    <FaFilterCircleXmark size={120} color="#344966" />
                    <h3>По такому запросу ничего не найдено!</h3>
                </section>
            );

        case "error":
            return (
                <section className="not-found-wrapper">
                    <MdError size={120} color="darkred" />
                    <h3>
                        Не удалось выполнить запрос. Пожалуйста попробуйте
                        снова.
                    </h3>
                </section>
            );
        case "noItems":
            return (
                <section className="not-found-wrapper">
                    <TbShoppingCartX size={120} color="darkred" />
                    <h3>
                        Не удалось найти товары. Пожалуйста попробуйте позднее.
                    </h3>
                </section>
            );

        default:
            return <NotFound />;
    }
}
