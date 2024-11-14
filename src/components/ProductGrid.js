import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, filters }) => {
  const filteredProducts = products.filter((product) => {
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Check each active filter
    for (const [filterType, filterValues] of Object.entries(filters.filters)) {
      for (const [value, isSelected] of Object.entries(filterValues)) {
        if (isSelected) {
          // Check if product matches the selected filter
          if (filterType === "Size" && product.specifications.size !== value) {
            return false;
          }
          if (
            filterType === "Alloy Type" &&
            product.specifications.alloyType !== value
          ) {
            return false;
          }
          if (filterType === "Type" && product.specifications.type !== value) {
            return false;
          }
          if (
            filterType === "Options" &&
            !product.specifications.options.includes(value)
          ) {
            return false;
          }
        }
      }
    }

    return true;
  });

  return (
    <div className="rmc-product-grid">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid;
