<template>
  <div class="column is-3">
    <div class="box">
      <figure class="image mb-4">
        <img
          :src="getImageUrl()"
          :alt="product.name"
          @error="handleImageError"
        />
      </figure>

      <h3 class="is-size-4">{{ product.name }}</h3>
      <p class="is-size-6 has-text-grey">${{ product.price }}</p>

      <router-link
        v-bind:to="product.get_absolute_url"
        class="button is-dark mt-4"
        >View details</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductBox",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getImageUrl() {
      // Prioridad: thumbnail_url > image_url > placeholder
      if (this.product.thumbnail_url) {
        return this.product.thumbnail_url;
      } else if (this.product.image_url) {
        return this.product.image_url;
      } else {
        return "/placeholder-image.jpg"; // Imagen por defecto
      }
    },

    getProductUrl() {
      // Construir URL manualmente porque get_absolute_url no existe en el serializer
      if (this.canNavigate()) {
        return `/product/${this.product.category_slug}/${this.product.slug}`;
      }
      return "/";
    },

    canNavigate() {
      // Verificar que tenemos todos los datos necesarios para navegar
      return this.product.slug && this.product.category_slug;
    },

    handleImageError(event) {
      console.warn("Failed to load image:", event.target.src);
      // Fallback a una imagen por defecto
      event.target.src = "/placeholder-image.jpg";
    },
  },
};
</script>

<style scoped>
.image img {
  margin-top: -1.25rem;
  margin-bottom: 0rem;
  margin-right: -1.25rem;
  object-fit: cover;
  width: 100%;
  height: 200px; /* Altura fija para consistencia */
}

.box {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hero.is-dark {
  background-size: cover;
  background-position: center;
  position: relative;
}

.hero.is-dark::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.hero-body {
  position: relative;
  z-index: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .column.is-3 {
    width: 50%;
  }
}

@media (max-width: 480px) {
  .column.is-3 {
    width: 100%;
  }
}
</style>
