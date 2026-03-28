import { allProducts as productCatalog } from "@/data/products.js";

const DEFAULT_DESCRIPTION =
  "Producto artesanal de la Sierra de Bacerac, elaborado con ingredientes seleccionados.";

const currencyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
});

const normalizeProduct = (product) => {
  const priceValue = Number.parseFloat(product.price);
  const isComingSoon = Boolean(product.coming_soon);

  return {
    ...product,
    name: product.name.trim(),
    description: (product.description || DEFAULT_DESCRIPTION).trim(),
    priceValue: Number.isFinite(priceValue) ? priceValue : 0,
    formattedPrice: currencyFormatter.format(
      Number.isFinite(priceValue) ? priceValue : 0
    ),
    isComingSoon,
    isAvailable: !isComingSoon,
  };
};

const compareByNewest = (left, right) =>
  new Date(right.date_added) - new Date(left.date_added);

const cloneProducts = (products) => products.map((product) => ({ ...product }));

const normalizedProducts = productCatalog.map(normalizeProduct);

export const getAllProducts = () => cloneProducts(normalizedProducts);

export const getLatestProducts = () =>
  cloneProducts(normalizedProducts).sort(compareByNewest);

export const getCategoryBySlug = (categorySlug) => {
  const products = getLatestProducts().filter(
    (product) => product.category_slug === categorySlug
  );

  return {
    slug: categorySlug,
    exists: products.length > 0,
    name: products[0]?.category_name || "Categoría no encontrada",
    products,
  };
};

export const getProductBySlugs = (categorySlug, productSlug) =>
  getAllProducts().find(
    (product) =>
      product.category_slug === categorySlug && product.slug === productSlug
  ) || null;

export const getRelatedProducts = (product, limit = 4) =>
  getLatestProducts()
    .filter(
      (candidate) =>
        candidate.category_slug === product.category_slug &&
        candidate.id !== product.id
    )
    .slice(0, limit);

export const getCatalogStats = () => {
  const products = getAllProducts();

  return {
    totalProducts: products.length,
    availableProducts: products.filter((product) => product.isAvailable).length,
    comingSoonProducts: products.filter((product) => product.isComingSoon)
      .length,
    categories: [...new Set(products.map((product) => product.category_slug))],
  };
};
