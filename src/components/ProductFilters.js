import React, { useState, useEffect } from "react";

const ProductFilters = ({ onFilterChange, activeFilters }) => {
  const [selectedCategory, setSelectedCategory] = useState("Conduit");
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  // Enhanced category definitions with metadata
  const categoryFilters = {
    Conduit: {
      order: 1,
      filters: {
        "Alloy Type": {
          options: ["SS304", "SS316"],
          multiSelect: false,
          required: true,
        },
        Type: {
          options: ["Rigid", "Flex"],
          multiSelect: false,
          required: true,
        },
        Size: {
          options: ['½"', '¾"', '1"', '1¼"', '1½"', '2"', '2½"', '3"', '4"'],
          multiSelect: true,
        },
        Options: {
          options: ["With Coupling", "Without Coupling"],
          multiSelect: false,
        },
      },
    },
    "Conduit Bodies": {
      order: 2,
      filters: {
        "Alloy Type": {
          options: ["SS304", "SS316"],
          multiSelect: false,
          required: true,
        },
        "Body Style": {
          options: ["C", "LB", "LL", "LR", "T", "TB", "X"],
          multiSelect: true,
        },
        Size: {
          options: ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
          multiSelect: true,
        },
        Form: {
          options: ["Form 8"],
          multiSelect: false,
          required: true,
        },
      },
    },
    Elbows: {
      order: 3,
      filters: {
        "Alloy Type": {
          options: ["SS304", "SS316"],
          multiSelect: false,
          required: true,
        },
        Angle: {
          options: ["45°", "90°"],
          multiSelect: true,
        },
        Size: {
          options: ['½"', '¾"', '1"', '1¼"', '1½"', '2"', '2½"', '3"', '4"'],
          multiSelect: true,
        },
      },
    },
  };

  useEffect(() => {
    handleCategoryChange("Conduit");
  }, []);

  useEffect(() => {
    let count = 0;
    Object.values(activeFilters.filters || {}).forEach((filterGroup) => {
      count += Object.values(filterGroup).filter(Boolean).length;
    });
    setActiveFilterCount(count);
  }, [activeFilters]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    // Initialize required filters
    const initialFilters = {};
    const categoryConfig = categoryFilters[category]?.filters;

    if (categoryConfig) {
      Object.entries(categoryConfig).forEach(([filterType, config]) => {
        if (config.required && config.options.length > 0) {
          initialFilters[filterType] = {
            [config.options[0]]: true,
          };
        }
      });
    }

    onFilterChange({
      category,
      filters: initialFilters,
    });
  };

  const handleFilterChange = (filterType, value) => {
    const categoryConfig =
      categoryFilters[selectedCategory]?.filters[filterType];
    const currentFilters = { ...activeFilters.filters };

    if (!categoryConfig.multiSelect) {
      // For single select, clear other values first
      currentFilters[filterType] = {
        [value]: !currentFilters[filterType]?.[value],
      };
    } else {
      // For multi-select, toggle the selected value
      currentFilters[filterType] = {
        ...currentFilters[filterType],
        [value]: !currentFilters[filterType]?.[value],
      };
    }

    onFilterChange({
      category: selectedCategory,
      filters: currentFilters,
    });
  };

  const clearFilters = () => {
    handleCategoryChange(selectedCategory);
  };

  return (
    <div className="rmc-filters">
      {/* Header with filter count and clear button */}
      <div className="filter-header">
        <div className="filter-count">
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="filter-badge">{activeFilterCount}</span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button onClick={clearFilters} className="clear-filters">
            Clear
          </button>
        )}
      </div>

      {/* Category Selection */}
      <div className="filter-section primary-category">
        <h3>Product Category</h3>
        <div className="filter-group">
          {Object.keys(categoryFilters)
            .sort((a, b) => categoryFilters[a].order - categoryFilters[b].order)
            .map((category) => (
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

      {/* Filter Options */}
      {selectedCategory && categoryFilters[selectedCategory]?.filters && (
        <div>
          {Object.entries(categoryFilters[selectedCategory].filters).map(
            ([filterType, config]) => (
              <div key={filterType} className="filter-section">
                <h3>{filterType}</h3>
                <div className="filter-group filter-options-animated">
                  {config.options.map((option) => (
                    <div key={option} className="filter-option">
                      <input
                        type={config.multiSelect ? "checkbox" : "radio"}
                        id={`${filterType}-${option}`}
                        name={config.multiSelect ? undefined : filterType}
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
