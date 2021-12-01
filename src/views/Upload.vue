<template>
  <v-card
    class="mx-auto my-12"
    max-width="360"
    :loading="isLoading"
    style="margin-top: 150px !important"
  >
    <v-container>
      <v-row>
          <v-col cols="12"><div class="title"> <v-icon large style="padding: 10px">mdi-video</v-icon>Upload de vídeos</div></v-col>
        <v-col>
          <v-form
            ref="formUpload"
            class="login"
            @submit.prevent="upload"
            v-model="formValid"
          >
            <v-file-input
                accept="video/*"
                label="Selecione o vídeo"
                outlined
                v-model="video"
                :rules="rules.video"
            ></v-file-input>
            <v-text-field outlined name="titulo" label="Título do vídeo" v-model="titulo" :rules="rules.titulo">
            </v-text-field>
            <v-text-field outlined name="descricao" label="Descrição" v-model="descricao">
            </v-text-field>
            <v-card-actions>
                <v-card-tex v-if="loading">Enviando vídeo...</v-card-tex>
                <v-spacer></v-spacer>
              <v-btn color="primary" large type="submit" outlined :loading="loading">
                <v-icon>mdi-upload</v-icon> Enviar
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Upload",
  data() {
    return {
        titulo: "",
        descricao: "",
        video: [],
        loading: false,
        formValid: false,
        rules: {
            titulo: [(value) => !!value || "Digite um título."],
            video: [(value) => value.length != 0  || "Selecion um vídeo."],
      },
    };
  },
  computed: {
    ...mapGetters(['errorMsg']),
    ...mapGetters(['successMsg']),
    ...mapGetters(['isLoading']),
  },
  methods: {
      async upload(){
        if(this.formValid){
            if(this.video.size < 10000000000000){
              this.loading = true
                let formData = new FormData();
                formData.append('file', this.video)
                console.log(this.video)
                console.log(formData.get('file'))
                await this.$store.dispatch('upload', {titulo: this.titulo, descricao: this.descricao, file: formData})
                this.loading = false
            }
            else{
                alert('O arquivo "' + this.video.name + '" excedeu o limite de 100 Megabyte')
            }
        }
        else {
            this.$refs.formUpload.validate();
        }
      }
  },
  beforeMount() {

  },
};
</script>