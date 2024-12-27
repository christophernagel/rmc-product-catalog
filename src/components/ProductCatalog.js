import React, { useState, useEffect } from "react";
import ProductGrid from "./ProductGrid";
import ProductFilters, { matchesFilter } from "./ProductFilters";
import FilterDrawer from "./FilterDrawer";
import ActiveFiltersBar from "./ActiveFiltersBar";
import sampleProducts from "./sampleProducts";

// Mappings for categories
const categoryMap = {
  Conduit: "c",
  "Conduit Bodies": "cb",
  "Device Box": "db",
  "Conduit Hubs": "ch",
  "Liquid Tight Connectors": "lt",
  "Conduit Fittings": "cf",
  "Plugs & Bushings": "pb",
  Strut: "st",
  "Material Grade": "mg",
  Environment: "env",
  Certification: "cert",
};

// Optional value mappings for further abbreviation
const valueMap = {
  Rigid: "r",
  "45° Elbow": "45e",
  "90° Elbow": "90e",
  "3-Piece Coupling": "3pc",
  "Standard Nipple": "sn",
  "Recessed Plug": "rp",
  "Face Bushing": "fb",
  "Deep Profile": "dp",
  "Shallow Profile": "sp",
  "Elongated Holes": "eh",
};

// Reverse maps for decoding URL params back to full names
const categoryMapReverse = Object.fromEntries(
  Object.entries(categoryMap).map(([full, shorty]) => [shorty, full])
);

const valueMapReverse = Object.fromEntries(
  Object.entries(valueMap).map(([full, shorty]) => [shorty, full])
);

const encodeCategory = (category) => categoryMap[category] || category;
const decodeCategory = (short) => categoryMapReverse[short] || short;

const encodeValue = (value) => valueMap[value] || value;
const decodeValue = (short) => valueMapReverse[short] || short;

const ProductCatalog = () => {
  // Initialize filters from URL (with decoding)
  const initializeFiltersFromURL = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const filterParams = {};

      params.forEach((v, c) => {
        const fullCategory = decodeCategory(c);
        const fullValue = decodeValue(v);
        filterParams[fullCategory] = {
          ...(filterParams[fullCategory] || {}),
          [fullValue]: true,
        };
      });

      return filterParams;
    } catch (error) {
      console.warn("Error parsing URL parameters:", error);
      return {};
    }
  };

  const [activeFilters, setActiveFilters] = useState(
    initializeFiltersFromURL()
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Update URL when filters change, now encoding values
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(activeFilters).forEach(([category, values]) => {
      const catKey = encodeCategory(category);
      Object.entries(values).forEach(([value, isActive]) => {
        if (isActive) {
          const valKey = encodeValue(value);
          params.append(catKey, valKey);
        }
      });
    });

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}${
        params.toString() ? "?" + params.toString() : ""
      }`
    );
  }, [activeFilters]);

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
      filtered = filtered.filter((product) => {
        const nameMatch = product.name.toLowerCase().includes(query);
        const categoryMatch = product.category
          ? product.category.toLowerCase().includes(query)
          : false;
        const envMatch = product.specifications?.Environment?.some((env) =>
          env.toLowerCase().includes(query)
        );

        return nameMatch || categoryMatch || envMatch;
      });
    }

    // Apply category filters using OR logic
    const hasActiveFilters = Object.values(activeFilters).some((category) =>
      Object.values(category).some(Boolean)
    );

    if (hasActiveFilters) {
      filtered = filtered.filter((product) =>
        Object.entries(activeFilters).some(([category, values]) => {
          const activeValues = Object.entries(values)
            .filter(([_, isActive]) => isActive)
            .map(([value]) => value);

          // Instead of automatically returning true on empty,
          // we only include if the product matches at least one activeValue:
          return (
            activeValues.length > 0 &&
            activeValues.some((value) =>
              matchesFilter(product, category, value)
            )
          );
        })
      );
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
