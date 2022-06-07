<script setup lang="ts">
import { footer } from '/@src/data/footer'
import { ref, onMounted } from 'vue'
import { VueRecaptcha } from 'vue-recaptcha'

import { pushClainStore } from '/@src/utils/api/backOffice'

const modalLargeOpen = ref(false)
// const textPolicies = ref('')
const responseClainStore = ref('')

const callingPushClainStore = async () => {
  let respuesta = await pushClainStore(claim.value)
  responseClainStore.value = respuesta
  console.log(responseClainStore.value)
}

const claim = ref({
  fullname: 'Victor Hugo Castro Contreras',
  numdoc: '07474181',
  address: 'Av avenida 123, cercado de ciudad, Departamento, Provincia.',
  email: 'hugocastro@gmail.com',
  mobile: 939929494,
  amountRequest: 414.2,
  descriptionAmount:
    'No se recibieron los USDT que se solicitaron en la transaccion BOBB020223',
  type: 'QUEJA',
  detail:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi urna, malesuada ac mi vitae, viverra vulputate diam. Mauris cursus, turpis eget sodales lacinia, arcu mauris interdum.',
  orderDetail:
    'In nisi urna, malesuada ac mi vitae, viverra vulputate diam. Mauris cursus, turpis eget sodales lacinia, arcu Suspendisse malesuada metus dapibus nunc sagittis, in tincidunt nunc auctor.',
})

const objtArray = ref([
  {
    id: 'fullname',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'El nombre es requerido',
    espaciado: true,
  },
  {
    id: 'numdoc',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'El NUN de documento es requerido',
    espaciado: true,
  },
  {
    id: 'address',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'La direccion es requerido',
    espaciado: true,
  },
  {
    id: 'email',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'El correo es requerido',
    espaciado: true,
  },
  {
    id: 'mobile',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'El movil es requerido',
    espaciado: true,
  },
  {
    id: 'amountRequest',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'El monto reclamado es requerido',
    espaciado: true,
  },
  {
    id: 'descriptionAmount',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'La descripcion es requerido',
    espaciado: true,
  },
  {
    id: 'type',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'El DNI es requerido',
    espaciado: true,
  },
  {
    id: 'detail',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'Los detalles son requeridos',
    espaciado: true,
  },
  {
    id: 'orderDetail',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'El pedido es requerido',
    espaciado: true,
  },
])
const Resourse = () => {
  console.log(objtArray.value)
}

onMounted(() => {
  Resourse()
  // console.log(new Date)
  // const current=new Date()
  // const date = current.toLocaleDateString();
  // const time = current.toLocaleTimeString('en-US', {hour12: true});

  // console.log(date ,time)
})
function valueNaN(e) {
  if (e.target.name === 'fullname') {
    claim.value.fullname = e.target.value
    objtArray.value[0].errorText = 'El nombre es requerido'
    let data = e.target.value
    objtArray.value[0].isvalid = false
    objtArray.value[0].validation = true

    objtArray.value[0].espaciado = false
    if (data) {
      // ButtonAviable.value = false
      objtArray.value[0].isvalid = true

      objtArray.value[0].espaciado = true
    }
  } else if (e.target.name === 'numdoc') {
    claim.value.numdoc = e.target.value
    objtArray.value[1].errorText = 'El NUN de documento es requerido'
    let data = e.target.value
    objtArray.value[1].validation = true
    objtArray.value[1].isvalid = false

    objtArray.value[1].espaciado = false
    if (data) {
      // ButtonAviable.value = false
      objtArray.value[1].isvalid = true

      objtArray.value[1].espaciado = true
    }
  } else if (e.target.name === 'address') {
    claim.value.address = e.target.value
    objtArray.value[2].errorText = 'La Dirrecion es requerido'
    let data = e.target.value
    objtArray.value[2].isvalid = false
    objtArray.value[2].validation = true

    objtArray.value[2].espaciado = false
    if (data) {
      // ButtonAviable.value = false
      objtArray.value[2].isvalid = true

      objtArray.value[2].espaciado = true
    }
  } else if (e.target.name === 'email') {
    claim.value.email = e.target.value

    objtArray.value[3].errorText = 'El correo es requerido'
    let data = e.target.value
    objtArray.value[3].validation = true
    objtArray.value[3].isvalid = false

    objtArray.value[3].espaciado = false
    if (data) {
      // ButtonAviable.value = false
      objtArray.value[3].isvalid = true

      objtArray.value[3].espaciado = true

      if (!data.includes('@')) {
        objtArray.value[3].errorText = 'El correo requiere de "@" y ".'
        objtArray.value[3].isvalid = false

        objtArray.value[3].espaciado = false
      }
    }
  } else if (e.target.name === 'mobile') {
    claim.value.mobile = e.target.value
    objtArray.value[4].errorText = 'El numero requiere 9 digitos'
    let data = e.target.value
    objtArray.value[4].validation = true
    objtArray.value[4].isvalid = false

    objtArray.value[4].espaciado = false
    if (data.length === 9) {
      // ButtonAviable.value = false
      objtArray.value[4].isvalid = true

      objtArray.value[4].espaciado = true
    }
  } else if (e.target.name === 'amountRequest') {
    claim.value.amountRequest = e.target.value
    objtArray.value[5].errorText = 'El password es requerido'
    let data = e.target.value
    objtArray.value[5].validation = true
    objtArray.value[5].isvalid = false

    objtArray.value[5].espaciado = false
    if (data) {
      // ButtonAviable.value = false
      objtArray.value[5].isvalid = true

      objtArray.value[5].espaciado = true
    }
  } else if (e.target.name === 'descriptionAmount') {
    claim.value.descriptionAmount = e.target.value
    objtArray.value[6].errorText = 'El monto reclamado es requerido'
    let data = e.target.value
    objtArray.value[6].validation = true
    objtArray.value[6].isvalid = false

    objtArray.value[6].espaciado = false
    if (data) {
      // ButtonAviable.value = false
      objtArray.value[6].isvalid = true

      objtArray.value[6].espaciado = true
    }
  }
  // else if (e.target.name === 'mobile') {
  //   // passwd.value = e.target.value
  //   objtArray.value[7].errorText = 'La descripcion es requerida'
  //   let data = e.target.value
  //   objtArray.value[7].validation = true
  //   objtArray.value[7].isvalid = false

  //   objtArray.value[7].espaciado = false
  //   if (data) {
  //     // ButtonAviable.value = false
  //     objtArray.value[7].isvalid = true

  //     objtArray.value[7].espaciado = true
  //   }
  // }
  else if (e.target.name === 'detail') {
    claim.value.detail = e.target.value
    objtArray.value[8].errorText = 'Los detalles son requeridos'
    let data = e.target.value
    objtArray.value[8].validation = true
    objtArray.value[8].isvalid = false

    objtArray.value[8].espaciado = false
    if (data) {
      // ButtonAviable.value = false
      objtArray.value[8].isvalid = true

      objtArray.value[8].espaciado = true
    }
  } else if (e.target.name === 'orderDetail') {
    claim.value.orderDetail = e.target.value
    objtArray.value[9].errorText = 'El pedid es requerido'
    let data = e.target.value
    objtArray.value[9].validation = true
    objtArray.value[9].isvalid = false

    objtArray.value[9].espaciado = false
    if (data) {
      // ButtonAviable.value = false
      objtArray.value[9].isvalid = true

      objtArray.value[9].espaciado = true
    }
  }
}
function funcion() {
  const result = objtArray.value.filter((val) =>
    val.isvalid === false ? (val.validation = true) : null
  )
  console.log(result)
  const textLengt = objtArray.value.filter((val) =>
    val.isvalid === false ? (val.espaciado = false) : null
  )
  console.log(textLengt)
  console.log(claim.value)
  callingPushClainStore()
}

// const  print= async()=> {

//     await htmlToPaper('printMe');
//   }
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
            v-if="!responseClainStore.success"
            class="is-flex is-justify-content-end is-align-items-end is-flex-direction-column"
          >
            <p class="colorLinkReclamo has-text-weight-bold">
              ¿Deseas consultar el estado de tu reclamo?
            </p>
            <Button
              class="p-0 button-ingrese-aqui"
              @click="modalLargeOpen = true"
            >
              <p class="m-0">Ingrese aquí</p>
            </Button>
          </div>
          <div v-else class="is-flex is-justify-content-space-between my-1">
            <div
              class="has-text-link color-responseClain is-flex is-align-items-center"
            >
              <i
                class="iconify color-responseClain"
                data-icon="akar-icons:circle-check-fill"
              ></i>
              <p class="color-responseClain ml-2">
                {{ responseClainStore.message }}
              </p>
            </div>
            <div>
              <Button class="button-color mx-2">
                <IconBox size="medium " class="button-colorBox" rounded>
                  <i
                    class="iconify has-text-link"
                    data-icon="fa6-solid:file-pdf"
                  ></i>
                </IconBox>
              </Button>
              <Button class="button-color mx-2">
                <IconBox size="medium" class="button-colorBox" rounded>
                  <i class="iconify has-text-link" data-icon="fa:print"></i>
                </IconBox>
              </Button>
            </div>
          </div>

          <Section class="formulario">
            <div
              class="columns is-flex is-justify-content-space-between mb-12 is-flex-wrap-wrap-reverse"
            >
              <div class="column is-9-desktop">
                <div class="colorLinkReclamo">
                  <div class="is-flex">
                    <p class="titleForm has-text-weight-bold mr-20">
                      INNOVADORA DIGITAL S.A.C.
                    </p>
                    <div class="is-flex ml-20">
                      <p class="titleForm has-text-weight-bold">
                        ESTADO ACTUAL:
                      </p>
                      <p class="color-responseClain ml-1">EN PROCESO</p>
                    </div>
                  </div>

                  20378890161
                  <br />
                  Calle Vinatea Reynoso 525 urb. Simón Bolivar, JLByR, Arequipa,
                  Arequipa
                </div>
              </div>

              <div
                class="column is-3-desktop is-flex is-justify-content-space-between centradoLogo is-flex is-flex-direction-column"
              >
                <img
                  src="/public/assets/logo/logo-dark.svg "
                  alt="logo"
                  class=""
                />
                <div
                  class="is-flex is-flex-direction-column mt-2 has-text-link"
                >
                  <h4 class="has-text-right has-text-weight-bold is-size-5">
                    {{ responseClainStore.code }}
                  </h4>
                  <p class="has-text-right is-size-7">
                    {{ responseClainStore.created_at }}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Container class="Reclamos">
                <h3 class="titleForm has-text-weight-bold">
                  1. IDENTIFICACIÓN DEL CONSUMIDOR RECLAMANTE
                </h3>

                <div class="columns is-flex is-flex-wrap-wrap m-0">
                  <div class="column is-7-desktop is-12-mobile is-7-tablet">
                    <div
                      class="columns backp is-justify-content-space-between is-flex is-flex-wrap-wrap"
                    >
                      <div
                        class="column p-1 is-4-tablet is-4-desktop is-12-mobile is-flex is-justify-content-start is-align-items-center"
                      >
                        <p class="colorLinkReclamo mb-5">Nombres completos</p>
                      </div>

                      <Control
                        class="column p-1 is-8-tablet is-12-mobile is-8-desktop"
                        :error="objtArray[0].errorText"
                        :validation="objtArray[0].validation"
                        :is-valid="objtArray[0].isvalid"
                      >
                        <VInput
                          v-model="objtArray[0].valuetext"
                          type="text"
                          name="fullname"
                          @keyup="valueNaN"
                        />
                        <div
                          v-if="objtArray[0].espaciado"
                          class="espaciado-plano"
                        ></div>
                      </Control>
                    </div>
                  </div>
                  <div class="column is-5-desktop is-12-mobile is-5-tablet">
                    <div
                      class="columns backr is-justify-content-space-between is-flex is-flex-wrap-wrap"
                    >
                      <div
                        class="column p-1 is-4-tablet is-4-desktop is-12-mobile is-flex is-justify-content-start is-align-items-center"
                      >
                        <p class="colorLinkReclamo mb-5">DNI / RUC / CE</p>
                      </div>
                      <Control
                        class="column p-1 is-8-tablet is-12-mobile is-8-desktop"
                        :error="objtArray[1].errorText"
                        :validation="objtArray[1].validation"
                        :is-valid="objtArray[1].isvalid"
                      >
                        <VInput
                          v-model="objtArray[1].valuetext"
                          type="text"
                          name="numdoc"
                          @keyup="valueNaN"
                        />
                        <div
                          v-if="objtArray[1].espaciado"
                          class="espaciado-plano"
                        ></div>
                      </Control>
                    </div>
                  </div>
                </div>

                <div class="columns is-flex m-0">
                  <div class="column is-12-mobile is-12-tablet">
                    <div class="columns backp is-flex is-flex-wrap-wrap">
                      <div
                        class="column p-1 is-2-tablet is-2-desktop is-12-mobile is-flex is-justify-content-start is-align-items-center"
                      >
                        <p class="colorLinkReclamo mb-5">Dirección</p>
                      </div>
                      <Control
                        class="column p-1 is-10-tablet is-12-mobile is-10-desktop"
                        :error="objtArray[2].errorText"
                        :validation="objtArray[2].validation"
                        :is-valid="objtArray[2].isvalid"
                      >
                        <VInput
                          v-model="objtArray[2].valuetext"
                          type="text"
                          name="address"
                          @keyup="valueNaN"
                        />
                        <div
                          v-if="objtArray[2].espaciado"
                          class="espaciado-plano"
                        ></div>
                      </Control>
                    </div>
                  </div>
                </div>

                <div class="columns is-flex is-flex-wrap-wrap m-0">
                  <div class="column is-6-desktop is-12-mobile is-6-tablet">
                    <div class="columns backp is-flex is-flex-wrap-wrap">
                      <div
                        class="column p-1 is-4-tablet is-4-desktop is-12-mobile is-flex is-justify-content-start is-align-items-center"
                      >
                        <p class="colorLinkReclamo mb-5">Correo</p>
                      </div>
                      <Control
                        class="column p-1 is-8-tablet is-8-desktop is-8-tablet"
                        :error="objtArray[3].errorText"
                        :validation="objtArray[3].validation"
                        :is-valid="objtArray[3].isvalid"
                      >
                        <VInput
                          v-model="objtArray[3].valuetext"
                          type="text"
                          name="email"
                          @keyup="valueNaN"
                        />
                        <div
                          v-if="objtArray[3].espaciado"
                          class="espaciado-plano"
                        ></div>
                      </Control>
                    </div>
                  </div>
                  <div class="column is-6-desktop is-12-mobile">
                    <div class="columns backr is-flex is-flex-wrap-wrap">
                      <div
                        class="column p-1 is-4-tablet is-12-mobile is-4-desktop is-flex is-justify-content-start is-align-items-center"
                      >
                        <p class="colorLinkReclamo mb-5">Teléfono / Celular</p>
                      </div>
                      <Control
                        class="column p-1 is-8-tablet is-8-desktop is-12-mobile"
                        :error="objtArray[4].errorText"
                        :validation="objtArray[4].validation"
                        :is-valid="objtArray[4].isvalid"
                      >
                        <VInput
                          v-model="objtArray[4].valuetext"
                          type="text"
                          name="mobile"
                          @keyup="valueNaN"
                        />
                        <div
                          v-if="objtArray[4].espaciado"
                          class="espaciado-plano"
                        ></div>
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
                        class="column p-1 is-2-tablet is-2-desktop is-flex is-12-mobile is-justify-content-start is-align-items-center"
                      >
                        <p class="colorLinkReclamo mb-5">Monto reclamado</p>
                      </div>
                      <Control
                        class="column p-1 is-3-tablet is-12-mobile is-3-desktop"
                        :error="objtArray[5].errorText"
                        :validation="objtArray[5].validation"
                        :is-valid="objtArray[5].isvalid"
                      >
                        <VInput
                          v-model="objtArray[5].valuetext"
                          type="text"
                          name="amountRequest"
                          @keyup="valueNaN"
                        />
                        <div
                          v-if="objtArray[5].espaciado"
                          class="espaciado-plano"
                        ></div>
                      </Control>
                    </div>
                  </div>
                </div>

                <div class="columns is-flex">
                  <div class="column">
                    <div class="columns p-1 backp is-flex-wrap-wrap is-flex">
                      <div
                        class="column p-1 is-2-tablet is-2-desktop is-12-mobile is-flex is-justify-content-start is-align-items-center"
                      >
                        <p class="colorLinkReclamo mb-5">Descripción</p>
                      </div>
                      <Control
                        class="column p-1 is-10 is-12-mobile is-10-tablet is-10-desktop"
                        :error="objtArray[6].errorText"
                        :validation="objtArray[6].validation"
                        :is-valid="objtArray[6].isvalid"
                      >
                        <VInput
                          v-model="objtArray[6].valuetext"
                          type="text"
                          name="descriptionAmount"
                          @keyup="valueNaN"
                        />
                        <div
                          v-if="objtArray[6].espaciado"
                          class="espaciado-plano"
                        ></div>
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
                <Control
                  :error="objtArray[8].errorText"
                  :validation="objtArray[8].validation"
                  :is-valid="objtArray[8].isvalid"
                >
                  <VTextarea
                    v-model="objtArray[8].valuetext"
                    name="detail"
                    :resize="false"
                    placeholder="Write something..."
                    @keyup="valueNaN"
                  />
                  <div
                    v-if="objtArray[8].espaciado"
                    class="espaciado-plano"
                  ></div>
                </Control>
                <p class="colorLinkReclamo mt-3">Pedido</p>
                <Control
                  :error="objtArray[9].errorText"
                  :validation="objtArray[9].validation"
                  :is-valid="objtArray[9].isvalid"
                >
                  <VTextarea
                    v-model="objtArray[9].valuetext"
                    :resize="false"
                    placeholder="Write something..."
                    name="orderDetail"
                    @keyup="valueNaN"
                  />
                  <div
                    v-if="objtArray[9].espaciado"
                    class="espaciado-plano"
                  ></div>
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

                <Button
                  color="link"
                  size="medium"
                  rounded
                  class="my-5 mx-4"
                  @click="funcion"
                >
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
.button-ingrese-aqui {
  background: none !important;
  border: none;
  color: #7703fc !important;
  text-decoration: underline #7703fc;
}
.button-color {
  background: none !important;
  border-radius: 50% !important;
  padding: 0;
  border: none 1px solid !important;
}
.button-colorBox {
  border: #e5e5e5 1px solid !important;
}
.color-responseClain {
  color: #57b54a !important;
}
.bgrecaptch {
  border: #e5e5e5 solid 1px;
  border-radius: 2px;
  padding: 2px;
}
.espaciado-plano {
  height: 22px;
  width: 100%;
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