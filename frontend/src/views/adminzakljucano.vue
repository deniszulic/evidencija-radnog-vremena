<template>
    <div v-if="store.state==true">
        <h1>Podaci koje korisnik je zaključao</h1>
        <!-- <admintablica :data="podaci"/> -->
        <table v-if="!store.open">
  <tr>
    <th>Email</th>
  </tr>
  <tr v-for="a in store.admindata1" :key="a.email"  >
    <td>{{a.email}}</td>
    <td><button type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal" @click="details(a.email)">Detalji</button></td>
  </tr>
</table>
<table v-if="store.open">
<admintablica :data="data"/>
</table>
    </div>
</template>
<script>
import {dohvatpodataka} from '@/services'
import {Auth} from '@/services'
import admintablica from'@/components/admintablica.vue'
import store from "@/store.js";
export default {
    name:'adminzakljucano',
    components:{
        admintablica
    },
    data(){
        return{
            podaci:[],
            data:[],
            store
        }
    },
    created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  methods:{
    async fetchData(){
      this.store.admindata1=await dohvatpodataka.getalldata1()
    },
    async details(data){
        //console.log(data)
        //let a=data.email
        this.data=await dohvatpodataka.getlockeddatabyemail1(data)
        this.store.open=true;
        //console.log(this.data)
    }
  }
}
</script>