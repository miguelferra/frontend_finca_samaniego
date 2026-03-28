<template>
  <div id="wrapper">
    <header>
      <nav class="navbar is-dark is-fixed-top has-shadow site-navbar">
        <div class="container">
          <div class="navbar-brand">
            <router-link
              to="/"
              class="navbar-item brand-mark"
              @click="closeMobileMenu"
            >
              <img src="@/assets/logo.png" alt="Finca Samaniego Logo" />
              <strong class="ml-2 brand-name">Finca Samaniego</strong>
            </router-link>
            <button
              type="button"
              class="navbar-burger"
              :class="{ 'is-active': showMobileMenu }"
              aria-label="menu"
              :aria-expanded="showMobileMenu.toString()"
              data-target="navbar-menu"
              @click="showMobileMenu = !showMobileMenu"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div
            class="navbar-menu"
            id="navbar-menu"
            v-bind:class="{ 'is-active': showMobileMenu }"
          >
            <div class="navbar-end">
              <router-link
                to="/"
                class="navbar-item nav-pill"
                @click="closeMobileMenu"
              >
                <span class="icon-text">
                  <span>Inicio</span>
                </span>
              </router-link>
              <router-link
                to="/about"
                class="navbar-item nav-pill"
                @click="closeMobileMenu"
              >
                Nosotros
              </router-link>

              <div class="navbar-item has-dropdown is-hoverable">
                <router-link
                  to="/productos"
                  class="navbar-link nav-pill"
                  @click="closeMobileMenu"
                >
                  <span class="icon-text">
                    <span>Productos</span>
                  </span>
                </router-link>
                <div class="navbar-dropdown">
                  <router-link
                    to="/salsa_chiltepin"
                    class="navbar-item"
                    @click="closeMobileMenu"
                  >
                    🥫 Salsa Chiltepin
                  </router-link>
                  <router-link
                    to="/chiltepin_entero"
                    class="navbar-item"
                    @click="closeMobileMenu"
                  >
                    🌶️ Chiltepin Entero
                  </router-link>
                </div>
              </div>
              <router-link
                to="/contact"
                class="navbar-item nav-pill"
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
      <transition name="loading-bar" mode="out-in">
        <div v-if="$store.state.isLoading" class="loading-bar"></div>
      </transition>

      <section class="section page-section">
        <transition name="slide-fade" mode="out-in">
          <router-view />
        </transition>
      </section>
    </main>

    <footer class="footer-custom">
      <div class="content has-text-centered">
        <p>
          <strong>Finca Samaniego</strong> &copy;
          {{ currentYear }}. Chiltepín artesanal y productos frescos desde
          Bacerac, Sonora.
        </p>
        <p>
          <a
            href="https://wa.me/523313832186"
            target="_blank"
            rel="noreferrer noopener"
            class="footer-link"
            aria-label="WhatsApp"
          >
            <i class="fab fa-whatsapp"></i>
          </a>

          <a
            href="https://www.instagram.com/fincasamaniego"
            target="_blank"
            rel="noreferrer noopener"
            class="footer-link"
            aria-label="Instagram"
          >
            <i class="fab fa-instagram"></i>
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61576697955087"
            target="_blank"
            rel="noreferrer noopener"
            class="footer-link"
            aria-label="Facebook"
          >
            <i class="fab fa-facebook"></i>
          </a>

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
      currentYear: new Date().getFullYear(),
      showMobileMenu: false,
      handleOutsideClick: null,
    };
  },
  watch: {
    $route() {
      this.closeMobileMenu();
    },
  },
  methods: {
    closeMobileMenu() {
      this.showMobileMenu = false;
    },
  },
  mounted() {
    this.handleOutsideClick = (e) => {
      if (
        !e.target.closest(".navbar-burger") &&
        !e.target.closest(".navbar-menu")
      ) {
        this.showMobileMenu = false;
      }
    };

    // Cerrar menú móvil al hacer clic fuera
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
};
</script>

<style lang="scss">
@import "../node_modules/bulma/";

// Variables personalizadas
$primary-color: #221510;
$accent-color: #ff6b6b;
$surface-border: rgba(238, 214, 183, 0.12);
$accent-green: #66bb6a;

html,
body {
  overscroll-behavior: none;
  touch-action: manipulation;
  background:
    radial-gradient(circle at top, rgba(102, 187, 106, 0.14), transparent 28%),
    linear-gradient(180deg, #160d0a 0%, #221510 34%, #1b110e 100%);
}

:root {
  color-scheme: dark;
}

#wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(circle at top right, rgba(102, 187, 106, 0.08), transparent 24%),
    radial-gradient(circle at top left, rgba(255, 198, 138, 0.08), transparent 22%),
    linear-gradient(180deg, #160d0a 0%, #221510 32%, #1b110e 100%);
}

.main-content {
  flex: 1;
  padding-top: 72px;
}

.page-section {
  padding-top: 1.5rem;
  padding-bottom: 3rem;
}

.site-navbar {
  background: rgba(24, 14, 10, 0.78) !important;
  border-bottom: 1px solid rgba(240, 218, 188, 0.08);
  backdrop-filter: blur(14px);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.18);
}

.site-navbar .container {
  min-height: 72px;
}

.brand-mark {
  gap: 0.55rem;
  padding-left: 0;
}

.brand-mark img {
  max-height: 42px;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.18));
}

.brand-name {
  color: #f7efe6;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.navbar .navbar-item,
.navbar .navbar-link {
  color: #f8f0e7;
  transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
}

.nav-pill {
  border-radius: 999px;
  margin-left: 0.35rem;
  padding-inline: 1rem;
  min-height: 40px;
}

.navbar .navbar-item:hover,
.navbar .navbar-link:hover {
  transform: translateY(-1px);
}

.navbar .navbar-item.router-link-exact-active,
.navbar .navbar-link.router-link-exact-active {
  background: rgba(102, 187, 106, 0.16);
  color: #fcfaf7 !important;
  box-shadow: inset 0 0 0 1px rgba(102, 187, 106, 0.18);
}

.navbar .navbar-dropdown {
  margin-top: 0.45rem;
  border: 1px solid $surface-border;
  border-radius: 16px;
  background: rgba(34, 21, 16, 0.96);
  box-shadow: 0 22px 40px rgba(0, 0, 0, 0.24);
  overflow: hidden;
}

.navbar .navbar-dropdown .navbar-item {
  padding-block: 0.8rem;
}

.navbar .navbar-dropdown .navbar-item:hover {
  background: rgba(102, 187, 106, 0.14);
  color: #fff !important;
}

.navbar-menu.is-active {
  background: rgba(27, 17, 14, 0.98);
  color: #fff;
  border: 1px solid rgba(240, 218, 188, 0.08);
  border-top: 1px solid rgba(102, 187, 106, 0.24);
  border-radius: 20px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.24);
  padding-bottom: 1rem;
  margin-top: 0.75rem;
}

.navbar-menu.is-active .navbar-item,
.navbar-menu.is-active .navbar-link {
  color: #fff !important;
  font-weight: 600;
  transition: background 0.2s, color 0.2s;
}

.navbar-menu.is-active .navbar-item:hover,
.navbar-menu.is-active .navbar-link:hover {
  background: rgba(102, 187, 106, 0.2) !important;
  color: #fff !important;
  border-radius: 14px;
}

.navbar-menu.is-active .navbar-dropdown {
  background: rgba(34, 21, 16, 0.88);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
}

.navbar-menu.is-active .navbar-dropdown .navbar-item:hover {
  background: rgba(102, 187, 106, 0.16) !important;
  color: #fff !important;
}

.loading-bar {
  position: fixed;
  top: 72px;
  right: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #66bb6a 0%, #ffd166 50%, #66bb6a 100%);
  background-size: 200% 100%;
  box-shadow: 0 6px 20px rgba(102, 187, 106, 0.35);
  z-index: 9999;
  animation: shimmer 1.1s linear infinite;
}

@keyframes shimmer {
  from {
    background-position: 0% 0;
  }
  to {
    background-position: 200% 0;
  }
}

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

.loading-bar-enter-active,
.loading-bar-leave-active {
  transition: opacity 0.2s ease;
}

.loading-bar-enter-from,
.loading-bar-leave-to {
  opacity: 0;
}

.footer-custom {
  background:
    linear-gradient(180deg, rgba(33, 20, 15, 0.94) 0%, rgba(21, 13, 10, 0.98) 100%);
  color: #fff;
  border-top: 1px solid rgba(102, 187, 106, 0.18);
  padding: 2.4rem 0 1.4rem;
  margin-top: 2rem;
  box-shadow: 0 -10px 32px rgba(0, 0, 0, 0.18);
}

.footer-custom strong {
  color: $accent-green;
}

.footer-link {
  color: $accent-green;
  margin: 0 0.35rem;
  font-size: 1.35rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(102, 187, 106, 0.08);
  border: 1px solid rgba(102, 187, 106, 0.12);
  transition: transform 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.footer-link:hover {
  color: #fff;
  background: rgba(102, 187, 106, 0.2);
  transform: translateY(-2px);
}

@media screen and (max-width: 1023px) {
  .page-section {
    padding-top: 1rem;
  }

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
  width: 42px;
  height: 42px;
  position: relative;
  border-radius: 50%;
  margin-left: auto;
  color: $accent-green;
}

.navbar-burger:hover {
  background: rgba(102, 187, 106, 0.1);
}

.navbar-burger span {
  position: absolute;
  left: 10px;
  right: 10px;
  height: 2px;
  background: $accent-green;
  border-radius: 2px;
  transform-origin: center;
  transition: transform 0.25s ease, opacity 0.25s ease, top 0.25s ease;
}

.navbar-burger span:nth-child(1) {
  top: 13px;
}

.navbar-burger span:nth-child(2) {
  top: 20px;
}

.navbar-burger span:nth-child(3) {
  top: 27px;
}

.navbar-burger.is-active span:nth-child(1) {
  top: 20px;
  transform: rotate(45deg);
}

.navbar-burger.is-active span:nth-child(2) {
  opacity: 0;
}

.navbar-burger.is-active span:nth-child(3) {
  top: 20px;
  transform: rotate(-45deg);
}
</style>
