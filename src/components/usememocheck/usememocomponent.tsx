import React, { useState, useRef, useEffect } from "react";

const ProductSearchWithoutMemo = () => {

    const [query, setQuery] = useState("");

    const renderCount = useRef(0);

    const products = [

        "Laptop",

        "Phone",

        "Tablet",

        "Monitor",

        "Keyboard",

        "Mouse",

        "Smartwatch",

        "Camera",

        "Printer",

        "Speaker"

    ];

    // Expensive computation (no memoization)

    const filteredProducts = products.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
    );

    // update ref after render
    useEffect(() => {
        renderCount.current += 1;
    });

    return (
        <div style={{ fontFamily: "Arial", padding: "20px" }}>
            <h2>Product Search (without useMemo)</h2>
            <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <p>Component rendered: {renderCount.current} times</p>
            <ul>
                {filteredProducts.map((product, index) => (
                    <li key={index}>{product}</li>
                ))}
            </ul>
        </div>

    );

};

export default  ProductSearchWithoutMemo;

