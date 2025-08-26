<template>
    <div id="wrapper">
      <header>
        <nav class="navbar is-dark">
          <div class="navbar-brand">
            <a class="navbar-item" href="/">
              <img src="@/assets/finca_sama.png" alt="Finca Samaniego Logo" />
              </a>
              <span class="navbar-item is-align-items-center" style="display: flex; align-items: center;">
              <strong>Finca Samaniego</strong>
              </span>
              <a class="navbar-burger"aria-label="menu" aria-expanded="false" data-target="navbar-menu" @click="showMobileMenu = !showMobileMenu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
          </div>
          <div class="navbar-menu" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu}">
            <div class="navbar-end">
              <a class="navbar-item" href="/">Inicio</a>
              <a class="navbar-item" href="/about">Nosotros</a>
              <a class="navbar-item" href="/salsa_chiltepin">Salsa Chiltepin</a>
              <a class="navbar-item" href="/chiltepin_entero">Chiltepin Entero</a>
              <a class="navbar-item" href="/contact">Contacto</a>
            </div>
          </div>
        </nav>

        <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': $store.state.isLoading}">
          <div class="lds-dual-ring"></div>
        </div>
        <section class="section">
          <router-view/>
        </section>

        <footer class="footer">
            <p class="content has-text-centered">Finca Samaniego Copyright (c) 2025
            </p>
        </footer>
      </header>
    </div>
  </template>

<script>
export default{
  data() {
    return {
      showMobileMenu: false,
    };
  },
}</script>

<style lang="scss">
@import '../node_modules/bulma/';

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 50%;
  box-shadow: 0 0 20px #3498db55, 0 0 40px #00c3ff33;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 8px solid transparent;
  border-top: 8px solid #888888;   /* dark gray */
  border-right: 8px solid #bbbbbb; /* medium gray */
  border-bottom: 8px solid #dddddd;/* light gray */
  border-left: 8px solid #f3f3f3;  /* very light gray */
  animation: lds-dual-ring 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
  box-shadow: 0 0 30px #88888844;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg) scale(1);
    box-shadow: 0 0 30px #00c3ff88;
  }
  50% {
    transform: rotate(180deg) scale(1.1);
    box-shadow: 0 0 50px #00e6d088;
  }
  100% {
    transform: rotate(360deg) scale(1);
    box-shadow: 0 0 30px #00c3ff88;
  }
}
.is-loading-bar {
  height: 0;
  overflow: hidden;

  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;

  &.is-loading {
    height: 80px;
  }
}
</style>
