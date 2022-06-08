<script setup lang="ts">
import { footer } from '/@src/data/footer'
import { ref, onMounted } from 'vue'
import { VueRecaptcha } from 'vue-recaptcha'
import { jsPDF } from 'jspdf'

import { pushClainStore, complaintGet } from '/@src/utils/api/backOffice'

const modalLargeOpen = ref(false)
// const textPolicies = ref('')
const responseClainStore = ref('')
const stringResNewDate = ref('')

const callingPushClainStore = async () => {
  buttonLoader.value = true
  let respuesta = await pushClainStore(claim.value)
  responseClainStore.value = respuesta

  let date = responseClainStore.value.created_at

  console.log(respuesta)
  if (respuesta.success) {
    objtArray.value.filter((val) =>
      val.disabled === false ? (val.disabled = true) : null
    )
    stylesData(date)
    buttonLoader.value = false
  } else {
    buttonLoader.value = false
  }
}
const stylesData = (date = String) => {
  const event = new Date()

  const resNewDate = {
    weak: '',
    month: '',
    hours: '',
    date: 0,
    age: 0,
  }
  let NewDate = new Date(date.split('T14:')[0])
  let dayWeak = [
    'domingo',
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado',
  ]

  let month = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]
  resNewDate.month = month[NewDate.getMonth()]
  resNewDate.weak = dayWeak[NewDate.getDay()]
  resNewDate.date = NewDate.getDate()
  resNewDate.age = NewDate.getFullYear()
  resNewDate.hours = event.toLocaleTimeString('en-US')

  stringResNewDate.value = `${resNewDate.weak} ${resNewDate.date} de ${resNewDate.month} del ${resNewDate.age},${resNewDate.hours} `
}
const buttonLoader = ref(false)

const buttonLoaderCompalintGet = ref(false)

const complaintGetJson = ref({
  code: 'R2206-000078',

  numdoc: '07474181',
})
const ResMessage = ref({})

const callingcomplaintGet = async () => {
  let respuesta = await complaintGet(complaintGetJson.value)
  buttonLoaderCompalintGet.value = true
  if (respuesta.success) {
    objtArray.value[0].valuetext = respuesta.fullname
    objtArray.value[1].valuetext = respuesta.numdoc
    objtArray.value[2].valuetext = respuesta.address
    objtArray.value[3].valuetext = respuesta.email
    objtArray.value[4].valuetext = respuesta.mobile
    objtArray.value[5].valuetext = respuesta.amountRequest
    objtArray.value[6].valuetext = respuesta.descriptionAmount
    objtArray.value[7].valuetext = respuesta.address
    objtArray.value[8].valuetext = respuesta.orderDetail
    objtArray.value[9].valuetext = respuesta.detail
    buttonLoaderCompalintGet.value = false
    const textLengt = objtArray.value.filter((val) =>
      val.disabled === false ? (val.disabled = true) : null
    )
    modalLargeOpen.value = false

    console.log(textLengt)
  } else {
    ResMessage.value = respuesta
    console.log(respuesta.address)
    buttonLoaderCompalintGet.value = false
  }
}

// const claim = ref({
//   fullname: 'Victor Hugo Castro Contreras',
//   numdoc: '07474181',
//   address: 'Av avenida 123, cercado de ciudad, Departamento, Provincia.',
//   email: 'hugocastro@gmail.com',
//   mobile: 939929494,
//   amountRequest: 414.2,
//   descriptionAmount:
//     'No se recibieron los USDT que se solicitaron en la transaccion BOBB020223',
//   type: 'QUEJA',
//   detail:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi urna, malesuada ac mi vitae, viverra vulputate diam. Mauris cursus, turpis eget sodales lacinia, arcu mauris interdum.',
//   orderDetail:
//     'In nisi urna, malesuada ac mi vitae, viverra vulputate diam. Mauris cursus, turpis eget sodales lacinia, arcu Suspendisse malesuada metus dapibus nunc sagittis, in tincidunt nunc auctor.',
// })
const claim = ref({
  fullname: '',
  numdoc: '',
  address: '',
  email: '',
  mobile: '',
  amountRequest: 0,
  descriptionAmount: '',
  type: 'RECLAMO',
  detail: '',
  orderDetail: '',
})
const objtArray = ref([
  {
    id: 'fullname',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'El nombre es requerido',
    espaciado: true,
    disabled: false,
  },
  {
    id: 'numdoc',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'El documento es requerido',
    espaciado: true,
    disabled: false,
  },
  {
    id: 'address',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'La direccion es requerido',
    espaciado: true,
    disabled: false,
  },
  {
    id: 'email',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'El correo es requerido',
    espaciado: true,
    disabled: false,
  },
  {
    id: 'mobile',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'El movil es requerido',
    espaciado: true,
    disabled: false,
  },
  {
    id: 'amountRequest',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: '',
    espaciado: true,
    disabled: false,
  },
  {
    id: 'descriptionAmount',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'La descripcion es requerido',
    espaciado: true,
    disabled: false,
  },
  {
    id: 'type',
    valuetext: 'RECLAMO',
    validation: false,
    isvalid: false,
    errorText: 'El DNI es requerido',
    espaciado: true,
    disabled: false,
  },
  {
    id: 'detail',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'Los detalles son requeridos',
    espaciado: true,
    disabled: false,
  },
  {
    id: 'orderDetail',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'El pedido es requerido',
    espaciado: true,
    disabled: false,
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
    claim.value.amountRequest = Number(e.target.value)
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
  callingPushClainStore()
}
const cleanForm = () => {
  const result = objtArray.value.map((val) => {
    val.valuetext = ''
    val.isvalid = false
    val.validation = false
    val.espaciado = true
  })
  console.log(result)
}
const doc = new jsPDF()

const downloadPdf = () => {
  doc.text('<p><>Hello world!', 10, 10)
  doc.save('a4.pdf')
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
            <div class="is-flex is-align-items-center is-align-content-center">
              <Button class="button-color mx-2" @click="downloadPdf">
                <IconBox size="medium " class="button-colorBox" rounded>
                  <i
                    class="iconify has-text-link"
                    data-icon="fa6-solid:file-pdf"
                  ></i>
                </IconBox>
              </Button>
              <Button v-print="'#printMe'" class="button-color mx-2">
                <IconBox size="medium" class="button-colorBox" rounded>
                  <i class="iconify has-text-link" data-icon="fa:print"></i>
                </IconBox>
              </Button>
            </div>
          </div>

          <Section class="formulario">
            <div id="printMe">
              <div
                class="columns is-flex is-justify-content-space-between mb-12 is-flex-wrap-wrap-reverse"
              >
                <div class="column is-9-desktop is-9-tablet is-12-mobile">
                  <div class="colorLinkReclamo">
                    <div class="is-flex columns is-flex-wrap-wrap-reverse m-0">
                      <p
                        class="titleForm has-text-weight-bold column is-12-mobile p-0"
                      >
                        INNOVADORA DIGITAL S.A.C.
                      </p>
                      <div
                        v-if="responseClainStore.success"
                        class="is-flex column is-12-mobile p-0 is-flex-wrap-wrap is-justify-content-center is-align-items-center"
                      >
                        <p class="titleForm has-text-weight-bold">
                          ESTADO ACTUAL:
                        </p>
                        <p class="color-responseClain ml-1 has-text-centered">
                          EN PROCESO
                        </p>
                      </div>
                    </div>

                    20378890161
                    <br />
                    Calle Vinatea Reynoso 525 urb. Simón Bolivar, JLByR,
                    Arequipa, Arequipa
                  </div>
                </div>

                <div
                  class="column is-3-desktop is-3-tablet is-12-mobile is-flex is-justify-content-space-between centradoLogo is-flex is-flex-direction-column"
                >
                  <img
                    src="/public/assets/logo/logo-dark.svg "
                    alt="logo"
                    class=""
                  />
                  <div
                    v-if="responseClainStore.success"
                    class="is-flex is-flex-direction-column mt-2 has-text-link"
                  >
                    <h4 class="has-text-right has-text-weight-bold is-size-5">
                      {{ responseClainStore.code }}
                    </h4>
                    <p class="has-text-right is-size-7">
                      Registrado : {{ stringResNewDate }}
                    </p>
                  </div>
                </div>
              </div>
              <Container class="Reclamos">
                <h3 class="titleForm has-text-weight-bold">
                  1. IDENTIFICACIÓN DEL CONSUMIDOR RECLAMANTE
                </h3>

                <div class="columns is-flex is-flex-wrap-wrap m-0">
                  <div class="column is-7-desktop is-12-mobile is-6-tablet">
                    <div
                      class="columns backp is-justify-content-space-between is-flex is-flex-wrap-wrap"
                    >
                      <div
                        class="column p-1 is-6-tablet is-4-desktop is-12-mobile is-flex is-justify-content-start is-align-items-center"
                      >
                        <p class="colorLinkReclamo mb-5">Nombres completos</p>
                      </div>

                      <Control
                        class="column p-1 is-6-tablet is-12-mobile is-8-desktop"
                        :error="objtArray[0].errorText"
                        :validation="objtArray[0].validation"
                        :is-valid="objtArray[0].isvalid"
                      >
                        <VInput
                          v-model="objtArray[0].valuetext"
                          type="text"
                          name="fullname"
                          :disabled="objtArray[0].disabled"
                          @keyup="valueNaN"
                        />
                        <div
                          v-if="objtArray[0].espaciado"
                          class="espaciado-plano"
                        ></div>
                      </Control>
                    </div>
                  </div>
                  <div class="column is-5-desktop is-12-mobile is-6-tablet">
                    <div
                      class="columns backr is-justify-content-space-between is-flex is-flex-wrap-wrap"
                    >
                      <div
                        class="column p-1 is-5-tablet is-4-desktop is-12-mobile is-flex is-justify-content-start is-align-items-center"
                      >
                        <p class="colorLinkReclamo mb-5">DNI / RUC / CE</p>
                      </div>
                      <Control
                        class="column p-1 is-7-tablet is-12-mobile is-8-desktop"
                        :error="objtArray[1].errorText"
                        :validation="objtArray[1].validation"
                        :is-valid="objtArray[1].isvalid"
                      >
                        <VInput
                          v-model="objtArray[1].valuetext"
                          type="text"
                          name="numdoc"
                          :disabled="objtArray[1].disabled"
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
                          :disabled="objtArray[2].disabled"
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
                          :disabled="objtArray[3].disabled"
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
                        class="column p-1 is-5-tablet is-12-mobile is-4-desktop is-flex is-justify-content-start is-align-items-center"
                      >
                        <p class="colorLinkReclamo mb-5">Teléfono/Celular</p>
                      </div>
                      <Control
                        class="column p-1 is-7-tablet is-8-desktop is-12-mobile"
                        :error="objtArray[4].errorText"
                        :validation="objtArray[4].validation"
                        :is-valid="objtArray[4].isvalid"
                      >
                        <VInput
                          v-model="objtArray[4].valuetext"
                          type="text"
                          name="mobile"
                          :disabled="objtArray[4].disabled"
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

                <div class="columns is-flex m-0">
                  <div class="column">
                    <div class="columns backp is-flex-wrap-wrap is-flex">
                      <div
                        class="column p-1 is-3-tablet is-2-desktop is-flex is-12-mobile is-justify-content-start is-align-items-center"
                      >
                        <p class="colorLinkReclamo mb-5">Monto reclamado</p>
                      </div>
                      <Control
                        class="column p-1 is-4-tablet is-12-mobile is-3-desktop"
                        :error="objtArray[5].errorText"
                        :validation="objtArray[5].validation"
                        :is-valid="objtArray[5].isvalid"
                      >
                        <VInput
                          v-model="objtArray[5].valuetext"
                          type="text"
                          name="amountRequest"
                          :disabled="objtArray[5].disabled"
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

                <div class="columns is-flex m-0">
                  <div class="column">
                    <div class="columns p-1 backp is-flex-wrap-wrap is-flex">
                      <div
                        class="column p-1 is-3-tablet is-2-desktop is-12-mobile is-flex is-justify-content-start is-align-items-center"
                      >
                        <p class="colorLinkReclamo mb-5">Descripción</p>
                      </div>
                      <Control
                        class="column p-1 is-12-mobile is-9-tablet is-10-desktop"
                        :error="objtArray[6].errorText"
                        :validation="objtArray[6].validation"
                        :is-valid="objtArray[6].isvalid"
                      >
                        <VInput
                          v-model="objtArray[6].valuetext"
                          type="text"
                          name="descriptionAmount"
                          :disabled="objtArray[6].disabled"
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

                <div class="my-1 if-flex">
                  <Radio
                    name="radio_first"
                    label="Reclamo"
                    group="radio-group-1"
                    color="default"
                    @click="claim.type = 'RECLAMO'"
                  />

                  <Radio
                    value="value_2"
                    name="radio_first"
                    label="Queja"
                    group="radio-group-2"
                    color="default"
                    @click="claim.type = 'QUEJA'"
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
                    :disabled="objtArray[8].disabled"
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
                    :disabled="objtArray[9].disabled"
                    @keyup="valueNaN"
                  />
                </Control>
              </Container>
            </div>
            <div v-if="objtArray[9].espaciado" class="espaciado-plano"></div>
            <div v-if="!responseClainStore.success">
              <div
                class="mt-3 is-flex is-justify-content-end columns is-6-mobile"
              >
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
                  @click="cleanForm"
                >
                  Limpiar formulario
                </Button>

                <Button
                  color="link"
                  size="medium"
                  rounded
                  :loading="buttonLoader"
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
          class="px-6 my-3"
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
                  class="column is-12-tablet is-12-desktop is-12-mobile is-flex is-align-items-center"
                >
                  <p class="colorLinkReclamo">Código de reclamo</p>
                </div>
                <Control
                  class="column is-12-tablet is-12-desktop is-12-mobile py-0 is-flex is-justify-content-center"
                >
                  <VInput
                    v-model="complaintGetJson.code"
                    type="text"
                    size="lg"
                    rounded
                    class=""
                  />
                </Control>
              </div>
            </div>
            <div class="column is-6-desktop is-12-mobile">
              <div
                class="columns backr is-flex is-flex-wrap-wrap is-flex-direction-column"
              >
                <div
                  class="column is-12-tablet is-12-mobile is-12-desktop is-flex is-align-items-center"
                >
                  <p class="colorLinkReclamo">Nro de DNI/RUC/CE</p>
                </div>
                <Control
                  class="column is-12-tablet is-12-desktop py-0 is-12-mobile"
                >
                  <VInput
                    v-model="complaintGetJson.numdoc"
                    type="text"
                    size="lg "
                    rounded
                  />
                </Control>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #action>
        <div class="is-flex is-flex-direction-column">
          <div class="is-flex is-justify-content-center">
            <Button
              color="link"
              size="large"
              class="mt-10 p-5 is-size-6"
              :loading="buttonLoaderCompalintGet"
              :long="2"
              raised
              @click="callingcomplaintGet"
            >
              Consultar estado
            </Button>
          </div>

          <div v-if="!ResMessage.success">
            <span class="is-size-7 has-text-danger">
              {{ ResMessage.message }}
            </span>
          </div>
          <div v-else></div>
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
  // border: #e5e5e5 solid 1px;
  // border-radius: 2px;
  // padding: 2px;
  & div {
    width: 1px;
  }
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
  transition: all 1s ease !important;
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