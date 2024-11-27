import React, { useState } from "react";
import ProductGrid from "./ProductGrid";
import ProductFilters from "./ProductFilters";
import ActiveFiltersBar from "./ActiveFiltersBar";
import sampleProducts from "./sampleProducts";

const ProductCatalog = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

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
