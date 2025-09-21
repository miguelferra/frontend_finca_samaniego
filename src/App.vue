<template>
  <div id="wrapper">
    <header>
      <nav class="navbar is-dark is-fixed-top has-shadow">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item" href="/">
              <img src="@/assets/finca_sama.png" alt="Finca Samaniego Logo" />
              <strong class="ml-2">Finca Samaniego</strong>
            </a>
            <a
              class="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbar-menu"
              @click="showMobileMenu = !showMobileMenu"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div
            class="navbar-menu"
            id="navbar-menu"
            v-bind:class="{ 'is-active': showMobileMenu }"
          >
            <div class="navbar-end">
              <router-link to="/" class="navbar-item" @click="closeMobileMenu">
                <span class="icon-text">
                  <span>Inicio</span>
                </span>
              </router-link>
              <router-link
                to="/about"
                class="navbar-item"
                @click="closeMobileMenu"
              >
                Nosotros
              </router-link>
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                  <span class="icon-text">
                    <span>Productos</span>
                  </span>
                </a>
                <div class="navbar-dropdown">
                  <router-link
                    to="/salsa_chiltepin"
                    class="navbar-item"
                    @click="closeMobileMenu"
                  >
                    🌶️ Salsa Chiltepin
                  </router-link>
                  <router-link
                    to="/chiltepin_entero"
                    class="navbar-item"
                    @click="closeMobileMenu"
                  >
                    🌱 Chiltepin Entero
                  </router-link>
                </div>
              </div>
              <router-link
                to="/contact"
                class="navbar-item"
                @click="closeMobileMenu"
              >
                Contacto
              </router-link>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main class="main-content">
      <transition name="fade" mode="out-in">
        <div v-if="$store.state.isLoading" class="loading-overlay">
          <div class="lds-dual-ring"></div>
        </div>
      </transition>

      <section class="section">
        <transition name="slide-fade" mode="out-in">
          <router-view />
        </transition>
      </section>
    </main>

    <footer class="footer-custom">
      <div class="content has-text-centered">
        <p>
          <strong>Finca Samaniego</strong> &copy;
          {{ new Date().getFullYear() }} &mdash; Productos frescos y orgánicos
          de Sonora.
        </p>
        <p>
          <!-- WhatsApp -->
          <a
            href="https://wa.me/526623299654"
            target="_blank"
            class="footer-link"
            aria-label="WhatsApp"
          >
            <i class="fab fa-whatsapp"></i>
          </a>

          <!-- Instagram -->
          <a
            href="https://www.instagram.com/fincasamaniego"
            target="_blank"
            class="footer-link"
            aria-label="Instagram"
          >
            <i class="fab fa-instagram"></i>
          </a>

          <!-- Facebook -->
          <a
            href="https://www.facebook.com/profile.php?id=61576697955087"
            target="_blank"
            class="footer-link"
            aria-label="Facebook"
          >
            <i class="fab fa-facebook"></i>
          </a>

          <!-- Email -->
          <a
            href="mailto:fincasamaniego@gmail.com"
            class="footer-link"
            aria-label="Email"
          >
            <i class="fas fa-envelope"></i>
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMobileMenu: false,
    };
  },
  methods: {
    closeMobileMenu() {
      this.showMobileMenu = false;
    },
  },
  mounted() {
    // Cerrar menú móvil al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (
        !e.target.closest(".navbar-burger") &&
        !e.target.closest(".navbar-menu")
      ) {
        this.showMobileMenu = false;
      }
    });
  },
};
</script>

<style lang="scss">
@import "../node_modules/bulma/";

// Variables personalizadas
$primary-color: #221510;
$accent-color: #ff6b6b;

// Layout principal
#wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #221510;
}

.main-content {
  flex: 1;
  padding-top: 52px; // Altura del navbar
}

// Navbar mejorado
.navbar {
  transition: all 0.3s ease;

  &.is-dark {
    background: #221510;
  }

  .navbar-item {
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  .navbar-dropdown {
    border-radius: 6px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

    .navbar-item:hover {
      background-color: #f5f5f5;
    }
  }
}

// Loading animation mejorada
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.lds-dual-ring {
  display: inline-block;
  width: 64px;
  height: 64px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 48px;
  height: 48px;
  margin: 8px;
  border-radius: 50%;
  border: 4px solid $primary-color;
  border-color: $primary-color transparent $primary-color transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// Transiciones para router-view
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

// Footer mejorado
.footer-custom {
  background: #221510;
  color: #fff;
  border-top: 3px solid #66bb6a;
  border-radius: 0 0 18px 18px;
  padding: 2rem 0 1rem 0;
  margin-top: 2rem;
  box-shadow: 0 -2px 12px rgba(72, 187, 120, 0.1);
}

.footer-custom strong {
  color: #66bb6a;
}

.footer-link {
  color: #66bb6a;
  margin: 0 0.5rem;
  font-size: 1.5rem;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #388e3c;
}

// Responsive
@media screen and (max-width: 1023px) {
  .navbar-menu {
    box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1);

    &.is-active {
      animation: slideDown 0.3s ease;
    }
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.navbar-burger:focus,
.navbar-item:focus {
  outline: 2px solid $accent-color;
  outline-offset: 2px;
}
.navbar-burger {
  width: 28px;
  height: 22px;
  position: relative;
}

.navbar-burger span {
  position: relative;
  left: 0;
  right: 0;
  height: 3px;
  background: #66bb6a;
  border-radius: 2px;
}

.navbar-burger span:nth-child(1) { top: 0; }
.navbar-burger span:nth-child(2) { top: 9px; }
.navbar-burger span:nth-child(3) { bottom: 0; }
</style>
