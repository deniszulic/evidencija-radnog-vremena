<template>
  <div>
    <div v-if="errormsg" class="alert alert-danger">
      {{ errormsg }}
    </div>
    <thead class="thead-dark">
      <td><button class="btn btn-dark" @click="back()">Reset</button></td>
      <td>Razdoblje</td>
      <td>Status</td>
      <td>Admin potvrda</td>
      <td></td>
    </thead>
    <tbody>
      <tr v-for="(a, index) in data" :key="a.id">
        <td class="">{{ index + 1 }}.</td>
        <td class="col-md-5">
          {{ moment(a.datum_obavljanja_pocetak).format("DD.MM.YYYY") }} -
          {{ moment(a.datum_obavljanja_kraj).format("DD.MM.YYYY") }}
        </td>
        <td class="col-md-2">
          <b v-if="a.zakljucano == false">Nije zaključano</b>
          <b v-else-if="a.zakljucano == null">Nije zaključano</b>
          <b v-else>Zaključano</b>
        </td>
        <td class="col-md-2">
          <b v-if="a.prihvaceno_od_admina == false" style="color: red"
            >Odbijeno</b
          >
          <b v-if="a.prihvaceno_od_admina == true" style="color: green"
            >Potvrđeno</b
          >
          <b v-if="a.prihvaceno_od_admina == null" style="color: #ff9900"
            >Čeka potvrdu</b
          >
          <b v-if="a.prihvaceno_od_admina == 'false'" style="color: red"
            >Odbijeno</b
          >
          <b v-if="a.prihvaceno_od_admina == 'true'" style="color: green"
            >Potvrđeno</b
          >
          <b v-if="a.prihvaceno_od_admina == 'null'" style="color: #ff9900"
            >Čeka potvrdu</b
          >
        </td>
        <td class="col-md-2">
          <button class="btn btn-light" @click="download(a)">
            <img
              src="../../assets/pdficon.svg"
              width="20%"
              height="20%"
            />
          </button>
        </td>
        <td class="col-md-1">
          <button type="button" class="btn btn-warning" @click="update(a)">
            Ažuriraj podatke
          </button>
        </td>
      </tr>
    </tbody>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Uređivanje</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="close()"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Prihvati ili odbij unesene podatke</p>
            <div class="btn btn-success p-3 border">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios1"
                id="exampleRadios3"
                value="true"
                v-model="prihvaceno_od_admina"
              />
              <label class="form-check-label" for="exampleRadios3">
                Prihvati
              </label>
            </div>
            <div class="btn btn-danger p-3 border">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios1"
                id="exampleRadios4"
                value="false"
                v-model="prihvaceno_od_admina"
              />
              <label class="form-check-label" for="exampleRadios4">
                Odbij
              </label>
            </div>
            <br />
            <textarea
              class="form-control"
              v-model="razlog_admin"
              placeholder="Razlog/napomena"
            />
            <hr />
            Datum obavljanja početak:<br />
            <input type="date" v-model="datump" /><br /><br />Datum obavljanja
            kraj:<br /><input type="date" v-model="datumk" /><br /><br />
            Broj sati:<input type="text" v-model="brsati" />
            <br />Prekovremeni:<input
              type="text"
              v-model="prekovremeni"
            /><br />Rad od kuće:
            <select v-model="rad_od_kuce" id="inputState" class="form-control">
              <option>DA</option>
              <option>NE</option></select
            ><br />Odsutan:<input type="text" v-model="odsutan" /><br />Noćni
            rad:<input type="text" v-model="nocni_rad" /><br />Blagdan:<input
              type="text"
              v-model="blagdan"
            /><br />Napomena:<textarea
              class="form-control"
              v-model="napomena"
            /><br />
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios2"
                value="true"
                v-model="zakljucano"
              />
              <label class="form-check-label" for="exampleRadios2">
                Zaključano
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios2"
                value="false"
                v-model="zakljucano"
              />
              <label class="form-check-label" for="exampleRadios2">
                Nije zaključano
              </label>
            </div>
            <br />
            <img id="image" class="img-thumbnail" :src="pic" />
          </div>
          <div class="modal-footer justify-content-between">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="deletedata()"
            >
              Obriši
            </button>
            <div>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click="close()"
              >
                Zatvori
              </button>
              <button
                type="submit"
                class="btn btn-success"
                @click="savechanges()"
              >
                Spremi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { dohvatpodataka } from "@/services";
import moment from "moment";
import store from "@/store.js";
import { Podaci } from "@/services";
import jsPDF from "jspdf";
import image from "../image";
export default {
  props: ["data"],
  data() {
    return {
      moment,
      store,
      datump: "",
      datumk: "",
      brsati: "",
      prekovremeni: "",
      rad_od_kuce: "",
      odsutan: "",
      nocni_rad: "",
      blagdan: "",
      napomena: "",
      id: "",
      pic: "",
      zakljucano: null,
      prihvaceno_od_admina: "",
      razlog_admin: "",
      errormsg: "",
      email: "",
    };
  },
  mounted() {
    var image = document.getElementById("image");
    if (image != null) {
      var modal = document.getElementById("exampleModal");
      modal.addEventListener("hidden.bs.modal", function () {
        image.src = "";
      });
    }
  },
  methods: {
    async back() {
      try {
        this.store.admindata1 = await dohvatpodataka.getalldata1();
      } catch (e) {
        this.errormsg = e.message;
      }
      this.store.open = false;
    },
    encode(input) {
      var keyStr =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;

      while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN;
        chr3 = i < input.length ? input[i++] : Number.NaN;

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output +=
          keyStr.charAt(enc1) +
          keyStr.charAt(enc2) +
          keyStr.charAt(enc3) +
          keyStr.charAt(enc4);
      }
      return output;
    },
    update(data) {
      this.id = data.id;
      this.datump = new Date(data.datum_obavljanja_pocetak)
        .toISOString()
        .slice(0, 10);
      this.datumk = new Date(data.datum_obavljanja_kraj)
        .toISOString()
        .slice(0, 10);
      (this.brsati = data.br_sati), (this.prekovremeni = data.prekovremeni);
      this.rad_od_kuce = data.rad_od_kuce;
      this.odsutan = data.odsutan;
      this.nocni_rad = data.nocni_rad;
      this.blagdan = data.blagdan;
      this.napomena = data.napomena;
      this.prihvaceno_od_admina = data.prihvaceno_od_admina;
      this.razlog_admin = data.razlog_admin;
      this.email = data.email;
      if (data.zakljucano == null) {
        this.zakljucano = false;
      }
      if (data.zakljucano != null) {
        this.zakljucano = data.zakljucano;
      }
      if (data.img != null) {
        var arrayBuffer = data.img.__ob__.value.data;
        var bytes = new Uint8Array(arrayBuffer);

        var image = document.getElementById("image");
        image.src = "data:image/png;base64," + this.encode(bytes);
      } else {
        this.pic = "";
      }
      $("#exampleModal").modal("show");
    },
    async deletedata() {
      try {
        await Podaci.deletespecificdata(this.id).then(() => {
          $("#exampleModal").modal("hide");
          for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id == this.id) {
              this.data.splice(i, 1);
              break;
            }
          }
        });
      } catch (e) {
        this.errormsg = e.message;
      }
    },
    close() {
      this.id = "";
      $("#exampleModal").modal("hide");
    },
    download(data) {
      var doc = new jsPDF();
      doc.addImage(image, "PNG", 0, 0);
      if (data.datum_obavljanja_pocetak != null) {
        doc.text(
          "Datum obavljanja pocetak: " +
            moment(data.datum_obavljanja_pocetak)
              .format("DD.MM.YYYY")
              .toString(),
          10,
          60
        );
      }
      if (data.datum_obavljanja_kraj) {
        doc.text(
          "Datum obavljanja kraj: " +
            moment(data.datum_obavljanja_kraj).format("DD.MM.YYYY").toString(),
          10,
          70
        );
      }
      if (data.br_sati != null) {
        doc.text("Broj sati: " + data.br_sati.toString(), 10, 80);
      }
      if (data.prekovremeni != null) {
        doc.text("Prekovremeni: " + data.prekovremeni.toString(), 10, 90);
      }
      if (data.rad_od_kuce != null) {
        doc.text("Rad od kuce: " + data.rad_od_kuce.toString(), 10, 100);
      }
      if (data.nocni_rad != null) {
        doc.text("Nocni rad: " + data.nocni_rad.toString(), 10, 110);
      }
      if (data.blagdan != null) {
        doc.text("Blagdan: " + data.blagdan.toString(), 10, 120);
      }
      if (data.napomena != null) {
        doc.text("Napomena: " + data.napomena.toString(), 10, 130);
      }
      if (data.odsutan != null) {
        doc.text("Odsutan: " + data.odsutan.toString(), 10, 140);
      }
      if (data.prihvaceno_od_admina == null) {
        doc.text("Prihvaceno od admina: Ceka potvrdu", 10, 150);
      }
      if (data.prihvaceno_od_admina == false) {
        doc.text("Prihvaceno od admina: Nije prihvaceno", 10, 150);
      }
      if (data.prihvaceno_od_admina == true) {
        doc.text("Prihvaceno od admina: Prihvaceno", 10, 150);
      }
      if (data.razlog_admin != null) {
        doc.text(
          "Razlog prihvacanja/odbijanja: " + data.razlog_admin.toString(),
          10,
          160
        );
      }
      if (data.img != null) {
        var arrayBuffer = data.img.__ob__.value.data;
        var bytes = new Uint8Array(arrayBuffer);
        let image = "data:image/png;base64," + this.encode(bytes);
        doc.addImage(image, "PNG", 50, 245, 100, 50);
      }
      doc.setLanguage("hr-HR");
      doc.save(Date.now() + ".pdf");
    },
    async savechanges() {
      if (this.zakljucano === "true") {
        this.zakljucano = true;
      }
      if (this.zakljucano === "false") {
        this.zakljucano = false;
      }
      let update = {
        datum_obavljanja_pocetak: this.datump,
        datum_obavljanja_kraj: this.datumk,
        br_sati: this.brsati,
        prekovremeni: this.prekovremeni,
        odsutan: this.odsutan,
        rad_od_kuce: this.rad_od_kuce,
        nocni_rad: this.nocni_rad,
        napomena: this.napomena,
        blagdan: this.blagdan,
        zakljucano: this.zakljucano,
        prihvaceno_od_admina: this.prihvaceno_od_admina,
        razlog_admin: this.razlog_admin,
        email: this.email,
      };
      try {
        await Podaci.updatemydata1(this.id, update)
          .then(() => {
            for (let [i, x] of this.data.entries()) {
              if (x.id == this.id) {
                x.datum_obavljanja_pocetak = update.datum_obavljanja_pocetak;
                x.datum_obavljanja_kraj = update.datum_obavljanja_kraj;
                x.br_sati = update.br_sati;
                x.prekovremeni = update.prekovremeni;
                x.odsutan = update.odsutan;
                x.rad_od_kuce = update.rad_od_kuce;
                x.nocni_rad = update.nocni_rad;
                x.napomena = update.napomena;
                x.blagdan = update.blagdan;
                x.razlog_admin = update.razlog_admin;
                x.prihvaceno_od_admina = update.prihvaceno_od_admina;
                if (update.zakljucano == false) {
                  this.data.splice(i, 1);
                }
                break;
              }
            }
          })
          .then(() => $("#exampleModal").modal("hide"));
      } catch (e) {
        this.errormsg = e.message;
      }
    },
  },
};
</script>