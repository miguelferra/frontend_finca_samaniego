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
.product-view {
  background: #221510;
  border-radius: 18px;
  box-shadow: 0 4px 18px rgba(72, 187, 120, 0.12);
  padding: 2.5rem 2rem;
  margin-bottom: 2rem;
}

.product-image img {
  width: 100%;
  max-width: 500px;
  height: 400px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(46, 125, 50, 0.15);
  background: #55342c;
  margin: 0 auto;
  display: block;
}

.title {
  color: #66bb6a;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 2px rgba(46, 125, 50, 0.15);
}

.subtitle {
  color: #fff;
  font-weight: 500;
  margin-bottom: 1.5rem;
}

hr {
  border: none;
  border-top: 2px solid #66bb6a;
  margin: 1.5rem 0;
}

.field.has-addons {
  margin-top: 2rem;
}

.input {
  border-radius: 18px;
  border: 2px solid #66bb6a;
  background: #fff;
  color: #221510;
  font-weight: 600;
}

.button.is-success {
  background: linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%);
  color: #fff;
  border-radius: 24px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(72, 187, 120, 0.15);
  border: none;
  transition: background 0.3s, transform 0.2s;
}

.button.is-success:hover {
  background: linear-gradient(135deg, #388e3c 0%, #66bb6a 100%);
  transform: translateY(-2px);
}

.product-view strong {
  color: #66bb6a;
}

@media (max-width: 768px) {
  .product-image img {
    max-width: 100%;
    height: 250px;
  }
  .product-view {
    padding: 1rem 0.5rem;
  }
}
</style>