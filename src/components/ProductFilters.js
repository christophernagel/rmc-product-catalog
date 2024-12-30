import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

// Filter Structure Configuration
const filterStructure = {
  Conduit: {
    options: ["Rigid"],
    order: 1,
    tooltip: "Type and construction method of conduit systems",
  },
  "Conduit Bodies": {
    options: ["LB", "LL", "LR", "C", "T", "TB", "XB"],
    order: 2,
    tooltip: "Standard conduit body configurations for routing changes",
  },
  "Device Box": {
    options: ["Single Gang"],
    order: 3,
    tooltip: "Device and junction boxes for electrical installations",
  },
  "Conduit Hubs": {
    options: ["Terminating Hub", "Grounding Hub"],
    order: 4,
    tooltip: "Hub types for conduit termination and grounding",
  },
  "Liquid Tight Connectors": {
    options: ["Straight", "45°", "90°"],
    order: 5,
    tooltip: "Liquid tight connectors for flexible conduit systems",
  },
  "Conduit Fittings": {
    options: [
      "45° Elbow",
      "90° Elbow",
      "Rigid Coupling",
      "3-Piece Coupling",
      "Standard Nipple",
    ],
    order: 6,
    tooltip: "Elbows, couplings, and nipples for conduit connections",
  },
  "Plugs & Bushings": {
    options: ["Recessed Plug", "Face Bushing"],
    order: 7,
    tooltip: "Sealing plugs and protective bushings",
  },
  Strut: {
    options: ["Deep Profile", "Shallow Profile"],
    order: 8,
    tooltip: "Strut channel and mounting solutions",
  },
  "Material Grade": {
    options: ["304", "316"],
    order: 9,
    tooltip: "Stainless steel grade specifications for corrosion resistance",
  },
  // Environment: {
  //   options: [
  //     "Indoor",
  //     "Outdoor",
  //     "Corrosive",
  //     "Marine",
  //     "Chemical",
  //     "Food Processing",
  //     "Wet Location",
  //   ],
  //   order: 10,
  //   tooltip: "Intended installation environment affecting material selection",
  // },
  Certification: {
    options: [
      "UL 6A",
      "UL 514A",
      "UL 514B",
      "CSA C22.1:21",
      "CSA C22.2 NO 18.1",
      "CSA C22.2 NO 18.3",
      "CSA C22.2 NO 18F",
    ],
    order: 11,
    tooltip: "Applicable safety and compliance standards",
  },
};

// Helper function to match filters with product specifications
export const matchesFilter = (product, category, value) => {
  switch (category) {
    case "Conduit":
      return product.specifications["Conduit Type"] === value;

    case "Conduit Bodies":
      return product.specifications["Body Style"] === value;

    case "Device Box":
      return product.specifications["Box Style"] === value;

    case "Conduit Hubs":
      // Map UI values to spec values
      const hubStyleMap = {
        "Terminating Hub": "Line Terminating",
        "Grounding Hub": "Grounding",
      };
      return product.specifications["Hub Style"] === hubStyleMap[value];

    case "Liquid Tight Connectors":
      return product.specifications["Connection Type"] === value;

    case "Conduit Fittings":
      if (value === "45° Elbow") {
        return product.specifications["Elbow Angle"] === "45°";
      }
      if (value === "90° Elbow") {
        return product.specifications["Elbow Angle"] === "90°";
      }
      if (value === "Rigid Coupling") {
        return product.specifications["Coupling Style"] === "Rigid";
      }
      if (value === "3-Piece Coupling") {
        return product.specifications["Coupling Style"] === "3-Piece";
      }
      if (value === "Standard Nipple") {
        return product.name === "Standard Nipple";
      }
      return false;

    case "Plugs & Bushings":
      if (value === "Recessed Plug") {
        return product.specifications["Plug Type"] === "Recessed Plug";
      }
      if (value === "Face Bushing") {
        return product.specifications["Bushing Type"] === "Face Bushing";
      }
      return false;

    case "Strut":
      // Check either Strut Properties or Strut Pattern
      if (value === "Deep Profile") {
        return product.specifications["Strut Properties"] === "Deep Profile";
      }
      if (value === "Shallow Profile") {
        return product.specifications["Strut Properties"] === "Shallow Profile";
      }
      if (value === "Elongated Holes") {
        return product.specifications["Strut Pattern"] === "Elongated Holes";
      }
      if (value === "Solid") {
        // If you had a "Solid" pattern or property, check here
        // If "Solid" isn't actually used, you can remove or define a condition.
        return false;
      }
      return false;

    case "Material Grade":
    // case "Environment":
    case "Certification":
      return product.specifications[category]?.includes(value);

    default:
      return false;
  }
};

// Tooltip Popup Component
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

// Filter Section Component
const FilterSection = ({
  title,
  children,
  tooltip,
  onFilterChange,
  activeFilters,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipButtonRef = useRef(null);

  const allSelected = React.useMemo(() => {
    if (!activeFilters?.[title]) return false;
    const options =
      React.Children.toArray(children).find(
        (child) =>
          child.type === "div" && child.props.className === "filter-group"
      )?.props.children || [];

    const optionValues = options.map(
      (option) => option.props.children[1].props.children
    );
    return (
      optionValues.length > 0 &&
      optionValues.every((value) => activeFilters[title][value])
    );
  }, [activeFilters, title, children]);

  const handleHeaderCheckboxChange = (e) => {
    e.stopPropagation();
    const isChecked = e.target.checked;

    const options =
      React.Children.toArray(children).find(
        (child) =>
          child.type === "div" && child.props.className === "filter-group"
      )?.props.children || [];

    const newFilters = { ...activeFilters };
    newFilters[title] = {};

    options.forEach((option) => {
      const value = option.props.children[1].props.children;
      newFilters[title][value] = isChecked;
    });

    onFilterChange(newFilters);
  };

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
      >
        <div className="filter-section-title">
          <span className={`expand-icon ${isExpanded ? "expanded" : ""}`}>
            ▼
          </span>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={handleHeaderCheckboxChange}
            onClick={(e) => e.stopPropagation()}
          />
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

// Main ProductFilters Component
const ProductFilters = ({ onFilterChange, activeFilters }) => {
  const [activeFilterCount, setActiveFilterCount] = useState(0);

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
        <FilterSection
          key={category}
          title={category}
          tooltip={config.tooltip}
          onFilterChange={onFilterChange}
          activeFilters={activeFilters}
        >
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
