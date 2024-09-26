import { TbError404 } from "react-icons/tb";

export default function NotFound() {
    return (
        <section className="not-found-wrapper">
            <TbError404 size={120} color="#344966" />
            <h3>По такому запросу ничего не найдено!</h3>
        </section>
    );
}
