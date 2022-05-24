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
    console.log('hello')
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

function init() {}
//mounted
onBeforeMount(() => {})
onMounted(() => {
  loadTimer()
  getParams()
  init()
})
// AGREGANDO watch
watch(fiatAmount, (value) => {
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
        @fiat-Amount="setFiatAmount"
        @fiat-Currency="setFiatCurrency"
      />

      <CriptoVue
        :crypto-currencies="params.cryptoCurrenciesAvailable"
        :crypto-amount="cryptoAmount"
        :fiat-amout-local-string="fiatAmoutLocalString"
        @crypto-Amount="setCryptoAmount"
        @cryptoCurrency="setCryptoCurrency"
        @cryptoAmount="setCryptoAmount"
      />

      <Button
        size="large"
        rounded
        class="mt-4 full"
        color="primary"
        to="/register"
        raised
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