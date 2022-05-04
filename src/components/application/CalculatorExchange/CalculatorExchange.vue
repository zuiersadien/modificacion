<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

type InputDefaultCalculatorExchangeType = 'fiat' | 'crypto'
type StatesCalulatorType = 'loading' | 'success' | 'error'
export type FiatCurrencyType = 'PEN' | 'USD'
// type CryptoCurrencyType = 'USDT'

export interface CalculatorExchangeProps {
  inputDefault: InputDefaultCalculatorExchangeType
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

onMounted(() => {
  getParams()
  loadTimer()
})

function getParams() {
  state.value = 'loading'
  let urlAPI = import.meta.env.VITE_APP_API

  axios
    .get(urlAPI + '/params')
    .then((response) => {
      state.value = 'success'
      params.value = response.data
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

const currPEN = ref()
const btnColorPEN = ref()
const btnColorUSD = ref()

function currencySelected(currency: string) {
  if (currency === 'PEN') {
    btnColorPEN.value = 'primary'
    btnColorUSD.value = null
  } else {
    btnColorPEN.value = null
    btnColorUSD.value = 'primary'
  }
  console.log(currency)
}
</script>

<template>
  <div>
    <div class="exchange">
      <div class="timerlive">
        <small>{{ currentDate }} {{ time }}</small>
      </div>
      <h5 class="ex-head">
        Fiat
        <br />
        Exchange
      </h5>
      <div>
        <Button
          v-model="currPEN"
          size="small"
          :color="btnColorPEN"
          @click="currencySelected('PEN')"
        >
          Soles
        </Button>
        <Button
          size="small"
          :color="btnColorUSD"
          @click="currencySelected('USD')"
        >
          Dolares
        </Button>
        <Field>
          <FieldLabel type="hero" label="Tu nos envías"></FieldLabel>
          <Control>
            <VInput v-model="inputOneValue" rounded size="lg" />
          </Control>
        </Field>

        <Field>
          <FieldLabel type="hero" label="Recibirás"></FieldLabel>
          <Control>
            <VInput v-model="inputOneValue" rounded size="lg" />
          </Control>
        </Field>
      </div>

      <a v-if="state === 'success'" href="/register" class="button button-1">
        Comprar
      </a>
    </div>
  </div>
</template>
