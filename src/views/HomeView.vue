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
            <div class="hero-pills">
              <span class="hero-pill">
                <strong>{{ catalogStats.totalProducts }}</strong> presentaciones
              </span>
              <span class="hero-pill">
                <strong>{{ catalogStats.availableProducts }}</strong> disponibles
              </span>
              <span class="hero-pill">
                <strong>{{ catalogStats.categories.length }}</strong> líneas de
                producto
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section py-5">
      <div class="container">
        <div class="columns is-multiline has-text-centered">
          <div class="column is-3-desktop is-6-tablet">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fas fa-pepper-hot"></i>
              </div>
              <div class="stat-number">100% Chiltepín</div>
              <div class="stat-label">Sin mezclas ni aditivos</div>
            </div>
          </div>

          <div class="column is-3-desktop is-6-tablet">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-hands"></i>
              </div>
              <div class="stat-number">Proceso Artesanal</div>
              <div class="stat-label">Cosechado a mano</div>
            </div>
          </div>

          <div class="column is-3-desktop is-6-tablet">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-leaf"></i>
              </div>
              <div class="stat-number">Ingredientes Naturales</div>
              <div class="stat-label">Sin conservadores</div>
            </div>
          </div>

          <div class="column is-3-desktop is-6-tablet">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <div class="stat-number">Calidad Garantizada</div>
              <div class="stat-label">Del campo a tu mesa</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section py-5 feature-strip">
      <div class="container">
        <div class="columns is-variable is-5">
          <div class="column is-6">
            <article class="feature-card">
              <p class="feature-eyebrow">Selección curada</p>
              <h3>Un catálogo corto, con intención</h3>
              <p>
                Cada producto nace de la misma lógica: sabor sonorense,
                proceso cuidado y una historia clara detrás de cada frasco o
                presentación.
              </p>
            </article>
          </div>
          <div class="column is-6">
            <article class="feature-card feature-card-soft">
              <p class="feature-eyebrow">Colecciones</p>
              <div class="collection-pills">
                <span
                  v-for="category in categoryHighlights"
                  :key="category.slug"
                  class="collection-pill"
                >
                  <i class="fas fa-seedling"></i>
                  {{ category.name }}
                </span>
              </div>
              <p class="feature-footnote">
                También mostramos próximos lanzamientos para que el catálogo
                comunique lo que ya puedes pedir y lo que viene en camino.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section py-5">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-6">
            <div class="location-content">
              <h2 class="title is-3 has-text-green mb-4">
                Ubicados en Bacerac, Sonora
              </h2>
              <p class="subtitle is-5 has-text-muted mb-4 full-description">
                Nuestra finca se encuentra en el corazón de la Sierra Alta de
                Sonora, una región privilegiada que nos permite cultivar
                productos de la más alta calidad.
              </p>
              <p class="subtitle is-5 has-text-muted mb-4 short-description">
                Nuestra finca se encuentra en el corazón de la Sierra Alta de
                Sonora
              </p>
              <div class="tags">
                <span class="tag is-medium location-tag">
                  <span class="icon">
                    <i class="fas fa-mountain"></i>
                  </span>
                  <span>Sierra Alta</span>
                </span>
                <span class="tag is-medium location-tag">
                  <span class="icon">
                    <i class="fas fa-cloud"></i>
                  </span>
                  <span>Clima Ideal</span>
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
                {{ catalogStats.availableProducts }} listos para pedido
              </span>
              <span class="summary-pill is-muted">
                <i class="fas fa-clock"></i>
                {{ catalogStats.comingSoonProducts }} próximos lanzamientos
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
              tu cocina, regalo o pedido especial.
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
      initialProductCount: 4,
      observer: null,
    };
  },
  computed: {
    latestProducts() {
      return getLatestProducts();
    },
    catalogStats() {
      return getCatalogStats();
    },
    categoryHighlights() {
      return this.catalogStats.categories.map((slug) => {
        const firstProduct = this.latestProducts.find(
          (product) => product.category_slug === slug
        );

        return {
          slug,
          name: firstProduct?.category_name || slug,
        };
      });
    },
    displayedProducts() {
      return this.showAllProducts
        ? this.latestProducts
        : this.latestProducts.slice(0, this.initialProductCount);
    },
  },
  mounted() {
    this.observeElements();
  },
  beforeUnmount() {
    this.observer?.disconnect();
  },
  methods: {
    observeElements() {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-in");
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      document.querySelectorAll(".stat-card, .feature-card").forEach((card) => {
        this.observer.observe(card);
      });
    },
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
    rgba(0, 0, 0, 0.6) 0%,
    rgba(46, 125, 50, 0.4) 100%
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

.hero-pills {
  display: flex;
  justify-content: center;
  gap: 0.85rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  background: rgba(18, 11, 8, 0.48);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #fff8ef;
}

.hero-pill strong {
  color: #9df8a4;
}

.is-products,
.hero-cta-secondary {
  border-radius: 999px;
  min-height: 54px;
  padding-inline: 1.5rem;
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

.stat-card {
  background: rgba(84, 75, 75, 0.72);
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 2rem 1rem;
  box-shadow: 0 18px 38px rgba(0, 0, 0, 0.14);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.stat-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 3rem;
  color: #2e7d32;
  margin-bottom: 1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #66bb6a;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: gray;
  font-weight: 600;
}

.feature-strip {
  padding-top: 0.5rem !important;
}

.feature-card {
  background: linear-gradient(180deg, rgba(93, 61, 50, 0.78) 0%, rgba(44, 27, 22, 0.92) 100%);
  border: 1px solid rgba(250, 230, 201, 0.08);
  border-radius: 28px;
  padding: 2rem;
  min-height: 100%;
  opacity: 0;
  transform: translateY(30px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 22px 40px rgba(0, 0, 0, 0.16);
}

.feature-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card-soft {
  background: linear-gradient(180deg, rgba(34, 21, 16, 0.92) 0%, rgba(31, 20, 15, 0.98) 100%);
}

.feature-eyebrow,
.catalog-kicker {
  color: #ffd27d;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.82rem;
  margin-bottom: 0.75rem;
  font-weight: 700;
}

.feature-card h3 {
  color: #fff7ed;
  font-size: 1.9rem;
  margin-bottom: 0.85rem;
}

.feature-card p,
.feature-footnote {
  color: #dcccbc;
  line-height: 1.7;
}

.collection-pills {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.collection-pill,
.summary-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  font-weight: 600;
}

.collection-pill {
  background: rgba(102, 187, 106, 0.14);
  color: #ddf8df;
  border: 1px solid rgba(102, 187, 106, 0.18);
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

/* Hero Content Animation */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s ease forwards;
  animation-delay: 0.3s;
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

.catalog-topbar .title {
  color: #fff7ed;
  margin-bottom: 0.45rem;
}

.catalog-topbar .subtitle {
  color: #ccb8a5 !important;
}

.catalog-summary {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.summary-pill {
  background: rgba(102, 187, 106, 0.14);
  color: #dff7e0;
  border: 1px solid rgba(102, 187, 106, 0.18);
}

.summary-pill.is-muted {
  background: rgba(255, 183, 77, 0.12);
  color: #ffe2a8;
  border-color: rgba(255, 183, 77, 0.14);
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
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.cta-card:hover {
  transform: translateY(-5px);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem !important;
  }

  .hero-subtitle {
    font-size: 1.25rem !important;
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

  .hero-pills,
  .catalog-summary {
    justify-content: center;
  }

  .catalog-topbar {
    flex-direction: column;
  }

  .catalog-surface {
    padding: 1.4rem;
    border-radius: 24px;
  }

  .stat-card {
    margin-bottom: 1rem;
  }

  .section.py-5 {
    padding-top: 0rem !important;
    padding-bottom: 1rem !important;
  }

  /* Location section responsive */
  .columns.is-vcentered {
    flex-direction: column-reverse;
  }

  .column.is-6 {
    width: 100%;
    padding: 1rem;
  }

  .location-content {
    margin-top: 2rem;
    padding: 1.5rem;
    text-align: center;
  }

  .map-container {
    max-width: 500px;
    margin: 0 auto;
  }

  .location-map {
    max-height: 300px;
    object-fit: contain;
  }

  .tags {
    justify-content: center;
    flex-wrap: wrap;
  }

  .location-tag {
    margin: 0.25rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem !important;
  }

  .stat-number {
    font-size: 2rem;
  }

  .stat-icon {
    font-size: 2.5rem;
  }

  .location-content {
    padding: 1rem;
    margin-top: 1rem;
  }

  .location-content .title.is-3 {
    font-size: 1.25rem !important;
    margin-bottom: 1rem !important;
  }

  .location-content .subtitle.is-5 {
    font-size: 1rem !important;
  }

  .full-description {
    display: none !important;
  }

  .short-description {
    display: block !important;
  }

  .map-container {
    padding: 0.5rem;
    max-width: 100%;
    margin-top: 1rem;
  }

  .location-map {
    max-height: 250px;
    border-width: 2px;
  }

  .section.py-5 {
    padding-top: 0rem !important;
    padding-bottom: 1rem !important;
  }
}

.button:focus {
  outline: 2px solid #2e7d32;
  outline-offset: 2px;
}

.location-content {
  padding: 1rem;
  background: rgba(84, 75, 75, 0.6);
  border-radius: 18px;
  box-shadow: 0 4px 18px rgba(72, 187, 120, 0.12);
}

.full-description {
  display: block;
}

.short-description {
  display: none;
}

.has-text-green {
  color: #66bb6a !important;
}

.has-text-muted {
  color: #b5b5b5 !important;
}

.map-container {
  position: relative;
  padding: 1rem;
  background: rgba(84, 75, 75, 0.6);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(72, 187, 120, 0.15);
  transition: transform 0.3s ease;
  max-width: 400px;
  margin: 0 auto;
}

.map-container:hover {
  transform: translateY(-5px);
}

.location-map {
  width: 100%;
  height: auto;
  max-height: 350px;
  object-fit: contain;
  border-radius: 12px;
  border: 3px solid #66bb6a;
  filter: brightness(0.9) contrast(1.1);
}

.location-tag {
  background: #2e7d32 !important;
  color: white !important;
  border: none;
  margin-right: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  box-shadow: 0 2px 8px rgba(72, 187, 120, 0.15);
  transition: transform 0.2s ease;
}

.location-tag:hover {
  transform: translateY(-2px);
  background: #388e3c !important;
}

.location-tag .icon {
  margin-right: 0.5rem;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style>
