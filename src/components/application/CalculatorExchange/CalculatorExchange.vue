<script setup lang="ts">
import CriptoVue from './Cripto.vue'
import FiatVue from './Fiat.vue'
// import { getArticles } from '../../../utils/api/article'
import { CallBackOffice, sendQuoteBuy } from '/@src/utils/api/backOffice'

// import {useRoute} from "vue-router"
import { ref, onMounted, watch } from 'vue'
// import axios from 'axios'
import { provide } from 'vue'
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

let fiatAmount = ref(0)
let cryptoAmount = ref(0)
let tcPenUsd = ref(0)
let fiatAmoutLocalString = ref('0')
let cryptoCurrency = ref('tether')
let fiatCurrency = ref('PEN')
let lastInputEdited = ref(null)
let ButtonAviable = ref(true)

let currentDate = ref('')
let interval = ref<Timer>()
let time = ref('')
let params = ref({})
// let susuccess=false
// let stateRes=ref("start")
let fiatJson = ref({
  fiat: {
    currency: '',
    amount: 0,
  },
})
// let prueba = ref('')

const resJson = ref('12321')

provide('resJson', resJson)

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

function init() {
  loadTimer()
  getParams()
}

onMounted(() => {
  init()
})

const getParams = async () => {
  let response = await CallBackOffice()
  console.log(response)

  state.value = 'success'
  params.value = response
  tcPenUsd.value = params.value.tc.penusdt
  console.log(tcPenUsd.value)
}

const Buttonloading = ref(false)

// const IngresoDeDatos = async () => {
async function IngresoDeDatos() {
  Buttonloading.value = true
  fiatJson.value.fiat.currency = fiatCurrency.value
  fiatJson.value.fiat.amount = fiatAmount.value

  let respuesta = await sendQuoteBuy(fiatJson.value)

  try {
    Buttonloading.value = false
    location.href = `summary/${respuesta.code}`
    console.log('respuesta')
  } catch (error) {
    console.error(error)
  }
  // axios
  //   .post('http://127.0.0.1:8000/api/v1/quotation/buy', fiatJson.value)
  //   .then((res) => {
  //     let respuesta = res.data

  //     Buttonloading.value = false
  //     // location.href = `summary/summary?success=${respuesta.success}&code=${respuesta.code}&tc=${respuesta.tc}&Expires=${respuesta.expires}&FiCurrenly=${respuesta.fiat.currency}&FiAmout=${respuesta.fiat.amount}&CryAmount=${respuesta.crypto.amount}&CriptoCX=${respuesta.crypto.cx}`
  //     console.log(respuesta)
  //   })
  //   .catch((error) => {
  //     console.error(error)
  //   })
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
function setFiatAmount(val) {
  let amount = parseFloat(val)
  fiatAmount.value = amount
  updateCryptoAmountFromFiat(amount)
  lastInputEdited.value = 'setFiatAmount'
}
function setFiatCurrency(val) {
  fiatCurrency.value = val
  if (lastInputEdited.value === 'setFiatAmount') {
    updateCryptoAmountFromFiat(fiatAmount.value)
  }
  if (lastInputEdited.value === 'setCryptoAmount') {
    updateFiatAmountFromCrypto(cryptoAmount.value)
  }
}

function setCryptoAmount(val) {
  cryptoAmount.value = parseFloat(val)

  updateFiatAmountFromCrypto(cryptoAmount.value)
  lastInputEdited.value = 'setCryptoAmount'
}

function disableButton(mesage) {
  if (mesage) {
    ButtonAviable.value = false
  } else {
    ButtonAviable.value = true
  }
}
//

function ComasenValor(val) {
  let internationalNumberFormat = new Intl.NumberFormat('en-US')

  fiatAmoutLocalString.value = internationalNumberFormat.format(val)

  if (fiatAmoutLocalString.value === 'NaN') {
    fiatAmoutLocalString.value = '0'
  } else {
    fiatAmoutLocalString.value = internationalNumberFormat.format(val)
  }
}

function setCryptoCurrency(val) {
  cryptoCurrency.value = val

  updateCryptoAmountFromFiat(val)
}

const updateCryptoAmountFromFiat = async (fiatAmount) => {
  let totalUSDT = 0
  let amount = fiatAmount === 0 ? fiatAmount.value : fiatAmount
  let fiatCharge = await params.value.fiatCharge.find(
    (fiat) => fiat.code === fiatCurrency.value
  )
  let charge = 1 + fiatCharge.codePercentage / 100

  switch (fiatCurrency.value) {
    case 'PEN':
      totalUSDT = amount / params.value.tc.penusdt / charge
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

  cryptoAmount.value = (totalUSDT - cryptoCharge.charge).toFixed(1) + 0

  ComasenValor(fiatAmount)
}

const updateFiatAmountFromCrypto = (cryptoAmount) => {
  let totalUSD = 0
  let amount = cryptoAmount === 0 ? cryptoAmount.value : cryptoAmount
  let fiatCharge = params.value.fiatCharge.find(
    (fiat) => fiat.code === fiatCurrency.value
  )
  let charge = 1 + fiatCharge.codePercentage / 100

  switch (fiatCurrency.value) {
    case 'PEN':
      totalUSD = amount * params.value.tc.penusdt * charge
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

const validationCripto = ref(false)
const validationFiat = ref(false)

const isValid = ref(true)

const minSoles = ref(100)

const textvalAlertFiat = ref('')
const textvalAlertCripto = ref('')

function FiatValidation() {
  if (fiatAmount.value <= minSoles.value) {
    textvalAlertFiat.value = `El importe minimo es s/ ${minSoles.value}`

    validationFiat.value = true
    validationCripto.value = false
    isValid.value = false
    disableButton(isValid.value)
  } else {
    isValid.value = true

    disableButton(isValid.value)
  }
}
function CriptoValidation() {
  if (fiatAmount.value <= minSoles.value) {
    textvalAlertCripto.value = `El importe minimo es ${minSoles.value} USDT`

    isValid.value = false

    validationFiat.value = false
    validationCripto.value = true
    disableButton(isValid.value)
  } else {
    isValid.value = true

    disableButton(isValid.value)
  }
}

const modalLargeOpen = ref()
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

      <!-- <div class="is-flex is-justify-content-center	 ">
        <Button class="buttonRoader" @click="retweet">
     
            <i class="iconify retweetIcon" data-icon="system-uicons:retweet"></i>

      </Button>
      </div> -->

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
        color="link"
        :loading="Buttonloading"
        type="submit"
        @click="IngresoDeDatos"
      >
        COMPRAR
      </Button>
    </div>

    <div class="timerlive is-flex is-justify-content-flex-end">
      <button class="smallColor vender" @click="modalLargeOpen = true">
        ¿Deseas vender tus USDT?
      </button>
    </div>
    <Modal
      title="Vende tus USDT en minutos!"
      :open="modalLargeOpen"
      size="large"
      actions="center"
      noscroll
      @close="modalLargeOpen = false"
    >
      <template #content>
        <PlaceholderSection
          title="¿Necesitas efectivizar tus USDT ?"
          subtitle="Comunícate con nuestro callcenter (+51 972036729 ) para realizar la compra de tus USDT y enviarte Soles o Dólares a tu cuenta bancaria."
        >
          <template #image>
            <DarkImage
              src="../../../../public/assets/illustrations/map/calling.svg"
              src-dark="../../../../public/assets/illustrations/map/calling.svg"
              alt="dark image"
            />
          </template>
        </PlaceholderSection>
      </template>
      <template #action>
        <Button
          color="primary"
          :long="2"
          raised
          class="fullBsum"
          href="tel:+51972036729"
        >
          Llama ahora!
        </Button>
      </template>
    </Modal>
  </div>
</template>


<style  lang="scss">
.imagenmodificada {
  margin: 10px 0;
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
.buttonRoader {
  background: linear-gradient(45deg, #903eff 0%, #3e19ff 100%) !important;
  border-radius: 50% !important ;
  &:hover {
    background: linear-gradient(45deg, #3e19ff 0%, #903eff 100%) !important;
    cursor: pointer;
  }
  &:active {
    cursor: auto;
  }
}
.retweetIcon {
  color: #fff !important;
}

.smallColor {
  color: #6129eb;
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
  &:active {
    cursor: normal;
  }
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
  border: none !important;

  &:focus {
    box-shadow: none !important;
  }
}

// .full:hover {
//   color: #fff;
//   border: none !important;
//   background: linear-gradient(45deg, #3e19ff 0%, #903eff 100%) !important;
// }

.input.size-lg[data-v-76af6636] {
  color: var(--input-base-color) !important;
}
</style>