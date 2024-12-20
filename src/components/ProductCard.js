import React from "react";

const typeColors = {
  Conduit: "#A52A2A", // Brown
  "Conduit Body": "#FF8C00", // Dark Orange
  "Device Box": "#FFD700", // Gold
  Hub: "#4682B4", // Steel Blue
  "Liquid Tight": "#9370DB", // Medium Purple
  ECN: "#708090", // Slate Gray
  "Plugs & Bushings": "#2F4F4F", // Dark Slate Gray
  Strut: "#228B22", // Forest Green
};

const ProductCard = ({
  name,
  specifications,
  image,
  specSheetUrl,
  pageUrl,
  category,
  description, // now we directly accept description from product props
}) => {
  const getProductType = () => {
    // Map product categories to display types
    const categoryToType = {
      Conduit: "Conduit",
      "Conduit Bodies": "Conduit Body",
      "Device Box": "Device Box",
      "Conduit Hubs": "Hub",
      "Liquid Tight Connectors": "Liquid Tight",
      "Conduit Fittings": "ECN",
      "Plugs & Bushings": "Plugs & Bushings",
      Strut: "Strut",
    };

    // Return mapped type if category exists
    if (category && categoryToType[category]) {
      return categoryToType[category];
    }

    // Fallback checks based on specifications
    if (specifications?.["Conduit Type"]) return "Conduit";
    if (specifications?.["Body Style"]) return "Conduit Body";
    if (specifications?.["Box Style"]) return "Device Box";
    if (specifications?.["Hub Style"]) return "Hub";
    if (specifications?.["Elbow Angle"] || specifications?.["Coupling Style"])
      return "ECN";
    if (specifications?.["Strut Properties"]) return "Strut";

    return "Other";
  };

  // Since we now have a description on each product, we don't need complicated logic:
  const getProductDescription = () => description || "";

  const type = getProductType();
  const color = typeColors[type] || "#808080";

  return (
    <div
      className="rmc-product-card"
      onClick={() => pageUrl && window.open(pageUrl, "_blank")}
      style={{ cursor: pageUrl ? "pointer" : "default" }}
    >
      <div className="rmc-product-image-container">
        <div className="rmc-type-indicator">
          <span
            className="rmc-type-dot"
            style={{ backgroundColor: color }}
          ></span>
          <span className="rmc-type-label">{type}</span>
        </div>
        <img
          src={image || "/wp-content/uploads/2024/12/default-product.png"}
          alt={name}
          className="rmc-product-image"
        />
        <button
          className="rmc-download-button"
          title="Download Spec Sheet"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Download spec sheet for:", name);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
      </div>
      <div className="rmc-product-content">
        <h3 className="rmc-product-title">{name}</h3>
        <div className="rmc-product-details">
          <p className="rmc-product-description">{getProductDescription()}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
