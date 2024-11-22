import React from "react";

const productDescriptions = {
  // Conduit Bodies by style
  conduitBody: {
    default:
      "These ports provide access to wire and cable inside metal conduit for pulling, splicing, and maintenance. They are also used to change the direction of a run.",
    LB: "LB conduit bodies allow for 90-degree bends while providing pull access for wire installation.",
    LL: "LL conduit bodies provide left-side 90-degree turns with pull access.",
    LR: "LR conduit bodies provide right-side 90-degree turns with pull access.",
    T: "T conduit bodies allow for three-way connections and wire access.",
    C: "C conduit bodies provide straight-through wire access and pulling points.",
    X: "X conduit bodies allow for four-way connections with inspection access.",
  },
  // Conduit types
  conduit: {
    Rigid:
      "This impact- and crush-resistant conduit provides maximum physical protection for conductors.",
    IMC: "Also known as Intermediate Metallic Conduit (IMC), this is lighter in weight than thick-wall (rigid) conduit while maintaining comparable strength.",
    EMT: "This thin-wall conduit offers economical protection and is typically used in exposed and concealed areas where physical protection is not a major concern.",
  },
  // Elbows
  elbows: {
    "45°":
      "45-degree elbows provide gradual directional changes in conduit runs, ideal for parallel offsets.",
    "90°":
      "90-degree elbows enable right-angle turns in conduit runs while maintaining proper bend radius for wire pulling.",
  },
  // Hubs
  hubs: {
    "Line Terminating":
      "These hubs provide liquid-tight connections between conduit and enclosures.",
    Grounding:
      "These hubs ensure proper grounding while providing liquid-tight connections between conduit and enclosures.",
  },
  // Strut
  strut: {
    default:
      "Provides mounting support for electrical equipment, conduit, and other mechanical systems.",
  },
};

const ProductCard = ({ name, specifications }) => {
  const getConduitType = (specifications) => {
    const type =
      specifications["Conduit Type"]?.toLowerCase() ||
      specifications["Body Style"]?.toLowerCase() ||
      "";

    if (type.includes("emt")) return { class: "emt", label: "EMT" };
    if (type.includes("imc")) return { class: "imc", label: "IMC" };
    if (type.includes("rigid")) return { class: "rigid", label: "Rigid" };

    if (
      type.includes("lb") ||
      type.includes("ll") ||
      type.includes("lr") ||
      type.includes("t") ||
      type.includes("c")
    )
      return { class: "rigid", label: "Body" };

    return null;
  };

  const getProductDescription = (specs) => {
    if (specs["Body Style"]) {
      return (
        productDescriptions.conduitBody[specs["Body Style"]] ||
        productDescriptions.conduitBody.default
      );
    }
    if (specs["Conduit Type"]) {
      return productDescriptions.conduit[specs["Conduit Type"]];
    }
    if (specs["Elbow Angle"]) {
      return productDescriptions.elbows[specs["Elbow Angle"]];
    }
    if (specs["Hub Configuration"]) {
      return productDescriptions.hubs[specs["Hub Configuration"]];
    }
    if (specs["Strut Pattern"]) {
      return productDescriptions.strut.default;
    }
    return null;
  };

  const typeInfo = getConduitType(specifications);

  return (
    <div className="rmc-product-card">
      <div className="rmc-product-image-container">
        {typeInfo && (
          <div className={`rmc-type-indicator ${typeInfo.class}`}>
            <span className="rmc-type-dot"></span>
            <span className="rmc-type-label">{typeInfo.label}</span>
          </div>
        )}
        <div className="rmc-placeholder-image">
          <span className="rmc-placeholder-x"></span>
        </div>
      </div>
      <div className="rmc-product-content">
        <h3 className="rmc-product-title">{name}</h3>
        <div className="rmc-product-details">
          <p className="rmc-product-description">
            {getProductDescription(specifications)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
