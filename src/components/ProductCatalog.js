import React, { useState } from "react";
import ProductGrid from "./ProductGrid";
import ProductFilters from "./ProductFilters";

const ProductCatalog = ({ isEditor = false }) => {
  const [activeFilters, setActiveFilters] = useState({
    category: "",
    filters: {},
  });

  // Sample products - replace with real data
  const products = [
    {
      id: "SS-RC-05",
      name: "SS304 Rigid Conduit",
      category: "Conduit",
      specifications: {
        size: '½"',
        alloyType: "SS304",
        type: "Rigid",
        options: ["With Coupling"],
      },
    },
    // Add more
  ];

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
