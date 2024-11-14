import React from "react";

const ProductCard = ({ name, specifications }) => {
  return (
    <div className="rmc-product-card">
      <h3>{name}</h3>
      <div className="rmc-product-details">
        <p>
          {specifications.size && `Size: ${specifications.size}`}
          {specifications.alloyType && ` | ${specifications.alloyType}`}
        </p>
        <ul>
          {specifications.type && <li>Type: {specifications.type}</li>}
          {specifications.options &&
            specifications.options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
