export default function Search({
    search,
    onChange,
    placeholder = "Найти в списке...",
}) {
    return (
        <input
            type="text"
            className="search"
            placeholder={placeholder}
            value={search}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
