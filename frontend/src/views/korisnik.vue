<template>
  <div id="app" v-if="admin==false">

    <div v-if="errormsg" class="alert alert-danger">
{{errormsg}}
</div>
    <div class="jumbotron jumbotron-fluid"> <!-- v-if -->
  <div class="container">
    
<!-- <div class="alert alert-success" role="alert" v-if="locked.length==null">
  Svi sati su potpisani !
  </div> kaj ce ovo ? -->

        <div class="py-5 bg-image-full" style="object-fit: contain; background-image: url('https://images.unsplash.com/photo-1490724500206-cd5482e02b9e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')">
            <div style="height: 20rem"></div>
        </div>
      
</div>
  </div>
  <hr>

<div class="grey-bg container-fluid">
  <section id="minimal-statistics">
    <div class="row">
      <div class="col-12 mt-3 mb-1">
        <h4 class="text-uppercase">Statistika rada [ {{ime}} ] </h4>
        <p>Statistika profila </p><div class="col-4 alert alert-danger" role="alert" v-if="locked.length!=null">
  Imate nepotpisanih sati !
</div>
        
      </div>
    </div>
    <div class="row">
      <div class="col-xl-3 col-sm-6 col-12"> 
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex">
                <div class="align-self-center">
                  <i class="icon-clock primary font-large-2 float-left"></i>
                </div>
                <div class="media-body" style="margin-left:50px;">
                  <h3>{{prekovremeni}} h</h3>
                  <span>Prekovremeni</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-sm-6 col-12">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex">
                <div class="align-self-center">
                  <i class="icon-calendar warning font-large-2 float-left"></i>
                </div>
                <div class="media-body" style="margin-left:50px;">
                  <h3>{{blagdan}} h</h3>
                  <span>Rad blagdanom</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-sm-6 col-12">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex">
                <div class="align-self-center">
                  <i class="icon-cup success font-large-2" style="float:left;"></i>
                </div>
                <div class="media-body" style="float:right; margin-left:50px;">
                  <h3>{{nocni_rad}} h</h3>
                  <span>Noćni rad</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-sm-6 col-12">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <div class="media d-flex">
                <div class="align-self-center">
                  <i class="icon-calendar danger font-large-2 float-left"></i>
                </div>
                <div class="media-body" style="margin-left:50px;">
                  <h3>{{odsutan}} h</h3>
                  <span>Odsutnost</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  </section>
  
  <section id="stats-subtitle">

  <div class="row">
    <div class="col-xl-6 col-md-12">
      <div class="card overflow-hidden">
        <div class="card-content">
          <div class="card-body cleartfix">
            <div class="media align-items-stretch">
              <div class="align-self-center">
                <i class="icon-pencil primary font-large-2 mr-2 "></i>
              </div>
              <div class="media-body">
                <h4>Ukupno sati</h4>
                <span>Ukupan broj upisanih sati</span>
              </div>
              <div class="align-self-center">
                <h1>{{br_sati}} h</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-6 col-md-12">
      <div class="card">
        <div class="card-content">
          <div class="card-body cleartfix">
            <div class="media align-items-stretch">
              <div class="align-self-center">
                <i class="icon-graph warning font-large-2 mr-2"></i>
              </div>
              <div class="media-body">
                <h4>Ukupano rada</h4>
                <span>Ukupan broj radnih sati</span>
              </div>
              <div class="align-self-center"> 
                <h1>{{suma}} h</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  
</section>
</div>

</div>

</template>
<script>
import {dohvatpodataka} from '@/services'
import { Auth } from "@/services";
import userhomepage from '../components/userhomepage.vue';

export default{
  components: { userhomepage },
  name:'korisnik',
  data(){
    return{
      admin:Auth.state.admin,
      ime:Auth.state.name,
      mydata:[],
      locked:[],
      blagdan:'',
      br_sati:'',
      nocni_rad:'',
      odsutan:'',
      prekovremeni:'',
      errormsg:''
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    async fetchData(){
      try{
        this.mydata=await dohvatpodataka.getstatisticdata(Auth.state.id)
      }catch(e){
        this.errormsg=e.message
      }
        this.blagdan=this.mydata[0].blagdan;
        this.br_sati=this.mydata[0].br_sati;
        this.nocni_rad=this.mydata[0].nocni_rad
        this.odsutan=this.mydata[0].odsutan
        this.prekovremeni=this.mydata[0].prekovremeni
       try{
       this.locked=await dohvatpodataka.getlockeddatacheck(Auth.state.id)
      }catch(e){
        this.errormsg=e.message
      }
    }
},
computed:{
  suma:function(){
    return parseInt(this.blagdan)+parseInt(this.br_sati)+parseInt(this.nocni_rad)+parseInt(this.prekovremeni)
  }
}
}
</script>


<style>

</style>