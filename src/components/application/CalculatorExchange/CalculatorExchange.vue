<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import InputFiat from '/@src/components/application/CalculatorExchange/InputFiat.vue'

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
      <div v-if="state === 'loading'"></div>
      <div
        v-else-if="state === 'error'"
        class="d-flex align-items-center"
        style="height: 340px"
      >
        <div class="text-center w-100">
          <a href="#!" @click="getParams">
            Volver a cargar
            <i class="fas fa-redo"></i>
          </a>
        </div>
      </div>
      <div v-else-if="state === 'success'">
        <span v-if="orderInputs">
          <InputFiat
            label="Tu envías"
            :tc-pen-usd="params.tc.penusd"
            :currencies="params.fiatCurrenciesAvailable"
            :fiat-amount="fiatAmount"
          />
          <!-- TODO: InputFiat -->
        </span>

        <div v-if="!orderInputs" class="d-flex justify-content-center my-2">
          <button
            class="rotate btn btn-link"
            href="#"
            @click="changeOrderInput"
          >
            <img src="/assets/images/exchange-img.png" alt="" />
          </button>
        </div>

        <span v-if="orderInputs">
          <!-- TODO: InputCrypto -->
        </span>
      </div>

      <a v-if="state === 'success'" href="/register" class="button button-1">
        Comprar
      </a>
    </div>
  </div>
</template>
