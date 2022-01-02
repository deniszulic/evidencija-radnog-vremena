<template>
  <div v-if="store.state==false">
    <div v-if="errormsg" class="alert alert-danger">
{{errormsg}}
</div>
    <div class="jumbotron">
  <h1 class="display-4">Zaključano</h1>
  <input type="text" v-model="search" placeholder="Pretraži po datumu početka"/>
  <hr>
</div>
    <!-- {{podaci}} -->
    <table class="table">
   <!-- <thead class="thead-dark">
      <td>#</td>
      <td>Razdoblje</td>
      <td>Status</td>
      <td></td>
  </thead>  -->
  <tbody>
     <!-- <tr v-for="(data,index) in podaci" :key="data.id" >
          
         <td class="">{{index+1}}. </td>
         <td class="col-md-7">{{moment(data.datum_obavljanja_pocetak).format("DD.MM.YYYY")}} - {{moment(data.datum_obavljanja_kraj).format("DD.MM.YYYY")}} </td>

          <td class="col-md-2">
            <b>Zaključano</b>
          </td>
<td class="col-md-1">
           <button class="btn btn-light" @click="generateReport()"><img src='https://svgshare.com/i/d3E.svg' width=20% height=20% /></button>
          </td>
        </tr>   -->
       <zakljucanotablica :data="podaci" :search="search"/>
  </tbody>
</table>




  </div>
</template>
<script>
import moment from "moment";
import {dohvatpodataka} from '@/services'
import {Auth} from '@/services'
import zakljucanotablica from'@/components/zakljucanotablica.vue'
import store from '@/store.js'
//import VueHtml2pdf from 'vue-html2pdf'
export default {
  name: "zakljucano",
  components:{
    zakljucanotablica,
    //VueHtml2pdf
  },
  data() {
    return {
      podaci: [],
      moment,
      store,
      errormsg:'',
      search:''
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  methods:{
    async fetchData(){
      try{
      this.podaci=await dohvatpodataka.getlockeddata(Auth.state.id)
      }catch(e){
        this.errormsg=e.message
      }
    },
    /*generateReport () {
            this.$refs.html2Pdf.generatePdf()
        }*/
  },
  filters: {
    moment: function (date) {
      return moment(date).format("MMMM");
    },
  }
};
</script>