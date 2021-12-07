<template>
    <v-container>
        <v-row v-if="video_play">
            <v-col cols="12">
                <v-card-actions class="align-end justify-left">
                    <video :src="video_play.URL" controls preload="auto" style="max-width: 1080px; width: 100%; max-height: 600px"></video>
                </v-card-actions>
                <v-card-title class="align-end justify-left">{{video_play.titulo}}</v-card-title>
                <v-card-subtitle>{{video_play.visualizacoes}} visualizações</v-card-subtitle>
                <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
                <v-card class="mx-auto" flat>
                    <v-list-item >
                        <v-list-item-avatar tile>
                            <v-icon x-large>mdi-account-circle</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content class="align-self-start">
                            <v-list-item-title class="title">{{video_play.autor.nomeAutor}}</v-list-item-title>
                                <div>
                                    {{video_play.descricao}}
                                </div>
                            </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-divider></v-divider>
                <v-card-title>{{video_play.comentarios.length}} comentários</v-card-title>
                <v-card-actions><v-avatar><v-icon x-large>mdi-account-circle</v-icon></v-avatar> <v-text-field label="Adicionar um comentário público..." v-model="comentario" :disabled="!isLoggedIn">> </v-text-field></v-card-actions>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" :loading="loading" @click="comentar" :disabled="!isLoggedIn">COMENTAR</v-btn>
                    
                </v-card-actions>
            </v-col>
            <v-col cols="12" v-for="i in video_play.comentarios" :key="i.id">
                <v-card class="mx-auto" max-width="1080" outlined>
                    <v-list-item >
                        <v-list-item-avatar tile>
                            <v-icon x-large>mdi-account-circle</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content class="align-self-start">
                            <v-list-item-title class="title">{{i.nomeAutor}}</v-list-item-title>
                                <div>
                                    {{i.comentario}}
                                </div>
                            </v-list-item-content>
                    </v-list-item>
                </v-card>
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
        comentario: ""
    };
  },
  computed: {
      ...mapGetters(["isLoggedIn"]),
    ...mapGetters(["usuario"]),
    ...mapGetters(["videos"]),
    ...mapGetters(["video_play"]),
  },
  methods:{
      async comentar(){
          this.loading = true;
          await this.$store.dispatch('postComentario', {comentario: this.comentario, id: this.$route.params.id})
          await this.$store.dispatch('play', this.$route.params.id)
          this.comentario = ""
          this.loading = false;
      }
  },
  watch:{
    '$route' (to) {
      this.$store.dispatch('play', to.params.id)
    }
  },
    async beforeMount() {
        await this.$store.dispatch('play', this.$route.params.id)
    }
  
};
</script>