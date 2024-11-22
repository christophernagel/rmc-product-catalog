import React from "react";

const ProductCard = ({ name, specifications }) => {
  return (
    <div className="rmc-product-card">
      <h3>{name}</h3>
      <div className="rmc-product-details">
        <div className="rmc-primary-specs">
          {specifications.size && (
            <span className="rmc-spec">Size: {specifications.size}</span>
          )}
          {specifications.alloyType && (
            <span className="rmc-spec">
              Material: {specifications.alloyType}
            </span>
          )}
          {specifications.type && (
            <span className="rmc-spec">Type: {specifications.type}</span>
          )}
        </div>

        {specifications.environment && (
          <div className="rmc-environments">
            <strong>Environment:</strong>
            <div className="rmc-env-tags">
              {specifications.environment.map((env, index) => (
                <span key={index} className="rmc-env-tag">
                  {env}
                </span>
              ))}
            </div>
          </div>
        )}

        {specifications.certifications && (
          <div className="rmc-certifications">
            <strong>Certifications:</strong>
            <ul>
              {specifications.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>
        )}

        {specifications.options && (
          <div className="rmc-options">
            <strong>Features:</strong>
            <ul>
              {specifications.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
