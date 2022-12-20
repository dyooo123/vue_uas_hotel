<template>
  <v-container fluid class="mt-12">
    <h3 class="text-h3 font-weight-medium mt-4 " style=" color:#3C2317">DASHBOARD</h3>

      <v-row>
          <v-col  v-for="card in cards"
          :cols="card.flex"
           cols="12" md="4">
              <v-card :Loading="loading" class="mx-auto my-12" max-width="374" color="brown lighten-5">
              <v-img
                  height="250px"
                  :src="card.src"
                  >
                  <v-card-title  color="deep-orange 
                  " v-text="card.title"></v-card-title>
                </v-img>

                  <v-card-title><strong>Hotelin Aja </strong></v-card-title>

                  <v-card-text>
                      <v-row align="center" class="mx-0">
                     
                      </v-row>

                      <div class="my-4 text-subtitle-1">
                          Jadikan tempat menginap anda nyaman dan aman dengan Hotelin Aja!
                      </div>
                  </v-card-text>

                      <v-divider class="mx-4"></v-divider>

                      <v-car-title>Jenis Kamar</v-car-title>
                      
                      <v-card-text>
                          <v-chip-group
                              v-model="selection"
                              active-class="brown lighten-1
                              accent-4 white--text"
                          >
                              <v-chip>Kamar VIP</v-chip>
                              <v-chip>Kamar Deluxe</v-chip>
                              <v-chip>Kamar Suite</v-chip>
                          </v-chip-group>
                      </v-card-text>

                          <v-btn @click="kamar" class="mb-5" color="brown lighten-1" >
                              BOOK NOW
                          </v-btn> 
                  </v-card>
              </v-col>
          </v-row>
  </v-container>
  </template>
  <script>
    export default {
      data: () => ({
        cards: [
        { src: 'https://static.thehoneycombers.com/wp-content/uploads/sites/2/2021/11/boutique-hotel-singapore-the-warehouse-hotel.png'},
        { src: 'https://cdn.mos.cms.futurecdn.net/q8DvM3VSkGCFuHy23utGtY-768-80.jpg.webp', flex: 6 },
        { src: 'https://www.kayak.co.uk/rimg/kimg/93/ee/72e469edb6008709.png?width=1366&height=768&crop=true', flex: 6 },
      ],
      }),
      methods:{
        kamar() {
      this.$router.push({
        name: "Kamar",
      });
    },
      }
    }
  </script>

  <style>
.wallpaper{
background-image: url('https://images4.alphacoders.com/900/900368.jpg');
height:100vh!important;
background-size: cover;
}
</style>