import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="rmc-product-grid-empty">
        <p>No products match the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="rmc-product-grid">
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
