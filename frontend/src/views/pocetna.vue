<template >
    <div >

        <header class="masthead pocbody">
            <div class="container px-4 px-lg-5 h-100">
                <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                    <div class="col-lg-8 align-self-end">
                      <img src="https://i.ibb.co/zmBCGtv/logo.png" alt="logo" width="350" height="100">
                        <hr class="divider" />
                    </div>
                </div>
                
        <section class="py-5">
            <div class="container my-5">
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                        <p class="lead">Preuzmite kontrolu nad svojim radnim vremenom. </p>
                        <p class="mb-0">wHours je softver za praćenje vremena koji vam omogućuje provjeru svih ključnih operacija na vrijeme i proračun. Stoga se možete usredotočiti na razvoj vašeg poslovanja.</p>
                   <p class="mb-0"> Jednostavno pratite svoje radno vrijeme - organizirajte ih, analizirajte i izvezite ih</p>
                    </div>
                </div>
            </div>
        </section>

            </div>
        </header>

<div class="jumbotron">
  <hr class="my-4">
  <p>Dizajniran za zaposlenike i poslovne menadžere kako bi pratili vrijeme i radnu učinkovitost te ih poboljšali.</p>
</div>
   

   <section id="stats-subtitle">

  <div class="row">
    <div class="col-xl-6 col-md-12">
      <div class="card overflow-hidden">
        <div class="card-content">
          <div class="card-body cleartfix">
            <div class="media align-items-stretch">
              <div class="align-self-center">
                <i class="icon-user primary font-large-2 mr-2 "></i>
              </div>
              <div class="media-body">
                <h4>Zaposlenik</h4>
                <span >- Zapisivanje radnog vremena</span><br>
                <span>- Uređivanje i ažuriranje</span><br>
                <span>- Preuzimanje PDF-a</span><br>
                <span>- Potpisivanje sati</span>
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
              <div class="align-self-center" style="text-align:right;">
                <i class="icon-graph warning font-large-2 mr-2"></i>
              </div>
              <div class="media-body" style="text-align:right;">
                <h4>Poslovni menadžer</h4>
                <span >- Praćenje zaposlenika</span><br>
                <span>- Praćenje radnih sati</span><br>
                <span>- Uređivanje i ažuriranje</span><br>
                <span>- Potvrda i PDF preuzimanje </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  
</section>

   

    </div>
    
    
</template>
<script>
export default{
    name:'pocetna'
}
</script>
  <style>




/* Custom default button */
.btn-secondary,
.btn-secondary:hover,
.btn-secondary:focus {
  color: #333;
  text-shadow: none; 
}

.pocbody {
  background-image: url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=712&q=80');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.cover-container {
  max-width: 42em;
}

.nav-masthead .nav-link {
  padding: .25rem 0;
  font-weight: 700;
  color: rgba(255, 255, 255, .5);
  background-color: transparent;
  border-bottom: .25rem solid transparent;
}

.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
  border-bottom-color: rgba(255, 255, 255, .25);
}

.nav-masthead .nav-link + .nav-link {
  margin-left: 1rem;
}

.nav-masthead .active {
  color: #fff;
  border-bottom-color: #fff;
}



      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    </style>
