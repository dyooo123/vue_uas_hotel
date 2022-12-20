<template>
  <v-main class="list">
    <h3 class="text-h3 font-weight-medium mb-5" style=" color:#3C2317">PROFILE</h3>


    <v-card
    class="mx-auto"
    max-width="350">
      <v-card-text>
        <v-img
          max-height="260"
          lazy-src="https://picsum.photos/id/11/10/6"
          src="https://static.vecteezy.com/system/resources/thumbnails/008/302/417/small_2x/eps10-brown-user-solid-icon-or-logo-in-simple-flat-trendy-modern-style-isolated-on-white-background-free-vector.jpg"
        ></v-img>
        <v-divider class="mx-4"></v-divider>
        <h2 style="color:#3C2317" class="mt-6"> Nama:</h2>
        <p style="color:#3C2317" class="mb-5">{{user.name}}</p>
        <h2 style="color:#3C2317" class="mb-0"> Email:</h2>
        <p style="color:#3C2317" >{{user.email}}</p>
        <v-spacer></v-spacer>
        <v-btn color="brown lighten-2" class="mb-6" @click="dialogEdit = true">Edit</v-btn>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialogEdit"  persistent max-width="600px"
    max-height="170" class="mb-5" >
    <v-card color="brown lighten-5">
      <v-card-title>Edit Profile</v-card-title>
      <v-card-text>
        <v-text-field label="Nama" v-model="user.name" required>{{user.name}}</v-text-field>
        <v-text-field label="E-mail" v-model="user.email" required></v-text-field>
        <v-text-field type="password" label="Password" v-model="user.password" required></v-text-field>

        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="brown lighten-1" class="mr-5" @click="dialogEdit = false">Cancel</v-btn>
        <v-btn color="green" @click="update"> Save </v-btn>
      </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>

    

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card color="brown lighten-5">
        <v-card-title>
          <span class="headline">WARNING!</span>
        </v-card-title>
        <v-card-text bold> Anda yakin ingin menghapus pengguna ini? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="brown darken-1" text @click="dialogConfirm = false">
            Cancel
          </v-btn>
          <v-btn color="red darken-1" text @click="deleteData"> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
      {{ error_message }}
    </v-snackbar>
  </v-main>
</template>
<script>
export default {
  name: "List",
  data() {
    return {
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      search: null,
      dialog: false,
      dialogConfirm: false,
      dialogEdit:false,
      showPreview: false,
      formUser: new FormData(),
      
      user : [],
      editId: localStorage.getItem("id"),
      deleteId: localStorage.getItem("id"),
    };
  },
  methods: {
    //read data product
    readData() {
      
      this.$http.get(this.$api + '/profile',{
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
      }).then(response => {
        this.user = response.data.data;
      }).catch(error => {
        console.log(error)
      })  
    },

    update() {
      let newData = {
        name : this.user.name,
        email : this.user.email,
        password : this.user.password
      };
      var url = this.$api + '/profile';
      this.load = true;
      this.$http.put(url, newData, {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.error_message = response.data.message;
        this.color = 'green';
        this.snackbar = true;
        this.load = false;
        // this.readData();
        // this.resetForm();
        this.inputType = 'Tambah';
        this.$router.push({
              name: "Dashboard",
        });
      }).catch(error => {
        this.error_message = error.response.data.message;
        this.color = 'red';
        this.snackbar = true;
        this.load = false;
      });          
    },
    hapusAkun(id){
      this.deleteId = id;
      this.dialogConfirm = true;
    },
    deleteData() {
      //mengahapus data
      var url = this.$api + '/profile/' + this.deleteId;
      //data dihapus berdasarkan id
      this.$http.delete(url, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.close();
          this.readData(); //mengambil data
          this.resetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
  },
  mounted() {
    this.readData();
  },
};
</script> 