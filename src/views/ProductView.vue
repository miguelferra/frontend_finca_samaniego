<template>
  <div class="product-view">
    <div class="columns is-multiline">
      <div class="column is-6">
        <figure class="image product-image">
          <img
            v-if="product.image_url"
            :src="product.image_url"
            alt="Product Image"
          />
        </figure>
      </div>

      <div class="column is-6">
        <h1 class="title">{{ product.name }}</h1>
        <p class="subtitle is-5">{{ product.description }}</p>

        <hr />

        <h2 class="subtitle is-4">Detalles</h2>
        <p><strong>Precio:</strong> ${{ product.price }}</p>

        <div class="field has-addons mt-6">
          <div class="control">
            <input type="number" class="input" v-model="quantity" min="1" />
          </div>

          <div class="control">
            <a class="button is-success">Añadir al carrito</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ProductView",
  data() {
    return {
      product: {},
      quantity: 1,
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    async getProduct() {
      this.$store.commit("setLoading", true);
      const category_slug = this.$route.params.category_slug;
      const product_slug = this.$route.params.product_slug;
      await axios
        .get(`/api/product/${category_slug}/${product_slug}/`)
        .then((response) => {
          this.product = response.data;
          console.log("Product data:", this.product);
          document.title = this.product.name + " | Finca Samaniego"; // Set the page title
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
      this.$store.commit("setLoading", false);
    },
  },
};
</script>

<style>
.product-image img {
  width: 600px; /* Set your desired width */
  height: 600px; /* Set your desired height */
  object-fit: cover;
  display: block;
  margin: 0 auto;
}
</style>
