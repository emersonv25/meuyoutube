<template>
  <v-container>
    <v-row v-if="videos_search.length > 0">
      <v-col cols="12" v-for="i in videos_search" :key="i.id">
        <v-card class="mx-auto" max-width="1080" outlined>
          <v-list-item :to="'/play/' + i.id">
            <v-list-item-avatar tile width="300" height="200">
              <v-img
                :src="i.thumb"
                :aspect-ratio="16/9"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content class="align-self-start">
              <v-list-item-title class="title">{{i.titulo}}</v-list-item-title>
              <div class="text-sm-body-2">{{i.visualizacoes ? i.visualizacoes : 0}} visualizações</div>

              <v-list-item>
                  <v-list-item-avatar tile>
                      <v-icon large>mdi-account-circle</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content class="align-self-start">
                      <v-list-item-title class="title">{{i.autor.nomeAutor}}</v-list-item-title>
                      </v-list-item-content>
                </v-list-item>
                <div class="pl-16">
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