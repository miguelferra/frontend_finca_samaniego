<template>
  <div class="column is-4">
    <div class="box">
      <figure class="image mb-4">
        <img
          :src="product.image_url"
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
.box {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 18px;
  box-shadow: 0 4px 18px rgba(72, 187, 120, 0.12);
  background: #55342c;
  transition: box-shadow 0.3s, transform 0.3s;
  padding: 1.5rem 1rem;
}

.box:hover {
  box-shadow: 0 8px 32px rgba(72, 187, 120, 0.22);
  transform: translateY(-4px) scale(1.02);
  border-color: #388e3c;
}

.image img {
  margin-top: -1.25rem;
  margin-bottom: 0rem;
  margin-right: -1.25rem;
  object-fit: cover;
  width: 100%;
  height: 250px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(46, 125, 50, 0.10);
}

.is-size-4 {
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.is-size-6.has-text-grey {
  color: #66bb6a !important;
  font-weight: 600;
  margin-bottom: 1rem;
}

.button.is-dark {
  background: linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%);
  color: #fff;
  border: none;
  border-radius: 24px;
  font-weight: 600;
  transition: background 0.3s, transform 0.2s;
  box-shadow: 0 2px 8px rgba(72, 187, 120, 0.15);
}

.button.is-dark:hover {
  background: linear-gradient(135deg, #388e3c 0%, #66bb6a 100%);
  transform: translateY(-2px);
  color: #fff;
}
</style>