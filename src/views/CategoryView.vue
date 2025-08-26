<template>
  <div class="page-category">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">{{ category.name }}</h2>
      </div>
      <ProductBox
        v-for="product in category.products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
import ProductBox from "@/components/ProductBox.vue";
export default {
  name: "CategoryView",
  data() {
    return {
      category: {
        products: [],
      },
    };
  },
  components: {
    ProductBox,
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    async getCategory() {
      const category_slug = this.$route.params.category_slug;
      this.$store.commit("setLoading", true);
      await axios
        .get(`api/product/${category_slug}/`)
        .then((response) => {
          this.category = response.data;
          document.title = this.category.name + " | Finca Samaniego"; // Set the page title
        })
        .catch((error) => {
          console.error("Error fetching category:", error);
          toast({
            message: "Error al cargar la categoría",
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
          });
        });
      this.$store.commit("setLoading", false);
    },
  },
};
</script>
