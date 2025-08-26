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
        <h2 class="is-size-2 has-text-centered mb-4">Products</h2>
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
import axios from "axios";
import ProductBox from "@/components/ProductBox.vue";
export default {
  name: "HomeView",
  data() {
    return {
      latestProducts: [],
      // 2. Se añade la ruta de la imagen a los datos
      imageUrl: "/background.jpg",
    };
  },
  components: {
    ProductBox
  },
  mounted() {
    this.getLatestProducts();
  },
  methods: {
    async getLatestProducts() {
      this.$store.commit("setLoading", true);
      await axios
        .get("api/latest/")
        .then((response) => {
          this.latestProducts = response.data;
          document.title = 'Bienvenidos | Finca Samaniego'; // Set the page title
        })
        .catch((error) => {
          console.error("Error fetching latest products:", error);
        });
      this.$store.commit("setLoading", false);
    },
  },
};
</script>

