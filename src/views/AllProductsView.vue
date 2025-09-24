<template>
  <div class="page-category">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered all-products-header">Todos los Productos</h2>
      </div>
      <ProductBox
        v-for="product in allProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductBox from "@/components/ProductBox.vue";
import { allProducts } from "@/data/products.js";

export default {
  name: "AllProductsView",
  components: { ProductBox },
  data() {
    return { allProducts };
  }
};
</script>

<style scoped>
.page-category {
  background: #221510;
  border-radius: 18px;
  box-shadow: 0 4px 18px rgba(72, 187, 120, 0.12);
  padding: 2.5rem 2rem;
  margin-bottom: 2rem;
}

.all-products-header,
.is-size-2 {
  color: #66bb6a;
  font-weight: 700;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(46, 125, 50, 0.15);
}

.columns {
  margin-left: 0;
  margin-right: 0;
}

@media (max-width: 768px) {
  .page-category {
    padding: 1rem 0.5rem;
  }
  .all-products-header,
  .is-size-2 {
    font-size: 2rem !important;
  }
}
</style>