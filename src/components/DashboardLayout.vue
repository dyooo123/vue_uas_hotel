<template>
  <div class="dashboard">
    <v-navigation-drawer v-model="drawer" class="fullheight" width="256" app color="brown lighten-4">

      <v-list-item >
        <v-list-item-content >
          <v-icon style="color:black">
            mdi-home
          </v-icon>
          <v-list-item-title class="title"> Hotelin Aja </v-list-item-title>
          <v-list-item-subtitle color="grey darken-3" class="subtitle"> We Bring Home To You! 
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      
      <v-divider color="black"></v-divider>
     
      <v-list >
        <v-list-item 
          v-for="item in items"
          :key="item.title"
          link
          tag="router-link"
          :to="item.to"
          color="brown darken-1

          "
        >
        <v-list-item-content>
            <v-icon color="black">{{item.icon}}</v-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>


    </v-navigation-drawer>
    <v-app-bar app fixed height="75px" color="brown lighten-2">
      <v-app-bar-nav-icon color = "black" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <VSpacer />
      <v-toolbar-items>
        <v-btn text router color = "red darken-2" @click = "btnLogout"><v-icon>mdi-logout</v-icon></v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <div class="fullheigh pa-5">
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
export default {
  name: "Dashboard",
  data() {
    return {
      drawer: true,
       items: [
        { title: "Dashboard", to: "/dashboard", icon: "mdi-view-dashboard"},
        { title: "Kamar", to: "/kamar",icon: "mdi-bed-king"},
        { title: "Tamu", to:"/tamu",icon:"mdi-account " },
        { title: "Karyawan", to:"/karyawan",icon:"mdi-account-group"},
        { title: "Profile", to: "/profile", icon: "mdi-account"},
      ],  
    };
  },
  methods: {
    btnProfile() {
      this.$router.push('/profile');
    },
    btnLogout() {
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      location.reload();
    },
  },
  computed: {
    loggedIn(){
      return localStorage.getItem("token") != null;
    },
    loggedinAdmin(){
      return localStorage.getItem("id") == "4";
    }
  }
};
</script>
<style scoped>
.fullheight {
  min-height: 100vh !important;
}
.router{
  text-decoration: none;
  color: black;
}

</style>