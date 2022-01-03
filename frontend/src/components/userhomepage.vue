
<template>
<div>


<link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/bootstrap-extended.min.css">
<link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/fonts/simple-line-icons/style.min.css">
<link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">

<div class="grey-bg container-fluid">
  <section id="minimal-statistics">
    <div class="row">
      <div class="col-12 mt-3 mb-1">
        <h4 class="text-uppercase">Minimal Statistics Cards</h4>
        <p>Statistics on minimal cards.</p>
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
                  <h3>278</h3>
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
                  <h3>156</h3>
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
                  <h3>64.89 %</h3>
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
                  <h3>423</h3>
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
                <i class="icon-graph primary font-large-2 mr-2 "></i>
              </div>
              <div class="media-body">
                <h4>Ukupno sati</h4>
                <span>Ukupan broj upisanih sati</span>
              </div>
              <div class="align-self-center">
                <h1>18,000</h1>
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
                <i class="icon-pencil warning font-large-2 mr-2"></i>
              </div>
              <div class="media-body">
                <h4>Ukupano rada</h4>
                <span>Ukupan broj radnih sati</span>
              </div>
              <div class="align-self-center"> 
                <h1>84,695</h1>
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
export default {
  name: 'userhomepage',
  props: {
    msg: String
  }
}
</script>