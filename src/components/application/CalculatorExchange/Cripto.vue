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
const cryptoCurrencySelected = ref(null)
//
// funciones

function emitCryptoCurrency(value) {
  emit('cryptoCurrency', value)
}

function emitCryptoAmount(e) {
  emit('cryptoAmount', e.target.value)
  MaxMIN(e.target.value)
}
function init() {
  // let defaultValue = cryptoCurrencies.value[0].id
  let defaultValue = 'tether'

  cryptoCurrencySelected.value = defaultValue
  emitCryptoCurrency(defaultValue)
}
//
const emit = defineEmits(['fiatAmount', 'fiatCurrency', 'disableButton'])

onMounted(() => {
  init()
})

// const validation=ref(false)
// const isValid=ref(true)
// const isInvalid=ref(true)
// const minSoles=ref(100)

// const textvalAlert=ref("")

// function MaxMIN(valor){

// if(valor<=minSoles.value){
//   textvalAlert.value =`el importe minimo es ${minSoles.value} USDT`
//   console.log(textvalAlert.value)
//   isValid.value=false
//   validation.value=true
//     emit('disableButton',  isValid.value)
// }else{
//   isValid.value=true
//     emit('disableButton',  isValid.value)
//  console.log("valor correcto")
// }

// }
</script>

<template>
  <div style="height: 170px">
    <div class="exchange-box">
      <Field>
        <div class="selector">
          <p id="sl" class="text">Tu recibes</p>
        </div>
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
            type="number"
            @keyup="emitCryptoAmount"
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
  right: 30px;
  top: 15px;
  font-size: 18px;
}

#USDT:hover #sign-cryptocurrency {
  transition: all 1s ease;
  color: var(--vc-clr-primary) !important;

  top: 15px;
  right: 30px;
  font-size: 18px;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>