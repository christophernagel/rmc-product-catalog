import React, { useState, useEffect } from "react";
import ProductGrid from "./ProductGrid";
import ProductFilters from "./ProductFilters";
import FilterDrawer from "./FilterDrawer";
import ActiveFiltersBar from "./ActiveFiltersBar";
import sampleProducts from "./sampleProducts";

const ProductCatalog = () => {
  // Initialize filters from URL with validation
  const initializeFiltersFromURL = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const filterParams = {};

      // Remove validation against sampleProducts since it might not be loaded
      params.forEach((value, category) => {
        // Instead validate against our known filterStructure
        filterParams[category] = {
          ...(filterParams[category] || {}),
          [value]: true,
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

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(activeFilters).forEach(([category, values]) => {
      Object.entries(values).forEach(([value, isActive]) => {
        if (isActive) {
          params.append(category, value);
        }
      });
    });

    // Update URL without page refresh
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
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.specifications?.Environment?.some((env) =>
            env.toLowerCase().includes(query)
          )
      );
    }

    // Apply category filters
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

              case "Conduit Bodies":
                return product.specifications["Body Style"] === value;

              case "Device Box":
                return product.specifications["Box Style"] === value;

              case "Conduit Hubs":
                const hubStyleMap = {
                  "Terminator Hub": "Line Terminating",
                  "Grounding Hub": "Grounding",
                };
                return (
                  product.specifications["Hub Style"] === hubStyleMap[value]
                );

              case "Liquid Tight Connectors":
                return product.specifications["Connection Type"] === value;

              case "Conduit Fittings":
                if (value.includes("Elbow")) {
                  return (
                    product.specifications["Elbow Angle"] ===
                    value.split(" ")[0]
                  ); // "45°" or "90°"
                }
                if (value.includes("Coupling")) {
                  return (
                    product.specifications["Coupling Style"] ===
                    value.split(" ")[0]
                  ); // "Rigid" or "3-Piece"
                }
                if (value.includes("Nipple")) {
                  return product.name === "Standard Nipple"; // Exact name match
                }
                return false;

              case "Plugs & Bushings":
                if (value.includes("Recessed Plug")) {
                  return product.name === "Recessed Plug";
                }
                if (value.includes("Bushing")) {
                  return product.name === "Face Bushing";
                }
                return false;

              case "Strut":
                return (
                  product.specifications["Strut Properties"]?.includes(value) ||
                  product.specifications["Strut Pattern"] === value
                );

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
