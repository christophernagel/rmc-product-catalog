import React, { useState } from "react";

const ProductFilters = ({ onFilterChange, activeFilters }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "Conduit",
    "Conduit Bodies",
    "Elbows",
    "Couplings",
    "Nipples",
    "Strut",
    "Strut Accessories",
  ];

  const categoryFilters = {
    Conduit: {
      "Alloy Type": ["SS304", "SS316"],
      Type: ["Rigid", "Flex"],
      Size: ['½"', '¾"', '1"', '1¼"', '1½"', '2"', '2½"', '3"', '4"'],
      Options: ["With Coupling", "Without Coupling"],
    },
    "Conduit Bodies": {
      "Alloy Type": ["SS304", "SS316"],
      "Body Style": ["C", "LB", "LL", "LR", "T", "TB", "X"],
      Size: ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
      Form: ["Form 8"],
      Accessories: ["Cover with Gasket"],
    },
    // Add other categories as needed
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterChange({
      category: category,
      filters: {},
    });
  };

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      category: selectedCategory,
      filters: {
        ...activeFilters.filters,
        [filterType]: {
          ...activeFilters.filters?.[filterType],
          [value]: !activeFilters.filters?.[filterType]?.[value],
        },
      },
    });
  };

  return (
    <div className="rmc-filters">
      <div className="filter-section primary-category">
        <h3>Product Category</h3>
        <div className="filter-group">
          {categories.map((category) => (
            <div key={category} className="filter-option">
              <input
                type="radio"
                id={`category-${category}`}
                name="category"
                checked={selectedCategory === category}
                onChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={`category-${category}`}>{category}</label>
            </div>
          ))}
        </div>
      </div>

      {selectedCategory && categoryFilters[selectedCategory] && (
        <div className="category-specific-filters">
          {Object.entries(categoryFilters[selectedCategory]).map(
            ([filterType, options]) => (
              <div key={filterType} className="filter-section">
                <h3>{filterType}</h3>
                <div className="filter-group">
                  {options.map((option) => (
                    <div key={option} className="filter-option">
                      <input
                        type="checkbox"
                        id={`${filterType}-${option}`}
                        checked={
                          activeFilters.filters?.[filterType]?.[option] || false
                        }
                        onChange={() => handleFilterChange(filterType, option)}
                      />
                      <label htmlFor={`${filterType}-${option}`}>
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
