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

  return (
    <div className="filter-section">
      <div
        className="filter-section-header"
        onClick={() => setIsExpanded(!isExpanded)}
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
    Conduit: {
      options: ["Rigid", "IMC"],
      order: 1,
      tooltip: "Type and construction method of conduit",
    },
    Strut: {
      options: ["Solid", "Slotted", "Elongated Holes"],
      order: 2,
      tooltip: "Strut specifications including gauge, profile, and patterns",
    },
    "Conduit Hubs": {
      options: ["Grounding", "Line Terminating", "Standard", "O-Ring/Locknut"],
      order: 3,
      tooltip: "Hub types and configurations for conduit termination",
    },
    "Conduit Elbows": {
      options: ["45°", "90°"],
      order: 4,
      tooltip: "Standard bend angles for direction changes",
    },
    "Conduit Bodies": {
      options: ["C", "LB", "LL", "LR", "T", "TB", "X"],
      order: 5,
      tooltip: "Standard conduit body configurations for routing changes",
    },
    "Junction Boxes": {
      options: ["FDC", "FDCT", "FDX"],
      order: 6,
      tooltip: "Conduit box configurations for junctions and pulls",
    },
    Couplings: {
      options: ["Standard", "3-Piece", "Reducing"],
      order: 7,
      tooltip: "Coupling configurations for conduit connections",
    },
    Plugs: {
      options: [
        "Face Bushing",
        "Grounding Bushing",
        "Box Connector",
        "Conduit Cap",
        "Floor Flange",
      ],
      order: 8,
      tooltip: "Various fittings for conduit system connections",
    },
    "Material Grade": {
      options: ["304", "316", "316L"],
      order: 9,
      tooltip:
        "Stainless steel grade specifications determining corrosion resistance and strength",
    },
    Environment: {
      options: ["Indoor", "Outdoor", "Corrosive", "Wet Location"],
      order: 10,
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
      order: 11,
      tooltip: "Applicable safety and compliance standards",
    },
  };

  useEffect(() => {
    updateFilterCount();
  }, [activeFilters]);

  const updateFilterCount = () => {
    const count = Object.values(activeFilters || {}).reduce(
      (acc, group) => acc + Object.values(group).filter(Boolean).length,
      0
    );
    setActiveFilterCount(count);
  };

  const handleFilterChange = (category, value) => {
    const currentFilters = { ...activeFilters };
    currentFilters[category] = {
      ...currentFilters[category],
      [value]: !currentFilters[category]?.[value],
    };
    onFilterChange(currentFilters);
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const renderFilters = () => {
    return Object.entries(filterStructure)
      .sort(([_, a], [__, b]) => a.order - b.order)
      .map(([category, config]) => (
        <FilterSection key={category} title={category} tooltip={config.tooltip}>
          <div className="filter-group">
            {config.options.map((option) => (
              <div key={option} className="filter-option">
                <input
                  type="checkbox"
                  id={`${category}-${option}`}
                  checked={activeFilters?.[category]?.[option] || false}
                  onChange={() => handleFilterChange(category, option)}
                />
                <label htmlFor={`${category}-${option}`}>{option}</label>
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
