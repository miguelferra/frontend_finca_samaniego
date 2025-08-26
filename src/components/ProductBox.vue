<template>
  <div class="column is-3">
    <div class="box">
      <figure class="image mb-4">
        <img v-bind:src="product.thumbnail_url">
      </figure>

      <h3 class="is-size-4">{{ product.name }}</h3>
      <p class="is-size-6 has-text-grey">${{ product.price }}</p>

      <router-link v-bind:to="product.get_absolute_url" class="button is-dark mt-4">View details</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductBox',
  props: {
    product: Object
  }
}
</script>

<style scoped>
/* 3. Se elimina el código del fondo de aquí */
.image img {
  margin-top: -1.25rem;
  margin-bottom: 0rem;
  margin-right: -1.25rem;
}

.hero.is-dark {
  background-size: cover;
  background-position: center;
  position: relative;
}

/* Opcional: puedes dejar un overlay oscuro si quieres */
.hero.is-dark::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4); /* Overlay oscuro */
}

/* El hero-body necesita estar por encima del overlay */
.hero-body {
  position: relative;
  z-index: 1;
}
</style>
