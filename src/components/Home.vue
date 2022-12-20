<template>
  <v-main >
   <img class="img" src="https://i.postimg.cc/XN2YCwVk/wp6957360-hotel-room-wallpapers.jpg" alt="Gambar Home" style="width: 100%; opacity:10;"/>
   <div class="overlay"></div>
   <div class="text-left hero-content" style="color: #fff;">
     <h1 style="color:#F9EBC8; font-size:64px; letter-spacing:4px" >HOTELIN AJA</h1>
     <br />
     <h4 style="color:#F9EBC8; font-size:24px; text-align: center; margin-top: -40px;">Pesan Hotel? HOTELIN AJA</h4>

    </div>
    <div class="button-container mt-3">
      <span class="mr-n10"></span>
        <v-btn @click="login" :x-large="$vuetify.breakpoint.smAndUp"  color="brown darken-5 "  class="my-200 mx-5 " 
          >Login</v-btn
        >  
        <span class=""></span>
        <v-btn @click="register" :x-large="$vuetify.breakpoint.smAndUp" color="brown lighten-3
        "  bold class="my-3"
          >Register</v-btn
        >     
    </div>

   <v-footer class="foot"
   dark
   padless
   color="black"
 >
   <v-card
     flat
     tile
     class="brown darken-2

     1 white--text text-center"
   >
  
   <v-btn color="brown darken-1" class="mt-3" >
    <v-icon color="white">mdi-home-variant</v-icon>
    HOTELIN AJA
  </v-btn>     
  <v-card-text class="white--text pt-0 mt-5 mb-5">
      Hotelin Aja menyediakan tempat penginapan bagi anda yang sedang melakukan perjalanan ke luar kota maupun yang sedang liburan. Hotelin Aja Menawarkan anda Hotel dengan fasilitas yang sangat lengkap sehingga menginap serasa dirumah. Hotelin Aja, We Bring Home To You!
     </v-card-text>

     <v-card_text class="mb-1">Contact</v-card_text>
     <v-card-text class="white--text mt-1">
      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-4 white--text"
        icon
      >
        <v-icon size="24px">
          {{ icon }}
        </v-icon>
      </v-btn>
    </v-card-text>

     <v-divider></v-divider>

     <v-card-text class="white--text">
       {{ new Date().getFullYear() }} — <strong>Created By:</strong>
     </v-card-text>
     <v-card-text class="white--text">
      Kelompok A | Aldyo Putra | Gregorius Addo Yodhapratam | Ignatius Sodhana Tebri Artanto | Jeremy Kevin Marwanto
     </v-card-text>
   </v-card>
 </v-footer>
  
 </v-main>
</template>


<script>
export default {
 name: "Home",
 data() {
   return {
     icons: [
       'mdi-facebook',
       'mdi-twitter',
       'mdi-linkedin',
       'mdi-instagram',
     ],
     
   }
 },
 methods: {
   register(){
     this.$router.push({
         name: "Register",
     });
   },
   login(){
     this.$router.push({
         name: "Login",
     });
   },
   contact(){
     this.$router.push({
       name: "Contact",
     })
   }
 }
 }

</script>

<style>

.button-container {
  position: absolute;
  z-index: 999;
  top: 0;
  right: 20px;
}
.hero-content {
  position: absolute;
  z-index: 999;
  top: 35%;
  left: 30%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.overlay {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
}
.gradient-fill .v-responsive__content {
 background: rgb(0, 0, 0);
 background: linear-gradient(
   to right,
   rgba(3, 12, 41, 0.75),
   rgba(5, 11, 31, 0.65)
 );
}

.img{
 height: 100vh;
 background-size: cover;
}

.foot{
 margin-bottom: 5px;
}


</style>
