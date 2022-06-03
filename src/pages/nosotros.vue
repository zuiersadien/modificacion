<script setup lang="ts">
// import { contactInfo } from '/@src/data/pages/contact'
// import { genericFaq } from '/@src/data/blocks/advanced/faq'
// import { socialLinks } from '/@src/data/blocks/advanced/social'
// import { plantValues } from '/@src/data/blocks/advanced/values'
import { footer } from '/@src/data/footer'
import { aboutUs } from '../data/AboutUs/index'
</script>

<template>
  <section>
    <Hero color="grey" class="product-hero" size="fullheight" mask="wave">
      <template #body>
        <div>
          <Container>
            <PageTitle
              class="colorModify pb-4 pt-0"
              title="#ActivoDigital"
              subtitle="Nosotros"
            />
            <!-- <p class="mb-6 pb-6 has-text-centered colorP	">
              Hola! que bueno que estes por aquí y quieras conocer más acerca de nosotros :) 
              <br/>
              Somos la plataforma mas confiable y segura en Perú para el intercambio de criptomonedas estables como USDT o BUSD a <br/> Soles o Dólares, cada transacción en nuestro sistema se realiza a 
              
              cuentas verificadas para asegurar legitimidad de cada <br/>  movimiento bancario y evitar el lavado de activos o financiamiento del ilícito.<br/> Si estás más interesado en nuestras políticas de privacidad, puedes
              <a href="">
                  ingresar aquí
              </a>
          </p> -->
            <div class="mb-6 pb-6 has-text-centered colorP">
              <div v-for="(parrafo, i) in aboutUs.presentation" :key="i">
                <p class="whiteRegister px-20">
                  {{ parrafo.parrafo }}
                </p>
                <!-- <a href="" v-if="parrafo.parrafo">
                  sdaasdasd
                </a> -->
                <br />
              </div>
            </div>
          </Container>

          <Container>
            <SectionTitle
              class="colorModify pb-6"
              title="Nuestros valores"
              subtitle="Filosofía"
            />
            <div
              class="is-flex mb-6 pb-6 columns is-bordered pt-4 pb-6 is-justify-content-space-around is-flex-wrap-wrap"
            >
              <div
                class="is-one-four column is-justify-content-center is-align-content-center is-flex is-flex-direction-column has-text-centered is-12-mobile mb-6"
              >
                <h3 class="tilecolor">Visión</h3>
                <div class="mb-6 pb-6 mt-2 has-text-centered colorP">
                  <div v-for="(par, y) in aboutUs.vision" :key="y">
                    <p class="whiteRegister px-20">
                      {{ par.parrafo }}
                    </p>
                    <br />
                  </div>
                </div>
              </div>
              <div
                class="is-one-four column is-justify-content-center is-align-content-center is-flex is-flex-direction-column mt-2 has-text-centered is-12-mobile mb-6"
              >
                <h3 class="tilecolor">Misión</h3>
                <div class="mb-6 pb-6 has-text-centered colorP">
                  <div
                    v-for="(par, y) in aboutUs.mission"
                    :key="y"
                    class="px-2"
                  >
                    <p class="whiteRegister px-20">
                      {{ par.parrafo }}
                    </p>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </template>
    </Hero>

    <Footer :content="footer" color="dark" />
  </section>
</template>
<style lang="scss" >
.colorModify {
  & > .title {
    font-size: 40px !important;
  }
  & > .subtitle {
    font-size: 20px !important;
    & > span {
      background: none !important;
      -webkit-text-fill-color: #7703fc;
    }
  }
}
.colorP {
  color: #747990;
}

.tilecolor {
  color: #282d52;
  font-size: 20px;
  font-weight: bold;
}
</style>