import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, filters }) => {
  const filteredProducts = products.filter((product) => {
    // Category check
    if (!filters.category) return true;
    if (product.category !== filters.category) return false;

    // Filter checks
    if (filters.filters) {
      for (const [filterType, filterValues] of Object.entries(
        filters.filters
      )) {
        const activeFilters = Object.entries(filterValues)
          .filter(([_, isActive]) => isActive)
          .map(([value]) => value);

        if (activeFilters.length > 0) {
          const productValue =
            product.specifications?.[filterType.toLowerCase()];
          if (!activeFilters.includes(productValue)) return false;
        }
      }
    }
    return true;
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="rmc-product-grid-empty">
        <p>No products match the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="rmc-product-grid">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid;
