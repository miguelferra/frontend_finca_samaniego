<template>
  <div class="home">
    <!-- Enhanced Hero Section -->
    <section
      class="hero is-medium is-dark mb-6 hero-gradient"
      :style="{ backgroundImage: 'url(' + imageUrl + ')' }"
    >
      <div class="hero-overlay"></div>
      <div class="hero-body has-text-centered">
        <div class="container">
          <div class="hero-content fade-in-up">
            <h1 class="title is-1 has-text-white hero-title">
              Bienvenido a Finca Samaniego
            </h1>
            <h2 class="subtitle is-3 has-text-white-ter hero-subtitle">
              Descubre nuestros productos frescos y orgánicos
            </h2>
            <div class="hero-buttons mt-5">
              <a
                class="button is-products is-large hero-cta"
                @click.prevent="scrollToProducts"
              >
                <span class="icon">
                  <i class="fas fa-leaf"></i>
                </span>
                <span>Explorar Productos</span>
              </a>
              <!-- <button class="button is-light is-large is-outlined hero-cta-secondary">
                Conoce Más
              </button> -->
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

    <!-- Location Map Section -->
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

    <!-- Products Section -->
    <section class="section" id="productos">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-12">
            <div class="section-header has-text-centered mb-6">
              <h2 class="title is-2">Nuestros Productos</h2>
              <p class="subtitle is-5 has-text-grey">
                Los productos más frescos directamente de nuestra finca
              </p>
              <div class="title-underline"></div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="column is-12 has-text-centered">
            <div class="loading-spinner">
              <div class="spinner"></div>
              <p class="mt-4">Cargando productos...</p>
            </div>
          </div>

          <!-- Products Grid -->
          <template v-else>
            <ProductBox
              v-for="(product, index) in displayedProducts"
              :key="product.id"
              :product="product"
              class="product-animate"
              :style="{ animationDelay: `${index * 0.1}s` }"
            />
          </template>

          <!-- Show More Button -->
          <div
            v-if="
              !showAllProducts && latestProducts.length > initialProductCount
            "
            class="column is-12 has-text-centered mt-4"
          >
            <button
              class="button is-success is-medium"
              @click="showAllProducts = true"
            >
              <span class="icon">
                <i class="fas fa-plus"></i>
              </span>
              <span
                >Ver Más Productos ({{
                  latestProducts.length - initialProductCount
                }}
                más)</span
              >
            </button>
          </div>
        </div>
      </div>
    </section>
    <!-- Call to Action Section -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content has-text-centered">
          <div class="cta-card">
            <h3 class="title is-3 has-text-white mb-3">
              ¿Listo para probar lo mejor de la naturaleza?
            </h3>
            <p class="subtitle is-5 has-text-white-ter mb-4">
              Contáctanos hoy y descubre la diferencia de los productos
              verdaderamente frescos.
            </p>
            <a
              href="https://wa.me/526623299654"
              target="_blank"
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
import { allProducts } from "@/data/products.js";

export default {
  name: "HomeView",

  components: {
    ProductBox,
  },

  data() {
    return {
      imageUrl: "/background.jpg",
      latestProducts: [],
      isLoading: true,
      showAllProducts: false,
      initialProductCount: 8, // Show 8 products initially
    };
  },

  computed: {
    displayedProducts() {
      return this.showAllProducts
        ? this.latestProducts
        : this.latestProducts.slice(0, this.initialProductCount);
    },
  },

  mounted() {
    this.loadProducts();
    document.title =
      "Bienvenidos | Finca Samaniego - Productos Frescos y Orgánicos";

    // Add scroll animations
    this.observeElements();
  },

  methods: {
    async loadProducts() {
      try {
        // Simulate loading delay for better UX
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Sort products by date (most recent first)
        this.latestProducts = allProducts
          .sort((a, b) => new Date(b.date_added) - new Date(a.date_added))
          .filter((product) => product.available !== false);

        this.isLoading = false;
      } catch (error) {
        console.error("Error loading products:", error);
        this.isLoading = false;
      }
    },

    observeElements() {
      // Intersection Observer for scroll animations
      const observer = new IntersectionObserver(
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

      // Observe stat cards
      document.querySelectorAll(".stat-card").forEach((card) => {
        observer.observe(card);
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
.is-products {
  background: #66bb6a;
  color: white;
  border: none;
}
/* Hero Section Enhancements */
.hero-gradient {
  position: relative;
  background-attachment: scroll; /* Fix for mobile */
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  min-height: 400px;
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
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem !important;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem !important;
}

.hero-subtitle {
  font-size: 1.5rem !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  margin-bottom: 2rem !important;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-cta {
  border-radius: 30px;
  padding: 1rem 2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
}

.hero-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(72, 187, 120, 0.4);
}

.hero-cta-secondary {
  border-radius: 50px;
  padding: 1rem 2rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.hero-cta-secondary:hover {
  background-color: white;
  color: #2e7d32;
  transform: translateY(-2px);
}

/* Statistics Section */
.stat-card {
  background: rgb(84, 75, 75);
  border-radius: 15px;
  padding: 2rem 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
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

/* Section Header */
.section-header .title {
  position: relative;
}

.title-underline {
  width: 80px;
  height: 4px;
  background: #66bb6a;
  margin: 1rem auto;
  border-radius: 2px;
}

/* Product Animations */
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

/* Loading Spinner */
.loading-spinner {
  padding: 3rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2e7d32;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Call to Action Section */
.cta-section {
  background: linear-gradient(135deg, #2e7d32 0%, #388e3c 100%);
  margin-top: 3rem;
}

.cta-content {
  padding: 2rem 0;
}

.cta-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.cta-card:hover {
  transform: translateY(-5px);
}

/* Responsive Design */
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
  .mb-4 {
    margin-bottom: 0rem !important;
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

  /* Location section mobile */
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

  .location-content .tags {
    display: none;
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
  .mb-4 {
    margin-bottom: 0rem !important;
  }
}

/* Improved accessibility */
.button:focus {
  outline: 2px solid #2e7d32;
  outline-offset: 2px;
}

/* Location Map Section */
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
