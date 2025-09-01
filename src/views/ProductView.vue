<template>
  <div class="product-view" v-if="product">
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
  <div v-else>
     <h1 class="title has-text-centered">Producto no encontrado</h1>
  </div>
</template>

<script>
// import axios from "axios"; // REMOVED
import { allProducts } from "@/data/products.js"; // IMPORTED

export default {
  name: "ProductView",
  data() {
    return {
      product: null, // Initialize as null
      quantity: 1,
    };
  },
  mounted() {
    this.getProduct();
  },
  watch: {
    // Si el usuario navega entre productos, esto asegura que la vista se actualice
    '$route'(to, from) {
      if (to.name === 'Product') {
        this.getProduct();
      }
    }
  },
  methods: {
    // CHANGED: El método ahora es síncrono y busca en el array local
    getProduct() {
      this.$store.commit("setLoading", true);
      
      const category_slug = this.$route.params.category_slug;
      const product_slug = this.$route.params.product_slug;

      // Buscamos el producto en nuestro archivo de datos
      const foundProduct = allProducts.find(p => p.category_slug === category_slug && p.slug === product_slug);

      if (foundProduct) {
        this.product = foundProduct;
        document.title = this.product.name + " | Finca Samaniego";
      } else {
        console.error("Producto no encontrado!");
        // Aquí podrías redirigir a una página 404
      }
      
      this.$store.commit("setLoading", false);
    },
  },
};
</script>

<style>
.product-image img {
  width: 600px;
  height: 600px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
}
</style>