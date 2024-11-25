import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, filters }) => {
  const groupByCategory = (products) => {
    return products.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(product);
      return acc;
    }, {});
  };

  const filterProducts = (products) => {
    return products.filter((product) => {
      // If no filters are active, show all products
      if (Object.keys(filters).length === 0) return true;

      // Check each active filter category
      for (const [category, activeValues] of Object.entries(filters)) {
        const activeFilters = Object.entries(activeValues)
          .filter(([_, isActive]) => isActive)
          .map(([value]) => value);

        if (activeFilters.length === 0) continue;

        // Match filter categories to product specifications
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
            matches = activeFilters.includes(
              product.specifications["Material Grade"]
            );
            break;
          case "Environment":
          case "Certification":
            matches = activeFilters.some((filter) =>
              product.specifications[category]?.includes(filter)
            );
            break;
          default:
            matches = true;
        }

        if (!matches && activeFilters.length > 0) return false;
      }
      return true;
    });
  };

  const groupedProducts = groupByCategory(products);
  const filteredGroups = Object.entries(groupedProducts).reduce(
    (acc, [category, products]) => {
      const filtered = filterProducts(products);
      if (filtered.length > 0) {
        acc[category] = filtered;
      }
      return acc;
    },
    {}
  );

  if (Object.keys(filteredGroups).length === 0) {
    return (
      <div className="rmc-product-grid-empty">
        <p>No products match the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="rmc-product-grid">
      {Object.entries(filteredGroups).map(([category, products]) => (
        <div key={category} className="product-category-section">
          <h2 className="category-header">{category}</h2>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
