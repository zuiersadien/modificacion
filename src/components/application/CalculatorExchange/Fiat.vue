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

  updateCurrencySelected()
}

function emitFiatAmount(e) {
  let TotalDevengado = e.target.value.replace(/,/g, '')
  // let news=new String(TotalDevengado)

  valorRemoto.value = TotalDevengado
  emit('fiatAmount', TotalDevengado)

  let selected = window.getSelection().toString()
  if (selected === e.target.value && TotalDevengado.length >= 6) {
    if (e.keyCode === 49 || e.keyCode === 97) {
      e.target.value = 1
    } else if (e.keyCode === 50 || e.keyCode === 98) {
      e.target.value = 2
    } else if (e.keyCode === 51 || e.keyCode === 99) {
      e.target.value = 3
    } else if (e.keyCode === 52 || e.keyCode === 100) {
      e.target.value = 4
    } else if (e.keyCode === 53 || e.keyCode === 101) {
      e.target.value = 5
    } else if (e.keyCode === 54 || e.keyCode === 102) {
      e.target.value = 6
    } else if (e.keyCode === 55 || e.keyCode === 103) {
      e.target.value = 7
    } else if (e.keyCode === 56 || e.keyCode === 104) {
      e.target.value = 8
    } else if (e.keyCode === 57 || e.keyCode === 105) {
      e.target.value = 9
    } else if (e.keyCode === 48 || e.keyCode === 96) {
      e.target.value = 0
    }
  }
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
    iconoCurrenly.value = false
  } else {
    btnColorPEN.value = null
    btnColorUSD.value = 'btn-primary '

    iconoCurrenly.value = true
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

  let TotalDevengado = e.target.value.replace(/,/g, '')
  let numeros = [
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 8, 37, 38, 39, 190, 97, 98, 99, 100,
    101, 102, 103, 104, 105, 110, 96, 16,
  ]
  let especiales = [37, 39, 8, 190, 110]
  let separadorComas = TotalDevengado.split('.', 2)

  let max = 99999
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

  console.log(e.keyCode)
  // if(e.keyCode===16||e.keyCode===49){
  //   e.preventDefault
  //      if(e.keyCode===49){
  //        e.preventDefault
  //      }
  //   }

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

const iconoCurrenly = ref(false)
// Mounted
onMounted(() => {
  init()
})

// function selecionar(e) {
//    let selected = window.getSelection().toString();
//   console.log(selected)
//   if(selected===e.target.value){

//   }

// }
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
          <!-- <input type="text" @mouseup="selecionar"> -->
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
              @mouseup="emitFiatCurrency('USD')"
            >
              Dólares
            </Button>
          </div>
        </div>

        <Control
          class="DOLLAR-PEN"
          icon-size="lg"
          :error="textvalAlertFiat"
          :validation="validation"
          :is-valid="isValid"
        >
          <VInput
            v-model="fiatAmoutLocalString"
            rounded
            class="iconoInput"
            size="lg "
            type="text"
            @keydown="filterKey"
            @keyup="emitFiatAmount"
          />
          <div v-if="iconoCurrenly" class="sign-fiatamount">
            <i
              class="iconify iconoClassCurrenly"
              data-icon="carbon:currency-dollar"
            ></i>
          </div>
          <div v-else class="sign-fiatamount sign-fiatamount-span">
            <span class="spanClassCurrenly">S/</span>
          </div>
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
.sign-fiatamount {
  color: #d2c8ec;
  position: absolute;
  left: 15px;
  top: 20px;
}
.DOLLAR-PEN:hover .spanClassCurrenly {
  transition: all 1s ease;
  color: var(--vc-clr-primary) !important;
  font-size: 40px;
}
.DOLLAR-PEN:hover .iconoClassCurrenly {
  transition: all 1s ease;
  color: var(--vc-clr-primary) !important;
  font-size: 18px;
}

.sign-fiatamount-span {
  top: 12px;
}
.spanClassCurrenly {
  font-size: 20px !important;
  padding-top: 0 !important;
  color: #d2c8ec !important;
  margin-bottom: 10px !important;
}
.iconoClassCurrenly {
  font-size: 20px !important;
}
.flex-button {
  display: flex;
  justify-content: space-between;
}
.iconoInput {
  padding-left: 40px !important;
}
#sl {
  display: inline !important;
}

.uno {
  margin: 0 5px;
}

.btn-primary {
  color: #fff !important;
  background-color: #7703fc;
  border-color: #7703fc;
  box-shadow: 0 0 0 0.15rem rgb(107 111 200 / 50%);
  transition: 0.2s all ease-in-out !important;
}
.btn-primary:hover {
  background-color: #7703fc;
  border-color: #7703fc;
}
</style>