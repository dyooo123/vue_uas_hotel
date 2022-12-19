<template>
  <main>
    <v-container fluid fill-height class="background">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm6 elevation-6>
         

          <v-card flex >
            <v-window v-model="step">
              <v-window-item :value="1"  style="display:flex; justify-content:center;">
                  <v-col cols="12" md="8" >
                    <v-card-text class="mt-8 mb-8" >
                      <h1
                        class="text-center text--accent-3 mb-12"
                        style="font-size:48px"
                        
                      >Register</h1>
                      <div class="text-center mt-4">
                        <v-btn @click="home" outlined >
                          <v-icon>mdi-home-variant</v-icon>
                          HOTELIN AJA
                        </v-btn>
                      </div>
                      <h4 class="text-center mt-4">Ensure your email for registration</h4>
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
                      " dark>REGISTER</v-btn>
                      <h3 class="text-center mt-4">Sudah Punya Akun?</h3>
                      <div class="text-center mt-3">
                        <v-btn @click="login" rounded color="brown accent-3" dark>LOGIN</v-btn>
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
          <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
            {{ error_message }}
          </v-snackbar>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

 <style>
 .background{
  background-image: url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
  height:100vh!important;
  background-size: cover;
  }
</style>

 <script>
export default {
  name: "Register",
  data() {
    return {
      load: false,
      snackbar: false,
      error_message: '',
      color: '',
      valid: false,
      name: '',
      nameRules: [(v) => !!v || "Nama tidak boleh kosong :("],
      nomorIdentitas: '',
      nomorIdentitasRules: [(v) => !!v || "Nomor identitas tidak boleh kosong :("],
      username: '',
      usernameRules: [(v) => !!v || "Username tidak boleh kosong :("],
      password: '',
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
          .post(this.$api + '/register', {
            name:this.name,
            nomorIdentitas:this.nomorIdentitas,
            username:this.username,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            // localStorage.setItem('id', response.data.user.id); //menyimpan id user yang sedang login
            // localStorage.setItem('token', response.data.access_token);
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
            // localStorage.removeItem('token');
            this.load = false;
          })
      }
    },
    login(){
      this.$router.push({
          name: "Login",
      });
    },
    home() {
      this.$router.push({
        name: "Home",
      });
    },
  },
};
</script> 

<style scoped>
.posisinya{
  text-align: center;
}
</style>