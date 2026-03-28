<template>
  <section class="catalog-page">
    <header class="catalog-hero">
      <p class="catalog-kicker">Colección completa</p>
      <h1>Todos los Productos</h1>
      <p>
        Explora el catálogo completo de Finca Samaniego. Aquí separamos lo que
        ya puedes pedir y lo que está por salir.
      </p>
      <div class="catalog-pills">
        <span class="catalog-pill">
          <i class="fas fa-box-open"></i>
          {{ allProducts.length }} productos
        </span>
        <span class="catalog-pill is-available">
          <i class="fas fa-check-circle"></i>
          {{ availableCount }} disponibles
        </span>
        <span class="catalog-pill is-soon">
          <i class="fas fa-clock"></i>
          {{ comingSoonCount }} próximos
        </span>
      </div>
    </header>

    <div class="columns is-multiline">
      <ProductBox
        v-for="product in allProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<script>
import ProductBox from "@/components/ProductBox.vue";
import { getLatestProducts } from "@/utils/products.js";

export default {
  name: "AllProductsView",
  components: { ProductBox },
  computed: {
    allProducts() {
      return getLatestProducts();
    },
    availableCount() {
      return this.allProducts.filter((product) => product.isAvailable).length;
    },
    comingSoonCount() {
      return this.allProducts.filter((product) => product.isComingSoon).length;
    },
  },
};
</script>

<style scoped>
.catalog-page {
  background: linear-gradient(180deg, rgba(34, 21, 16, 0.94) 0%, rgba(27, 17, 14, 0.98) 100%);
  border-radius: 28px;
  box-shadow: 0 24px 56px rgba(0, 0, 0, 0.2);
  padding: 2.5rem 2rem;
  border: 1px solid rgba(240, 218, 188, 0.08);
}

.catalog-hero {
  margin-bottom: 2rem;
}

.catalog-kicker {
  color: #ffd27d;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.catalog-hero h1 {
  color: #fff7ed;
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.catalog-hero p {
  color: #ccb8a5;
  max-width: 720px;
  line-height: 1.7;
}

.catalog-pills {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1.2rem;
}

.catalog-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  background: rgba(255, 248, 239, 0.08);
  border: 1px solid rgba(255, 248, 239, 0.08);
  color: #f6eadc;
  font-weight: 600;
}

.catalog-pill.is-available {
  color: #dff7e0;
  border-color: rgba(102, 187, 106, 0.18);
  background: rgba(102, 187, 106, 0.14);
}

.catalog-pill.is-soon {
  color: #ffe2a8;
  border-color: rgba(255, 183, 77, 0.16);
  background: rgba(255, 183, 77, 0.12);
}

.columns {
  margin-left: 0;
  margin-right: 0;
}

@media (max-width: 768px) {
  .catalog-page {
    padding: 1rem 0.5rem;
  }

  .catalog-hero h1 {
    font-size: 2rem !important;
  }
}
</style>
