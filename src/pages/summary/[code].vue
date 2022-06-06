<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'

import { footer } from '/@src/data/footer'
import { useRoute } from 'vue-router'
import {
  registerData,
  LoginData,
  CallSummary,
} from '/@src/utils/api/backOffice'
const route = useRoute()

let currentDate = ref('')
let interval = ref<Timer>()
let time = ref('')

const copyTrue = ref(false)

const buttonRegister = ref(false)

const DNILogin = ref({
  typedoc: 'DNI',
  numdoc: '',
})
const textAlertValidationDNIlogin = ref('')

const isValidADNIlogin = ref(true)

const loginButtonLoader = ref(false)
const loginButtonAviable = ref(false)

function valDniLoign(e) {
  loginButtonAviable.value = true
  let data = e.target.value
  textAlertValidationDNIlogin.value = 'El DNI requiere de 8 digitos'
  isValidADNIlogin.value = false

  if (data.length > 7) {
    isValidADNIlogin.value = true
    loginButtonAviable.value = false
  }
}

const Login = async () => {
  console.log(DNILogin.value)
  loginButtonLoader.value = true

  // axios
  //   .post('http://127.0.0.1:8000/api/v1/session/username', DNILogin.value)
  //   .then((res) => {
  //     location.href = 'http://criptobank.pe/login'
  //     console.log(res.data)
  //     loginButtonLoader.value = false
  //   })
  //   .catch((e) => {
  //     console.error(e.response.data.message)
  //     isValidADNIlogin.value = false
  //     textAlertValidationDNIlogin.value = e.response.data.message
  //     loginButtonLoader.value = false
  //   })

  let respuesta = await LoginData(DNILogin.value)
  let resSuccess = respuesta.success
  let resMessage = respuesta.message

  if (resSuccess) {
    loginButtonLoader.value = false
    location.href = 'http://criptobank.pe/login'
  } else {
    loginButtonLoader.value = false
    isValidADNIlogin.value = false
    textAlertValidationDNIlogin.value = resMessage
    console.log(resMessage)
  }
}

// let ButtonAviable = ref(false)

function loadTimer() {
  const today = new Date()
  const monthNames = [
    'Enero',
    'Febrero',
    'Marzp',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agoto',
    'Setiembre',
    'Octubre',
    'Nov',
    'Diciembre',
  ]
  let weekdays = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ]

  currentDate.value =
    weekdays[today.getDay()] +
    ', ' +
    today.getDate() +
    ' ' +
    monthNames[today.getMonth()]
  interval.value = setInterval(() => {
    time.value = Intl.DateTimeFormat(navigator.language, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format()
  }, 1000)
}
function filterKey(e) {
  let code = e.keyCode

  let numeros = [
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 8, 37, 38, 39, 190, 97, 98, 99, 100,
    101, 102, 103, 104, 105, 110, 96,
  ]
  let verdad = numeros.some((numero) => numero === code)

  if (verdad) {
  } else {
    e.preventDefault()
  }
}
function filterNumber(e) {
  let code = e.keyCode

  let numeros = [
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 38, 190, 97, 98, 99, 100, 101, 102,
    103, 104, 105, 110, 96,
  ]
  let verdad = numeros.some((numero) => numero === code)

  if (verdad) {
    e.preventDefault()
  } else {
  }
}

function copy() {
  try {
    copyTrue.value = !copyTrue.value
    navigator.clipboard.writeText(ResCode.value.code)
  } catch (e) {
    throw e
  }
}

const ResCode = ref({
  code: '',
  crypto: {
    amount: 0,
    cx: '',
  },
  expires: '',
  fiat: {
    amount: 0,
    currency: '',
  },
  success: null,
  tc: 0,
})

const resJson = inject('resJson')
console.log(resJson)

const callCode = async () => {
  let respuesta = await CallSummary(route.params.code)
  console.log(respuesta.code)
  if (respuesta.success) {
    ResCode.value.code = respuesta.code
    ResCode.value.crypto = respuesta.crypto
    ResCode.value.fiat = respuesta.fiat
    ResCode.value.expires = respuesta.expires
    ResCode.value.tc = respuesta.tc
    ResCode.value.success = respuesta.success
  } else {
    location.href = `/`
  }
}

const objtArray = ref([
  {
    name: 'nombre',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'El nombre es requerido',
    espaciado: true,
  },
  {
    name: 'apellido',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'El apellido es requerido',
    espaciado: true,
  },
  {
    name: 'correo',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'El correo es requerido',
    espaciado: true,
  },
  {
    name: 'DNI',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'El DNI es requerido',
    espaciado: true,
  },
  {
    name: 'contrasena',
    valuetext: '',
    validation: false,
    isvalid: false,
    errorText: 'La password es requerido',
    espaciado: true,
  },
])
function valueNaN(e) {
  if (e.target.name === 'nombre') {
    firstname.value = e.target.value
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
  } else if (e.target.name === 'apellido') {
    lastname.value = e.target.value
    objtArray.value[1].errorText = 'El apellido es requerido'
    let data = e.target.value
    objtArray.value[1].validation = true
    objtArray.value[1].isvalid = false

    objtArray.value[1].espaciado = false
    if (data) {
      // ButtonAviable.value = false
      objtArray.value[1].isvalid = true

      objtArray.value[1].espaciado = true
    }
  } else if (e.target.name === 'correo') {
    email.value = e.target.value
    objtArray.value[2].errorText = 'El correo es requerido'
    let data = e.target.value
    objtArray.value[2].validation = true
    objtArray.value[2].isvalid = false

    objtArray.value[2].espaciado = false
    if (data) {
      // ButtonAviable.value = false
      objtArray.value[2].isvalid = true

      objtArray.value[2].espaciado = true

      if (!data.includes('@')) {
        objtArray.value[2].errorText = 'El correo requiere de "@" y ".'
        objtArray.value[2].isvalid = false

        objtArray.value[2].espaciado = false
      }
    }
  } else if (e.target.name === 'DNI') {
    numdoc.value = e.target.value
    objtArray.value[3].errorText = 'El DNI requiere de 8 digitos'
    let data = e.target.value
    objtArray.value[3].validation = true
    objtArray.value[3].isvalid = false

    objtArray.value[3].espaciado = false
    if (data.length === 8) {
      // ButtonAviable.value = false
      objtArray.value[3].isvalid = true

      objtArray.value[3].espaciado = true
    }
  } else if (e.target.name === 'passW') {
    passwd.value = e.target.value
    objtArray.value[4].errorText = 'El password es requerido'
    let data = e.target.value
    objtArray.value[4].validation = true
    objtArray.value[4].isvalid = false

    objtArray.value[4].espaciado = false
    if (data) {
      // ButtonAviable.value = false
      objtArray.value[4].isvalid = true

      objtArray.value[4].espaciado = true
    }
  }
}

const firstname = ref('')
const lastname = ref('')
const email = ref('')

const typedoc = ref('DNI')

const numdoc = ref('')

const passwd = ref('')

let fiatJson = ref({
  customer: {
    firstname: '',
    lastname: '',
    email: '',
  },
  session: {
    typedoc: '',
    numdoc: '',
    passwd: '',
  },
})
const inyectarDatos = async () => {
  // e.preventDefault();

  fiatJson.value.customer.firstname = firstname.value
  fiatJson.value.customer.lastname = lastname.value
  fiatJson.value.customer.email = email.value
  fiatJson.value.session.typedoc = typedoc.value
  fiatJson.value.session.numdoc = numdoc.value
  fiatJson.value.session.passwd = passwd.value

  buttonRegister.value = true

  let respuesta = await registerData(fiatJson.value)
  let resSuccess = respuesta.success
  let resMessage = respuesta.message

  if (resSuccess) {
    buttonRegister.value = false
    location.href = 'http://criptobank.pe/login'
  } else {
    buttonRegister.value = false
    console.log(resMessage)
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
  inyectarDatos()
}
// watch(objtArray.value,(value ,anterior)=>{
//     // if(){

//     //   console.log(value.valuetext1)
//     // }
// })
onMounted(() => {
  callCode()
  console.log(objtArray.value)
  loadTimer()
})
</script>

<route lang="yaml">
meta:
  layout: default
</route>

<template >
  <section>
    <div
      class="banner is-fullheight hero is-fullheight is-grey has-mask product-hero banner-full is-flex is-align-items-center is-justify-content-center"
    >
      <div class="illustration">
        <img src="/assets/images/banner-bg-1.png" alt="" class="one" />
        <img src="/assets/images/banner-bg-2.png" alt="" class="two" />
        <img src="/assets/images/banner-map.png" alt="" class="three" />
      </div>
      <div class="hero-area">
        <div class="container containerwidth">
          <div
            class="columns align-items-center is-flex-wrap-wrap is-justify-content-center"
          >
            <div
              class="column is-two-thirds is-6-tablet is-7-desktop is-flex is-align-items-center is-flex-direction-column mx-4"
            >
              <div class="Divtext my-6">
                <h1 class="Empecemos">Empecemos!</h1>
                <p class="text sub-EMP my-4">
                  Ingresa tus datos o inicia sesión para adquirir las
                  criptomonedas en tu wallet.
                </p>
              </div>
              <div class="Register-login-div columns">
                <div class="register-Div column">
                  <div class="text-register-div">
                    <h2 class="input-Title mb-5">Registar Cuenta</h2>
                  </div>
                  <div class="container-input-register">
                    <Control
                      :error="objtArray[0].errorText"
                      :validation="objtArray[0].validation"
                      :is-valid="objtArray[0].isvalid"
                    >
                      <VInput
                        v-model="objtArray[0].valuetext"
                        type="text"
                        class="radius"
                        name="nombre"
                        placeholder="Nombres"
                        required
                        @keydown="filterNumber"
                        @keyup="valueNaN"
                      />
                    </Control>
                    <div
                      v-if="objtArray[0].espaciado"
                      class="espaciado-plano"
                    ></div>
                    <Control
                      :error="objtArray[1].errorText"
                      :validation="objtArray[1].validation"
                      :is-valid="objtArray[1].isvalid"
                    >
                      <VInput
                        v-model="objtArray[1].valuetext"
                        type="text"
                        class="radius"
                        name="apellido"
                        placeholder="Apellidos"
                        required
                        @keydown="filterNumber"
                        @keyup="valueNaN"
                      />
                    </Control>
                    <div
                      v-if="objtArray[1].espaciado"
                      class="espaciado-plano"
                    ></div>
                    <Control
                      :error="objtArray[2].errorText"
                      :validation="objtArray[2].validation"
                      :is-valid="objtArray[2].isvalid"
                    >
                      <VInput
                        v-model="objtArray[2].valuetext"
                        type="email"
                        required
                        name="correo"
                        class="radius"
                        placeholder="Correo electronico"
                        @keyup="valueNaN"
                      />
                    </Control>
                    <div
                      v-if="objtArray[2].espaciado"
                      class="espaciado-plano"
                    ></div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <Control
                      :error="objtArray[3].errorText"
                      :validation="objtArray[3].validation"
                      :is-valid="objtArray[3].isvalid"
                    >
                      <VInput
                        v-model="objtArray[3].valuetext"
                        type="text"
                        name="DNI"
                        class="radius"
                        placeholder="DNI"
                        required
                        maxlength="8"
                        @keydown="filterKey"
                        @keyup="valueNaN"
                      />
                    </Control>
                    <div
                      v-if="objtArray[3].espaciado"
                      class="espaciado-plano"
                    ></div>
                    <Control
                      :error="objtArray[4].errorText"
                      :validation="objtArray[4].validation"
                      :is-valid="objtArray[4].isvalid"
                    >
                      <VInput
                        v-model="objtArray[4].valuetext"
                        name="passW"
                        type="password"
                        class="radius"
                        placeholder="Crear contrasena"
                        @keyup="valueNaN"
                      />
                    </Control>
                    <div
                      v-if="objtArray[4].espaciado"
                      class="espaciado-plano"
                    ></div>
                    <div class="is flex is-justify-content-end">
                      <div class="">
                        <!-- cambio white -->
                        <Button
                          size="medium"
                          class="button is-rounded is-raised"
                          :loading="buttonRegister"
                          color="link"
                          @click="funcion"
                        >
                          Registrate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="login-Div column">
                  <div class="text-login-div">
                    <h2 class="input-Title mb-5">Ya tengo Cuenta</h2>
                  </div>

                  <div class="container-input-login">
                    <Control
                      validation
                      :is-valid="isValidADNIlogin"
                      :error="textAlertValidationDNIlogin"
                    >
                      <VInput
                        v-model="DNILogin.numdoc"
                        type="text "
                        class="radius"
                        placeholder="DNI"
                        required
                        maxlength="8"
                        @keydown="filterKey"
                        @keyup="valDniLoign"
                      />
                    </Control>

                    <div class="is flex is-justify-content-end">
                      <Button
                        size="medium"
                        :loading="loginButtonLoader"
                        :disabled="loginButtonAviable"
                        color="link"
                        class="button is-rounded is-raised mt-4"
                        @click="Login"
                      >
                        Iniciar sesion
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="Fiat-Exchange-DIV exchange column is-4-tablet is-4-desktop wow fadeInRightBig mx-4"
              data-wow-delay="0.3s"
              data-wow-duration="0.5s"
            >
              <h5 class="ex-head">
                Fiat
                <br />
                Exchange
              </h5>
              <div class="timerlive is-flex is-justify-content-center">
                <small class="colorFecha mb-4">
                  {{ currentDate }} {{ time }}
                </small>
              </div>
              <div class="env-res-div is-flex is-flex-direction-column">
                <div class="is-flex is-justify-content-space-between my-2">
                  <h4 class="title-env-res">Tu Envias</h4>

                  <p class="number-en-res">
                    {{ ResCode.fiat.amount }} {{ ResCode.fiat.currency }}
                  </p>
                </div>
                <div class="is-flex is-justify-content-space-between my-2">
                  <h4 class="title-env-res">Recibiras</h4>
                  <p class="number-en-res">
                    {{ ResCode.crypto.amount }} {{ ResCode.crypto.cx }}
                  </p>
                </div>
              </div>
              <hr width="100%" class="new1" />
              <div class="">
                <div class="is-flex is-justify-content-space-between my-2">
                  <p class="code-Tras">Código de transacción:</p>
                  <div class="is-flex is-flex is-justify-content-end">
                    <p class="number-tras">{{ ResCode.code }}</p>
                    <button class="buttonCOPY" @click="copy">
                      <i class="iconify" data-icon="akar-icons:copy"></i>
                    </button>
                  </div>
                </div>
                <div class="is-flex is-justify-content-end">
                  <p v-if="copyTrue" class="text-true-copy">Codigo Copiado</p>
                  <p v-else class="br-text"></p>
                </div>

                <div class="is-flex is-justify-content-space-between my-2">
                  <p class="code-Tras">Tipo de cambio:</p>
                  <p class="number-tras">S/ {{ ResCode.tc }}0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer :content="footer" color="dark" />
  </section>
</template>


<style  scoped lang="scss">
.white {
  background: white;

  // height: 48px;
  border-radius: 18px !important;
}
.banner-full {
  width: 100% !important;
}

.espaciado-plano {
  height: 22px;
  width: 100%;
}
.new1 {
  border-top: 1px solid #903eff;
}
.text-true-copy {
  font-size: 12px;
  color: #903eff;
}
.br-text {
  height: 18px;
  background: red;
}
.Fiat-Exchange-DIV {
  height: 50%;
}
.buttonCOPY {
  margin: none;
  background: transparent;
  border: none;
  color: #33276a;
  font-size: 17px;
}
.buttonCOPY:hover {
  cursor: pointer;
}
.buttonCOPY:active {
  cursor: auto;
}
.Empecemos {
  color: var(---6042f9);
  text-align: left;
  // font: normal normal 600 36px/46px 'Open Sans';
  font-size: 36px;
  font-weight: 600;
  line-height: normal;
  color: var(--link);
}
.sub-EMP {
  font-family: 'Open Sans', sans-serif !important;
  font-size: 24px !important;
  line-height: 34px !important;
  font-weight: 500 !important;
  color: #283252;
}
.input-Title {
  color: var(--unnamed-color-33276a);
  text-align: left;

  // font: normal normal 600 18px/28px Open Sans;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;

  color: #283252;
  opacity: 1;
}
.colorFecha {
  color: #4f457c !important;
  font-size: 14.4px !important;
}
.radius {
  border-radius: 12px !important;
  // margin: 7.5px 0;
}
// .fullBsum {
//   font-family: 'Open Sans', sans-serif !important;
//   border-radius: 18px !important;
//   font-weight: 600;
//   border: 0 !important;
//   background: linear-gradient(45deg, #903eff 0%, #3e19ff 100%) !important;
//   // background-image: linear-gradient(45deg, rgb(144, 62, 255) 0%, rgb(62, 25, 255) 100%);
// }
// .fullBsum:hover {
//   color: #fff;
//   border: 0 !important;
//   background: linear-gradient(45deg, #3e19ff 0%, #903eff 100%) !important;
// }

// .banner {
//   padding-top: 265px !important;
// }
.title-env-res {
  color: #7703fc;
  font-size: 18px;
  align-items: center;
  display: flex;
  text-align: center;
  justify-content: center;
}
.number-en-res {
  color: #4f457c;
  font-size: 24px;
}
.code-Tras {
  color: #7703fc;
  font-size: 14.4px;
}
.number-tras {
  font-size: 14.4px;
}
</style>