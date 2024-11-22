import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const TooltipPopup = ({ content, title, onClose, position }) => {
  return ReactDOM.createPortal(
    <div className="tooltip-overlay" onClick={onClose}>
      <div
        className="tooltip-popup"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          top: position.top,
          right: position.right,
          width: "300px",
          minHeight: "100px",
        }}
      >
        <div className="tooltip-header">
          <h3>{title}</h3>
          <button className="tooltip-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="tooltip-content">
          <p>{content}</p>
        </div>
      </div>
    </div>,
    document.body
  );
};

const FilterSection = ({ title, children, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipButtonRef = useRef(null);
  const filterSectionRef = useRef(null);

  const handleTooltipClick = (e) => {
    e.stopPropagation();
    if (tooltipButtonRef.current) {
      const buttonRect = tooltipButtonRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: buttonRect.top - 9,
        right: window.innerWidth - buttonRect.right - 10,
      });
      setShowTooltip(true);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="filter-section" ref={filterSectionRef}>
      <div
        className="filter-section-header"
        onClick={toggleExpand}
        style={{ cursor: "pointer" }}
      >
        <div className="filter-section-title">
          <span className={`expand-icon ${isExpanded ? "expanded" : ""}`}>
            ▼
          </span>
          <h3>{title}</h3>
        </div>
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
      <div className={`filter-section-content ${isExpanded ? "expanded" : ""}`}>
        {children}
      </div>
      {showTooltip && tooltip && (
        <TooltipPopup
          content={tooltip}
          title={title}
          onClose={() => setShowTooltip(false)}
          position={tooltipPosition}
        />
      )}
    </div>
  );
};

const ProductFilters = ({ onFilterChange, activeFilters }) => {
  const [activeFilterCount, setActiveFilterCount] = useState(0);

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
      tooltip: "Type and construction method of conduit",
    },
    "Body Style": {
      options: ["C", "LB", "LL", "LR", "T", "TB", "X"],
      order: 6,
      tooltip: "Standard conduit body configurations for routing changes",
    },
    "Box Style": {
      options: ["FDC", "FDCT", "FDX"],
      order: 7,
      tooltip: "Conduit box configurations for junctions and pulls",
    },
    "Hub Configuration": {
      options: ["Grounding", "Line Terminating"],
      order: 8,
      tooltip: "Hub types for conduit termination and grounding",
    },
    "Hub Style": {
      options: ["Standard", "O-Ring/Locknut"],
      order: 9,
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
      tooltip: "Various fittings for conduit system connections",
    },
    "Coupling Style": {
      options: ["Standard", "3-Piece", "Reducing"],
      order: 11,
      tooltip: "Coupling configurations for conduit connections",
    },
    "Elbow Angle": {
      options: ["45°", "90°"],
      order: 12,
      tooltip: "Standard bend angles for direction changes",
    },
    "Strut Properties": {
      options: ["12 Gauge", "14 Gauge", '1⅝" x 1⅝"', '13/16" x 1⅝"'],
      order: 13,
      tooltip: "Strut thickness and profile dimensions",
    },
    "Strut Pattern": {
      options: ["Solid", "Slotted", "Elongated Holes"],
      order: 14,
      tooltip: "Hole patterns for mounting flexibility",
    },
  };

  useEffect(() => {
    updateFilterCount();
  }, [activeFilters]);

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
    onFilterChange({ filters: currentFilters });
  };

  const clearFilters = () => {
    onFilterChange({ filters: {} });
  };

  const renderFilters = () => {
    return Object.entries(filterStructure)
      .sort(([_, a], [__, b]) => a.order - b.order)
      .map(([filterType, config]) => (
        <FilterSection
          key={filterType}
          title={filterType}
          tooltip={config.tooltip}
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
      ));
  };

  return (
    <div className="rmc-filters">
      <div className="filter-header">
        <div className="filter-count">
          <span>Filter By</span>
          <span
            className={`filter-badge ${
              activeFilterCount === 0 ? "filter-badge-hidden" : ""
            }`}
          >
            {activeFilterCount || ""}
          </span>
        </div>
        <button
          onClick={clearFilters}
          className={`clear-filters ${
            activeFilterCount === 0 ? "clear-filters-hidden" : ""
          }`}
        >
          Clear
        </button>
      </div>
      <div className="filter-sections">{renderFilters()}</div>
    </div>
  );
};

export default ProductFilters;
