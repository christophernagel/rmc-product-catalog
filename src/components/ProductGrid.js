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
      if (!filters.filters) return true;

      for (const [filterType, filterValues] of Object.entries(
        filters.filters
      )) {
        const activeFilters = Object.entries(filterValues)
          .filter(([_, isActive]) => isActive)
          .map(([value]) => value);

        if (activeFilters.length === 0) continue;

        const productValue = product.specifications?.[filterType.toLowerCase()];

        if (Array.isArray(productValue)) {
          if (!activeFilters.some((filter) => productValue.includes(filter))) {
            return false;
          }
        } else if (!activeFilters.includes(productValue)) {
          return false;
        }
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
              <ProductCard key={product.id} {...product} showCategory={false} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
