import React, { useState, useMemo, useRef, useEffect } from "react";

const ProductSearchWithUseMemo = () => {

    const [query, setQuery] = useState("");
    const [counter, setCounter] = useState<number>(0);

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

    // Expensive computation (memoized)

    const filteredProducts = useMemo(() => {
        console.log("Filtering products...");
        return products.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, products]);

      // update ref after render
        useEffect(() => {
            renderCount.current += 1;
        },[counter]);
    

    return (
        <div style={{ fontFamily: "Arial", padding: "20px" }}>
            <h2>Product Search (with useMemo)</h2>
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
            <hr/>
            <div>
                <strong>
                    Latest Counter Value: {counter}
                </strong>
            </div>
            <button onClick={()=>setCounter(counter + 1)}>Counter Change</button>
        </div>

    );

};

export default ProductSearchWithUseMemo;

