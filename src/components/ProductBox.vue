<template>
  <div class="column is-3">
    <div class="box">
      <figure class="image mb-4">
        <img
          :src="product.thumbnail_url"
          :alt="product.name"
          @error="handleImageError"
        />
      </figure>
      <h3 class="is-size-4">{{ product.name }}</h3>
      <p class="is-size-6 has-text-grey">${{ product.price }}</p>
      
      <router-link
        :to="product.get_absolute_url"
        class="button is-dark mt-4"
      >
        Ver detalles
      </router-link>
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
    // El manejador de errores sigue siendo útil
    handleImageError(event) {
      console.warn("No se pudo cargar la imagen:", event.target.src);
      // Fallback a una imagen de placeholder
      event.target.src = "https://via.placeholder.com/300x200/cccccc/666666?text=Imagen+no+disponible";
    },
  },
  // REMOVED: Los métodos getImageUrl, getProductUrl y canNavigate ya no son necesarios
};
</script>

<style scoped>
/* Tu CSS existente es bueno, lo dejamos como está */
.image img {
  margin-top: -1.25rem;
  margin-bottom: 0rem;
  margin-right: -1.25rem;
  object-fit: cover;
  width: 100%;
  height: 200px;
}
.box {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>