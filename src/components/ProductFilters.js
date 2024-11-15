import React, { useState, useEffect } from "react";

const ProductFilters = ({ onFilterChange, activeFilters }) => {
  const [selectedCategory, setSelectedCategory] = useState("Conduit");
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  const categories = [
    "Conduit",
    "Conduit Bodies",
    "Elbows",
    "Couplings",
    "Nipples",
    "Strut",
    "Plugs",
    "Hubs",
  ];

  // Enhanced category definitions with metadata
  const categoryFilters = {
    Conduit: {
      order: 1,
      filters: {
        "Alloy Type": {
          options: ["SS304", "SS316"],
          required: true,
        },
        Type: {
          options: ["Rigid", "Flex"],
          required: true,
        },
        Gauge: {
          options: ['½"', '¾"', '1"', '1¼"', '1½"', '2"', '2½"', '3"', '4"'],
        },
        Options: {
          options: ["With Coupling", "Without Coupling"],
        },
      },
    },
    "Conduit Bodies": {
      order: 2,
      filters: {
        "Alloy Type": {
          options: ["SS304", "SS316"],
          required: true,
        },
        "Body Style": {
          options: ["C", "LB", "LL", "LR", "T", "TB", "X"],
        },
        Gauge: {
          options: ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
        },
        Form: {
          options: ["Form 8"],
          required: true,
        },
      },
    },
    Elbows: {
      order: 3,
      filters: {
        "Alloy Type": {
          options: ["SS304", "SS316"],
          required: true,
        },
        Angle: {
          options: ["45°", "90°"],
        },
        Gauge: {
          options: ['½"', '¾"', '1"', '1¼"', '1½"', '2"', '2½"', '3"', '4"'],
        },
      },
    },
    Couplings: {
      order: 4,
      filters: {
        "Alloy Type": {
          options: ["SS316"],
          required: true,
        },
        Type: {
          options: ["Rigid", "3PC"],
        },
        Size: {
          options: ['½"', '¾"', '1"', '1¼"', '1½"', '2"'],
        },
      },
    },
    Nipples: {
      order: 5,
      filters: {
        "Alloy Type": {
          options: ["SS304", "SS316"],
          required: true,
        },
        Size: {
          options: ['½"', '¾"', '1"', '1¼"', '1½"', '2"', '2½"', '3"', '4"'],
        },
        Length: {
          options: [
            "Close",
            '1½"',
            '2"',
            '2½"',
            '3"',
            '3½"',
            '4"',
            '4½"',
            '5"',
            '5½"',
            '6"',
          ],
        },
      },
    },
    Strut: {
      order: 6,
      filters: {
        "Alloy Type": {
          options: ["SS"],
          required: true,
        },
        Gauge: {
          options: ["12G", "14G"],
        },
        Profile: {
          options: ['1⅝" x 1⅝"', '13/16" x 1⅝"'],
        },
        Pattern: {
          options: ["Slotted E-Hole"],
        },
        Length: {
          options: ["10'"],
        },
      },
    },
    Plugs: {
      order: 7,
      filters: {
        "Alloy Type": {
          options: ["SS316"],
          required: true,
        },
        Type: {
          options: [
            "Face Bushing",
            "Grounding Bushing",
            "Flex Male 90°",
            "Flex Male Straight",
            "Flex Male 45°",
            "Box Connector",
            "Conduit Cap",
            "Floor Flange",
          ],
        },
        Gauge: {
          options: ['½"', '¾"', '1"', '1¼"', '1½"', '2"', '2½"', '3"', '4"'],
        },
      },
    },
    Hubs: {
      order: 8,
      filters: {
        Type: {
          options: ["Forged Fitting LT Hub/O-Ring/Locknut", "Grounding Hub"],
          required: true,
        },
        "Alloy Type": {
          options: ["SS316"],
          required: true,
        },
        Gauge: {
          options: ['½"', '¾"', '1"', '1¼"', '1½"', '2"', '2½"', '3"', '4"'],
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
    const currentFilters = { ...activeFilters.filters };

    currentFilters[filterType] = {
      ...currentFilters[filterType],
      [value]: !currentFilters[filterType]?.[value],
    };

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

      <div className="primary-category">
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
