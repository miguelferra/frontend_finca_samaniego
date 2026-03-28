<template>
  <div v-if="product" class="product-page">
    <section class="product-shell">
      <header class="product-header">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <router-link to="/" class="breadcrumb-link">Inicio</router-link>
            </li>
            <li>
              <router-link to="/productos" class="breadcrumb-link">
                Productos
              </router-link>
            </li>
            <li>
              <router-link
                :to="`/${product.category_slug}`"
                class="breadcrumb-link"
              >
                {{ product.category_name }}
              </router-link>
            </li>
            <li class="is-active">
              <span aria-current="page" class="breadcrumb-link">
                {{ product.name }}
              </span>
            </li>
          </ul>
        </nav>
      </header>

      <div class="product-body columns is-variable is-6">
        <div class="column is-5">
          <div class="product-image-card">
            <span class="product-chip">{{ product.category_name }}</span>
            <img
              v-if="product.image_url"
              :src="product.image_url"
              :alt="product.name"
              @error="handleImageError"
            />
          </div>
        </div>

        <div class="column is-7">
          <div class="product-summary">
            <div class="availability-row">
              <span
                class="availability-badge"
                :class="{ 'is-soon': !product.isAvailable }"
              >
                <i
                  :class="
                    product.isAvailable
                      ? 'fas fa-check-circle'
                      : 'fas fa-hourglass-half'
                  "
                ></i>
                {{
                  product.isAvailable
                    ? "Disponible para pedido"
                    : "Próximamente"
                }}
              </span>
              <button @click="toggleWishlist" class="wishlist-btn" type="button">
                <i :class="isInWishlist ? 'fas fa-heart' : 'far fa-heart'"></i>
                {{ isInWishlist ? "Guardado" : "Guardar" }}
              </button>
            </div>

            <h1 class="product-title">{{ product.name }}</h1>
            <p class="product-description">{{ product.description }}</p>

            <div class="highlight-grid">
              <div class="highlight-card">
                <span class="highlight-label">Precio</span>
                <strong>{{ product.formattedPrice }}</strong>
              </div>
              <div class="highlight-card">
                <span class="highlight-label">Origen</span>
                <strong>Bacerac, Sonora</strong>
              </div>
              <div class="highlight-card">
                <span class="highlight-label">Proceso</span>
                <strong>Artesanal</strong>
              </div>
            </div>

            <div class="benefits-section">
              <h2>¿Por qué elegir este producto?</h2>
              <div class="benefit-item">
                <i class="fas fa-leaf benefit-icon"></i>
                <span>100% natural, sin conservadores artificiales</span>
              </div>
              <div class="benefit-item">
                <i class="fas fa-hands benefit-icon"></i>
                <span>Cosechado a mano en la Sierra de Bacerac</span>
              </div>
              <div class="benefit-item">
                <i class="fas fa-fire benefit-icon"></i>
                <span>{{ product.spicyLevel || "Perfil auténtico sonorense" }}</span>
              </div>
              <div class="benefit-item">
                <i class="fas fa-heart benefit-icon"></i>
                <span>Ideal para cocina diaria, regalo o mesa de reunión</span>
              </div>
            </div>

            <div class="action-section">
              <div class="quantity-selector" v-if="product.isAvailable">
                <label for="quantity-input">Cantidad</label>
                <div class="quantity-controls">
                  <button @click="decreaseQuantity" class="qty-btn" type="button">
                    <i class="fas fa-minus"></i>
                  </button>
                  <input
                    id="quantity-input"
                    v-model.number="quantity"
                    type="number"
                    min="1"
                    max="99"
                    class="quantity-input"
                    @blur="sanitizeQuantity"
                  />
                  <button @click="increaseQuantity" class="qty-btn" type="button">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              <div class="buttons-container">
                <a
                  v-if="product.isAvailable"
                  :href="getWhatsAppLink()"
                  target="_blank"
                  rel="noreferrer noopener"
                  class="whatsapp-btn"
                >
                  <i class="fab fa-whatsapp"></i>
                  Pedir por WhatsApp
                </a>

                <button
                  v-else
                  type="button"
                  class="notify-btn"
                  @click="openNotifyLink"
                >
                  <i class="fas fa-bell"></i>
                  Consultar lanzamiento
                </button>
              </div>
            </div>

            <div class="share-section">
              <p>Compartir este producto</p>
              <div class="share-buttons">
                <button @click="shareOnFacebook" class="share-btn" type="button">
                  <i class="fab fa-facebook"></i>
                  Facebook
                </button>
                <button @click="shareOnWhatsApp" class="share-btn" type="button">
                  <i class="fab fa-whatsapp"></i>
                  WhatsApp
                </button>
                <button @click="copyLink" class="share-btn" type="button">
                  <i class="fas fa-link"></i>
                  {{ linkCopied ? "Enlace copiado" : "Copiar enlace" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="related-products" v-if="relatedProducts.length > 0">
        <div class="related-header">
          <p class="related-kicker">Recomendados</p>
          <h3>También te puede interesar</h3>
        </div>
        <div class="columns is-multiline">
          <div
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            class="column is-3-desktop is-6-tablet"
          >
            <router-link
              v-if="relatedProduct.isAvailable"
              :to="relatedProduct.get_absolute_url"
              class="related-product-card"
            >
              <img
                :src="relatedProduct.image_url"
                :alt="relatedProduct.name"
                @error="handleImageError"
              />
              <span class="related-category">{{ relatedProduct.category_name }}</span>
              <h4>{{ relatedProduct.name }}</h4>
              <p class="related-price">{{ relatedProduct.formattedPrice }}</p>
            </router-link>
            <div v-else class="related-product-card disabled">
              <img
                :src="relatedProduct.image_url"
                :alt="relatedProduct.name"
                @error="handleImageError"
              />
              <span class="related-category">{{ relatedProduct.category_name }}</span>
              <h4>{{ relatedProduct.name }}</h4>
              <p class="related-price price-soon">Próximamente</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>

  <div v-else class="not-found">
    <i class="fas fa-exclamation-circle"></i>
    <h1>Producto no encontrado</h1>
    <p>El enlace no corresponde a un producto visible del catálogo actual.</p>
    <router-link to="/productos" class="button not-found-btn">
      Volver al catálogo
    </router-link>
  </div>
</template>

<script>
import {
  getProductBySlugs,
  getRelatedProducts,
} from "@/utils/products.js";

const WISHLIST_KEY = "wishlist";

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
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.loadProduct();
      },
    },
  },
  methods: {
    loadProduct() {
      const { category_slug: categorySlug, product_slug: productSlug } =
        this.$route.params;

      this.product = getProductBySlugs(categorySlug, productSlug);
      this.quantity = 1;
      this.relatedProducts = this.product
        ? getRelatedProducts(this.product)
        : [];
      this.syncWishlistState();

      document.title = this.product
        ? `${this.product.name} | Finca Samaniego`
        : "Producto no encontrado | Finca Samaniego";
    },

    handleImageError(event) {
      console.warn("No se pudo cargar la imagen:", event.target.src);
      event.target.src =
        "https://via.placeholder.com/500x400/cccccc/666666?text=Imagen+no+disponible";
    },

    increaseQuantity() {
      if (this.quantity < 99) {
        this.quantity += 1;
      }
    },

    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity -= 1;
      }
    },

    sanitizeQuantity() {
      const normalizedQuantity = Number.parseInt(this.quantity, 10);
      this.quantity = Number.isFinite(normalizedQuantity)
        ? Math.min(Math.max(normalizedQuantity, 1), 99)
        : 1;
    },

    getWhatsAppLink() {
      const phoneNumber = "523313832186";
      const message = `Hola, me interesa pedir ${this.quantity} unidad(es) de ${this.product.name}. ¿Me compartes disponibilidad y forma de entrega?`;
      return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    },

    getNotifyLink() {
      const phoneNumber = "523313832186";
      const message = `Hola, me interesa ${this.product.name}. ¿Podrían avisarme cuando esté disponible?`;
      return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    },

    readWishlist() {
      try {
        const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
        return Array.isArray(wishlist) ? wishlist : [];
      } catch (error) {
        return [];
      }
    },

    syncWishlistState() {
      if (!this.product) {
        this.isInWishlist = false;
        return;
      }

      this.isInWishlist = this.readWishlist().includes(this.product.id);
    },

    toggleWishlist() {
      if (!this.product) {
        return;
      }

      const wishlist = this.readWishlist();
      const nextWishlist = this.isInWishlist
        ? wishlist.filter((id) => id !== this.product.id)
        : [...new Set([...wishlist, this.product.id])];

      localStorage.setItem(WISHLIST_KEY, JSON.stringify(nextWishlist));
      this.isInWishlist = nextWishlist.includes(this.product.id);

      if (this.isInWishlist) {
        this.$toast.success("Producto guardado en favoritos");
      } else {
        this.$toast.info("Producto eliminado de favoritos");
      }
    },

    shareOnFacebook() {
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`;
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    },

    shareOnWhatsApp() {
      const message = `${this.product.name} - ${window.location.href}`;
      const shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    },

    openNotifyLink() {
      window.open(this.getNotifyLink(), "_blank", "noopener,noreferrer");
    },

    async copyLink() {
      try {
        await navigator.clipboard.writeText(window.location.href);
        this.linkCopied = true;
        this.$toast.success("Enlace copiado");
        window.setTimeout(() => {
          this.linkCopied = false;
        }, 1800);
      } catch (error) {
        this.$toast.warning("No se pudo copiar el enlace");
      }
    },
  },
};
</script>

<style scoped>
.product-page {
  max-width: 1240px;
  margin: 0 auto;
}

.product-shell {
  background: linear-gradient(180deg, rgba(38, 24, 19, 0.96) 0%, rgba(27, 17, 14, 0.98) 100%);
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid rgba(240, 218, 188, 0.08);
  box-shadow: 0 28px 60px rgba(0, 0, 0, 0.22);
}

.product-header {
  padding: 1.4rem 1.8rem 0;
}

.breadcrumb {
  background: transparent;
  padding: 0;
}

.breadcrumb-link {
  color: #d8c4b0 !important;
}

.breadcrumb-link:hover {
  color: #fff !important;
}

.product-body {
  padding: 1.5rem 1.8rem 2rem;
}

.product-image-card {
  position: relative;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 24px 46px rgba(0, 0, 0, 0.2);
}

.product-image-card img {
  width: 100%;
  height: 100%;
  min-height: 480px;
  object-fit: cover;
  display: block;
}

.product-chip {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 1;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  background: rgba(18, 11, 8, 0.68);
  border: 1px solid rgba(255, 248, 239, 0.12);
  color: #fff5e8;
  font-size: 0.82rem;
  font-weight: 700;
}

.product-summary {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 28px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.availability-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.availability-badge,
.wishlist-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 42px;
  border-radius: 999px;
  padding: 0.65rem 1rem;
  font-weight: 700;
}

.availability-badge {
  background: rgba(102, 187, 106, 0.14);
  color: #dff7e0;
  border: 1px solid rgba(102, 187, 106, 0.18);
}

.availability-badge.is-soon {
  background: rgba(255, 183, 77, 0.12);
  color: #ffe2a8;
  border-color: rgba(255, 183, 77, 0.16);
}

.wishlist-btn {
  background: transparent;
  color: #f5d7d7;
  border: 1px solid rgba(255, 142, 142, 0.2);
}

.wishlist-btn .fas {
  color: #ff7d7d;
}

.wishlist-btn:hover {
  background: rgba(255, 125, 125, 0.08);
}

.product-title {
  color: #fff7ed;
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  line-height: 1.1;
  margin-bottom: 1rem;
  white-space: pre-line;
}

.product-description {
  color: #d6c7bb;
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.highlight-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
  margin-bottom: 1.7rem;
}

.highlight-card {
  background: rgba(18, 11, 8, 0.48);
  border-radius: 20px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.highlight-card strong {
  color: #fff7ed;
  display: block;
  font-size: 1.05rem;
}

.highlight-label {
  display: block;
  color: #9df8a4;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  margin-bottom: 0.4rem;
}

.benefits-section {
  background: rgba(102, 187, 106, 0.08);
  border-radius: 24px;
  padding: 1.4rem;
  margin-bottom: 1.6rem;
}

.benefits-section h2 {
  color: #fff7ed;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  color: #f0e6dc;
  margin-bottom: 0.95rem;
}

.benefit-item:last-child {
  margin-bottom: 0;
}

.benefit-icon {
  color: #66bb6a;
  font-size: 1.2rem;
}

.action-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.6rem;
}

.quantity-selector label {
  display: block;
  color: #d7c4b0;
  font-weight: 700;
  margin-bottom: 0.45rem;
}

.quantity-controls {
  display: inline-flex;
  align-items: center;
  background: rgba(18, 11, 8, 0.56);
  border-radius: 999px;
  padding: 0.25rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.qty-btn {
  background: #66bb6a;
  color: #fff;
  border: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
}

.qty-btn:hover {
  background: #4fa953;
}

.quantity-input {
  background: transparent;
  border: none;
  color: #fff;
  width: 64px;
  text-align: center;
  font-weight: 700;
}

.quantity-input::-webkit-inner-spin-button,
.quantity-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.buttons-container {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.whatsapp-btn,
.notify-btn,
.share-btn,
.not-found-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-height: 48px;
  border-radius: 999px;
  padding: 0.8rem 1.2rem;
  font-weight: 700;
  border: none;
  text-decoration: none;
}

.whatsapp-btn {
  background: #25d366;
  color: #fff;
}

.whatsapp-btn:hover {
  background: #20b858;
  color: #fff;
}

.notify-btn {
  background: transparent;
  color: #ffe2a8;
  border: 1px solid rgba(255, 183, 77, 0.22);
}

.notify-btn:hover {
  background: rgba(255, 183, 77, 0.12);
}

.share-section {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 1.4rem;
}

.share-section p {
  color: #d7c4b0;
  font-weight: 700;
  margin-bottom: 0.8rem;
}

.share-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.share-btn {
  background: rgba(255, 255, 255, 0.04);
  color: #f1e7de;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.share-btn:hover {
  background: rgba(255, 255, 255, 0.08);
}

.related-products {
  padding: 0 1.8rem 2rem;
}

.related-header {
  margin-bottom: 1.2rem;
}

.related-kicker {
  color: #ffd27d;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 0.45rem;
}

.related-header h3 {
  color: #fff7ed;
  font-size: 1.8rem;
}

.related-product-card {
  display: block;
  height: 100%;
  background: rgba(18, 11, 8, 0.56);
  border-radius: 22px;
  padding: 1rem;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.related-product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.18);
}

.related-product-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 0.9rem;
}

.related-category {
  display: inline-flex;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(102, 187, 106, 0.12);
  color: #dff7e0;
  font-size: 0.78rem;
  margin-bottom: 0.7rem;
}

.related-product-card h4 {
  color: #fff6ea;
  margin-bottom: 0.4rem;
  white-space: pre-line;
}

.related-price {
  color: #9df8a4;
  font-weight: 700;
}

.related-product-card.disabled {
  opacity: 0.88;
}

.related-product-card.disabled:hover {
  transform: none;
  box-shadow: none;
}

.price-soon {
  color: #ffe2a8;
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(180deg, rgba(38, 24, 19, 0.96) 0%, rgba(27, 17, 14, 0.98) 100%);
  border-radius: 28px;
  max-width: 700px;
  margin: 0 auto;
  border: 1px solid rgba(240, 218, 188, 0.08);
}

.not-found i {
  font-size: 4rem;
  color: #ffd27d;
  margin-bottom: 1rem;
}

.not-found h1 {
  color: #fff7ed;
  margin-bottom: 1rem;
}

.not-found p {
  color: #d6c7bb;
  margin-bottom: 1.5rem;
}

.not-found-btn {
  background: linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%);
  color: #fff;
}

.not-found-btn:hover {
  color: #fff;
}

@media (max-width: 768px) {
  .product-body,
  .related-products {
    padding-inline: 1rem;
  }

  .product-summary {
    padding: 1.3rem;
  }

  .product-image-card img {
    min-height: 300px;
  }

  .highlight-grid {
    grid-template-columns: 1fr;
  }

  .action-section,
  .availability-row {
    flex-direction: column;
    align-items: stretch;
  }

  .buttons-container,
  .share-buttons {
    width: 100%;
  }

  .whatsapp-btn,
  .notify-btn,
  .share-btn {
    width: 100%;
  }
}
</style>
