<template>
  <div class="contact-view">
    <h1 class="title is-2 has-text-centered">Contacto</h1>
    <p class="subtitle has-text-centered mb-5">
      ¿Tienes dudas o quieres hacer un pedido? ¡Contáctanos!
    </p>
    <div class="contact-methods">
      <a href="mailto:fincasamaniego@gmail.com" class="button is-success is-large contact-btn" target="_blank">
        <span class="icon"><i class="fas fa-envelope"></i></span>
        <span>Email</span>
      </a>
      <a href="https://wa.me/526623299654" class="button is-success is-large contact-btn" target="_blank">
        <span class="icon"><i class="fab fa-whatsapp"></i></span>
        <span>WhatsApp</span>
      </a>
      <a href="https://www.instagram.com/fincasamaniego" class="button is-success is-large contact-btn" target="_blank">
        <span class="icon"><i class="fab fa-instagram"></i></span>
        <span>Instagram</span>
      </a>
      <a href="https://www.facebook.com/profile.php?id=61576697955087" class="button is-success is-large contact-btn" target="_blank">
        <span class="icon"><i class="fab fa-facebook"></i></span>
        <span>Facebook</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactView",
  mounted() {
    document.title = "Contacto | Finca Samaniego";
  }
};
</script>

<style scoped>
.contact-view {
  background: #221510;
  border-radius: 18px;
  box-shadow: 0 4px 18px rgba(72, 187, 120, 0.12);
  padding: 2.5rem 2rem;
  margin: 2rem auto;
  max-width: 600px;
}

.title {
  color: #66bb6a;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 2px rgba(46, 125, 50, 0.15);
}

.subtitle {
  color: #fff;
  font-weight: 500;
  margin-bottom: 2rem;
}

.contact-methods {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.contact-btn {
  border-radius: 24px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(72, 187, 120, 0.15);
  background: linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%);
  color: #fff;
  border: none;
  transition: background 0.3s, transform 0.2s;
}

.contact-btn:hover {
  background: linear-gradient(135deg, #388e3c 0%, #66bb6a 100%);
  transform: translateY(-2px);
  color: #fff;
}

.icon {
  margin-right: 0.5rem;
}
</style>