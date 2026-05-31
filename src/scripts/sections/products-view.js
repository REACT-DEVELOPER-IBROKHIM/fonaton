const filterContainer = document.querySelector("[data-products-filter]");
const productsGrid = document.querySelector("[data-products-grid]");

if (filterContainer && productsGrid) {
  const checkboxes = filterContainer.querySelectorAll("[data-filter-checkbox]");
  const products = productsGrid.querySelectorAll("[data-product-vendor]");

  function filterProducts() {
    const vendorBoxes = filterContainer.querySelectorAll(
      '[data-filter-checkbox="vendor"]'
    );
    const typeBoxes = filterContainer.querySelectorAll(
      '[data-filter-checkbox="type"]'
    );
    const tagBoxes = filterContainer.querySelectorAll(
      '[data-filter-checkbox="tag"]'
    );

    const selectedVendors = Array.from(vendorBoxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    const selectedTypes = Array.from(typeBoxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    const selectedTags = Array.from(tagBoxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    products.forEach((product) => {
      const vendor = product.dataset.productVendor;
      const type = product.dataset.productType;
      const productTags = product.dataset.productTags
        ? product.dataset.productTags.split(",").map((t) => t.trim()).filter(t => t)
        : [];

      // Build match conditions
      // If no filters selected for a category, all products match that category
      // If filters selected, product must match at least one in that category

      console.log("selected ven", selectedVendors)
      console.log("vendor", vendor)
      const vendorMatch =
        selectedVendors.length === 0 ||
        selectedVendors.includes(vendor);
      const typeMatch =
        selectedTypes.length === 0 ||
        selectedTypes.includes(type);
      const tagMatch =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => productTags.includes(tag));

        console.log("ven match", vendorMatch)
      // Show product only if it matches all active filters
      const shouldShow = vendorMatch && typeMatch && tagMatch;
      product.style.display = shouldShow ? "" : "none";
    });
  }

  // Call filter on page load to initialize
  filterProducts();

  checkboxes.forEach((cb) => {
    cb.addEventListener("change", filterProducts);
  });
}
