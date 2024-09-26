import React from "react";

export default function ProductsLoader() {
    return (
        <main className="products-loader__main">
            <nav></nav>
            <ul>
                {Array(12)
                    .fill()
                    .map((_, i) => (
                        <li key={i}></li>
                    ))}
            </ul>
        </main>
    );
}
