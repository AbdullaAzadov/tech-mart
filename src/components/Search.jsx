import { useSearchParams } from "react-router-dom";

export default function Search({ placeholder = "Найти в списке..." }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") ?? "";

    function handleOnChangeSearch(value) {
        searchParams.set("search", value);
        setSearchParams(searchParams);
    }

    return (
        <>
            <input
                type="text"
                className="search"
                placeholder={placeholder}
                value={search}
                onChange={(e) => handleOnChangeSearch(e.target.value)}
            />
        </>
    );
}
