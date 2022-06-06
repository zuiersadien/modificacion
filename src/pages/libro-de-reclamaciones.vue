<script setup lang="ts">
// import { contactInfo } from '/@src/data/pages/contact'
// import { genericFaq } from '/@src/data/blocks/advanced/faq'
// import { socialLinks } from '/@src/data/blocks/advanced/social'
// import { plantValues } from '/@src/data/blocks/advanced/values'
import { footer } from '/@src/data/footer'
import { ref } from 'vue'
import { VueRecaptcha } from 'vue-recaptcha'
const modalLargeOpen = ref(false)

// const claim=ref({

//   fullname: "Victor Hugo Castro Contreras",
//   numdoc: "07474181",
//   address: "Av avenida 123, cercado de ciudad, Departamento, Provincia.",
//   email: "hugocastro@gmail.com",
//   mobile: 93999494,
//   amountRequest: 414.2,
//   descriptionAmount: "No se recibieron los USDT que se solicitaron en la transaccion BOBB020223",
//   type: "QUEJA",
//   detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi urna, malesuada ac mi vitae, viverra vulputate diam. Mauris cursus, turpis eget sodales lacinia, arcu mauris interdum.",
//   orderDetail: "In nisi urna, malesuada ac mi vitae, viverra vulputate diam. Mauris cursus, turpis eget sodales lacinia, arcu Suspendisse malesuada metus dapibus nunc sagittis, in tincidunt nunc auctor."
// })

// const objtArray = ref([
//   {
//     id: 'fullname',
//     valuetext: '',
//     validation: false,
//     isvalid: false,
//     errorText: 'El nombre es requerido',
//     espaciado: true,
//   },
//   {
//     id: 'numdoc',
//     valuetext: '',
//     validation: false,
//     isvalid: false,
//     errorText: 'El apellido es requerido',
//     espaciado: true,
//   },
//   {
//     id: 'address',
//     valuetext: '',
//     validation: false,
//     isvalid: false,
//     errorText: 'El correo es requerido',
//     espaciado: true,
//   },
//   {
//     id: 'email',
//     valuetext: '',
//     validation: false,
//     isvalid: false,
//     errorText: 'El DNI es requerido',
//     espaciado: true,
//   },
//   {
//     id: 'mobile',
//     valuetext: '',
//     validation: false,
//     isvalid: false,
//     errorText: 'La password es requerido',
//     espaciado: true,
//   },
//   {
//     id: 'amountRequest',
//     valuetext: '',
//     validation: false,
//     isvalid: false,
//     errorText: 'La password es requerido',
//     espaciado: true,
//   },
//   {
//     id: 'descriptionAmount',
//     valuetext: '',
//     validation: false,
//     isvalid: false,
//     errorText: 'La password es requerido',
//     espaciado: true,
//   },
//   {
//     id: 'type',
//     valuetext: '',
//     validation: false,
//     isvalid: false,
//     errorText: 'El DNI es requerido',
//     espaciado: true,
//   },
//   {
//     id: 'detail',
//     valuetext: '',
//     validation: false,
//     isvalid: false,
//     errorText: 'La password es requerido',
//     espaciado: true,
//   },
//   {
//     id: 'orderDetail',
//     valuetext: '',
//     validation: false,
//     isvalid: false,
//     errorText: 'La password es requerido',
//     espaciado: true,
//   },
// ])
</script>

<template>
  <section>
    <Hero color="grey" class="product-hero" size="fullheight" mask="wave">
      <template #body>
        <div class="">
          <Container>
            <PageTitle
              class="colorModify pb-4 pt-0"
              title="Libro de reclamaciones"
              subtitle="Formulario online"
            />
          </Container>
          <div
            class="is-flex is-justify-content-end is-align-items-end is-flex-direction-column"
          >
            <p class="colorLinkReclamo has-text-weight-bold">
              ¿Deseas consultar el estado de tu reclamo?
            </p>
          </div>

          <Section class="formulario">
            <div
              class="is-flex is-justify-content-space-between mb-12 is-flex-wrap-wrap-reverse"
            >
              <div>
                <div class="colorLinkReclamo">
                  <p class="titleForm has-text-weight-bold">
                    INNOVADORA DIGITAL S.A.C.
                  </p>
                  20378890161
                  <br />
                  Calle Vinatea Reynoso 525 urb. Simón Bolivar, JLByR, Arequipa,
                  Arequipa
                </div>
              </div>
              <div
                class="is-flex is-justify-content-space-between centradoLogo mb-5"
              >
                <!-- <img class="navbar-logo " src="/assets/logo/logo.svg" > -->
              </div>
            </div>
            <div>
              <Container class="Reclamos">
                <h3 class="titleForm has-text-weight-bold">
                  1. IDENTIFICACIÓN DEL CONSUMIDOR RECLAMANTE
                </h3>

                <div class="columns is-flex is-flex-wrap-wrap">
                  <div class="column is-7-desktop is-12-mobile is-7-tablet">
                    <div
                      class="columns backp is-justify-content-space-between is-flex is-flex-wrap-wrap"
                    >
                      <div
                        class="column is-4-tablet is-4-desktop is-12-mobile is-flex is-justify-content-start is-align-items-center"
                      >
                        <p class="colorLinkReclamo">Nombres completos</p>
                      </div>
                      <Control
                        class="column is-8-tablet is-12-mobile is-8-desktop"
                      >
                        <VInput type="text" />
                      </Control>
                    </div>
                  </div>
                  <div class="column is-5-desktop is-12-mobile is-5-tablet">
                    <div
                      class="columns backr is-justify-content-space-between is-flex is-flex-wrap-wrap"
                    >
                      <div
                        class="column is-4-tablet is-4-desktop is-12-mobile is-flex is-justify-content-start is-align-items-center"
                      >
                        <p class="colorLinkReclamo">DNI / RUC / CE</p>
                      </div>
                      <Control
                        class="column is-8-tablet is-12-mobile is-8-desktop"
                      >
                        <VInput type="text" />
                      </Control>
                    </div>
                  </div>
                </div>

                <div class="columns is-flex">
                  <div class="column is-12-mobile is-12-tablet">
                    <div class="columns backp is-flex is-flex-wrap-wrap">
                      <div
                        class="column is-2-tablet is-2-desktop is-12-mobile is-flex is-justify-content-start is-align-items-center"
                      >
                        <p class="colorLinkReclamo">Dirección</p>
                      </div>
                      <Control
                        class="column is-10-tablet is-12-mobile is-10-desktop"
                      >
                        <VInput type="text" />
                      </Control>
                    </div>
                  </div>
                </div>

                <div class="columns is-flex is-flex-wrap-wrap">
                  <div class="column is-6-desktop is-12-mobile is-6-tablet">
                    <div class="columns backp is-flex is-flex-wrap-wrap">
                      <div
                        class="column is-4-tablet is-4-desktop is-12-mobile is-flex is-justify-content-start is-align-items-center"
                      >
                        <p class="colorLinkReclamo">Correo</p>
                      </div>
                      <Control
                        class="column is-8-tablet is-8-desktop is-8-tablet"
                      >
                        <VInput type="text" />
                      </Control>
                    </div>
                  </div>
                  <div class="column is-6-desktop is-12-mobile">
                    <div class="columns backr is-flex is-flex-wrap-wrap">
                      <div
                        class="column is-4-tablet is-12-mobile is-4-desktop is-flex is-justify-content-start is-align-items-center"
                      >
                        <p class="colorLinkReclamo">Teléfono / Celular</p>
                      </div>
                      <Control
                        class="column is-8-tablet is-8-desktop is-12-mobile"
                      >
                        <VInput type="text" />
                      </Control>
                    </div>
                  </div>
                </div>
                <br />
              </Container>

              <Container class="Reclamos">
                <h3 class="titleForm has-text-weight-bold">
                  2. IDENTIFICACIÓN DEL SERVICIO CONTRATADO
                </h3>
                <br />

                <div class="columns is-flex">
                  <div class="column">
                    <div class="columns backp is-flex-wrap-wrap is-flex">
                      <div
                        class="column is-2-tablet is-2-desktop is-flex is-12-mobile is-justify-content-start is-align-items-center"
                      >
                        <p class="colorLinkReclamo">Monto reclamado</p>
                      </div>
                      <Control
                        class="column is-3-tablet is-12-mobile is-3-desktop"
                      >
                        <VInput type="text" />
                      </Control>
                    </div>
                  </div>
                </div>

                <div class="columns is-flex">
                  <div class="column">
                    <div class="columns backp is-flex-wrap-wrap is-flex">
                      <div
                        class="column is-2-tablet is-2-desktop is-12-mobile is-flex is-justify-content-start is-align-items-center"
                      >
                        <p class="colorLinkReclamo">Descripción</p>
                      </div>
                      <Control
                        class="column is-10 is-12-mobile is-10-tablet is-10-desktop"
                      >
                        <VInput type="text" />
                      </Control>
                    </div>
                  </div>
                </div>

                <br />
              </Container>

              <Container class="Reclamos">
                <h3 class="titleForm has-text-weight-bold">
                  2. IDENTIFICACIÓN DEL SERVICIO CONTRATADO
                </h3>

                <div class="my-3">
                  <Radio
                    name="radio-1"
                    label="Reclamo"
                    group="radio-group-1"
                    color="default"
                  />

                  <Radio
                    name="radio-1"
                    label="Queja"
                    group="radio-group-1"
                    color="default"
                  />
                </div>

                <p class="colorLinkReclamo mt-4">Detalle</p>
                <Control>
                  <VTextarea
                    v-model="textareaValue"
                    :resize="false"
                    placeholder="Write something..."
                  />
                </Control>
                <p class="colorLinkReclamo mt-3">Pedido</p>
                <Control>
                  <VTextarea
                    v-model="textareaValue"
                    :resize="false"
                    placeholder="Write something..."
                  />
                </Control>
              </Container>
              <div class="mt-3 is-flex is-justify-content-end">
                <vue-recaptcha
                  sitekey="6LezKUwgAAAAAHkaidXgsTMV5WDopSmhcCA1viJ8"
                  class="bgrecaptch"
                ></vue-recaptcha>
              </div>
              <div class="is-flex is-justify-content-end is-flex-wrap-wrap">
                <Button
                  size="medium"
                  outlined
                  color="link"
                  rounded
                  class="mx-4 my-5"
                >
                  Limpiar formulario
                </Button>

                <Button color="link" size="medium" rounded class="my-5 mx-4">
                  Enviar
                </Button>
              </div>
            </div>
          </Section>
          <div class="mt-6">
            <p class="colorLinkReclamo">
              * La formulación del reclamo no impide acudir a otras vias de
              solución de controversias ni es requisito previo para interponer
              una denuncia ante el INDECOPI.
            </p>
            <p class="colorLinkReclamo">
              * El proveedor deberá dar respuesta al reclamo en un plazo no
              mayor a (30) días calendario, pudiendo ampliar el plazo hasta por
              treinta (30) días más, previa comunicación al consumidor.
            </p>
          </div>
        </div>
      </template>
    </Hero>

    <Modal
      title="Consulta el estado de tu reclamo"
      :open="modalLargeOpen"
      size="large"
      actions="center"
      noscroll
      @close="modalLargeOpen = false"
    >
      <template #content>
        <PlaceholderSection
          title="Hola!"
          class="px-6 my-8"
          subtitle="Para verificar el estado de tu reclamo es necesario que ingreses el código de reclamo y el nro de DNI/RUC/CE."
        ></PlaceholderSection>
        <div>
          <div
            class="columns is-flex is-flex-wrap-wrap px-5 is-justify-content-space-between"
          >
            <div class="column is-6-desktop is-12-mobile is-6-tablet">
              <div
                class="columns backp is-flex is-flex-wrap-wrap is-flex-direction-column"
              >
                <div
                  class="column is-12-tablet is-12-desktop is-12-mobile is-flex is-justify-content-center is-align-items-center"
                >
                  <p class="colorLinkReclamo">Código de reclamo</p>
                </div>
                <Control
                  class="column is-12-tablet is-12-desktop is-12-mobile py-0 is-flex is-justify-content-center"
                >
                  <VInput type="text" size="lg " rounded class="" />
                </Control>
              </div>
            </div>
            <div class="column is-6-desktop is-12-mobile">
              <div
                class="columns backr is-flex is-flex-wrap-wrap is-flex-direction-column"
              >
                <div
                  class="column is-12-tablet is-12-mobile is-12-desktop is-flex is-justify-content-center is-align-items-center"
                >
                  <p class="colorLinkReclamo">Nro de DNI/RUC/CE</p>
                </div>
                <Control
                  class="column is-12-tablet is-12-desktop py-0 is-12-mobile"
                >
                  <VInput type="text" size="lg " rounded />
                </Control>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #action>
        <div>
          <Button color="link" size="large" class="mt-10 p-5" :long="2" raised>
            Consultar estado
          </Button>
        </div>
      </template>
    </Modal>

    <Footer :content="footer" color="dark" />
  </section>
</template>
<style  lang="scss" >
.bgrecaptch {
  border: #e5e5e5 solid 1px;
  border-radius: 2px;
  padding: 2px;
}
.centradoLogo {
  margin: 0 auto;
}
.formulario {
  border: #e5e5e5 1px solid;
  border-radius: 25px;
}

.titleForm {
  color: var(--dark);
}

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
// .backp{
//   background:#c3ccf1;
// }
// .backr{
//   background:rgb(192, 163, 163);
// }
.colorP {
  color: #747990;
}
.colorLinkReclamo {
  color: #707070;
}
.tilecolor {
  color: #282d52;
  font-size: 20px;
  font-weight: bold;
}
</style>