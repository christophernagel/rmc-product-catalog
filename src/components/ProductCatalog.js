import React, { useState } from "react";
import ProductGrid from "./ProductGrid";
import ProductFilters from "./ProductFilters";
import FilterDrawer from "./FilterDrawer";
import ActiveFiltersBar from "./ActiveFiltersBar";
import sampleProducts from "./sampleProducts";

const ProductCatalog = () => {
  const [activeFilters, setActiveFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filterProducts = () => {
    let filtered = [...sampleProducts];

    // Apply search filter if query exists
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.specifications?.Environment?.some((env) =>
            env.toLowerCase().includes(query)
          )
      );
    }

    // Apply category filters with OR logic
    const hasActiveFilters = Object.values(activeFilters).some((category) =>
      Object.values(category).some(Boolean)
    );

    if (hasActiveFilters) {
      filtered = filtered.filter((product) => {
        let hasAnyMatch = false;

        for (const [category, values] of Object.entries(activeFilters)) {
          const activeValues = Object.entries(values)
            .filter(([_, isActive]) => isActive)
            .map(([value]) => value);

          if (activeValues.length === 0) continue;

          const matchesCategory = activeValues.some((value) => {
            switch (category) {
              case "Conduit":
                return product.specifications["Conduit Type"] === value;
              case "Strut":
                return (
                  product.specifications["Strut Properties"]?.includes(value) ||
                  product.specifications["Strut Pattern"]?.includes(value)
                );
              case "Conduit Bodies":
                return product.specifications["Body Style"] === value;
              case "Conduit Hubs":
                return (
                  product.specifications["Hub Configuration"] === value ||
                  product.specifications["Hub Style"] === value
                );
              case "Conduit Elbows":
                return product.specifications["Elbow Angle"] === value;
              case "Junction Boxes":
                return product.specifications["Box Style"] === value;
              case "Couplings":
                return product.specifications["Coupling Style"] === value;
              case "Material Grade":
              case "Environment":
              case "Certification":
                return product.specifications[category]?.includes(value);
              default:
                return false;
            }
          });

          if (matchesCategory) {
            hasAnyMatch = true;
            break;
          }
        }

        return hasAnyMatch;
      });
    }

    return filtered;
  };

  return (
    <div className="rmc-product-catalog">
      <div className="rmc-catalog-layout">
        {/* Mobile Filters */}
        <div className="mobile-filters">
          <FilterDrawer>
            <ProductFilters
              onFilterChange={handleFilterChange}
              activeFilters={activeFilters}
            />
          </FilterDrawer>
        </div>

        {/* Desktop Filters */}
        <div className="desktop-filters">
          <ProductFilters
            onFilterChange={handleFilterChange}
            activeFilters={activeFilters}
          />
        </div>

        <div className="rmc-catalog-content">
          <ActiveFiltersBar
            filters={activeFilters}
            onRemoveFilter={handleRemoveFilter}
            onSearch={handleSearch}
            searchQuery={searchQuery}
          />
          <ProductGrid products={filterProducts()} filters={activeFilters} />
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
