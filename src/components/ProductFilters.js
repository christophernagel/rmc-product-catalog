import React, { useState, useEffect, useRef } from "react";

const FilterSection = ({ title, children, className }) => {
  const headerRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (headerRef.current) {
          headerRef.current.classList.toggle("sticky", !entry.isIntersecting);
        }
      },
      { threshold: 1, rootMargin: "-1px 0px 0px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`filter-section ${className || ""}`} ref={sectionRef}>
      <h3 ref={headerRef}>{title}</h3>
      {children}
    </div>
  );
};

const ProductFilters = ({ onFilterChange, activeFilters }) => {
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);

  const filterStructure = {
    "Trade Size": {
      options: ['½"', '¾"', '1"', '1¼"', '1½"', '2"', '2½"', '3"', '4"'],
      order: 1,
    },
    Material: {
      options: ["304", "316", "316L"],
      order: 2,
    },
    Flexibility: {
      options: ["Rigid", "Flex"],
      order: 3,
      categorySpecific: "Conduit",
    },
    "Hub Type": {
      options: ["Forged Fitting LT Hub/O-Ring/Locknut", "Grounding Hub"],
      order: 4,
      categorySpecific: "Hubs",
      triggersCategory: true,
    },
    "Plug Type": {
      options: [
        "Face Bushing",
        "Grounding Bushing",
        "Flex Male",
        "Box Connector",
        "Conduit Cap",
        "Floor Flange",
      ],
      order: 5,
      categorySpecific: "Plugs",
      triggersCategory: true,
    },
    "Body Style": {
      options: ["C", "LB", "LL", "LR", "T", "TB", "X"],
      order: 6,
      categorySpecific: "Conduit Bodies",
      triggersCategory: true,
    },
    Angle: {
      options: ["Straight", "45°", "90°"],
      order: 7,
      categorySpecific: ["Elbows", "Plugs"],
    },
    "Conduit Length": {
      options: ["10'", "Custom"],
      order: 8,
      categorySpecific: "Conduit",
    },
    "Coupling Length": {
      options: [
        "CL",
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
      order: 9,
      categorySpecific: "Couplings",
    },
    Gauge: {
      options: ["12G", "14G"],
      order: 10,
      categorySpecific: "Strut",
    },
    Profile: {
      options: ['1⅝" x 1⅝"', '13/16" x 1⅝"'],
      order: 11,
      categorySpecific: "Strut",
    },
    Pattern: {
      options: ["Slotted E-Hole"],
      order: 12,
      categorySpecific: "Strut",
      triggersCategory: true,
    },
    Form: {
      options: ["Form 8"],
      order: 13,
      categorySpecific: "Conduit Bodies",
    },
    Certification: {
      options: [
        "UL 6A",
        "UL 514A",
        "UL 514B",
        "CSA C22.1:21",
        "CSA C22.2 NO 18.1",
      ],
      order: 14,
    },
    Environment: {
      options: ["Indoor", "Outdoor", "Corrosive", "Wet Location"],
      order: 15,
    },
  };

  useEffect(() => {
    updateActiveCategory();
    updateFilterCount();
  }, [activeFilters]);

  const updateActiveCategory = () => {
    for (const [filterType, values] of Object.entries(
      activeFilters.filters || {}
    )) {
      const config = filterStructure[filterType];
      if (config?.triggersCategory && Object.values(values).some(Boolean)) {
        setActiveCategory(config.categorySpecific);
        return;
      }
    }
    setActiveCategory(null);
  };

  const updateFilterCount = () => {
    const count = Object.values(activeFilters.filters || {}).reduce(
      (acc, group) => acc + Object.values(group).filter(Boolean).length,
      0
    );
    setActiveFilterCount(count);
  };

  const handleFilterChange = (filterType, value) => {
    const currentFilters = { ...activeFilters.filters };
    currentFilters[filterType] = {
      ...currentFilters[filterType],
      [value]: !currentFilters[filterType]?.[value],
    };

    // Clear incompatible filters when category changes
    const newConfig = filterStructure[filterType];
    if (newConfig?.triggersCategory) {
      Object.keys(currentFilters).forEach((key) => {
        const keyConfig = filterStructure[key];
        if (
          keyConfig?.categorySpecific &&
          keyConfig.categorySpecific !== newConfig.categorySpecific
        ) {
          delete currentFilters[key];
        }
      });
    }

    onFilterChange({ filters: currentFilters });
  };

  const clearFilters = () => {
    onFilterChange({ filters: {} });
    setActiveCategory(null);
  };

  const getVisibleFilters = () => {
    return Object.entries(filterStructure)
      .filter(([_, config]) => {
        if (!activeCategory) return true;
        if (!config.categorySpecific) return true;
        if (Array.isArray(config.categorySpecific)) {
          return config.categorySpecific.includes(activeCategory);
        }
        return config.categorySpecific === activeCategory;
      })
      .sort(([_, a], [__, b]) => a.order - b.order);
  };

  const renderFilters = () => {
    const visibleFilters = getVisibleFilters();
    const allFilters = Object.keys(filterStructure);

    return allFilters.map((filterType) => {
      const config = filterStructure[filterType];
      const isVisible = visibleFilters.some(([type]) => type === filterType);

      return (
        <FilterSection
          key={filterType}
          title={filterType}
          className={!isVisible ? "hidden" : ""}
        >
          <div className="filter-group filter-options-animated">
            {(Array.isArray(config.options) ? config.options : []).map(
              (option) => (
                <div key={option} className="filter-option">
                  <input
                    type="checkbox"
                    id={`${filterType}-${option}`}
                    checked={
                      activeFilters.filters?.[filterType]?.[option] || false
                    }
                    onChange={() => handleFilterChange(filterType, option)}
                  />
                  <label htmlFor={`${filterType}-${option}`}>{option}</label>
                </div>
              )
            )}
          </div>
        </FilterSection>
      );
    });
  };

  return (
    <div className="rmc-filters">
      <div className="filter-header">
        <div className="filter-count">
          <span>Filter By</span>
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
      <div className="filter-sections">{renderFilters()}</div>
    </div>
  );
};

export default ProductFilters;
