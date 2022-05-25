<script setup lang="ts">
import { defineProps, toRefs, ref, defineEmits, onMounted } from 'vue'

const props = defineProps({
  currencies: Array,
  // fiatAmount:Number,

  tcPenUsd: Number,
  fiatAmoutLocalString: [Array, Number],
  validation: Boolean,
  isValid: Boolean,
  textvalAlertFiat: String,
  isInvalid: String,
})
// inputs

const valorRemoto = ref()
const btnColorPEN = ref('btn-primary')
const btnColorUSD = ref()

// const valorNum = ref(0)

//
const { currencies, fiatAmoutLocalString } = toRefs(props)
// VARIABLES
const currencySelected = ref('PEN')
//
// FUNTIONS
function emitFiatCurrency(value) {
  currencySelected.value = value
  emit('fiatCurrency', value)
  console.log(value, currencySelected.value)
  updateCurrencySelected()
}

function emitFiatAmount(e) {
  let TotalDevengado = e.target.value.replace(/,/g, '')
  // let news=new String(TotalDevengado)

  valorRemoto.value = TotalDevengado
  emit('fiatAmount', TotalDevengado)

  // MaxMIN(TotalDevengado)
}
const init = async () => {
  let defaultValue = currencies.value[0].id
  currencySelected.value = defaultValue

  emitFiatCurrency(defaultValue)
}
function updateCurrencySelected() {
  if (currencySelected.value === 'PEN') {
    btnColorPEN.value = 'btn-primary '
    btnColorUSD.value = null
  } else {
    btnColorPEN.value = null
    btnColorUSD.value = 'btn-primary '
  }
}

// function limpiarNumero(obj) {

//   // obj.target.value = obj.target.value.replace(/\D/g, '')
//       let TotalDevengado = e.target.value.replace(/,/g, "")
// }
// definir funciones
const emit = defineEmits(['fiatAmount', 'fiatCurrency', 'disableButton'])

//

function filterKey(e) {
  let code = e.keyCode
  console.log(code)

  let TotalDevengado = e.target.value.replace(/,/g, '')
  let numeros = [
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 8, 37, 38, 39, 190, 97, 98, 99, 100,
    101, 102, 103, 104, 105, 110, 96,
  ]
  let especiales = [37, 39, 8, 190, 110]
  let separadorComas = TotalDevengado.split('.', 2)

  let max = 99999
  // let mxlengt=String(max).length
  let decimal = 10
  console.log(TotalDevengado)
  // let cambioPuntos=1
  let cambioPuntos = Number(separadorComas[1])
  let verdad = numeros.some((numero) => numero === code)
  let verdadCode = especiales.some((numero) => numero === code)

  // arreglar el problema de 2 comas
  let repeatComa = TotalDevengado.split('')
  // let puntoDecimal="."

  let maxAceptado = TotalDevengado <= max
  let maxDecimal = cambioPuntos > decimal

  console.log(repeatComa)
  if (code === 16) {
    if (code === 49) {
      e.preventDefault()
    }
  } else {
    if (maxAceptado) {
      if (verdad) {
        if (maxDecimal) {
          console.log('max decimal')
          if (verdadCode) {
            console.log('borrando')
          } else {
            e.preventDefault()
          }
        } else {
        }
      } else {
        e.preventDefault()
      }
    } else if (repeatComa.some((val) => val === '.')) {
      if (maxDecimal) {
        console.log('max decimal')
        if (verdadCode) {
          console.log('borrando')
        } else {
          e.preventDefault()
        }
      } else {
      }
    } else {
      if (verdadCode) {
        console.log('borrando')
      } else {
        e.preventDefault()
      }
    }
  }
}

// Mounted
onMounted(() => {
  init()
})
</script>

<template>
  <div style="height: 170px">
    <div class="exchange-box">
      <div class="selector is-flex is-justify-content-space-around"></div>
      <Field>
        <div class="flex-button">
          <div class="selector">
            <p id="sl" class="text">Tu envías</p>
          </div>

          <!-- <FieldLabel  type="hero" label="Tu envías"></FieldLabel> -->
          <div class="has-text-right">
            <Button
              raised
              size="small"
              class="uno"
              :class="btnColorPEN"
              @click="emitFiatCurrency('PEN')"
            >
              Soles
            </Button>
            <Button
              raised
              class="uno"
              size="small"
              :class="btnColorUSD"
              @click="emitFiatCurrency('USD')"
            >
              Dólares
            </Button>
          </div>
        </div>

        <Control
          icon-size="lg"
          :error="textvalAlertFiat"
          :validation="validation"
          :is-valid="isValid"
          icon="feather:dollar-sign"
        >
          <VInput
            v-model="fiatAmoutLocalString"
            rounded
            size="lg"
            type="text"
            @keydown="filterKey"
            @keyup="emitFiatAmount"
          />
        </Control>
      </Field>
      <div class="form-group"></div>
      <small v-if="currencySelected === 'PEN'">
        Tipo de cambio: S/ {{ tcPenUsd.toFixed(3) }}
      </small>
    </div>
  </div>
</template>


<style scoped lang="scss">
.flex-button {
  display: flex;
  justify-content: space-between;
}

#sl {
  display: inline !important;
}

.uno {
  margin: 0 5px;
}

.btn-primary {
  color: #fff !important;
  background-color: #5156be;
  border-color: #5156be;
  box-shadow: 0 0 0 0.15rem rgb(107 111 200 / 50%);
  transition: 0.2s all ease-in-out !important;
}
.btn-primary:hover {
  background-color: #4549a2;
  border-color: #414598;
}
</style>