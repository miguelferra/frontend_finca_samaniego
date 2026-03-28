<template>
  <section class="page-category">
    <header class="category-hero">
      <p class="category-kicker">Categoría</p>
      <h1>{{ category.name }}</h1>
      <p v-if="category.exists">
        {{ category.products.length }} producto<span v-if="category.products.length !== 1">s</span>
        dentro de esta colección.
      </p>
      <p v-else>No encontramos productos activos para esta categoría.</p>
    </header>

    <div v-if="category.exists" class="columns is-multiline">
      <ProductBox
        v-for="product in category.products"
        :key="product.id"
        :product="product"
      />
    </div>

    <div v-else class="empty-state">
      <i class="fas fa-leaf"></i>
      <p>
        Esta categoría todavía no tiene productos visibles. Puedes revisar el
        catálogo completo mientras tanto.
      </p>
      <router-link to="/productos" class="button empty-state-btn">
        Ver catálogo completo
      </router-link>
    </div>
  </section>
</template>

<script>
import ProductBox from "@/components/ProductBox.vue";
import { getCategoryBySlug } from "@/utils/products.js";

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
      return getCategoryBySlug(this.category_slug);
    },
  },
  watch: {
    category: {
      immediate: true,
      handler(category) {
        document.title = `${category.name} | Finca Samaniego`;
      },
    },
  },
};
</script>

<style scoped>
.page-category {
  background: linear-gradient(180deg, rgba(34, 21, 16, 0.94) 0%, rgba(27, 17, 14, 0.98) 100%);
  border-radius: 28px;
  box-shadow: 0 24px 56px rgba(0, 0, 0, 0.2);
  padding: 2.5rem 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(240, 218, 188, 0.08);
}

.category-hero {
  margin-bottom: 2rem;
}

.category-kicker {
  color: #ffd27d;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.category-hero h1 {
  color: #fff7ed;
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.category-hero p {
  color: #ccb8a5;
  line-height: 1.7;
}

.empty-state {
  padding: 2.5rem 1rem 1rem;
  text-align: center;
  color: #dcccbc;
}

.empty-state i {
  font-size: 2.5rem;
  color: #66bb6a;
  margin-bottom: 1rem;
}

.empty-state-btn {
  margin-top: 1rem;
  border-radius: 999px;
  background: transparent;
  color: #dff7e0;
  border: 1px solid rgba(102, 187, 106, 0.28);
}

.empty-state-btn:hover {
  background: rgba(102, 187, 106, 0.12);
  color: #fff;
}

.columns {
  margin-left: 0;
  margin-right: 0;
}

@media (max-width: 768px) {
  .page-category {
    padding: 1rem 0.5rem;
  }

  .category-hero h1 {
    font-size: 2rem !important;
  }
}
</style>
