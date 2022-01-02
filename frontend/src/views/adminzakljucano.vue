<template>
    <div v-if="store.state==true">
        <h1>Podaci koje korisnik je zaključao</h1>
        <input type="text" v-model="search" placeholder="Pretraži po emailu"/>
        <!-- <admintablica :data="podaci"/> -->
        <div v-if="errormsg" class="alert alert-danger">
{{errormsg}}
</div>
        <table v-if="!store.open">
  <tr>
    <th>Email</th>
  </tr>
  <tr v-for="a in filtrirano" :key="a.email"  >
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
            store,
            errormsg:'',
            search:''
        }
    },
    created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  computed:{
    filtrirano() {
      return this.store.admindata1.filter(post => {
        return post.email.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods:{
    async fetchData(){
      try{
      this.store.admindata1=await dohvatpodataka.getalldata1()
      }catch(e){
        this.errormsg=e.message
      }
    },
    async details(data){
        //console.log(data)
        //let a=data.email
        try{
        this.data=await dohvatpodataka.getlockeddatabyemail1(data)
        }catch(e){
          this.errormsg=e.message
        }
        this.store.open=true;
        //console.log(this.data)
    }
  }
}
</script>