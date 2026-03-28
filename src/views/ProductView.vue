<template>
  <div class="product-page">
    <section v-if="product" class="product-shell fade-in">
      <div class="product-header">
        <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
          <ul>
            <li>
              <router-link to="/" class="breadcrumb-link">Inicio</router-link>
            </li>
            <li>
              <router-link to="/productos" class="breadcrumb-link">Productos</router-link>
            </li>
            <li class="is-active">
              <a href="#" aria-current="page" class="breadcrumb-link">{{ product.name }}</a>
            </li>
          </ul>
        </nav>
      </div>

      <div class="product-body">
        <div class="columns is-variable is-6">
          <div class="column is-6">
            <div class="product-image-card">
              <span class="product-chip">{{ product.category_name }}</span>
              <img
                :src="product.image_url"
                :alt="product.name"
                @error="handleImageError"
              />
            </div>
          </div>

          <div class="column is-6">
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
                      ? 'Disponible para pedido'
                      : 'Próximamente'
                  }}
                </span>
              </div>

              <h1 class="product-title">
                <template v-if="product.name.includes('\n')">
                  <span class="has-text-green">{{ product.name.split('\n')[0] }}</span>
                  <br />
                  <span class="commercial-title">{{ product.name.split('\n')[1] }}</span>
                </template>
                <template v-else>
                  {{ product.name }}
                </template>
              </h1>
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
              </div>

              <!-- Beneficios Section -->
              <div class="benefits-strip mb-5">
                <div class="benefit-tag">
                  <i class="fas fa-leaf"></i>
                  <span>100% Natural</span>
                </div>
                <div class="benefit-tag">
                  <i class="fas fa-hands"></i>
                  <span>Artesanal</span>
                </div>
                <div class="benefit-tag">
                  <i class="fas fa-seedling"></i>
                  <span>Sin aditivos</span>
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
                    Ordenar por WhatsApp
                  </a>

                  <button
                    v-else
                    type="button"
                    class="notify-btn"
                    @click="openNotifyLink"
                  >
                    <i class="fas fa-bell"></i>
                    Consultar disponibilidad
                  </button>
                </div>
              </div>

              <div class="share-section">
                <p>Compartir:</p>
                <div class="share-buttons">
                  <button @click="shareOnWhatsApp" class="share-btn" type="button">
                    <i class="fab fa-whatsapp"></i>
                    WhatsApp
                  </button>
                  <button @click="copyLink" class="share-btn" type="button">
                    <i class="fas fa-link"></i>
                    {{ linkCopied ? 'Enlace copiado' : 'Copiar enlace' }}
                  </button>
                </div>
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

    <div v-else class="not-found">
      <i class="fas fa-exclamation-circle"></i>
      <h1>Producto no encontrado</h1>
      <p>El producto solicitado no está disponible en nuestro catálogo.</p>
      <router-link to="/productos" class="button not-found-btn">
        Ver catálogo completo
      </router-link>
    </div>
  </div>
</template>

<script>
import {
  getProductBySlugs,
  getRelatedProducts,
} from "@/utils/products.js";

export default {
  name: "ProductView",
  data() {
    return {
      product: null,
      quantity: 1,
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

      if (this.product) {
        document.title = `${this.product.name} | Finca Samaniego`;
        this.updateMetaTags();
      } else {
        document.title = "Producto no encontrado | Finca Samaniego";
      }
    },

    updateMetaTags() {
      if (!this.product) return;

      const title = `${this.product.name} | Finca Samaniego`;
      const description = this.product.description;
      const imageUrl = this.product.image_url;
      const pageUrl = window.location.href;

      const setMeta = (property, content) => {
        let element = document.querySelector(`meta[property="${property}"]`);
        if (!element) {
          element = document.createElement("meta");
          element.setAttribute("property", property);
          document.head.appendChild(element);
        }
        element.setAttribute("content", content);
      };

      setMeta("og:title", title);
      setMeta("og:description", description);
      setMeta("og:image", imageUrl);
      setMeta("og:url", pageUrl);
      setMeta("og:type", "website");
    },

    handleImageError(event) {
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
      const message = `Hola, me interesa pedir ${this.quantity} unidad(es) de ${this.product.name}. ¿Me compartes disponibilidad?`;
      return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    },

    getNotifyLink() {
      const phoneNumber = "523313832186";
      const message = `Hola, me interesa ${this.product.name}. ¿Cuándo estará disponible?`;
      return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    },

    shareOnWhatsApp() {
      const message = `🌶️ *${this.product.name}*\n\n_${this.product.description}_\n\n💰 *Precio:* ${this.product.formattedPrice}\n\n🔗 *Ver en el catálogo:* ${window.location.href}`;
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
        window.setTimeout(() => {
          this.linkCopied = false;
        }, 1800);
      } catch (error) {
        console.error("Error al copiar enlace");
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

.breadcrumb-link {
  color: #d8c4b0 !important;
}

.breadcrumb-link:hover {
  color: #fff !important;
}

.product-body {
  padding: 1.5rem 1.8rem 1rem;
}

.product-image-card {
  position: relative;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.product-image-card img {
  width: 100%;
  height: 100%;
  min-height: 520px;
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
  margin-bottom: 1rem;
}

.availability-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1rem;
  border-radius: 999px;
  background: rgba(102, 187, 106, 0.14);
  color: #dff7e0;
  border: 1px solid rgba(102, 187, 106, 0.18);
  font-weight: 700;
}

.availability-badge.is-soon {
  background: rgba(255, 183, 77, 0.12);
  color: #ffe2a8;
  border-color: rgba(255, 183, 77, 0.16);
}

.product-title {
  color: #fff7ed;
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  line-height: 1.1;
  margin-bottom: 1rem;
  white-space: pre-line;
}

.commercial-title {
  font-size: 0.6em;
  opacity: 0.85;
  color: #fff;
  font-weight: 600;
}

.product-description {
  color: #d6c7bb;
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.highlight-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
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
  font-size: 1.2rem;
}

.highlight-label {
  display: block;
  color: #9df8a4;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  margin-bottom: 0.4rem;
}

/* Benefits Strip Styling */
.benefits-strip {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.benefit-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.85rem;
  border-radius: 12px;
  background: rgba(102, 187, 106, 0.08);
  border: 1px solid rgba(102, 187, 106, 0.12);
  color: #f1e7de;
  font-size: 0.85rem;
  font-weight: 600;
}

.benefit-tag i {
  color: #66bb6a;
}

.action-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin: 1.5rem 0 2rem;
}

.quantity-selector label {
  display: block;
  color: #d7c4b0;
  font-weight: 700;
  margin-bottom: 0.5rem;
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
  cursor: pointer;
}

.quantity-input {
  background: transparent;
  border: none;
  color: #fff;
  width: 64px;
  text-align: center;
  font-weight: 700;
}

.buttons-container {
  display: flex;
  gap: 0.8rem;
  flex: 1;
}

.whatsapp-btn,
.notify-btn,
.share-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  min-height: 50px;
  border-radius: 999px;
  padding: 0.8rem 1.5rem;
  font-weight: 700;
  border: none;
  text-decoration: none;
  cursor: pointer;
}

.whatsapp-btn {
  background: #25d366;
  color: #fff;
  flex: 1;
}

.notify-btn {
  background: transparent;
  color: #ffe2a8;
  border: 1px solid rgba(255, 183, 77, 0.22);
  flex: 1;
}

.share-section {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 1.5rem;
}

.share-section p {
  color: #d7c4b0;
  font-weight: 700;
  margin-bottom: 1rem;
}

.share-buttons {
  display: flex;
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .share-buttons {
    flex-direction: column;
  }
}

.share-btn {
  background: rgba(255, 255, 255, 0.04);
  color: #f1e7de;
  border: 1px solid rgba(255, 255, 255, 0.08);
  flex: 1;
}

.related-products {
  padding: 2rem 1.8rem;
}

.related-header {
  margin-bottom: 1.5rem;
}

.related-kicker {
  color: #ffd27d;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.related-header h3 {
  color: #fff7ed;
  font-size: 1.8rem;
}

.related-product-card {
  display: block;
  background: rgba(18, 11, 8, 0.56);
  border-radius: 22px;
  padding: 1rem;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: transform 0.25s ease;
  height: 100%;
}

.related-product-card:hover {
  transform: translateY(-5px);
}

.related-product-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 1rem;
}

.related-category {
  display: inline-flex;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(102, 187, 106, 0.12);
  color: #dff7e0;
  font-size: 0.78rem;
  margin-bottom: 0.8rem;
}

.related-product-card h4 {
  color: #fff6ea;
  margin-bottom: 0.5rem;
}

.related-price {
  color: #9df8a4;
  font-weight: 700;
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
  margin-bottom: 2rem;
}

.not-found-btn {
  background: linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%);
  color: #fff;
  border-radius: 999px;
  padding: 0.8rem 2rem;
  border: none;
  font-weight: 700;
}

@media (max-width: 768px) {
  .product-image-card img {
    min-height: 300px;
  }

  .highlight-grid {
    grid-template-columns: 1fr;
  }

  .action-section {
    flex-direction: column;
    align-items: stretch;
  }

  .buttons-container {
    width: 100%;
  }
}
</style>
