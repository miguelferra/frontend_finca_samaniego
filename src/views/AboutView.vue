<template>
  <div class="about-container py-6">
    <!-- Header -->
    <section class="has-text-centered mb-6">
      <h1 class="title is-1 has-text-green">Sobre Nosotros</h1>
      <h2 class="subtitle is-4 has-text-muted">
        Tradición y pasión por lo natural
      </h2>
    </section>

    <!-- Historia -->
    <section class="mb-6">
      <div class="about-card columns is-vcentered is-variable is-8">
        <div class="column is-5 about-img-col">
          <div class="about-img-wrapper">
            <img
              :src="imageSrc"
              alt="Vista de la finca Samaniego"
              class="about-img"
              @error="onImgError"
            />
            <div class="about-img-gradient"></div>
          </div>
        </div>
        <div class="column is-7 about-text-col">
          <div class="about-text-content">
            <h2 class="title is-3 has-text-green mb-3">Nuestra Historia</h2>
            <p class="is-size-5 has-text-muted mb-2">
              En <strong class="has-text-green">Finca Samaniego</strong> creemos en el valor de la tierra y en el poder de lo natural.<br>
              Desde nuestros orígenes en la Sierra de Bacerac, Sonora, cultivamos con dedicación y respeto hacia el medio ambiente.
            </p>
            <p class="is-size-5 has-text-muted">
              Cada producto refleja nuestro compromiso con la calidad, la sostenibilidad y el sabor auténtico del campo mexicano.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Misión, Visión, Valores -->
    <section class="mb-6">
      <div class="columns is-variable is-6 is-centered">
        <div class="column is-4">
          <div class="box dark-box has-text-centered">
            <span class="icon is-large has-text-green mb-2">
              <i class="fas fa-seedling fa-2x"></i>
            </span>
            <h3 class="title is-5 has-text-green">Misión</h3>
            <p class="has-text-muted">Producir alimentos frescos y orgánicos que nutran el cuerpo y respeten la naturaleza.</p>
          </div>
        </div>
        <div class="column is-4">
          <div class="box dark-box has-text-centered">
            <span class="icon is-large has-text-green mb-2">
              <i class="fas fa-eye fa-2x"></i>
            </span>
            <h3 class="title is-5 has-text-green">Visión</h3>
            <p class="has-text-muted">Ser un referente en agricultura sustentable y productos artesanales de calidad.</p>
          </div>
        </div>
        <div class="column is-4">
          <div class="box dark-box has-text-centered">
            <span class="icon is-large has-text-green mb-2">
              <i class="fas fa-heart fa-2x"></i>
            </span>
            <h3 class="title is-5 has-text-green">Valores</h3>
            <p class="has-text-muted">Honestidad, compromiso con la tierra, respeto por la tradición y amor por lo natural.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="has-text-centered">
      <div class="box dark-box py-5">
        <h3 class="title is-4 has-text-green mb-2">¿Quieres saber más sobre nuestra finca?</h3>
        <p class="subtitle is-5 has-text-muted mb-4">
          Contáctanos para conocer nuestra historia, procesos y cómo puedes visitarnos.
        </p>
        <router-link to="/contact" class="button is-light is-rounded cta-btn subtle-btn">
          <span class="icon"><i class="fas fa-envelope-open-text"></i></span>
          <span>Contáctanos</span>
        </router-link>
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
.about-container {
  background: #221510;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(72, 187, 120, 0.08);
  color: #b5b5b5;
}

.has-text-green {
  color: #66bb6a !important;
}
.has-text-muted {
  color: #b5b5b5 !important;
}

.title.is-1,
.title.is-3,
.title.is-5 {
  color: #66bb6a !important;
}

.dark-box {
  background: rgb(84, 75, 75) !important;
  box-shadow: 0 4px 18px rgba(72, 187, 120, 0.10);
  border-radius: 18px;
  border: 1px solid #23272b;
  color: #b5b5b5;
}

/* Creative image/text blend */
.about-card {
  position: relative;
  background: #23272b;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(72, 187, 120, 0.08);
  overflow: visible;
  margin-bottom: 2rem;
}

.about-img-col {
  position: relative;
  z-index: 2;
}

.about-img-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.about-img {
  object-fit: cover;
  border-radius: 18px 18px 60px 18px;
  width: 100%;
  height: 380px;
  box-shadow: 0 8px 32px rgba(72, 187, 120, 0.18);
  border: 3px solid #66bb6a;
  position: relative;
  z-index: 2;
}

.about-img-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  border-radius: 0 0 60px 18px;
 
  pointer-events: none;
}

.about-text-col {
  position: relative;
  z-index: 4;
  margin-left: -40px;
}

.about-text-content {
  background: rgba(34,21,16,0.95);
  border-radius: 18px;
  box-shadow: 0 4px 18px rgba(72, 187, 120, 0.10);
  padding: 2rem;
  margin-top: 2rem;
}

@media (max-width: 1024px) {
  .about-card {
    flex-direction: column;
    display: block;
  }
  .about-text-col {
    margin-left: 0;
    margin-top: 1rem;
  }
  .about-img {
    height: 220px;
    border-radius: 18px;
  }
  .about-img-gradient {
    height: 40%;
    border-radius: 0 0 18px 18px;
  }
  .about-text-content {
    margin-top: 0;
    padding: 1rem;
  }
}

.cta-btn {
  background: #66bb6a;
  color: #fff;
  border: none;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
  transition: all 0.3s;
}
.cta-btn:focus {
  outline: 2px solid #388e3c;
  outline-offset: 2px;
}
.cta-btn:hover {
  background: #388e3c;
  color: #fff;
  transform: translateY(-2px);
}

.subtle-btn {
  background: transparent !important;
  color: #66bb6a !important;
  border: 2px solid #66bb6a !important;
  box-shadow: none !important;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
}
.subtle-btn:hover {
  background: #23272b !important;
  color: #fff !important;
  border-color: #388e3c !important;
}
</style>