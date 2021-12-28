<template>
    <div>
        <h1>Admin</h1>
        <!-- <admintablica :data="podaci"/> -->
        <table v-if="!store.open">
  <tr>
    <th>Email</th>
  </tr>
  <tr v-for="a in podaci" :key="a.email"  >
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
    name:'admin',
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
      this.podaci=await dohvatpodataka.getalldata()
    },
    async details(data){
        //console.log(data)
        //let a=data.email
        this.data=await dohvatpodataka.getlockeddatabyemail(data)
        this.store.open=true;
        //console.log(this.data)
    }
  }
}
</script>