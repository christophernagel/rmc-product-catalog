import React, { useState, useRef, useEffect } from "react";

const FilterDrawer = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const drawerRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    currentY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    currentY.current = e.touches[0].clientY;
    const diff = currentY.current - startY.current;

    // Only handle vertical scrolling when at the top of the filter content
    const filterContent = drawerRef.current.querySelector(".filter-sections");
    if (filterContent && filterContent.scrollTop === 0) {
      if (isExpanded && diff > 0) {
        // Dragging down while expanded
        e.preventDefault();
        drawerRef.current.style.transform = `translate(-50%, ${diff}px)`;
      } else if (!isExpanded && diff < 0) {
        // Dragging up while collapsed
        e.preventDefault();
        const headerHeight = 60; // Height of the filter header
        drawerRef.current.style.transform = `translate(-50%, calc(100% - ${headerHeight}px + ${diff}px))`;
      }
    }
  };

  const handleTouchEnd = () => {
    const diff = currentY.current - startY.current;
    const threshold = 50; // Pixels to trigger state change

    if (isExpanded && diff > threshold) {
      setIsExpanded(false);
    } else if (!isExpanded && diff < -threshold) {
      setIsExpanded(true);
    }

    // Reset to controlled position
    drawerRef.current.style.transform = "";
  };

  // Handle clicks on the drawer handle
  const toggleDrawer = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  // Close drawer when clicking overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    // Prevent body scroll when drawer is open
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`filter-drawer-overlay ${isExpanded ? "visible" : ""}`}
        onClick={handleOverlayClick}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`filter-drawer ${isExpanded ? "expanded" : ""}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Handle for dragging */}
        <div className="filter-drawer-handle" onClick={toggleDrawer}>
          <div className="handle-line" />
        </div>

        {/* Content */}
        <div className="filter-drawer-content">{children}</div>
      </div>
    </>
  );
};

export default FilterDrawer;
