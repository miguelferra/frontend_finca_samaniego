<template>
  <div class="column is-4 product-column">
    <article class="box product-card" :class="{ 'is-coming-soon': product.isComingSoon }">
      <div class="product-status-row">
        <span class="product-category">{{ product.category_name }}</span>
        <span
          class="product-status"
          :class="{ 'is-available': product.isAvailable }"
        >
          <i
            :class="
              product.isAvailable ? 'fas fa-check-circle' : 'fas fa-hourglass-half'
            "
          ></i>
          {{ product.isAvailable ? "Disponible" : "Próximamente" }}
        </span>
      </div>
      <figure class="image mb-4 product-media">
        <img
          :src="product.image_url"
          :alt="product.name"
          @error="handleImageError"
        />
      </figure>
      <div class="product-copy">
        <h3 class="is-size-4 product-title">{{ product.name }}</h3>
        <p class="product-description">{{ product.description }}</p>
        <p v-if="product.isAvailable" class="is-size-6 has-text-grey product-price">
          {{ product.formattedPrice }}
        </p>
        <p v-else class="is-size-6 price-soon" aria-hidden="true">
          Lanzamiento próximo
        </p>
      </div>

      <div class="mt-4 product-actions">
        <router-link
          v-if="product.isAvailable"
          :to="product.get_absolute_url"
          class="button is-dark"
        >
          Ver detalles
        </router-link>

        <button
          v-else
          class="button is-dark disabled"
          aria-disabled="true"
          disabled
        >
          Muy pronto
        </button>
      </div>
    </article>
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
    handleImageError(event) {
      console.warn("No se pudo cargar la imagen:", event.target.src);
      event.target.src =
        "https://via.placeholder.com/300x200/cccccc/666666?text=Imagen+no+disponible";
    },
  },
};
</script>

<style scoped>
.product-column {
  display: flex;
}

.product-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(241, 220, 193, 0.1);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
  background:
    linear-gradient(180deg, rgba(102, 63, 50, 0.86) 0%, rgba(58, 34, 28, 0.96) 100%);
  transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
  padding: 1.1rem;
}

.product-card:hover {
  box-shadow: 0 26px 56px rgba(0, 0, 0, 0.24);
  transform: translateY(-8px);
  border-color: rgba(102, 187, 106, 0.28);
}

.product-status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.product-category,
.product-status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
}

.product-category {
  background: rgba(255, 243, 224, 0.08);
  border: 1px solid rgba(255, 214, 153, 0.16);
  color: #fce9d2;
}

.product-status {
  background: rgba(255, 183, 77, 0.12);
  color: #ffd37d;
}

.product-status.is-available {
  background: rgba(102, 187, 106, 0.14);
  color: #8bdd90;
}

.product-media {
  position: relative;
  overflow: hidden;
  margin: 0 0 1.15rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
}

.product-media::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(34, 21, 16, 0.24) 100%);
  pointer-events: none;
}

.image img {
  object-fit: contain;
  width: 100%;
  aspect-ratio: 4 / 3;
  min-height: 280px;
  padding: 1rem;
  border-radius: 18px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.14);
  transition: transform 0.4s ease;
  background: rgba(255, 255, 255, 0.02);
}

.product-card:hover .image img {
  transform: scale(1.04);
}

.product-copy,
.product-actions {
  position: relative;
  z-index: 1;
}

.product-description {
  color: #d9cdbf;
  line-height: 1.65;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.is-size-4 {
  font-weight: 700;
  color: #fff8ef;
  margin-bottom: 0.55rem;
  line-height: 1.25;
}

.product-price,
.is-size-6.has-text-grey {
  color: #66bb6a !important;
  font-weight: 700;
  letter-spacing: 0.01em;
  margin-bottom: 1rem;
}

.button.is-dark {
  width: 100%;
  min-height: 46px;
  background: linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%);
  color: #fff;
  border: none;
  border-radius: 999px;
  font-weight: 700;
  transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 12px 24px rgba(46, 125, 50, 0.24);
}

.button.is-dark:hover {
  background: linear-gradient(135deg, #388e3c 0%, #66bb6a 100%);
  transform: translateY(-2px);
  box-shadow: 0 16px 28px rgba(46, 125, 50, 0.28);
  color: #fff;
}

.product-title {
  white-space: pre-line;
  min-height: 3.1em;
}

.product-card.is-coming-soon {
  border-color: rgba(255, 183, 77, 0.2);
}

.button.is-dark.disabled,
.button.is-dark[disabled] {
  background: linear-gradient(135deg, #9e9e9e 0%, #bdbdbd 100%);
  color: #333 !important;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
  opacity: 0.9;
}

.price-soon {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 0.38rem 0.8rem;
  border-radius: 999px;
  background: rgba(255, 183, 77, 0.08);
  border: 1px dashed rgba(255, 183, 77, 0.22);
  color: #f5e6d8;
  margin-bottom: 0.4rem;
}

@media (max-width: 768px) {
  .product-card {
    border-radius: 20px;
  }

  .product-status-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .image img {
    min-height: 220px;
  }
}
</style>
