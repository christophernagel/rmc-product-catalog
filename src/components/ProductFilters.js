import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const TooltipPopup = ({ content, onClose, position }) => {
  return ReactDOM.createPortal(
    <div className="tooltip-overlay" onClick={onClose}>
      <div
        className="tooltip-popup"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          top: position.top,
          left: position.left,
        }}
      >
        <button className="tooltip-close" onClick={onClose}>
          ×
        </button>
        <div className="tooltip-content">{content}</div>
      </div>
    </div>,
    document.body
  );
};

const FilterSection = ({ title, children, tooltip, style }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipButtonRef = useRef(null);
  const filterSectionRef = useRef(null);

  const handleTooltipClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (tooltipButtonRef.current) {
      const buttonRect = tooltipButtonRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: buttonRect.top - 8,
        left: 320,
      });
      setShowTooltip(true);
    }
  };

  return (
    <div className="filter-section" ref={filterSectionRef} style={style}>
      <div className="filter-section-header">
        <h3>{title}</h3>
        {tooltip && (
          <button
            ref={tooltipButtonRef}
            className="filter-tooltip"
            onClick={handleTooltipClick}
            aria-label="Show more information"
          >
            ?
          </button>
        )}
      </div>
      {children}
      {showTooltip && tooltip && (
        <TooltipPopup
          content={tooltip}
          onClose={() => setShowTooltip(false)}
          position={tooltipPosition}
        />
      )}
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
      tooltip: "Standard trade sizes for all components",
    },
    "Material Grade": {
      options: ["304", "316", "316L"],
      order: 2,
      tooltip:
        "Stainless steel grade specifications determining corrosion resistance and strength",
    },
    Environment: {
      options: ["Indoor", "Outdoor", "Corrosive", "Wet Location"],
      order: 3,
      tooltip: "Intended installation environment affecting material selection",
    },
    Certification: {
      options: [
        "UL 6A",
        "UL 514A",
        "UL 514B",
        "CSA C22.1:21",
        "CSA C22.2 NO 18.1",
      ],
      order: 4,
      tooltip: "Applicable safety and compliance standards",
    },
    "Conduit Type": {
      options: ["Rigid", "IMC"],
      order: 5,
      categorySpecific: "Conduit",
      tooltip: "Type and construction method of conduit",
    },
    "Body Style": {
      options: ["C", "LB", "LL", "LR", "T", "TB", "X"],
      order: 6,
      categorySpecific: "Conduit Bodies",
      triggersCategory: true,
      tooltip: "Standard conduit body configurations for routing changes",
    },
    "Box Style": {
      options: ["FDC", "FDCT", "FDX"],
      order: 7,
      categorySpecific: "Conduit Bodies",
      tooltip: "Conduit box configurations for junctions and pulls",
    },
    "Hub Configuration": {
      options: ["Grounding", "Line Terminating"],
      order: 8,
      categorySpecific: "Hubs",
      triggersCategory: true,
      tooltip: "Hub types for conduit termination and grounding",
    },
    "Hub Style": {
      options: ["Standard", "O-Ring/Locknut"],
      order: 9,
      categorySpecific: "Hubs",
      tooltip: "Hub sealing and mounting options",
    },
    "Fitting Type": {
      options: [
        "Face Bushing",
        "Grounding Bushing",
        "Box Connector",
        "Conduit Cap",
        "Floor Flange",
      ],
      order: 10,
      categorySpecific: "Fittings",
      triggersCategory: true,
      tooltip: "Various fittings for conduit system connections",
    },
    "Coupling Style": {
      options: ["Standard", "3-Piece", "Reducing"],
      order: 11,
      categorySpecific: "Couplings",
      triggersCategory: true,
      tooltip: "Coupling configurations for conduit connections",
    },
    "Elbow Angle": {
      options: ["45°", "90°"],
      order: 12,
      categorySpecific: ["Elbows"],
      tooltip: "Standard bend angles for direction changes",
    },
    "Strut Properties": {
      options: ["12 Gauge", "14 Gauge", '1⅝" x 1⅝"', '13/16" x 1⅝"'],
      order: 13,
      categorySpecific: "Strut",
      triggersCategory: true,
      tooltip: "Strut thickness and profile dimensions",
    },
    "Strut Pattern": {
      options: ["Solid", "Slotted", "Elongated Holes"],
      order: 14,
      categorySpecific: "Strut",
      tooltip: "Hole patterns for mounting flexibility",
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
          tooltip={config.tooltip}
          style={{ display: isVisible ? "block" : "none" }}
        >
          <div className="filter-group">
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
                <label htmlFor={`${filterType}-${option}`}>{option}</label>
              </div>
            ))}
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
