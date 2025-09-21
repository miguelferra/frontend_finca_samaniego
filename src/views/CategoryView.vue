<template>
  <div class="page-category">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">{{ category.name }}</h2>
      </div>
      <ProductBox
        v-for="product in category.products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductBox from "@/components/ProductBox.vue";
import { allProducts } from "@/data/products.js"; // IMPORTED: La única fuente de datos

export default {
  name: "CategoryView",
  components: {
    ProductBox,
  },
  computed: {
    category_slug() {
      return this.$route.params.category_slug;
    },
    category() {
      this.$store.commit("setLoading", true);
      
      const filteredProducts = allProducts.filter(
        p => p.category_slug === this.category_slug
      );
      
      const categoryName = filteredProducts.length > 0 
        ? filteredProducts[0].category_name 
        : 'Categoría no encontrada';
      
      if (filteredProducts.length > 0) {
        document.title = categoryName + ' | Finca Samaniego';
      }

      this.$store.commit("setLoading", false);
      
      return {
        products: filteredProducts,
        name: categoryName
      };
    }
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
  .is-size-2 {
    font-size: 2rem !important;
  }
}
</style>