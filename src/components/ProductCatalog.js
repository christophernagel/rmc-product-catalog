import React, { useState } from "react";
import ProductGrid from "./ProductGrid";
import ProductFilters from "./ProductFilters";
import sampleProducts from "./sampleProducts"; // Import the sample data

const ProductCatalog = ({ isEditor = false }) => {
  const [activeFilters, setActiveFilters] = useState({
    category: "",
    filters: {},
  });

  // Use the imported sample products instead of the inline example
  const [products] = useState(sampleProducts);

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  return (
    <div className="rmc-product-catalog">
      <ProductFilters
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
      />
      <ProductGrid products={products} filters={activeFilters} />
    </div>
  );
};

export default ProductCatalog;
