<script setup lang="ts">
import { defineProps, ref, defineEmits, onMounted } from 'vue'
type cryptoAmount = Number | Array
defineProps({
  // fiatCharge:Array,
  // cryptoCharge:Number,
  // fiatCurrency:String,
  cryptoAmount: [Number, Array],
  cryptoCurrencies: Array,
  validation: Boolean,
  isValid: Boolean,
  textvalAlertCripto: String,
  isInvalid: String,
})

// ref
// const { cryptoCurrencies } = toRefs(props)

const cryptoCurrencySelected = ref('tether')
//
// funciones

function emitCryptoCurrency(value) {
  emit('cryptoCurrency', value)
}

function emitCryptoAmount(e) {
  emit('cryptoAmount', e.target.value)
}
function init() {
  // let defaultValue = cryptoCurrencies.value[0].id
  let defaultValue = 'tether'

  cryptoCurrencySelected.value = defaultValue
  emitCryptoCurrency(defaultValue)
}
//
const emit = defineEmits([
  'fiatAmount',
  'fiatCurrency',
  'disableButton',
  'cryptoCurrency',
  'cryptoAmount',
])

onMounted(() => {
  init()
})

function filterKey(e) {
  let code = e.keyCode

  let TotalDevengado = e.target.value.replace(/,/g, '')
  let numeros = [
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 8, 37, 38, 39, 190, 97, 98, 99, 100,
    101, 102, 103, 104, 105, 110, 96,
  ]
  let especiales = [37, 39, 8, 190, 110]
  let separadorComas = TotalDevengado.split('.', 2)

  let max = 25806.8
  // let mxlengt=String(max).length
  let decimal = 10

  // let cambioPuntos=1
  let cambioPuntos = Number(separadorComas[1])
  let verdad = numeros.some((numero) => numero === code)
  let verdadCode = especiales.some((numero) => numero === code)

  // arreglar el problema de 2 comas
  let repeatComa = TotalDevengado.split('')
  // let puntoDecimal="."

  let maxAceptado = TotalDevengado <= max
  let maxDecimal = cambioPuntos > decimal

  if (code === 16) {
    if (code === 49) {
      e.preventDefault()
    }
  } else {
    if (maxAceptado) {
      if (verdad) {
        if (maxDecimal) {
          if (verdadCode) {
          } else {
            e.preventDefault()
          }
        } else {
        }
      } else {
        e.preventDefault()
      }
    } else if (repeatComa.some((val) => val === '.')) {
      if (verdad) {
        if (maxDecimal) {
          if (verdadCode) {
          } else {
            e.preventDefault()
          }
        } else {
        }
      } else {
        e.preventDefault()
      }
    } else {
      if (verdadCode) {
      } else {
        e.preventDefault()
      }
    }
  }
}
</script>

<template>
  <div style="height: 170px">
    <div class="exchange-box">
      <div class="selector">
        <p id="sl" class="text">Tu recibes</p>
      </div>
      <div class="language-select"></div>
      <Field>
        <!-- <FieldLabel type="hero" label="Recibes"></FieldLabel> -->
        <Control
          id="USDT"
          :error="textvalAlertCripto"
          :validation="validation"
          :is-valid="isValid"
        >
          <VInput
            id="phone-mask"
            v-model="cryptoAmount"
            rounded
            size="lg"
            type="text"
            ls
            @keyup="emitCryptoAmount"
            @keydown="filterKey"
          />
          <div id="sign-cryptocurrency">USDT</div>
        </Control>
      </Field>
    </div>
  </div>
</template>

<style  lang="scss">
#sign-cryptocurrency {
  color: #d2c8ec;
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 18px;
}

#USDT:hover #sign-cryptocurrency {
  transition: all 1s ease;
  color: var(--vc-clr-primary) !important;

  font-size: 18px;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>