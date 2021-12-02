<template>
  <v-container>
    <v-row v-if="videos_search.length > 0">
      <v-col cols="12" v-for="i in videos_search" :key="i.id">
        <v-card class="mx-auto" max-width="1080" outlined>
          <v-list-item :to="'/play/' + i.id">
            <v-list-item-avatar tile width="300" height="200">
              <v-img
                src="https://d33v4339jhl8k0.cloudfront.net/docs/assets/591c8a010428634b4a33375c/images/5ab4866b2c7d3a56d8873f4c/file-MrylO8jADD.png"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content class="align-self-start">
              <v-list-item-title class="title">{{i.titulo}}</v-list-item-title>
              <div class="text-sm-body-2">{{i.visualizacoes ? i.visualizacoes : 0}} visualizações</div>

              <div class=""><v-avatar><v-icon>mdi-account-circle</v-icon></v-avatar>{{i.autor.nomeAutor}}</div>
              <div>
                {{i.descricao}}
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
        <v-col cols="12">
            <div>Nenhum vídeo encontrado</div>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["videos_search"]),
  },
  methods: {
    async getVideos() {
      this.loading = true;
      await this.$store.dispatch("getVideoPorNome", this.$route.params.nome);
      this.loading = false;
    },
  },
  watch: {
    $route(to) {

        this.$store.dispatch("getVideoPorNome", to.params.nome);

    },
  },
  async beforeMount() {

    await this.$store.dispatch("getVideoPorNome", this.$route.params.nome);

  },
};
</script>