<template>
  <div>
    <div>
      <v-switch v-model="dark" @click="darkMode" style="margin-left: 10px">
        <template v-slot:label>
          <v-list-item-title class="mr-2"
            >Modo Escuro</v-list-item-title
          >
        </template>
      </v-switch>
    </div>
  </div>
</template>
<script>
export default {
  computed:{
    dark:{
        get()
        {
            return this.$vuetify.theme.dark
        },
        set(value)
        {
            return value
        }
    }
  },
  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark", this.$vuetify.theme.dark.toString());
      this.theme = this.$vuetify.theme.dark
    },
  },
  created() {
    let theme = localStorage.getItem("dark");
    if (theme) {
      if (theme == "true") {
        this.$vuetify.theme.dark = true;
      } else this.$vuetify.theme.dark = false;
    }
  },
};
</script>
