<template>
  <div class="home">
    <section
      class="hero is-medium is-dark mb-6"
      :style="{ backgroundImage: 'url(' + imageUrl + ')' }"
    >
      <div class="hero-body has-text-centered">
        <div class="container">
          <h1 class="title">Bienvenido a Finca Samaniego</h1>
          <h2 class="subtitle">
            Descubre nuestros productos frescos y orgánicos.
          </h2>
        </div>
      </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered mb-4">Productos Recientes</h2>
      </div>
      <ProductBox
        v-for="product in latestProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
// import axios from "axios"; // REMOVED
import ProductBox from "@/components/ProductBox.vue";
import { allProducts } from "@/data/products.js"; // IMPORTED: nuestra nueva fuente de datos

export default {
  name: "HomeView",
  data() {
    return {
      imageUrl: '/background.jpg',
      // CHANGED: Cargamos los datos directamente
      latestProducts: [],
    };
  },
  components: {
    ProductBox
  },
  mounted() {
    // CHANGED: Obtenemos los productos de nuestro archivo local
    // Puedes ordenar por fecha si quieres los "más recientes"
    this.latestProducts = allProducts.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
    document.title = 'Bienvenidos | Finca Samaniego';
  },
  // REMOVED: El método getLatestProducts ya no es necesario
  // methods: {
  //   async getLatestProducts() { ... }
  // }
};
</script>