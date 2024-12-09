import React from "react";

const productDescriptions = {
  conduitBody: {
    default:
      "These ports provide access to wire and cable inside metal conduit for pulling, splicing, and maintenance.",
    LB: "LB conduit bodies allow for 90-degree bends while providing pull access for wire installation.",
    LL: "LL conduit bodies provide left-side 90-degree turns with pull access.",
    LR: "LR conduit bodies provide right-side 90-degree turns with pull access.",
    T: "T conduit bodies allow for three-way connections and wire access.",
    C: "C conduit bodies provide straight-through wire access and pulling points.",
    X: "X conduit bodies allow for four-way connections with inspection access.",
  },
  conduit: {
    Rigid:
      "This impact- and crush-resistant conduit provides maximum physical protection for conductors.",
    IMC: "Also known as Intermediate Metallic Conduit (IMC), this is lighter in weight than thick-wall (rigid) conduit while maintaining comparable strength.",
  },
  elbows: {
    "45°":
      "45-degree elbows provide gradual directional changes in conduit runs, ideal for parallel offsets.",
    "90°":
      "90-degree elbows enable right-angle turns in conduit runs while maintaining proper bend radius for wire pulling.",
  },
  hubs: {
    "Line Terminating":
      "These hubs provide liquid-tight connections between conduit and enclosures.",
    Grounding:
      "These hubs ensure proper grounding while providing liquid-tight connections between conduit and enclosures.",
  },
  strut: {
    default:
      "Provides mounting support for electrical equipment, conduit, and other mechanical systems.",
  },
};

const typeColors = {
  Conduit: "#A52A2A", // Brown
  "Conduit Body": "#FF8C00", // Dark Orange
  "Junction Box": "#FFD700", // Gold
  Strut: "#228B22", // Forest Green
  Hub: "#4682B4", // Steel Blue
  Elbow: "#708090", // Slate Gray
  Plug: "#2F4F4F", // Dark Slate Gray
  Coupling: "#B8860B",
};

const ProductCard = ({ name, specifications }) => {
  const getProductType = () => {
    if (specifications["Conduit Type"]) return "Conduit";
    if (specifications["Body Style"]) return "Conduit Body";
    if (specifications["Box Style"]) return "Junction Box";
    if (specifications["Strut Pattern"]) return "Strut";
    if (specifications["Hub Configuration"]) return "Hub";
    if (specifications["Elbow Angle"]) return "Elbow";
    if (specifications["Fitting Type"]) return "Plug";
    if (specifications["Coupling Style"]) return "Coupling";
    return "Product";
  };

  const getProductDescription = () => {
    const baseType = getProductType().toLowerCase().replace(" ", "");
    const style =
      specifications["Body Style"] ||
      specifications["Conduit Type"] ||
      specifications["Hub Configuration"] ||
      specifications["Elbow Angle"];

    return (
      productDescriptions[baseType]?.[style] ||
      productDescriptions[baseType]?.default ||
      ""
    );
  };

  const type = getProductType();
  const color = typeColors[type] || "#808080"; // Default to gray if no color match

  return (
    <div className="rmc-product-card">
      <div className="rmc-product-image-container">
        <div className="rmc-type-indicator">
          <span
            className="rmc-type-dot"
            style={{ backgroundColor: color }}
          ></span>
          <span className="rmc-type-label">{type}</span>
        </div>
        <img
          src="/wp-content/uploads/2024/12/Conduit-body.png"
          alt={name}
          className="rmc-product-image"
        />
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
