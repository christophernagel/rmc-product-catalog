import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, filters }) => {
  const filterProducts = (products) => {
    // If no filters are active, show all products
    if (Object.keys(filters).length === 0) return products;

    return products.filter((product) => {
      // Check if product matches ANY active filter
      for (const [category, activeValues] of Object.entries(filters)) {
        const activeFilters = Object.entries(activeValues)
          .filter(([_, isActive]) => isActive)
          .map(([value]) => value);

        if (activeFilters.length === 0) continue;

        // Check if product matches any filter in this category
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

        // If it matches any filter, show the product
        if (matches) return true;
      }
      // If no matches found in any category, don't show the product
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
