<template>
    <div v-if="store.state==true">  <br>
<div v-if="errormsg" class="alert alert-danger">
{{errormsg}}
</div>
<div class="row">

<div class="card col-4">
  <h5 class="card-header"><input type="text" v-model="search" placeholder="Pretraži po emailu" style="background:white;" /></h5>
  <div class="" v-for="a in filtrirano" :key="a.email">
<br><button type="button"
              class="btn btn-light"
              data-toggle="modal"
              data-target="#exampleModal" @click="details(a.email)">{{a.email}}</button>
  </div>

</div>

<div class="card col-sm">
  <div class="card-body">
    <table v-if="store.open">
<admintablicaotkljucano :data="data"/>
</table>
  </div>
</div>

</div>
    </div>
</template>
<script>
import {dohvatpodataka} from '@/services'
import {Auth} from '@/services'
import admintablicaotkljucano from'@/components/admintablicaotkljucano.vue'
import store from "@/store.js";
export default {
    name:'admin',
    components:{
        admintablicaotkljucano
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
  computed:{
    filtrirano() {
      return this.store.admindata.filter(post => {
        return post.email.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  watch: {
    $route: "fetchData",
  },
  methods:{
    async fetchData(){
      try{
      this.store.admindata=await dohvatpodataka.getalldata()
      }catch(e){
        this.errormsg=e.message
      }
    },
    async details(data){
        //console.log(data)
        //let a=data.email
        try{
        this.data=await dohvatpodataka.getlockeddatabyemail(data)
        }catch(e){
          this.errormsg=e.message
        }
        this.store.open=true;
        //console.log(this.data)
    }
  }
}
</script>