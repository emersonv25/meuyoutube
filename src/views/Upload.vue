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
              <v-btn color="primary" large type="submit" outlined>
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
        video_blob: "",
        thumb: "",
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
            if(this.video.size <= 100000000 && this.video.type == 'video/mp4'){
              this.loading = true
                //let thumb = await this.gerarThumbVideo(this.video);
                let formData = new FormData();
                formData.append('file', this.video)
                //formData.append('thumb', thumb)
                //console.log(formData.get('file'))
                //console.log(formData.get('thumb'))
                await this.$store.dispatch('upload', {titulo: this.titulo, descricao: this.descricao, file: formData})
                this.loading = false
            }
            else if(this.video.type != 'video/mp4')
            {
              alert('Só é permitido vídeos no formato: MP4')
            }
            else{
                alert('O arquivo "' + this.video.name + '" excedeu o limite de 100 Megabyte')
            }
        }
        else {
            this.$refs.formUpload.validate();
        }
      },
      gerarThumbVideo(file){
        return new Promise((resolve) => {
          const canvas = document.createElement("canvas");
          const video = document.createElement("video");

          // this is important
          video.autoplay = true;
          video.muted = true;
          video.src = URL.createObjectURL(file);

          video.onloadeddata = () => {
            let ctx = canvas.getContext("2d");

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            video.pause();
            let dataURI = canvas.toDataURL("image/png");

            return resolve(this.dataURItoBlob(dataURI));
          };
        });
      },
      dataURItoBlob(dataURI) {
          var binary = atob(dataURI.split(',')[1]);
          var array = [];
          for(var i = 0; i < binary.length; i++) {
              array.push(binary.charCodeAt(i));
          }
          return new Blob([new Uint8Array(array)], {type: 'image/png'}, {name: 'thumb'});
        }
      },
  beforeMount() {

  },
};
</script>