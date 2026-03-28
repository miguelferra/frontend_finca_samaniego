<template>
  <div class="about-page">
    <section class="about-shell fade-in">
      <!-- Hero/Header Section -->
      <div class="about-header has-text-centered">
        <p class="about-kicker">Nuestra esencia</p>
        <h1 class="title is-2">Sobre Finca Samaniego</h1>
        <p class="subtitle">Tradición y pasión por lo natural desde la Sierra Alta.</p>
      </div>

      <div class="about-body">
        <!-- History Section with Image -->
        <div class="columns is-variable is-8 is-vcentered mb-6">
          <div class="column is-6">
            <div class="about-image-card">
              <img
                :src="imageSrc"
                alt="Vista de la finca Samaniego"
                @error="onImgError"
              />
              <div class="image-overlay"></div>
            </div>
          </div>
          <div class="column is-6">
            <div class="about-content-box">
              <h2 class="title is-3 has-text-green">Nuestra Historia</h2>
              <div class="content">
                <p>
                  En <strong>Finca Samaniego</strong> creemos en el valor de la tierra y en el poder de lo natural. Lo que comenzó como un proyecto familiar en la Sierra de Bacerac, Sonora, se ha convertido en un compromiso con la identidad regional.
                </p>
                <p>
                  Cultivamos con dedicación y respeto hacia el medio ambiente, asegurando que cada producto que sale de nuestra finca refleje la honestidad del campo sonorense.
                </p>
                <p>
                  No solo vendemos productos; compartimos una parte de nuestra cultura y el sabor auténtico que solo la Sierra Alta puede ofrecer.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Mission, Vision, Values Grid -->
        <div class="columns is-multiline mb-6">
          <div class="column is-4">
            <div class="value-card">
              <div class="value-icon">
                <i class="fas fa-seedling"></i>
              </div>
              <h3>Misión</h3>
              <p>Producir alimentos frescos y artesanales que nutran el cuerpo y respeten el ciclo natural de la tierra.</p>
            </div>
          </div>
          <div class="column is-4">
            <div class="value-card">
              <div class="value-icon">
                <i class="fas fa-eye"></i>
              </div>
              <h3>Visión</h3>
              <p>Ser el referente de calidad en productos de chiltepín y agricultura sustentable en la región.</p>
            </div>
          </div>
          <div class="column is-4">
            <div class="value-card">
              <div class="value-icon">
                <i class="fas fa-heart"></i>
              </div>
              <h3>Valores</h3>
              <p>Honestidad en el proceso, compromiso con la tierra y respeto absoluto por nuestras tradiciones.</p>
            </div>
          </div>
        </div>

        <!-- Final CTA -->
        <div class="about-footer-cta has-text-centered">
          <div class="cta-inner">
            <h3 class="title is-4">¿Quieres saber más?</h3>
            <p class="mb-4">Escríbenos para conocer más sobre nuestros procesos o realizar un pedido especial.</p>
            <router-link to="/contact" class="button about-cta-btn">
              <span class="icon"><i class="fas fa-envelope-open-text"></i></span>
              <span>Contactar ahora</span>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "AboutView",
  data() {
    return {
      imageSrc: require("@/assets/finca.jpg"),
      fallbackImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    };
  },
  mounted() {
    document.title = "Sobre Nosotros | Finca Samaniego";
  },
  methods: {
    onImgError(e) {
      e.target.src = this.fallbackImg;
    }
  }
};
</script>

<style scoped>
.about-page {
  max-width: 1100px;
  margin: 0 auto;
}

.about-shell {
  background: linear-gradient(180deg, rgba(38, 24, 19, 0.96) 0%, rgba(27, 17, 14, 0.98) 100%);
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid rgba(240, 218, 188, 0.08);
  box-shadow: 0 28px 60px rgba(0, 0, 0, 0.22);
  padding: 3rem 2.5rem;
}

.about-header {
  margin-bottom: 3.5rem;
}

.about-kicker {
  color: #ffd27d;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.about-header .title {
  color: #fff7ed;
  font-size: 3rem;
  font-weight: 700;
}

.about-header .subtitle {
  color: #ccb8a5;
}

.about-image-card {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  height: 400px;
}

.about-image-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(34, 21, 16, 0.4), transparent);
}

.about-content-box {
  padding-left: 1rem;
}

.about-content-box .title {
  color: #66bb6a;
  margin-bottom: 1.5rem;
}

.about-content-box .content {
  color: #d6c7bb;
  font-size: 1.1rem;
  line-height: 1.8;
}

.value-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  padding: 2rem;
  height: 100%;
  text-align: center;
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.05);
}

.value-icon {
  font-size: 2.5rem;
  color: #66bb6a;
  margin-bottom: 1.25rem;
}

.value-card h3 {
  color: #fff7ed;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.value-card p {
  color: #ccb8a5;
  line-height: 1.6;
}

.about-footer-cta {
  margin-top: 2rem;
}

.cta-inner {
  background: rgba(102, 187, 106, 0.08);
  border: 1px solid rgba(102, 187, 106, 0.15);
  border-radius: 24px;
  padding: 2.5rem;
}

.cta-inner .title {
  color: #fff7ed;
}

.cta-inner p {
  color: #ccb8a5;
}

.about-cta-btn {
  background: linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%);
  color: #fff;
  border-radius: 999px;
  padding: 0.8rem 2rem;
  border: none;
  font-weight: 700;
  min-height: 50px;
}

.about-cta-btn:hover {
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(46, 125, 50, 0.2);
}

@media (max-width: 768px) {
  .about-shell {
    padding: 2rem 1.5rem;
  }
  
  .about-header .title {
    font-size: 2.2rem;
  }
  
  .about-image-card {
    height: 300px;
    margin-bottom: 2rem;
  }
  
  .about-content-box {
    padding-left: 0;
  }
}
</style>
