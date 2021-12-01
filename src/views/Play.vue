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
                <v-card-title class="align-end justify-left"><v-avatar><v-icon x-large>mdi-account-circle</v-icon></v-avatar><div style="padding: 10px">{{video_play.autor.nomeAutor}}</div></v-card-title>
                <v-card-text>{{video_play.descricao}}</v-card-text>
            </v-col>
            <v-col cols="12">
                <v-divider></v-divider>
                <v-card-actions><v-avatar><v-icon x-large>mdi-account-circle</v-icon></v-avatar> <v-text-field label="Adicionar um comentário público..." v-model="comentario"> </v-text-field></v-card-actions>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="sencondary" tex>CANCELAR</v-btn>
                    <v-btn color="primary">COMENTAR</v-btn>
                </v-card-actions>
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
    ...mapGetters(["usuario"]),
    ...mapGetters(["videos"]),
    ...mapGetters(["video_play"]),
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