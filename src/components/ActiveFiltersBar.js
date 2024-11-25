import React, { useRef, useEffect, useState } from "react";

const ActiveFiltersBar = ({ filters, onRemoveFilter, onSearch }) => {
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const scrollContainerRef = useRef(null);

  const checkForOverflow = () => {
    const element = scrollContainerRef.current;
    if (element) {
      const hasOverflow = element.scrollWidth > element.clientWidth;
      const hasScroll = element.scrollLeft > 0;
      setShowLeftShadow(hasOverflow && hasScroll);
    }
  };

  // Check on mount and when filters change
  useEffect(() => {
    checkForOverflow();
    // Add resize observer to check when width changes
    const observer = new ResizeObserver(checkForOverflow);
    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
    }
    return () => observer.disconnect();
  }, [filters]);

  const handleScroll = () => {
    checkForOverflow();
  };

  const getActiveFilters = () => {
    const active = [];
    Object.entries(filters).forEach(([category, values]) => {
      Object.entries(values).forEach(([value, isActive]) => {
        if (isActive) {
          active.push({ category, value });
        }
      });
    });
    return active;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0) {
    return (
      <div className="rmc-active-filters-bar">
        <span className="rmc-active-filters-label">Active Filters:</span>
        <span className="rmc-no-filters">None</span>
        <div className="rmc-search-container">
          <input
            type="text"
            className="rmc-search-input"
            placeholder="Search products..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="rmc-active-filters-bar">
      <span className="rmc-active-filters-label">Active Filters:</span>
      <div
        className={`rmc-active-filters-scroll-container ${
          showLeftShadow ? "show-shadow" : ""
        }`}
      >
        <div
          className="rmc-active-filters-list"
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          {activeFilters.map(({ category, value }) => (
            <button
              key={`${category}-${value}`}
              className="rmc-active-filter-tag"
              onClick={() => onRemoveFilter(category, value)}
            >
              <span className="rmc-filter-tag-text">
                {category}: {value}
              </span>
              <span className="rmc-filter-tag-remove">×</span>
            </button>
          ))}
        </div>
      </div>
      <div className="rmc-search-container">
        <input
          type="text"
          className="rmc-search-input"
          placeholder="Search products..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ActiveFiltersBar;
