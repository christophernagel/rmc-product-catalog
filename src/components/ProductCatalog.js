import React, { useState } from "react";
import ProductGrid from "./ProductGrid";
import ProductFilters from "./ProductFilters";
import FilterDrawer from "./FilterDrawer";
import ActiveFiltersBar from "./ActiveFiltersBar";
import sampleProducts from "./sampleProducts";

const ProductCatalog = () => {
  const [activeFilters, setActiveFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const handleRemoveFilter = (category, value) => {
    const newFilters = { ...activeFilters };
    if (newFilters[category]) {
      delete newFilters[category][value];
      if (Object.keys(newFilters[category]).length === 0) {
        delete newFilters[category];
      }
    }
    setActiveFilters(newFilters);
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <div className="rmc-product-catalog">
      <div className="rmc-catalog-layout">
        {isMobile ? (
          <FilterDrawer>
            <ProductFilters
              onFilterChange={handleFilterChange}
              activeFilters={activeFilters}
            />
          </FilterDrawer>
        ) : (
          <ProductFilters
            onFilterChange={handleFilterChange}
            activeFilters={activeFilters}
          />
        )}
        <div className="rmc-catalog-content">
          <ActiveFiltersBar
            filters={activeFilters}
            onRemoveFilter={handleRemoveFilter}
          />
          <ProductGrid products={sampleProducts} filters={activeFilters} />
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
