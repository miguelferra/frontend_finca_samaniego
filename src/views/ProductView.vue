<template>
  <div class="product-container" v-if="product">
    <!-- Header con breadcrumb -->
    <div class="product-header">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <router-link to="/" class="breadcrumb-link">Inicio</router-link>
          </li>
          <li>
            <router-link to="/productos" class="breadcrumb-link"
              >Productos</router-link
            >
          </li>
          <li class="is-active">
            <a href="#" aria-current="page" class="breadcrumb-link">{{
              product.name
            }}</a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Cuerpo del producto -->
    <div class="product-body">
      <div class="columns">
        <!-- Imagen del producto -->
        <div class="column is-5">
          <div class="product-image">
            <img
              v-if="product.image_url"
              :src="product.image_url"
              :alt="product.name"
              @error="handleImageError"
            />
          </div>
        </div>

        <!-- Información del producto -->
        <div class="column is-7">
          <h1 class="product-title">{{ product.name }}</h1>
          <p class="product-subtitle">
            {{
              product.description ||
              "Producto artesanal de la Sierra de Bacerac"
            }}
          </p>

          <!-- Precio -->
          <div class="price-tag">${{ product.price }} MXN</div>

          <!-- Disponibilidad -->
          <div class="availability-badge" v-if="product.available !== false">
            <i class="fas fa-check-circle"></i>
            <span>Disponible - Entrega inmediata</span>
          </div>
          <div class="unavailable-badge" v-else>
            <i class="fas fa-times-circle"></i>
            <span>Temporalmente no disponible</span>
          </div>
          <!-- Beneficios -->
          <div class="benefits-section">
            <h3>¿Por qué elegir nuestro {{ product.name }}?</h3>
            <div class="benefit-item">
              <i class="fas fa-leaf benefit-icon"></i>
              <span>100% Natural - Sin conservadores artificiales</span>
            </div>
            <div class="benefit-item">
              <i class="fas fa-hands benefit-icon"></i>
              <span>Cosechado a mano en la Sierra de Bacerac</span>
            </div>
            <div class="benefit-item">
              <i class="fas fa-fire benefit-icon"></i>
              <span>{{
                product.spicyLevel || "Sabor auténtico sonorense"
              }}</span>
            </div>
            <div class="benefit-item">
              <i class="fas fa-heart benefit-icon"></i>
              <span>Rico en vitamina C y antioxidantes</span>
            </div>
          </div>

          <!-- Selector de cantidad y botón de WhatsApp -->
          <div class="action-section">
            <div class="quantity-selector">
              <label>Cantidad:</label>
              <div class="quantity-controls">
                <button @click="decreaseQuantity" class="qty-btn">
                  <i class="fas fa-minus"></i>
                </button>
                <input
                  type="number"
                  v-model="quantity"
                  min="1"
                  max="99"
                  class="quantity-input"
                />
                <button @click="increaseQuantity" class="qty-btn">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>

            <div class="buttons-container">
              <a :href="getWhatsAppLink()" target="_blank" class="whatsapp-btn">
                <i class="fab fa-whatsapp"></i>
                Ordenar por WhatsApp
              </a>

              <button @click="addToWishlist" class="wishlist-btn">
                <i :class="isInWishlist ? 'fas fa-heart' : 'far fa-heart'"></i>
              </button>
            </div>
          </div>

          <!-- Sección para compartir -->
          <div class="share-section">
            <p>Compartir este producto:</p>
            <div class="share-buttons">
              <button @click="shareOnFacebook" class="share-btn">
                <i class="fab fa-facebook"></i> Facebook
              </button>
              <button @click="shareOnInstagram" class="share-btn">
                <i class="fab fa-instagram"></i> Instagram
              </button>
              <button @click="copyLink" class="share-btn">
                <i class="fas fa-link"></i>
                {{ linkCopied ? "¡Copiado!" : "Copiar enlace" }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección adicional de productos relacionados -->
      <div class="related-products" v-if="relatedProducts.length > 0">
        <h3>También te puede interesar</h3>
        <div class="columns is-multiline">
          <div
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            class="column is-3"
          >
            <router-link
              v-if="!relatedProduct.coming_soon"
              :to="relatedProduct.get_absolute_url"
              class="related-product-card"
            >
              <img :src="relatedProduct.image_url" :alt="relatedProduct.name" />
              <h4>{{ relatedProduct.name }}</h4>
              <p class="related-price">${{ relatedProduct.price }}</p>
            </router-link>
            <div v-else class="related-product-card disabled">
              <img :src="relatedProduct.image_url" :alt="relatedProduct.name" />
              <h4>{{ relatedProduct.name }}</h4>
              <p class="related-price price-soon">Disponible Muy Pronto</p>
              <div class="coming-soon-badge">
                <i class="fas fa-clock"></i>
                Próximamente
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Producto no encontrado -->
  <div v-else class="not-found">
    <i class="fas fa-exclamation-circle"></i>
    <h1 class="title has-text-centered">Producto no encontrado</h1>
    <p>El producto que buscas no está disponible.</p>
    <router-link to="/" class="button is-primary">
      Volver al inicio
    </router-link>
  </div>
</template>

<script>
import { allProducts } from "@/data/products.js";

export default {
  name: "ProductView",
  data() {
    return {
      product: null,
      quantity: 1,
      isInWishlist: false,
      linkCopied: false,
      relatedProducts: [],
    };
  },
  mounted() {
    this.getProduct();
  },
  watch: {
    $route(to, from) {
      if (to.name === "Product") {
        this.getProduct();
        this.quantity = 1; // Reset quantity when changing products
      }
    },
  },
  methods: {
    getProduct() {
      this.$store.commit("setLoading", true);
      const category_slug = this.$route.params.category_slug;
      const product_slug = this.$route.params.product_slug;

      const foundProduct = allProducts.find(
        (p) => p.category_slug === category_slug && p.slug === product_slug
      );

      if (foundProduct) {
        this.product = foundProduct;
        document.title = this.product.name + " | Finca Samaniego";
        this.loadRelatedProducts();
        this.checkWishlist();
      } else {
        console.error("Producto no encontrado!");
        this.product = null;
      }

      this.$store.commit("setLoading", false);
    },

    loadRelatedProducts() {
      // Cargar productos relacionados (misma categoría, excluyendo el actual)
      this.relatedProducts = allProducts
        .filter(
          (p) =>
            p.category_slug === this.product.category_slug &&
            p.id !== this.product.id
        )
        .slice(0, 4); // Mostrar máximo 4 productos
    },

    handleImageError(event) {
      console.warn("No se pudo cargar la imagen:", event.target.src);
      event.target.src =
        "https://via.placeholder.com/500x400/cccccc/666666?text=Imagen+no+disponible";
    },
    
    increaseQuantity() {
      if (this.quantity < 99) {
        this.quantity++;
      }
    },

    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },

    getWhatsAppLink() {
      const phoneNumber = "526623299654";
      const message = `Hola! Me interesa ordenar ${this.quantity} unidad(es) de ${this.product.name}. ¿Está disponible?`;
      return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    },

    addToWishlist() {
      this.isInWishlist = !this.isInWishlist;
      // Aquí podrías guardar en localStorage o Vuex
      if (this.isInWishlist) {
        this.$toast?.success("Agregado a favoritos") ||
          console.log("Agregado a favoritos");
      } else {
        this.$toast?.info("Removido de favoritos") ||
          console.log("Removido de favoritos");
      }
    },

    checkWishlist() {
      // Verificar si está en favoritos (localStorage o Vuex)
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      this.isInWishlist = wishlist.includes(this.product.id);
    },

    shareOnFacebook() {
      const url = window.location.href;
      window.open(
        "https://www.facebook.com/profile.php?id=61576697955087"
      );
    },

    shareOnInstagram() {
      window.open(
        "https://www.instagram.com/fincasamaniego"
      );
    },

    async copyLink() {
      try {
        await navigator.clipboard.writeText(window.location.href);
        this.linkCopied = true;
        setTimeout(() => {
          this.linkCopied = false;
        }, 2000);
      } catch (err) {
        console.error("Error al copiar:", err);
      }
    },
  },
};
</script>

<style scoped>
.product-container {
  max-width: 1200px;
  margin: 0 auto;
  background: #55342c;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.product-header {
  background: linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%);
  padding: 1.5rem;
  color: white;
}

.breadcrumb {
  background: transparent;
  padding: 0;
}

.breadcrumb-link {
  color: white !important;
  transition: opacity 0.3s;
}

.breadcrumb-link:hover {
  opacity: 0.8;
}

.product-body {
  padding: 2rem;
}

.product-image {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.product-image:hover {
  transform: scale(1.05);
}

.product-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.product-title {
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.product-subtitle {
  color: #66bb6a;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.stars {
  color: #ffd700;
}

.rating-text {
  color: #d0d0d0;
}

.availability-badge {
  background: #66bb6a;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.unavailable-badge {
  background: #dc3545;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.price-tag {
  background: linear-gradient(135deg, #66bb6a 0%, #388e3c 100%);
  color: white;
  padding: 1rem 2rem;
  margin-right: 2rem;
  border-radius: 50px;
  display: inline-block;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(102, 187, 106, 0.3);
}

.product-description {
  color: #d0d0d0;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.benefits-section {
  background: rgba(102, 187, 106, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.benefits-section h3 {
  color: #66bb6a;
  margin-bottom: 1rem;
}

.benefit-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: white;
}

.benefit-icon {
  color: #66bb6a;
  font-size: 1.5rem;
  margin-right: 1rem;
  min-width: 30px;
}

.ingredients-section {
  margin-bottom: 2rem;
}

.ingredients-section h4 {
  color: #66bb6a;
  margin-bottom: 1rem;
}

.ingredients-badge {
  background: #221510;
  color: #66bb6a;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: inline-block;
  margin: 0.25rem;
  border: 2px solid #66bb6a;
}

.action-section {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 2rem 0;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity-selector label {
  color: #66bb6a;
  font-weight: 600;
}

.quantity-controls {
  display: flex;
  align-items: center;
  background: #221510;
  border-radius: 25px;
  padding: 0.2rem;
}

.qty-btn {
  background: #66bb6a;
  color: white;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.qty-btn:hover {
  background: #388e3c;
  transform: scale(1.1);
}

.quantity-input {
  background: transparent;
  border: none;
  color: white;
  width: 60px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
}

.quantity-input::-webkit-inner-spin-button,
.quantity-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.buttons-container {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.whatsapp-btn {
  background: #25d366;
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
  cursor: pointer;
  text-decoration: none;
}

.whatsapp-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
  background: #20b858;
  color: white;
}

.wishlist-btn {
  background: rgba(102, 187, 106, 0.2);
  color: #66bb6a;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #66bb6a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1.3rem;
}

.wishlist-btn:hover {
  background: #66bb6a;
  color: white;
  transform: scale(1.1);
}

.wishlist-btn .fas {
  color: #e74c3c;
}

.share-section {
  border-top: 2px solid rgba(102, 187, 106, 0.2);
  padding-top: 1.5rem;
  margin-top: 2rem;
}

.share-section p {
  color: #66bb6a;
  margin-bottom: 0.5rem;
}

.share-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.share-btn {
  background: rgba(102, 187, 106, 0.2);
  color: #66bb6a;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: 1px solid #66bb6a;
  transition: all 0.3s;
  cursor: pointer;
}

.share-btn:hover {
  background: #66bb6a;
  color: white;
}

.related-products {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid rgba(102, 187, 106, 0.2);
}

.related-products h3 {
  color: #66bb6a;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.related-product-card {
  background: #221510;
  border-radius: 15px;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s;
  display: block;
  text-decoration: none;
}

.related-product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(102, 187, 106, 0.2);
}

.related-product-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 0.5rem;
}

.related-product-card h4 {
  color: white;
  font-size: 1rem;
  margin-bottom: 0.3rem;
}

.related-price {
  color: #66bb6a;
  font-weight: 600;
}

.related-product-card.disabled {
  position: relative;
  cursor: default;
  opacity: 0.9;
}

.related-product-card.disabled:hover {
  transform: none;
  box-shadow: none;
}

.price-soon {
  background: rgba(255, 183, 77, 0.06);
  border: 1px dashed rgba(255,183,77,0.18);
  color: #f5e6d8;
  margin-bottom: 0.3rem;
}

.coming-soon-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #ffb74d 0%, #ff8a65 100%);
  color: #221510;
  font-weight: 800;
  padding: 6px 10px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.18);
  z-index: 10;
  font-size: 0.85rem;
  letter-spacing: 0.4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.coming-soon-badge i {
  font-size: 0.9rem;
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
  background: #55342c;
  border-radius: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.not-found i {
  font-size: 4rem;
  color: #66bb6a;
  margin-bottom: 1rem;
}

.not-found h1 {
  color: white;
  margin-bottom: 1rem;
}

.not-found p {
  color: #d0d0d0;
  margin-bottom: 2rem;
}

.not-found .button {
  background: #66bb6a;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 25px;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s;
}

.not-found .button:hover {
  background: #388e3c;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .product-title {
    font-size: 1.8rem;
  }

  .product-image img {
    height: 250px;
  }

  .action-section {
    flex-direction: column;
    align-items: stretch;
  }

  .quantity-selector {
    justify-content: center;
  }

  .buttons-container {
    justify-content: center;
  }

  .share-buttons {
    justify-content: center;
  }

  .related-products .columns {
    display: flex;
    overflow-x: auto;
    gap: 1rem;
    padding-bottom: 1rem;
  }

  .related-products .column {
    min-width: 200px;
  }
}
</style>
