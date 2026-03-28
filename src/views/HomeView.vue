<template>
  <div class="home">
    <section
      class="hero is-medium is-dark mb-6 hero-gradient"
      :style="{ backgroundImage: 'url(' + imageUrl + ')' }"
    >
      <div class="hero-overlay"></div>
      <div class="hero-body has-text-centered">
        <div class="container">
          <div class="hero-content fade-in-up">
            <span class="hero-kicker">Desde Bacerac, Sonora</span>
            <h1 class="title is-1 has-text-white hero-title">
              Chiltepín de la sierra, con identidad de finca
            </h1>
            <h2 class="subtitle is-3 has-text-white-ter hero-subtitle">
              Salsa, fruto entero y recetas artesanales con un perfil honesto,
              regional y directo al paladar.
            </h2>
            <div class="hero-buttons mt-5">
              <button
                type="button"
                class="button is-products is-large hero-cta"
                @click.prevent="scrollToProducts"
              >
                <span class="icon">
                  <i class="fas fa-leaf"></i>
                </span>
                <span>Explorar Productos</span>
              </button>
              <router-link to="/contact" class="button hero-cta-secondary">
                Hacer un pedido
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ubicación Section - RE-ADDED -->
    <section class="section py-6">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-6">
            <div class="location-content">
              <p class="section-kicker">Nuestra Tierra</p>
              <h2 class="title is-2 has-text-white mb-4">
                Ubicados en Bacerac, Sonora
              </h2>
              <p class="subtitle is-5 has-text-muted mb-5">
                Nuestra finca se encuentra en el corazón de la Sierra Alta de
                Sonora, una región privilegiada que nos permite cultivar
                productos con el sabor más auténtico.
              </p>
              <div class="tags location-tags">
                <span class="tag is-medium location-tag">
                  <span class="icon">
                    <i class="fas fa-mountain"></i>
                  </span>
                  <span>Sierra Alta</span>
                </span>
                <span class="tag is-medium location-tag">
                  <span class="icon">
                    <i class="fas fa-seedling"></i>
                  </span>
                  <span>Tierra Fértil</span>
                </span>
              </div>
            </div>
          </div>
          <div class="column is-6">
            <div class="map-container">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Mapa_Municipios_Sonora_Bacerac.png"
                alt="Mapa de Bacerac, Sonora"
                class="location-map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="productos">
      <div class="container">
        <div class="catalog-surface">
          <div class="catalog-topbar">
            <div>
              <p class="catalog-kicker">Catálogo</p>
              <h2 class="title is-2">Nuestros Productos</h2>
              <p class="subtitle is-5 has-text-grey">
                Una selección corta, directa y enfocada en calidad.
              </p>
            </div>
            <div class="catalog-summary">
              <span class="summary-pill">
                <i class="fas fa-check-circle"></i>
                {{ catalogStats.availableProducts }} disponibles
              </span>
            </div>
          </div>

          <div class="columns is-multiline">
            <ProductBox
              v-for="(product, index) in displayedProducts"
              :key="product.id"
              :product="product"
              class="product-animate"
              :style="{ animationDelay: `${index * 0.08}s` }"
            />
          </div>

          <div
            v-if="!showAllProducts && latestProducts.length > initialProductCount"
            class="has-text-centered mt-5"
          >
            <button class="button show-more-btn" @click="showAllProducts = true">
              <span class="icon">
                <i class="fas fa-plus"></i>
              </span>
              <span
                >Ver {{ latestProducts.length - initialProductCount }} productos
                más</span
              >
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="section cta-section">
      <div class="container">
        <div class="cta-content has-text-centered">
          <div class="cta-card">
            <h3 class="title is-3 has-text-white mb-3">
              ¿Listo para llevar el sabor de la sierra a tu mesa?
            </h3>
            <p class="subtitle is-5 has-text-white-ter mb-4">
              Escríbenos y te ayudamos a elegir la presentación correcta para
              tu cocina o pedido especial.
            </p>
            <a
              href="https://wa.me/523313832186"
              target="_blank"
              rel="noreferrer noopener"
              class="button is-light is-large cta-contact-btn ml-2"
            >
              <span class="icon">
                <i class="fab fa-whatsapp"></i>
              </span>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProductBox from "@/components/ProductBox.vue";
import { getCatalogStats, getLatestProducts } from "@/utils/products.js";

export default {
  name: "HomeView",
  components: {
    ProductBox,
  },
  data() {
    return {
      imageUrl: "/background.jpg",
      showAllProducts: false,
      initialProductCount: 6,
    };
  },
  computed: {
    latestProducts() {
      return getLatestProducts();
    },
    catalogStats() {
      return getCatalogStats();
    },
    displayedProducts() {
      return this.showAllProducts
        ? this.latestProducts
        : this.latestProducts.slice(0, this.initialProductCount);
    },
  },
  methods: {
    scrollToProducts() {
      const el = document.getElementById("productos");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
};
</script>

<style scoped>
.hero-gradient {
  position: relative;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  min-height: 520px;
  border-radius: 32px;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.65) 0%,
    rgba(46, 125, 50, 0.45) 100%
  );
  z-index: 1;
}

.hero-body {
  position: relative;
  z-index: 2;
}

.hero-content {
  max-width: 860px;
  margin: 0 auto;
}

.hero-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  background: rgba(255, 244, 229, 0.14);
  border: 1px solid rgba(255, 244, 229, 0.18);
  color: #fff8ef;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
}

.hero-title {
  font-size: 4rem !important;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem !important;
}

.hero-subtitle {
  font-size: 1.5rem !important;
  max-width: 720px;
  margin-inline: auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  margin-bottom: 2rem !important;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.is-products,
.hero-cta-secondary {
  border-radius: 999px;
  min-height: 54px;
  padding-inline: 1.8rem;
  font-weight: 700;
}

.is-products {
  background: linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%);
  color: white;
  border: none;
}

.hero-cta {
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
}

.hero-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(72, 187, 120, 0.4);
}

.hero-cta-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 248, 239, 0.12);
  color: #fff;
  border: 1px solid rgba(255, 248, 239, 0.16);
  text-decoration: none;
}

.hero-cta-secondary:hover {
  background: rgba(255, 248, 239, 0.18);
  color: #fff;
  transform: translateY(-2px);
}

/* Location Section Styles */
.section-kicker {
  color: #ffd27d;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.has-text-muted {
  color: #ccb8a5 !important;
}

.location-content {
  padding-right: 2rem;
}

.location-tags {
  margin-top: 1.5rem;
}

.location-tag {
  background: rgba(102, 187, 106, 0.14) !important;
  color: #81e687 !important;
  border: 1px solid rgba(102, 187, 106, 0.18);
  border-radius: 999px;
  padding: 0.6rem 1rem;
  font-weight: 700;
}

.map-container {
  background: rgba(34, 21, 16, 0.6);
  border-radius: 30px;
  padding: 1.5rem;
  border: 1px solid rgba(240, 218, 188, 0.08);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  max-width: 440px;
  margin-left: auto;
}

.location-map {
  width: 100%;
  height: auto;
  border-radius: 18px;
  border: 2px solid #66bb6a;
  filter: brightness(0.9) contrast(1.1);
}

.catalog-surface {
  background: linear-gradient(180deg, rgba(38, 24, 19, 0.92) 0%, rgba(28, 18, 14, 0.96) 100%);
  border-radius: 32px;
  border: 1px solid rgba(240, 218, 188, 0.08);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
  padding: 2.5rem;
}

.catalog-topbar {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.catalog-kicker {
  color: #ffd27d;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.82rem;
  margin-bottom: 0.75rem;
  font-weight: 700;
}

.catalog-topbar .title {
  color: #fff7ed;
  margin-bottom: 0.45rem;
}

.catalog-topbar .subtitle {
  color: #ccb8a5 !important;
}

.summary-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  background: rgba(102, 187, 106, 0.14);
  color: #dff7e0;
  border: 1px solid rgba(102, 187, 106, 0.18);
  font-weight: 600;
}

.product-animate {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.show-more-btn {
  background: transparent;
  border: 1px solid rgba(102, 187, 106, 0.32);
  color: #daf8dc;
  border-radius: 999px;
  min-height: 52px;
  padding-inline: 1.4rem;
}

.show-more-btn:hover {
  background: rgba(102, 187, 106, 0.14);
  color: #fff;
}

.cta-section {
  background: linear-gradient(135deg, #2e7d32 0%, #388e3c 100%);
  margin-top: 3rem;
  border-radius: 28px;
}

.cta-content {
  padding: 2rem 0;
}

.cta-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem !important;
  }

  .hero-subtitle {
    font-size: 1.25rem !important;
  }

  .location-content {
    padding-right: 0;
    text-align: center;
    margin-bottom: 2rem;
  }

  .map-container {
    margin: 0 auto;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .hero-cta,
  .hero-cta-secondary {
    width: 100%;
    max-width: 300px;
  }

  .catalog-topbar {
    flex-direction: column;
  }

  .catalog-surface {
    padding: 1.4rem;
    border-radius: 24px;
  }
}
</style>
