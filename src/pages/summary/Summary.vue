<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import axios from 'axios'

import { useRoute } from 'vue-router'

const route = useRoute()

let currentDate = ref('')
let interval = ref<Timer>()
let time = ref('')

const copyTrue = ref(false)

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
    numdoc: 0,
    passwd: '',
  },
})

const buttonRegister = ref(false)

function MandarDatos() {
  // if (firstname.value.length>0 && lastname.value.length>0 && email.value.length>0 && numdoc.value.length>0 && passwd.value.length>0){

  //     console.log("el archivo puede pasar")

  // }else{
  //    console.log("el archivo no puede pasar")
  //     isValidName.value=false
  // }
  if (
    firstname.value.length == 0 &&
    lastname.value.length == 0 &&
    email.value.length == 0 &&
    numdoc.value.length == 0 &&
    passwd.value.length == 0
  ) {
    textAlertValidationPassword.value = 'El password es requerido'
    isValidPassword.value = false
    textAlertValidationDNI.value = 'El DNI es requerido'
    isValidADNI.value = false
    textAlertValidationCorreo.value = 'El Correo es requerido'
    isValidACorreo.value = false
    textAlertValidationApellido.value = 'El Apellido es requerido'
    isValidApellido.value = false
    textAlertValidationName.value = 'El nombre es requerido'
    isValidName.value = false
  } else {
    if (firstname.value.length > 0) {
      if (lastname.value.length > 0) {
        if (email.value.length > 0) {
          if (numdoc.value.length > 0) {
            if (passwd.value.length > 0) {
              console.log('el archivo puede pasar')
            } else {
              textAlertValidationPassword.value = 'El password es requerido'
              isValidPassword.value = false
            }
          } else {
            textAlertValidationDNI.value = 'El DNI es requerido'
            isValidADNI.value = false
          }
        } else {
          textAlertValidationCorreo.value = 'El Correo es requerido'
          isValidACorreo.value = false
        }
      } else {
        textAlertValidationApellido.value = 'El Apellido es requerido'
        isValidApellido.value = false
      }
    } else {
      textAlertValidationName.value = 'El nombre es requerido'
      isValidName.value = false

      console.log('el archivo no puede pasar')
    }
  }
}

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

function Login() {
  console.log(DNILogin.value)
  loginButtonLoader.value = true
  axios
    .post('http://127.0.0.1:8000/api/v1/session/username', DNILogin.value)
    .then((res) => {
      location.href = 'http://criptobank.pe/login'
      console.log(res.data)
      loginButtonLoader.value = false
    })
    .catch((e) => {
      console.error(e.response.data.message)
      isValidADNIlogin.value = false
      textAlertValidationDNIlogin.value = e.response.data.message
      loginButtonLoader.value = false
    })
}
function inyectarDatos(e) {
  // e.preventDefault();

  fiatJson.value.customer.firstname = firstname.value
  fiatJson.value.customer.lastname = lastname.value
  fiatJson.value.customer.email = email.value
  fiatJson.value.session.typedoc = typedoc.value
  fiatJson.value.session.numdoc = numdoc.value
  fiatJson.value.session.passwd = passwd.value

  buttonRegister.value = true
  console.log(fiatJson.value)

  axios
    .post('http://127.0.0.1:8000/api/v1/session/register', fiatJson.value)
    .then((res) => {
      e.preventDefault()
      location.href = 'http://criptobank.pe/login'
      console.log(res.data)
      buttonRegister.value = false
      console.log(res.data)
    })
    .catch((error) => {
      console.log(error.response.data.message)
      buttonRegister.value = false
      MandarDatos()
    })
}
let ButtonAviable = ref(false)
function valname(e) {
  ButtonAviable.value = true

  if (e.target.name === 'nombre') {
    textAlertValidationName.value = 'El nombre es requerido'
    let data = e.target.value
    isValidName.value = false
    if (data) {
      ButtonAviable.value = false
      isValidName.value = true
    }
  } else if (e.target.name === 'apellido') {
    let data = e.target.value
    textAlertValidationApellido.value = 'El Apellido es requerido'
    isValidApellido.value = false
    if (data) {
      isValidApellido.value = true
    }
  } else if (e.target.name === 'correo') {
    let data = e.target.value
    textAlertValidationCorreo.value = 'El Correo es requerido'
    isValidACorreo.value = false

    if (data) {
      isValidACorreo.value = true

      if (!data.includes('@')) {
        textAlertValidationCorreo.value = 'El correo requiere de "@" y ".'
        isValidACorreo.value = false
      }
    }
  } else if (e.target.name === 'DNI') {
    let data = e.target.value
    textAlertValidationDNI.value = 'El DNI requiere de 8 digitos'
    isValidADNI.value = false

    if (data.length > 7) {
      isValidADNI.value = true
    }
  } else if (e.target.name === 'passW') {
    let data = e.target.value
    textAlertValidationPassword.value = 'El password es requerido'
    isValidPassword.value = false
    if (data) {
      isValidPassword.value = true
    }
  }
}

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
    navigator.clipboard.writeText(Code.value)
  } catch (e) {
    throw e
  }
}

const textAlertValidationName = ref('')
const validationName = ref(true)
const isValidName = ref(true)

const textAlertValidationCorreo = ref('')
const validationCorreo = ref(true)
const isValidACorreo = ref(true)

const textAlertValidationDNI = ref('')
// const validationDNI = ref(true)
const isValidADNI = ref(true)

const textAlertValidationPassword = ref('')
const isValidPassword = ref(true)
// const validationPassword = ref(true)

const textAlertValidationApellido = ref('')
const validationApellido = ref(true)
const isValidApellido = ref(true)

// function asd(){
//   function validadionName(e) {
//   let data = e.target.value
//   // console.log(data)
//   textAlertValidationName.value = 'El nombre es requerido'

//   isValidName.value = false
//   if (data) {
//     isValidName.value = true
//     console.log('hola')
//   }
// }
// function validadionApellido(e) {
//   let data = e.target.value
//   console.log(data)
//   textAlertValidationApellido.value = 'El Apellido es requerido'
//   isValidApellido.value = false
//   if (data) {
//     isValidApellido.value = true
//   }
// }
// function validarDNI(e){
//   let data = e.target.value
//   textAlertValidationDNI.value = 'El DNI es requerido'
//   isValidADNI.value = false
//   if(data){
//       isValidADNI.value = true
//   }
// }
// function validarPassword(e){
//   let data = e.target.value
//   textAlertValidationPassword.value = 'El password es requerido'
//   isValidPassword.value = false
//   if(data){
//       isValidPassword.value = true
//   }
// }
// function validadionCorreo(e) {
//   let data = e.target.value
//   textAlertValidationCorreo.value = 'El Correo es requerido'
//   isValidACorreo.value = false

//   if (data) {
//     isValidACorreo.value = true
//     console.log(data)
//     if (!data.includes('@')) {
//       textAlertValidationCorreo.value = 'El correo requiere de "@" y ".'
//       isValidACorreo.value = false
//     }
//   }
// }
// }

//

// const Link=ref("http://criptobank.pe/login")
//

//
const successRes = ref('')
const Code = ref('')
const tc = ref('')
const expiresRes = ref('')
const fiatcurrency = ref()
const fiatAmount = ref()
const criptoCx = ref()
const criptoAmount = ref()

const resJson = inject('resJson')
console.log(resJson)

function RetunQuer() {
  let codigoT = route.query
  let ArrayCode = Object.values(codigoT)

  successRes.value = ArrayCode[0]

  Code.value = ArrayCode[1]

  tc.value = ArrayCode[2]

  expiresRes.value = ArrayCode[3]

  fiatcurrency.value = ArrayCode[4]

  fiatAmount.value = ArrayCode[5]

  criptoCx.value = ArrayCode[6]

  criptoAmount.value = ArrayCode[7]
}
onMounted(() => {
  loadTimer()
  RetunQuer()
})
</script>

<route lang="yaml">
meta:
  layout: default
</route>

<template>
  <section>
    <div class="banner">
      <div class="illustration">
        <img src="/assets/images/banner-bg-1.png" alt="" class="one" />
        <img src="/assets/images/banner-bg-2.png" alt="" class="two" />
        <img src="/assets/images/banner-map.png" alt="" class="three" />
      </div>
      <div class="hero-area">
        <div class="container">
          <!-- <div
            class="columns align-items-center is-flex is-flex-wrap-wrap is-justify-content-center"
          > -->
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
                      :error="textAlertValidationName"
                      :validation="validationName"
                      :is-valid="isValidName"
                    >
                      <VInput
                        v-model="firstname"
                        type="text"
                        class="radius"
                        name="nombre"
                        placeholder="Nombres"
                        required
                        @keydown="filterNumber"
                        @keyup="valname"
                      />
                    </Control>
                    <div v-if="isValidName" class="espaciado-plano"></div>
                    <Control
                      :validation="validationApellido"
                      :is-valid="isValidApellido"
                      :error="textAlertValidationApellido"
                    >
                      <VInput
                        v-model="lastname"
                        type="text"
                        class="radius"
                        name="apellido"
                        placeholder="Apellidos"
                        required
                        @keydown="filterNumber"
                        @keyup="valname"
                      />
                    </Control>
                    <div v-if="isValidApellido" class="espaciado-plano"></div>
                    <Control
                      :validation="validationCorreo"
                      :is-valid="isValidACorreo"
                      :error="textAlertValidationCorreo"
                    >
                      <VInput
                        v-model="email"
                        type="email"
                        required
                        name="correo"
                        class="radius"
                        placeholder="Correo electronico"
                        @keyup="valname"
                      />
                    </Control>
                    <div v-if="isValidACorreo" class="espaciado-plano"></div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <Control
                      validation
                      :is-valid="isValidADNI"
                      :error="textAlertValidationDNI"
                    >
                      <VInput
                        v-model="numdoc"
                        type="text"
                        name="DNI"
                        class="radius"
                        placeholder="DNI"
                        required
                        maxlength="8"
                        @keyup="valname"
                      />
                    </Control>
                    <div v-if="isValidADNI" class="espaciado-plano"></div>
                    <Control
                      validation
                      :is-valid="isValidPassword"
                      :error="textAlertValidationPassword"
                    >
                      <VInput
                        v-model="passwd"
                        name="passW"
                        type="password"
                        class="radius"
                        placeholder="Crear contrasena"
                        @keyup="valname"
                      />
                    </Control>
                    <div v-if="isValidPassword" class="espaciado-plano"></div>
                    <div class="is flex is-justify-content-end">
                      <div class="white">
                        <Button
                          size="medium"
                          class="button is-primary is-rounded is-raised fullBsum"
                          :loading="buttonRegister"
                          @click="inyectarDatos"
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
                        class="button is-primary is-rounded is-raised mt-4 fullBsum"
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
                    {{ fiatAmount }} {{ fiatcurrency }}
                  </p>
                </div>
                <div class="is-flex is-justify-content-space-between my-2">
                  <h4 class="title-env-res">Recibiras</h4>
                  <p class="number-en-res">{{ criptoCx }} {{ criptoAmount }}</p>
                </div>
              </div>
              <hr width="100%" />
              <div class="">
                <div class="is-flex is-justify-content-space-between my-2">
                  <p class="code-Tras">Código de transacción:</p>
                  <div class="is-flex is-flex is-justify-content-end">
                    <p class="number-tras">{{ Code }}</p>
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
                  <p class="number-tras">S/ {{ tc }}0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style  scoped lang="scss">
.white {
  background: white;

  // height: 48px;
  border-radius: 18px !important;
}
.espaciado-plano {
  height: 22px;
  width: 100%;
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
  color: #6042f9;
}
.sub-EMP {
  font-family: 'Open Sans', sans-serif !important;
  font-size: 24px !important;
  line-height: 34px !important;
  font-weight: 500 !important;
  color: #4f457c;
}
.input-Title {
  color: var(--unnamed-color-33276a);
  text-align: left;

  // font: normal normal 600 18px/28px Open Sans;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;

  color: #33276a;
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
.fullBsum {
  font-family: 'Open Sans', sans-serif !important;
  border-radius: 18px !important;
  font-weight: 600;
  border: 0 !important;
  background: linear-gradient(45deg, #903eff 0%, #3e19ff 100%) !important;
  // background-image: linear-gradient(45deg, rgb(144, 62, 255) 0%, rgb(62, 25, 255) 100%);
}
.fullBsum:hover {
  color: #fff;
  border: 0 !important;
  background: linear-gradient(45deg, #3e19ff 0%, #903eff 100%) !important;
}

// .banner {
//   padding-top: 265px !important;
// }
.title-env-res {
  color: #6042f9;
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
  color: #6129eb;
  font-size: 14.4px;
}
.number-tras {
  font-size: 14.4px;
}
</style>