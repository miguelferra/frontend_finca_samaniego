<template>
  <div class="contact-view">
    <p class="contact-kicker">Contacto directo</p>
    <h1 class="title is-2 has-text-centered">Hablemos de tu pedido</h1>
    <p class="subtitle has-text-centered mb-5">
      Resolvemos dudas, cotizaciones y pedidos especiales por los canales que
      más usas.
    </p>

    <div class="contact-methods">
      <a
        href="mailto:fincasamaniego@gmail.com"
        class="contact-card"
        target="_blank"
        rel="noreferrer noopener"
      >
        <span class="contact-icon"><i class="fas fa-envelope"></i></span>
        <strong>Email</strong>
        <span>fincasamaniego@gmail.com</span>
      </a>
      <a
        href="https://wa.me/523313832186"
        class="contact-card"
        target="_blank"
        rel="noreferrer noopener"
      >
        <span class="contact-icon"><i class="fab fa-whatsapp"></i></span>
        <strong>WhatsApp</strong>
        <span>Respuesta rápida para pedidos</span>
      </a>
      <a
        href="https://www.instagram.com/fincasamaniego"
        class="contact-card"
        target="_blank"
        rel="noreferrer noopener"
      >
        <span class="contact-icon"><i class="fab fa-instagram"></i></span>
        <strong>Instagram</strong>
        <span>Noticias, lanzamientos y contenido visual</span>
      </a>
      <a
        href="https://www.facebook.com/profile.php?id=61576697955087"
        class="contact-card"
        target="_blank"
        rel="noreferrer noopener"
      >
        <span class="contact-icon"><i class="fab fa-facebook"></i></span>
        <strong>Facebook</strong>
        <span>Actualizaciones y comunidad</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactView",
};
</script>

<style scoped>
.contact-view {
  background: linear-gradient(180deg, rgba(34, 21, 16, 0.94) 0%, rgba(27, 17, 14, 0.98) 100%);
  border-radius: 28px;
  box-shadow: 0 24px 56px rgba(0, 0, 0, 0.2);
  padding: 2.5rem 2rem;
  margin: 2rem auto;
  max-width: 920px;
  border: 1px solid rgba(240, 218, 188, 0.08);
}

.contact-kicker {
  text-align: center;
  color: #ffd27d;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 0.85rem;
}

.title {
  color: #fff7ed;
  font-weight: 700;
  margin-bottom: 1rem;
}

.subtitle {
  color: #ccb8a5;
  font-weight: 500;
  margin-bottom: 2rem;
}

.contact-methods {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.contact-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  min-height: 180px;
  padding: 1.5rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  text-decoration: none;
  color: #f4eadf;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.contact-card:hover {
  transform: translateY(-4px);
  color: #fff;
  border-color: rgba(102, 187, 106, 0.18);
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.18);
}

.contact-card strong {
  font-size: 1.15rem;
}

.contact-card span:last-child {
  color: #ccb8a5;
  line-height: 1.6;
}

.contact-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: rgba(102, 187, 106, 0.12);
  color: #81e687;
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .contact-methods {
    grid-template-columns: 1fr;
  }
}
</style>
