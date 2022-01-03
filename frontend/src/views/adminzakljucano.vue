<template>
    <div v-if="store.state==true">
        <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item">Admin</li>
    <li class="breadcrumb-item active" aria-current="page">Zaključani sati</li>
  </ol>
</nav>
<div v-if="errormsg" class="alert alert-danger">
{{errormsg}}
</div>
<div class="row">

<div class="card col-4">
  <h5 class="card-header"><input type="text" v-model="search" placeholder="Pretraži po emailu" style="background:white;" /></h5>
  <div class="card-body" v-for="a in filtrirano" :key="a.email">
    
<button type="button"
              class="btn btn-light"
              data-toggle="modal"
              data-target="#exampleModal" @click="details(a.email)">{{a.email}}</button>
  </div>

</div>

<div class="card col-sm">
  <div class="card-body">
    <table v-if="store.open">
<admintablica :data="data"/>
</table>
  </div>
</div>

</div>

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