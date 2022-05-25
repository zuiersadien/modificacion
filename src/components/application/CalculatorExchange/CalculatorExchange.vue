<script setup lang="ts">
import CriptoVue from './Cripto.vue'
import FiatVue from './Fiat.vue'
import { ref, onMounted, watch, onBeforeMount } from 'vue'
import axios from 'axios'

type InputDefaultCalculatorExchangeType = 'fiat' | 'crypto'
type StatesCalulatorType = 'loading' | 'success' | 'error'
export type FiatCurrencyType = 'PEN' | 'USD'
type fiatAmoutLocalString = String
// type CryptoCurrencyType = 'USDT'

export interface CalculatorExchangeProps {
  inputDefault?: InputDefaultCalculatorExchangeType
}

withDefaults(defineProps<CalculatorExchangeProps>(), {
  inputDefault: 'fiat',
})

let state = ref<StatesCalulatorType>('loading')
// let orderInputs = ref(true)
// let fiatAmount = ref(0)
// let fiatCurrency = ref<FiatCurrencyType>('PEN')
// let cryptoAmount = ref(0)
// let cryptoCurrency = ref<CryptoCurrencyType>('USDT')
// let lastInputEdited = ref(null)
let currentDate = ref('')
let interval = ref<Timer>()
let time = ref('')
let params = ref({})

const getParams = async () => {
  state.value = 'loading'
  // let urlAPI = import.meta.env.VITE_APP_API
  let urlAPI = 'https://criptobank.pe/api'

  axios
    .get(urlAPI + '/params')
    .then((response) => {
      state.value = 'success'
      params.value = response.data
      tcPenUsd.value = params.value.tc.penusd
    })
    .catch((error) => {
      state.value = 'error'
      if (!error.response) {
        console.log(error)
      } else {
        console.log(error.response.data.message)
      }
    })
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
//

// valores
const fiatAmount = ref(0)
const cryptoAmount = ref(0)
const tcPenUsd = ref(0)

const fiatAmoutLocalString = ref('0')
const cryptoCurrency = ref('tether')
const fiatCurrency = ref('PEN')
const lastInputEdited = ref(null)

// function separadorMillares(numero) {
//   fiatAmoutLocalString.value = numero
//     .toString()
//     .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

//   console.log(fiatAmoutLocalString.value)
// }
// function numberWithCommas(x) {
// let uno= x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//    let uno = x.toString().replace(/[^A-Z\d-]/g, "")

//     // uno=fiatAmoutLocalString.value
//     console.log(x)
// }
// button
const ButtonAviable = ref(false)

function disableButton(mesage) {
  console.log(mesage)
  if (mesage) {
    ButtonAviable.value = false
  } else {
    ButtonAviable.value = true
  }
}
//
function setFiatAmount(val) {
  let amount = parseFloat(val)
  fiatAmount.value = amount
  updateCryptoAmountFromFiat(amount)
  lastInputEdited.value = 'setFiatAmount'
}
function ComasenValor(val) {
  let internationalNumberFormat = new Intl.NumberFormat('en-US')

  fiatAmoutLocalString.value = internationalNumberFormat.format(val)

  // let stringVar = String(val)
  // let nummer=internationalNumberFormat.format(Number(stringVar).toFixed(2))

  if (fiatAmoutLocalString.value === 'NaN') {
    fiatAmoutLocalString.value = '0'
  } else {
    fiatAmoutLocalString.value = internationalNumberFormat.format(val)

    // if(stringVar.includes(".")){
    //   fiatAmoutLocalString.value=nummer
    //   console.log( fiatAmoutLocalString.value)
    // }
  }
}
const setFiatCurrency = (val) => {
  fiatCurrency.value = val
  if (lastInputEdited.value === 'setFiatAmount') {
    updateCryptoAmountFromFiat()
    fiatAmoutLocalString.value = 0
    fiatAmount.value = 0
    cryptoAmount.value = 0
  }
  if (lastInputEdited.value === 'setCryptoAmount') {
    updateFiatAmountFromCrypto()
    fiatAmoutLocalString.value = 0
    cryptoAmount.value = 0
    fiatAmount.value = 0
  }
}
function setCryptoAmount(val) {
  cryptoAmount.value = parseFloat(val)

  updateFiatAmountFromCrypto(cryptoAmount.value)
  lastInputEdited.value = 'setCryptoAmount'
}

function setCryptoCurrency(val) {
  cryptoCurrency.value = val

  updateCryptoAmountFromFiat()
}

const updateCryptoAmountFromFiat = async (fiatAmount = 0) => {
  let totalUSDT = 0
  let amount = fiatAmount === 0 ? fiatAmount.value : fiatAmount
  let fiatCharge = params.value.fiatCharge.find(
    (fiat) => fiat.code === fiatCurrency.value
  )
  let charge = 1 + fiatCharge.chargePercentage / 100

  switch (fiatCurrency.value) {
    case 'PEN':
      totalUSDT = amount / params.value.tc.penusd / charge
      break

    case 'USD':
      totalUSDT = amount / charge
      break

    default:
      break
  }

  let cryptoCharge = params.value.cryptoCharge.find(
    (crypto) => crypto.code === cryptoCurrency.value
  )

  cryptoAmount.value = Number(
    (totalUSDT - cryptoCharge.charge).toFixed(2) + '0'
  )
  ComasenValor(fiatAmount)
}

const updateFiatAmountFromCrypto = (cryptoAmount = 0) => {
  let totalUSD = 0
  let amount = cryptoAmount === 0 ? cryptoAmount.value : cryptoAmount
  let fiatCharge = params.value.fiatCharge.find(
    (fiat) => fiat.code === fiatCurrency.value
  )
  let charge = 1 + fiatCharge.chargePercentage / 100

  switch (fiatCurrency.value) {
    case 'PEN':
      totalUSD = amount * params.value.tc.penusd * charge
      break

    case 'USD':
      totalUSD = amount * charge
      break

    default:
      break
  }

  fiatAmount.value = Number(totalUSD.toFixed(1) + '0')
  ComasenValor(fiatAmount.value)
}

// const validation=ref(false)
// const isValid=ref(true)
// const isInvalid=ref(true)
// const minSoles=ref(100)

// const textvalAlert=ref("")

// function MaxMIN(){

//     if(fiatAmount.value<=minSoles.value){
//       textvalAlert.value =`el valor minimo es s/${minSoles.value}`
//       console.log(textvalAlert.value)
//       validation.value=true
//       isValid.value=false
//         // emit('disableButton',  isValid.value)
//     }else{
//       isValid.value=true
//         // emit('disableButton',  isValid.value)
//      console.log("valor correcto")
//     }

// }

function init() {}
//mounted
onBeforeMount(() => {})
onMounted(() => {
  loadTimer()
  getParams()
  init()
})

const validationCripto = ref(false)
const validationFiat = ref(false)

const isValid = ref(true)

const minSoles = ref(100)

const textvalAlertFiat = ref('')
const textvalAlertCripto = ref('')
// AGREGANDO watch

function FiatValidation() {
  console.log('asdasdasdsadsda')
  if (fiatAmount.value <= minSoles.value) {
    textvalAlertFiat.value = `el valor minimo es s/${minSoles.value}`

    validationFiat.value = true
    validationCripto.value = false
    isValid.value = false
    disableButton(isValid.value)
  } else {
    isValid.value = true

    disableButton(isValid.value)
    console.log('valor correcto')
  }
}
function CriptoValidation() {
  console.log('asdasdasdsadsda')
  if (fiatAmount.value <= minSoles.value) {
    textvalAlertCripto.value = `el importe minimo es ${minSoles.value} USDT`

    isValid.value = false

    validationFiat.value = false
    validationCripto.value = true
    disableButton(isValid.value)
  } else {
    isValid.value = true

    disableButton(isValid.value)
    console.log('valor correcto')
  }
}
const Buttonloading = ref(false)
function Submit() {
  Buttonloading.value = true
  setTimeout(() => {
    Buttonloading.value = false
  }, 2000)
}
watch(fiatAmount, (value) => {
  console.log(value)

  if (isNaN(value)) {
    fiatAmount.value = 0
    cryptoAmount.value = 0
  }
})

watch(cryptoAmount, (value) => {
  if (isNaN(value)) {
    fiatAmount.value = 0
    cryptoAmount.value = 0
  }
})
//
</script>

<template>
  <div>
    <div class="timerlive is-flex is-justify-content-flex-end">
      <small class="smallColor">{{ currentDate }} {{ time }}</small>
    </div>

    <div class="exchange">
      <h5 class="ex-head">
        Fiat
        <br />
        Exchange
      </h5>

      <FiatVue
        :fiat-amount="fiatAmount"
        :fiat-charge="params.fiatCharge"
        :tc-pen-usd="tcPenUsd"
        :currencies="params.fiatCurrenciesAvailable"
        :fiat-amout-local-string="fiatAmoutLocalString"
        :validation="validationFiat"
        :textval-alert-fiat="textvalAlertFiat"
        :is-valid="isValid"
        @fiat-Amount="setFiatAmount"
        @fiat-Currency="setFiatCurrency"
        @disableButton="disableButton"
        @keyup="FiatValidation"
      />

      <CriptoVue
        :crypto-currencies="params.cryptoCurrenciesAvailable"
        :crypto-amount="cryptoAmount"
        :fiat-amout-local-string="fiatAmoutLocalString"
        :validation="validationCripto"
        :textval-alert-cripto="textvalAlertCripto"
        :is-valid="isValid"
        @crypto-Amount="setCryptoAmount"
        @cryptoCurrency="setCryptoCurrency"
        @cryptoAmount="setCryptoAmount"
        @disableButton="disableButton"
        @keyup="CriptoValidation"
      />

      <Button
        size="large"
        rounded
        :disabled="ButtonAviable"
        class="mt-4 full"
        color="primary"
        raised
        :loading="Buttonloading"
        type="submit"
        @click="Submit"
      >
        Comprar
      </Button>
    </div>
    <div class="timerlive is-flex is-justify-content-flex-end">
      <a class="smallColor vender">¿Deseas vender tus USDT?</a>
    </div>
  </div>
</template>
<style  lang="scss">
.smallColor {
  color: #6129eb;
}

.vender {
  margin-top: 3px;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  color: #4938a2;
  line-height: 1.75;
  padding-top: 6px;
}

.full {
  font-family: 'Open Sans', sans-serif !important;
  width: 100%;
  font-weight: 600;
  border: none;
  background: linear-gradient(45deg, #903eff 0%, #3e19ff 100%) !important;
  // background-image: linear-gradient(45deg, rgb(144, 62, 255) 0%, rgb(62, 25, 255) 100%);
}

.full:hover {
  color: #fff;
  background: linear-gradient(45deg, #3e19ff 0%, #903eff 100%) !important;
}

.input.size-lg[data-v-76af6636] {
  color: var(--input-base-color) !important;
}
</style>