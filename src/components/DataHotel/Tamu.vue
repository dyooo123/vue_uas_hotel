<template>
  <v-main class="list" >
    <h3 class="text-h3 font-weight-medium mb-5" style=" color:#3C2317">DAFTAR TAMU</h3>
    
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="mb-5"
        ></v-text-field>

        <v-spacer></v-spacer>

        <v-btn color="brown lighten-1" dark @click="dialog = true"> Tambah </v-btn>

      </v-card-title>
      <v-data-table :headers="headers" :items="Tamus" :search="search" color="black">

        <template v-slot:[`item.id_kamar`]="{item}">
          <div v-if="item.id_kamar==1">VIP</div>
          <div v-if="item.id_kamar==2">Standard</div>
          <div v-if="item.id_kamar==3">Deluxe</div>
          <div v-if="item.id_kamar==4">Suite</div>
          <div v-if="item.id_kamar==5">Family</div>
        </template>

          <template v-slot:[`item.actions`]="{item}">
                <v-btn icon small class="mr-2" @click="editHandler(item)">
                  <v-icon color="green">mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon small @click="deleteHandler(item.id)">
                     <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
            </template>

        <!-- <template v-slot:[`item.actions`]="{ item }">
          <v-btn small class="mr-2" @click="editHandler(item)"> edit </v-btn>
          <v-btn small @click="deleteHandler(item.id)"> delete </v-btn>
        </template> -->
      </v-data-table>
    </v-card>
    
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card color="brown lighten-5">
        <v-card-title>
          <span class="headline" style="display:flex; justify-content:center;">{{formTitle}} tamu</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field v-model="form.nama_tamu" label="Nama Tamu" required></v-text-field>
            <v-text-field v-model="form.email" label="Email" required></v-text-field>
            <v-text-field v-model="form.jenis_kelamin" label="Jenis Kelamin" required></v-text-field>
            <v-text-field v-model="form.no_telp" label="Nomor Telepon" required></v-text-field>
            <v-text-field v-model="form.alamat" label="Alamat" required></v-text-field>
            <v-text-field v-model="form.tanggal_lahir" label="Tanggal Lahir" required></v-text-field>
            <v-text-field v-model="form.tgl_checkin" label="Tanggal Check In" required></v-text-field>
            <v-text-field v-model="form.tgl_checkout" label="Tanggal Check Out" required></v-text-field>
            <v-select return object :items="Kamars" item-value="id" label="Tipe kamar" item-text="tipe_kamar" v-mode="form.id_kamar" @change="select_value"></v-select>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="cancel"> Cancel </v-btn>
          <v-btn color="green" text @click="setForm"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card color="brown lighten-5">
        <v-card-title>
          <span class="headline">WARNING !</span>
        </v-card-title>
        <v-card-text> Anda yakin ingin menghapus tamu ini? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="brown darken-1" text @click="dialogConfirm = false">
            Cancel
          </v-btn>
          <v-btn color="red darken-1" text @click="deleteData"> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

       <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }} </v-snackbar>

  </v-main>
</template>


<script>
export default {
  name: "List",
  setup(){
    let kamars = ref([])
  }, 
  data() {
    return {
      inputType: 'Tambah',
      load: false,
      snackbar: false,
      error_message: '',
      color: '',
      search: null,
      dialog: false,
      dialogConfirm: false,
      headers: [
        { text: "Nama Tamu", align: "start", sortable: true, value: "nama_tamu"},
        { text: "Email", value: 'email'},
        { text: "Jenis Kelamin", value: 'jenis_kelamin'},
        { text: "Nomor Telepon", value: 'no_telp'},
        { text: "Alamat", value: 'alamat'},
        { text: "Tanggal Lahir", value: 'tanggal_lahir'},
        { text: "Tanggal Check In", value: 'tgl_checkin'},
        { text: "Tanggal Check Out", value: 'tgl_checkout'},
        { text: "Tipe Kamar", value: 'id_kamar'},
        { text: "Action", value:'actions'},
      ],
      tamu: new FormData,
      Tamus: [],
      Kamars: [],
      form:{
        nama_tamu: null,
        email: null,
        jenis_kelamin: null,
        no_telp: null,
        alamat: null,
        tanggal_lahir: null,
        tgl_checkin: null,
        tgl_checkout: null,

      },
      deleteId: '',
      editId: ''
    };
  },

  methods: {
    select_value(e) {
      this.form.id_kamar = e
    },
    setForm(){
      if(this.inputType !== 'Tambah'){
        this.update();
        this.resetForm();
      }
      else{
        this.save();
        this.resetForm();
      }
    },

    readData(){
      var url = this.$api + '/tamus';
      this.$http.get(url, {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.Tamus = response.data.data;
      })
    },
    readDataKamar(){
      var url = this.$api + '/kamars';
      this.$http.get(url, {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.Kamars = response.data.data;
      })
    },

    save(){
      this.tamu.append('nama_tamu',this.form.nama_tamu);
      this.tamu.append('email',this.form.email);
      this.tamu.append('jenis_kelamin',this.form.jenis_kelamin);
      this.tamu.append('no_telp', this.form.no_telp);
      this.tamu.append('alamat', this.form.alamat);
      this.tamu.append('tanggal_lahir', this.form.tanggal_lahir);
      this.tamu.append('tgl_checkin', this.form.tgl_checkin);
      this.tamu.append('tgl_checkout', this.form.tgl_checkout);
      this.tamu.append('id_kamar',this.form.id_kamar)
      var url= this.$api + '/tamus'
      this.load = true;
      this.$http.post(url, this.tamu, {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        }
      }).then(response => {
        this.error_message = response.data.message;
        this.color = "green";
        this.snackbar = true;
        this.load = true;
        this.close();
        this.readData();
        this.resetForm();
      }).catch(error => {
        this.error_message = error.response.data.message;
        this.color = "red";
        this.snackbar = true;
        this.load = false;
      });
    },

    update(){
      let newData = {
        nama_tamu : this.form.nama_tamu,
        email : this.form.email,
        jenis_kelamin : this.form.jenis_kelamin,
        no_telp: this.form.no_telp,
        alamat: this.form.alamat,
        tanggal_lahir: this.form.tanggal_lahir,
        tgl_checkin: this.form.tgl_checkin,
        tgl_checkout: this.form.tgl_checkout,
        id_kamar: this.form.id_kamar,
      };
      var url = this.$api + '/tamus/' + this.editId;
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
        this.close();
        this.readData();
        this.resetForm();
        this.inputType = 'Tambah';
      }).catch(error => {
        this.error_message = error.response.data.message;
        this.color = 'red';
        this.snackbar = true;
        this.load = false;
      });
    },

    deleteData() {
      //mengahapus data
      var url = this.$api + '/tamus/' + this.deleteId;
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

    editHandler(item){
      this.inputType = 'Ubah';
      this.editId = item.id;
      this.form.nama_tamu = item.nama_tamu;
      this.form.email = item.email;
      this.form.jenis_kelamin = item.jenis_kelamin;
      this.form.no_telp = item.no_telp;
      this.form.alamat = item.alamat,
      this.form.tanggal_lahir = item.tanggal_lahir,
      this.form.tgl_checkin = item.tgl_checkin,
      this.form.tgl_checkout = item.tgl_checkout,
      this.form.id_kamar = item.id_kamar,
      this.dialog = true;
    },

    deleteHandler(id) {
      this.deleteId = id;
      this.dialogConfirm = true;
    },
    close() {
      this.dialog = false;
      this.inputType = "Tambah";
      this.dialogConfirm = false;
      this.readData();
    },
    cancel() {
      this.resetForm();
      this.readData();
      this.dialog = false;
      this.dialogConfirm = false;
      this.inputType = "Tambah";
    },
    resetForm() {
      this.form = {
        nama_tamu: null,
        email: null,
        jenis_kelamin: null,
        no_telp: null,
        alamat: null,
        tanggal_lahir: null,
        tgl_checkin: null,
        tgl_checkout: null,
        id_kamar: null
      };
    },
  },
  computed: {
    formTitle() {
      return this.inputType;
    },
  },
  mounted() {
    this.readData();
    this.readDataKamar();
  },
};
</script>

<style>

</style>