<script setup lang="ts">
import { defineProps, toRefs, ref, defineEmits, onMounted } from 'vue'

// type fiatAmount = Number | String

const props = defineProps({
  currencies: Array,
  // fiatAmount: [Number, String],
  tcPenUsd: Number,
  fiatAmoutLocalString: [Array, Number],
})
// inputs
const btnColorPEN = ref('btn-primary')
const btnColorUSD = ref()

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

// function emitFiatAmount(e) {
//   emit('fiatAmount', e.target.value)
//   limpiarNumero(e)
// }
function emitFiatAmount(e) {
  let TotalDevengado = e.target.value.replace(/,/g, '')

  emit('fiatAmount', TotalDevengado)
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
const emit = defineEmits(['fiatAmount', 'fiatCurrency'])

//

function filterKey(e) {
  let code = e.keyCode

  let numeros = [
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 8, 37, 38, 39, 190, 97, 98, 99, 100,
    101, 102, 103, 104, 105, 110,
  ]
  let verdad = numeros.some((numero) => numero === code)

  console.log(code)
  if (verdad) {
    console.log(verdad)
  } else {
    e.preventDefault()
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

        <Control icon-size="lg" icon="feather:dollar-sign">
          <VInput
            v-model="fiatAmoutLocalString"
            rounded
            size="lg"
            type="text"
            minlength="1"
            maxlength="15"
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