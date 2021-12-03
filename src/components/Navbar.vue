<template>
  <div>
    <v-app-bar app height="60" flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        v-on:keyup.13="pesquisar"
        solo
        dense
        flat
        hide-details
        label="Pesquisar"
        style="width: 10%; 
        border-width: 1px; border-radius: 0px;
        border-style: solid;
        border-color: rgb(49,49,49);"
      ></v-text-field>
      <v-btn depressed color="rgb(52,51,50) " dark class="rounded-0" height="40px" @click="pesquisar()"
        ><v-icon>mdi-magnify</v-icon></v-btn
      >
      <v-spacer></v-spacer>
      <v-divider vertical style="margin-right: 5px"></v-divider>
      <v-btn outlined to="upload" class="rounded-0"> <v-icon>mdi-video-plus</v-icon> Enviar</v-btn>
      <div class="d-flex" style="text-align: center" tile>
        <v-menu offset-y min-width="200px" rounded="0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon >mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
        <v-list>
          <Dark/>
        </v-list>
        </v-menu>
        <v-menu offset-y min-width="200px" rounded="0" v-if="isLoggedIn">
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" large>
              mdi-account-circle
            </v-icon>
          </template>
          <v-list>
            <v-list-item-title class="text-center">
              <v-icon size="35px">mdi-account-circle</v-icon>
            {{usuario.nome}}
            </v-list-item-title>
            <!--<v-list-item-subtitle class="text-center"> <a href="/#/perfil">Gerenciar sua Conta</a> </v-list-item-subtitle>!-->
            <v-divider></v-divider>
          </v-list>
        <v-list>
          <Logout/>
        </v-list>
        </v-menu>
      </div>
      <v-btn outlined color="primary" to="login" class="rounded-0" v-if="!isLoggedIn"> <v-icon>mdi-account-circle-outline</v-icon> Fazer Login</v-btn>
    </v-app-bar>
    <!-- SideBar !-->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      width="225"
      height="100%"
    >
      <v-card height="100%">
        <v-list-item style="padding-top: 10px">
           <v-icon size="30px">mdi-youtube</v-icon>
          <v-list-item-content> <v-list-item-title class="font-weight-bold">SnowVideos</v-list-item-title></v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list>
          <v-list-item-group v-for="(item, i) in items" :key="i">
            <v-list-item :to="item.rota">
              <v-icon>{{ item.icon }}</v-icon>
              <v-list-item-content style="margin-left: 15px">
                <v-list-item-content>{{ item.title }}</v-list-item-content>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Logout from "@/components/Logout.vue";
import Dark from "@/components/Dark.vue";
import { version } from "../../package";
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  components: {
    Logout,
    Dark,
  },
  data() {
    return {
      search: "",
      right: null,
      drawer: true,
      versao: version,
      items: [
        {
          title: "Início",
          icon: "mdi-home",
          rota: "/",
        },
        {
          title: "Seus vídeos",
          icon: "mdi-play-box-outline",
          rota: "/my",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["usuario"]),
    ...mapGetters(["isLoggedIn"]),
    ...mapGetters(["isAdmin"]),
    //isAdmin : function() {return this.$store.getters.isAdmin}
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods:{
    pesquisar(){
      if(this.search){
        this.$router.push('/pesquisar/' + this.search)
      }
      
    }
  }
};
</script>
