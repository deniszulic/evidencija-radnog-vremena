<template>
  <div>
    <thead class="thead-dark">
      <td>#</td>
      <td>Razdoblje</td>
      <td>Broj sati</td>
      <td>Status</td>
      <td>Admin prihvatio?</td>
      <td>Komentar od admina</td>
      <td></td>
    </thead>
    <tr v-for="(a, index) in data" :key="a.id">
      <td class="col-md-1">{{ index + 1 }}.</td>
      <td class="col-md-2">
        {{ moment(a.datum_obavljanja_pocetak).format("DD.MM.YYYY") }} -
        {{ moment(a.datum_obavljanja_kraj).format("DD.MM.YYYY") }}
      </td>
      <td class="col-md-1">
        {{a.br_sati}}
      </td>
      <td class="col-md-1">
        <b>Zaključano</b>
      </td>
      <td v-if="a.prihvaceno_od_admina==true" class="col-md-2">Prihvaćeno</td>
      <td v-if="a.prihvaceno_od_admina==false" class="col-md-2">Nije prihvaćeno</td>
      <td v-if="a.prihvaceno_od_admina==null" class="col-md-2">Čeka potvrdu</td>
      <td class="col-md-3"><p id="text-admin">{{a.razlog_admin}}</p></td>
      <td class="col-md-2">
        <button class="btn btn-light" @click="download(a)">
          <img src="https://svgshare.com/i/d3E.svg" width="20%" height="20%" />
        </button>
      </td>
      <!-- <VueHtml2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="myPDF"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="800px"
        ref="html2Pdf"
    >
        <section slot="pdf-content">
            {{a.datum_obavljanja_pocetak}}
        </section>
    </VueHtml2pdf> -->
    </tr>
  </div>
</template>
<script>
import moment from "moment";
import jsPDF from "jspdf";
import image from '@/image.js'
//import NotoSans-Regular-normal from 'NotoSans-Regular-normal.js';
//import VueHtml2pdf from 'vue-html2pdf'
export default {
  props: ["data"],
  components: {
    //VueHtml2pdf
  },
  data() {
    return {
      moment,
    };
  },
  methods: {
    /* generateReport () {
            this.$refs.html2Pdf.generatePdf()
        }*/
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
      if (data.img != null) {
        /*var imgData = 'data:image/jpeg;base64,'+ Base64.encode(data.img);
doc.addImage(imgData, 'JPEG', 15, 40, 180, 160)*/
        var arrayBuffer = data.img.__ob__.value.data;
        var bytes = new Uint8Array(arrayBuffer);
        let image = "data:image/png;base64," + this.encode(bytes);
        //console.log(this.encode(bytes));
        doc.addImage(image, "PNG", 50, 245, 100, 50);
      }
      doc.setLanguage("hr-HR");
      doc.save(Date.now() + ".pdf");
    },
  },
};
</script>
<style>
#text-admin{
  font-size:1.5vw;
}
</style>