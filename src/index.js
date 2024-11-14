import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps } from "@wordpress/block-editor";
import ProductCatalog from "./components/ProductCatalog";

registerBlockType("rmc-catalog/product-catalog", {
  title: "Product Catalog",
  description: "RMC Product Catalog Block",
  category: "widgets",
  icon: "grid-view",

  edit: function Edit() {
    const blockProps = useBlockProps();

    return (
      <div {...blockProps}>
        <ProductCatalog isEditor={true} />
      </div>
    );
  },

  save: function Save() {
    return null;
  },
});
