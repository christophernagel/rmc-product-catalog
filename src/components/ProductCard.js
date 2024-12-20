import React from "react";

const productDescriptions = {
  conduit: {
    Rigid:
      "Impact- and crush-resistant conduit providing maximum physical protection for conductors.",
    Flex: "Flexible conduit designed for installations requiring movement or vibration absorption.",
  },
  conduitBody: {
    default:
      "Provides access to wire and cable inside metal conduit for pulling, splicing, and maintenance.",
    LB: "Allows for 90-degree bends while providing pull access for wire installation.",
    LL: "Provides left-side 90-degree turns with pull access.",
    LR: "Provides right-side 90-degree turns with pull access.",
    T: "Allows for three-way connections and wire access.",
    C: "Provides straight-through wire access and pulling points.",
    X: "Allows for four-way connections with inspection access.",
    XB: "Provides four-way access with increased capacity for larger wire pulls.",
    TB: "Provides three-way access with bottom outlet.",
  },
  deviceBox: {
    "Single Gang": "Standard device box for single gang applications.",
    "Double Gang": "Wider box for multiple device installations.",
    Deep: "Extra depth for additional wiring space.",
    Shallow: "Compact depth for limited wall space applications.",
  },
  hub: {
    "Line Terminating":
      "Provides liquid-tight connections between conduit and enclosures.",
    Grounding:
      "Ensures proper grounding while providing liquid-tight connections.",
  },
  liquidTight: {
    Straight: "Direct connection for flexible conduit applications.",
    "45°": "45-degree angled connection for gradual direction changes.",
    "90°": "90-degree angled connection for right-angle turns.",
  },
  ecn: {
    elbow: {
      "45°": "Provides gradual directional changes in conduit runs.",
      "90°": "Enables right-angle turns while maintaining proper bend radius.",
    },
    coupling: {
      Standard: "Basic connection between conduit sections.",
      "3-Piece": "Allows for easier installation and removal in tight spaces.",
    },
    nipple: "Pre-cut threaded conduit section for connections.",
  },
  plugsAndBushings: {
    "Counter Sunk Hex": "Sealing plug for unused openings.",
    Face: "Protection for wire entry points.",
  },
  strut: {
    default: "Mounting support for electrical equipment and conduit systems.",
  },
};

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

  const getProductDescription = () => {
    const type = getProductType();

    switch (type) {
      case "Conduit Body": {
        const bodyStyle = specifications?.["Body Style"];
        return (
          productDescriptions.conduitBody[bodyStyle] ||
          productDescriptions.conduitBody.default
        );
      }

      case "Liquid Tight": {
        const connectionType = specifications?.["Connection Type"];
        return (
          productDescriptions.liquidTight[connectionType] ||
          "Liquid-tight connection for flexible conduit systems."
        );
      }

      case "Hub": {
        const hubStyle = specifications?.["Hub Style"];
        return (
          productDescriptions.hub[hubStyle] ||
          "Provides secure conduit termination and connection to enclosures."
        );
      }

      case "Plugs & Bushings": {
        // Check the specific category to determine which description to use
        if (category === "Plugs") {
          return productDescriptions.plugsAndBushings["Counter Sunk Hex"];
        } else if (category === "Bushings") {
          return productDescriptions.plugsAndBushings.Face;
        }
        return "Component for sealing or protecting conduit openings.";
      }

      case "ECN": {
        if (specifications?.["Elbow Angle"]) {
          return productDescriptions.ecn.elbow[specifications["Elbow Angle"]];
        }
        if (specifications?.["Coupling Style"]) {
          return productDescriptions.ecn.coupling[
            specifications["Coupling Style"]
          ];
        }
        if (category === "Nipples") {
          return productDescriptions.ecn.nipple;
        }
        return "Conduit connection and routing component.";
      }

      default: {
        const baseType = type.toLowerCase().replace(/\s+&?\s*/g, "");
        const descriptionCategory = productDescriptions[baseType];
        if (!descriptionCategory) return "";

        const style =
          specifications?.["Body Style"] ||
          specifications?.["Conduit Type"] ||
          specifications?.["Hub Style"] ||
          specifications?.["Box Style"];

        return descriptionCategory[style] || descriptionCategory.default || "";
      }
    }
  };

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
