<template>
  <v-main class="list">
    <h3 class="text-h3 font-weight-medium mb-5" style=" color:#3C2317">DAFTAR KARYAWAN</h3>
    
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-spacer></v-spacer>

        <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>

      </v-card-title>
      <v-data-table :headers="headers" :items="Karyawans" :search="search">

          <template v-slot:[`item.actions`]="{item}">
                <v-btn icon small class="mr-2" @click="editHandler(item)">
                  <v-icon color="red">mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon small @click="deleteHandler(item.id)">
                     <v-icon color="green">mdi-delete</v-icon>
                </v-btn>
            </template>

        <!-- <template v-slot:[`item.actions`]="{ item }">
          <v-btn small class="mr-2" @click="editHandler(item)"> edit </v-btn>
          <v-btn small @click="deleteHandler(item.id)"> delete </v-btn>
        </template> -->
      </v-data-table>
    </v-card>
    
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{formTitle}} Karyawan</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field v-model="form.namaKaryawan" label="Nama Karyawan" required></v-text-field>
            <v-text-field v-model="form.jenisKelamin" label="Jenis Kelamin" required></v-text-field>
            <v-text-field v-model="form.alamat" label="Alamat" required></v-text-field>
            <v-text-field v-model="form.noTelp" label="Nomor Telepon" required></v-text-field>
            <v-text-field v-model="form.gaji" label="Gaji" required></v-text-field>
            
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="cancel"> Cancel </v-btn>
          <v-btn color="green darken-1" text @click="setForm"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">WARNING!!</span>
        </v-card-title>
        <v-card-text> Anda yakin ingin menghapus Karyawan ini? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogConfirm = false">
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
        { text: "Nama Karyawan", align: "start", sortable: true, value: "namaKaryawan"},
        { text: "Jenis Kelamin", value: 'jenisKelamin'},
        { text: "Alamat", value: 'alamat'},
        { text: "Nomor Telepon", value: 'noTelp'},
        { text: "Gaji", value: 'gaji'},
        { text: "Action", value:'actions'},
      ],
      karyawan: new FormData,
      Karyawans: [],
      form:{
        namaKaryawan: null,
        jenisKelamin: null,
        alamat: null,
        noTelp: null,
        gaji: null,
      },
      deleteId: '',
      editId: ''
    };
  },

  methods: {
    setForm(){
      if(this.inputType !== 'Tambah'){
        this.update();
      }
      else{
        this.save();
      }
    },

    readData(){
      var url = this.$api + '/karyawan';
      this.$http.get(url, {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.Karyawans = response.data.data;
      })
    },

    save(){
      this.karyawan.append('namaKaryawan',this.form.namaKaryawan);
      this.karyawan.append('jenisKelamin',this.form.jenisKelamin);
      this.karyawan.append('alamat',this.form.alamat);
      this.karyawan.append('noTelp', this.form.noTelp);
      this.karyawan.append('gaji', this.form.gaji);

      var url= this.$api + '/karyawan/'
      this.load = true;
      this.$http.post(url, this.karyawan, {
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
        namaKaryawan : this.form.namaKaryawan,
        jenisKelamin : this.form.jenisKelamin,
        alamat : this.form.alamat,
        noTelp: this.form.noTelp,
        gaji: this.form.gaji
      };
      var url = this.$api + '/karyawan/' + this.editId;
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
      var url = this.$api + '/karyawan/' + this.deleteId;
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
      this.form.namaKaryawan = item.namaKaryawan;
      this.form.jenisKelamin = item.jenisKelamin;
      this.form.alamat = item.alamat;
      this.form.noTelp = item.noTelp;
      this.form.gaji = item.gaji;
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
        namaKaryawan: null,
        jenisKelamin: null,
        alamat: null,
        noTelp: null,
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
  },
};
</script>