<template>
  <div>
    <div v-if="errormsg" class="alert alert-danger">
      {{ errormsg }}
    </div>
    <div class="container">
      <br />

      <div class="container px-4">
        <div class="row gx-5">
          <div class="col">
            <div class="p-3 border bg-light">
              <h1>Promijeni svoje podatke</h1>
              <div class="form-group">
                <label for="exampleInputname">Ime</label><br />
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputname"
                  aria-describedby="name"
                  placeholder="Ime"
                  v-model="ime"
                />
              </div>
              <div class="form-group">
                <label for="surname">Prezime</label><br />
                <input
                  type="text"
                  class="form-control"
                  id="surname"
                  aria-describedby="surname"
                  placeholder="Prezime"
                  v-model="prezime"
                />
              </div>
              <div class="form-group">
                <label for="dateregistration">Datum registracije</label><br />
                <input
                  type="text"
                  class="form-control"
                  id="dateregistration"
                  aria-describedby="dateregistration"
                  placeholder="Datum registracije"
                  v-model="datumreg"
                  disabled
                />
              </div>
              <button
                type="button"
                class="btn btn-primary"
                @click="updatedata()"
              >
                Spremi promjene</button
              ><br />
              <hr />
              <div class="form-group">
                <label for="changepass">Promijeni šifru</label><br />
                <input
                  type="password"
                  class="form-control"
                  id="changepass"
                  aria-describedby="changepass"
                  placeholder="Nova lozinka"
                  v-model="changepassword"
                />
              </div>
              <br />
              <button
                type="button"
                class="btn btn-primary"
                @click="updatepassword()"
              >
                Spremi novu lozinku
              </button>
            </div>
          </div>
          <div class="col">
            <div class="p-3 border bg-light">
              <h1>Dodaj admina</h1>
              <form @submit.prevent="addadmin">
                <div class="form-group">
                  <label for="exampleInputname1">Ime</label><br />
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputname1"
                    aria-describedby="name1"
                    placeholder="Ime"
                    v-model="ime1"
                  />
                </div>
                <div class="form-group">
                  <label for="surname1">Prezime</label><br />
                  <input
                    type="text"
                    class="form-control"
                    id="surname1"
                    aria-describedby="surname1"
                    placeholder="Prezime"
                    v-model="prezime1"
                  />
                </div>
                <br />
                <div class="form-group">
                  <label for="exampleInputEmail1">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="email"
                    v-model="email"
                    required
                  />
                </div>
                <br />
                <div class="form-group">
                  <label for="exampleInputPassword11">Password</label><br />
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword11"
                    placeholder="Lozinka"
                    v-model="password"
                    required
                  />
                </div>
                <br />
                <button type="submit" class="btn btn-primary">Dodaj</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="modal" tabindex="-1" id="successmodalic">
        <div class="modal-dialog">
          <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Akcija uspješno izvršena !</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { dohvatpodataka } from "@/services";
import { azuriraj } from "@/services";
import { Auth } from "@/services";
import moment from "moment";
import { Registracija } from "@/services";
export default {
  name: "adminprofil",
  data() {
    return {
      adminmydata: [],
      ime: "",
      prezime: "",
      datumreg: "",
      email: "",
      password: "",
      ime1: "",
      prezime1: "",
      changepassword: "",
      errormsg: "",
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    async fetchData() {
      try {
        this.adminmydata = await dohvatpodataka.getadminmydata(Auth.state.id);
      } catch (e) {
        this.errormsg = e.message;
      }
      this.ime = this.adminmydata[0].ime;
      this.prezime = this.adminmydata[0].prezime;
      this.datumreg = moment(parseInt(this.adminmydata[0].datumreg)).format(
        "DD.MM.YYYY"
      );
    },
    async updatedata() {
      let update = {
        ime: this.ime,
        prezime: this.prezime,
      };
      try {
        await azuriraj.updateadmindata(Auth.state.id, update).then(() => {
          $("#successmodalic").modal("show");
        });
      } catch (e) {
        this.errormsg = e.message;
      }
    },
    async addadmin() {
      let a = {
        ime: this.ime1,
        prezime: this.prezime1,
        email: this.email,
        lozinka: this.password.toString(),
        admin: true,
        datumReg: Date.now(),
      };
      try {
        await Registracija.register(a).then(() => {
          this.ime1 = "";
          this.prezime1 = "";
          this.email = "";
          this.password = "";
          $("#successmodalic").modal("show");
        });
      } catch (error) {
        this.errormsg = error.message;
      }
    },
    async updatepassword() {
      let update = {
        lozinka: this.changepassword,
      };
      try {
        await azuriraj.updateadminpass(Auth.state.id, update).then(() => {
          this.changepassword = "";
          $("#successmodalic").modal("show");
        });
      } catch (e) {
        this.errormsg = e.message;
      }
    },
  },
};
</script>