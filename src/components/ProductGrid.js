import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, filters }) => {
  const filterProducts = (products) => {
    // Check if there are any active filters
    const hasActiveFilters = Object.values(filters).some((category) =>
      Object.values(category).some(Boolean)
    );

    // If no filters are active, return all products
    if (!hasActiveFilters) return products;

    return products.filter((product) => {
      for (const [category, activeValues] of Object.entries(filters)) {
        const activeFilters = Object.entries(activeValues)
          .filter(([_, isActive]) => isActive)
          .map(([value]) => value);

        if (activeFilters.length === 0) continue;

        let matches = false;
        switch (category) {
          case "Conduit":
            matches = activeFilters.includes(
              product.specifications["Conduit Type"]
            );
            break;
          case "Strut":
            matches = activeFilters.some(
              (filter) =>
                product.specifications["Strut Properties"]?.includes(filter) ||
                product.specifications["Strut Pattern"]?.includes(filter)
            );
            break;
          case "Conduit Bodies":
            matches = activeFilters.includes(
              product.specifications["Body Style"]
            );
            break;
          case "Conduit Hubs":
            matches =
              activeFilters.includes(
                product.specifications["Hub Configuration"]
              ) || activeFilters.includes(product.specifications["Hub Style"]);
            break;
          case "Conduit Elbows":
            matches = activeFilters.includes(
              product.specifications["Elbow Angle"]
            );
            break;
          case "Junction Boxes":
            matches = activeFilters.includes(
              product.specifications["Box Style"]
            );
            break;
          case "Couplings":
            matches = activeFilters.includes(
              product.specifications["Coupling Style"]
            );
            break;
          case "Material Grade":
          case "Environment":
          case "Certification":
            matches = activeFilters.some((filter) =>
              product.specifications[category]?.includes(filter)
            );
            break;
        }

        if (matches) return true;
      }
      return false;
    });
  };

  const filteredProducts = filterProducts(products);

  if (filteredProducts.length === 0) {
    return (
      <div className="rmc-product-grid-empty">
        <p>No products match the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="rmc-product-grid">
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
