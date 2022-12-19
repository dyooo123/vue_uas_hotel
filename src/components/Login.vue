<template>
  <main>
    <v-content>
      <v-container fill-height class="wallpaper" fluid >
        <v-layout flex align-center justify-center>
        <v-flex xs12 sm6 >
            <v-card flex >
              <v-window v-model="step">
                <v-window-item :value="1"  style="display:flex; justify-content:center;">
                    <v-col cols="12" md="8" >
                      <v-card-text class="mt-8 mb-8" >
                        <h1
                          class="text-center text--accent-3 mb-12"
                          style="font-size:48px"
                          
                        >Sign in Hotelin Aja </h1>
                        <div class="text-center mt-4">
                          <v-btn @click="home" outlined >
                            <v-icon>mdi-home-variant</v-icon>
                            HOTELIN AJA
                          </v-btn>
                        </div>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>mdi-facebook</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>mdi-google</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>mdi-twitter</v-icon>
                          </v-btn>
                        </div>
                        <v-form>
                          
                          <v-text-field
                            label="Email"
                            name="Email"
                            type="text"
                            color="black accent-3"
                          >
                          </v-text-field>
                        
                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            color="black accent-3"
                            
                          />
                          
                        </v-form>
                        <v-btn rounded color="brown darken-4
                        " dark>LOGIN</v-btn>
                        <h3 class="text-center mt-4">Belum Punya Akun?</h3>
                        <div class="text-center mt-3">
                          <v-btn @click="register" rounded color="brown accent-3" dark>REGISTER</v-btn>
                        </div>
                      </v-card-text>
                    </v-col>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">

                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
        </v-flex>
      </v-layout>
      </v-container>
    </v-content>
  </main>
</template>

<script>
export default {
  name: "Login",
  components: {
    // SomeIcon,
  },
  data() {
    return {
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      valid: false,
      password: "",
      passwordRules: [(v) => !!v || "Password tidak boleh kosong :("],
      email: "",
      emailRules: [(v) => !!v || "E-mail tidak boleh kosong :("],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        //cek validasi data yang dikirim
        this.load = true;
        this.$http
          .post(this.$api + "/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            localStorage.setItem("id", response.data.user.id); //menyimpan id user yang sedang login
            localStorage.setItem("token", response.data.access_token);
            //menyimpan auth token
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.clear();
            this.$router.push({
              name: "Dashboard",
            });
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            localStorage.removeItem("token");
            this.load = false;
          });
      }
    },
    register() {
      this.$router.push({
        name: "Register",
      });
    },
    home() {
      this.$router.push({
        name: "Home",
      });
    },
    showVerified() {
      if (this.$route.query.verified == "success") {
        this.success = true;
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    this.showVerified();
  },
};
</script> 

<style>
.wallpaper{
background-image: url('https://images4.alphacoders.com/900/900368.jpg');
height:100vh!important;
background-size: cover;
}
</style>