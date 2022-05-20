<script setup lang="ts">
import { defineProps, ref, defineEmits, onMounted } from 'vue'
type cryptoAmount = Number | Array
defineProps({
  // fiatCharge:Array,
  // cryptoCharge:Number,
  // fiatCurrency:String,
  cryptoAmount: [Number, Array],
  cryptoCurrencies: Array,
})

// ref
// const { cryptoCurrencies } = toRefs(props)
const cryptoCurrencySelected = ref(null)
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
const emit = defineEmits(['fiatAmount', 'fiatCurrency'])

onMounted(() => {
  init()
})
</script>

<template>
  <div style="height: 170px">
    <div class="exchange-box">
      <Field>
        <div class="selector">
          <p id="sl" class="text">Tu envías</p>
        </div>
        <!-- <FieldLabel type="hero" label="Recibes"></FieldLabel> -->
        <Control id="USDT">
          <VInput
            id="phone-mask"
            v-model="cryptoAmount"
            rounded
            size="lg"
            type="number"
            maxlength="12"
            @keyup="emitCryptoAmount"
          />
          <div id="sign-cryptocurrency">USDT</div>
        </Control>
      </Field>
    </div>
  </div>
</template>

<style scoped lang="scss">
#sign-cryptocurrency {
  color: #d2c8ec;
  position: absolute;
  right: 10px;
  top: 15px;
  font-size: 18px;
}

#USDT:hover #sign-cryptocurrency {
  transition: all 1s ease;
  color: var(--vc-clr-primary) !important;
  right: 10px;
  top: 15px;
  font-size: 18px;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>