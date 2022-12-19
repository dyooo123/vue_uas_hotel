<template>
  <v-main >
   <img class="img" src="https://i.postimg.cc/XN2YCwVk/wp6957360-hotel-room-wallpapers.jpg" alt="Gambar Home" style="width: 100%"/>
   <div class="text-left" style="color: #fff; position: absolute; top: 30%; left: 20%; right: 20%">
     <h1 style="color:#3C2317">HOTELIN AJA</h1>
     <br />
     <h4 style="color:#3C2317">Pesan Hotel? HOTELIN AJA</h4>

     <v-container>
       <span class="mr-n10"></span>
         <v-btn @click="login" :x-large="$vuetify.breakpoint.smAndUp"  color="brown lighten-4 "  class="my-200 mx-5 " 
           >Login</v-btn
         >  
         <span class=""></span>
         <v-btn @click="register" :x-large="$vuetify.breakpoint.smAndUp" color="brown darken-1
         "  bold class="my-3"
           >Register</v-btn
         >     
       </v-container>
   </div>

   <v-footer class="foot"
   dark
   padless
   color="black"
 >
   <v-card
     flat
     tile
     class="brown darken-3

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
.gradient-fill .v-responsive__content {
 background: rgb(0, 0, 0);
 background: linear-gradient(
   to right,
   rgba(3, 12, 41, 0.75),
   rgba(5, 11, 31, 0.65)
 );
}

.img{
 height: 900px;
}

.foot{
 margin-bottom: 5px;
}


</style>
