<script setup lang="ts">
import { defineProps, toRefs, ref, defineEmits, onMounted } from 'vue'

type fiatAmount = Number | String

const props = defineProps({
  currencies: Array,
  fiatAmount: [Number, String],
  tcPenUsd: Number,
})
// inputs
const btnColorPEN = ref('primary')
const btnColorUSD = ref()

const LocalS = ref(0)
//
const { currencies, fiatAmount } = toRefs(props)
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
  emit('fiatAmount', e.target.value)
  separadorMillares(fiatAmount.value)
}
// separador de millares
function separadorMillares(numero) {
  LocalS.value = numero.toLocaleString('en-US')

  console.log(LocalS.value)
}

const init = async () => {
  let defaultValue = currencies.value[0].id
  currencySelected.value = defaultValue
  emitFiatCurrency(defaultValue)
}

function updateCurrencySelected() {
  if (currencySelected.value === 'PEN') {
    btnColorPEN.value = 'primary'
    btnColorUSD.value = null
  } else {
    btnColorPEN.value = null
    btnColorUSD.value = 'primary'
  }
}

// definir funciones
const emit = defineEmits(['fiatAmount', 'fiatCurrency'])

//

// Mounted
onMounted(() => {
  init()
})

//

//COMPUTED
// const classButtonPEN = computed(() => {
//   return {
//     'primary': currencySelected.value === 'PEN',
//   }
// })
// const classButtonUSD = computed(() => {
//   return {
//     'primary': currencySelected.value === 'USD',
//   }
// })
//
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
          <p>
            {{ LocalS }}
          </p>
          <!-- <FieldLabel  type="hero" label="Tu envías"></FieldLabel> -->
          <div class="has-text-right">
            <Button
              size="small"
              class="uno"
              :color="btnColorPEN"
              @click="emitFiatCurrency('PEN')"
            >
              Soles
            </Button>
            <Button
              class="uno"
              size="small"
              :color="btnColorUSD"
              @click="emitFiatCurrency('USD')"
            >
              Dólares
            </Button>
          </div>
        </div>

        <Control icon-size="lg" icon="feather:dollar-sign">
          <VInput
            id="phone-mask1"
            v-model="fiatAmount"
            rounded
            size="lg"
            type="text"
            maxlength="10"
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
</style>