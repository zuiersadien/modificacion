<script setup lang="ts">
import { ref, onMounted } from 'vue'

let currentDate = ref('')
let interval = ref<Timer>()
let time = ref('')

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
onMounted(() => {
  loadTimer()
})
</script>

<route lang="yaml">
meta:
  layout: default
</route>

<template>
  <section>
    <div class="banner">
      <div class="illustration">
        <img src="/assets/images/banner-bg-1.png" alt="" class="one" />
        <img src="/assets/images/banner-bg-2.png" alt="" class="two" />
        <img src="/assets/images/banner-map.png" alt="" class="three" />
      </div>
      <div class="hero-area">
        <div class="container">
          <!-- <div
            class="columns align-items-center is-flex is-flex-wrap-wrap is-justify-content-center"
          > -->
          <div
            class="columns align-items-center is-flex-wrap-wrap is-justify-content-center"
          >
            <div
              class="column is-two-thirds is-6-tablet is-7-desktop is-flex is-align-items-center is-flex-direction-column mx-4"
            >
              <div class="Divtext my-6">
                <h1 class="Empecemos">Empecemos!</h1>
                <p class="text sub-EMP my-4">
                  Ingresa tus datos o inicia sesión para adquirir las
                  criptomonedas en tu wallet.
                </p>
              </div>
              <div class="Register-login-div columns">
                <div class="register-Div column">
                  <div class="text-register-div">
                    <h2 class="input-Title mb-5">Registar Cuenta</h2>
                  </div>
                  <div class="container-input-register">
                    <input
                      type="text"
                      class="input size-lg my-2 radius"
                      placeholder="Nombres"
                    />
                    <input
                      type="text"
                      class="input size-lg my-2 radius"
                      placeholder="Apellidos"
                    />
                    <input
                      type="text"
                      class="input size-lg my-2 radius"
                      placeholder="Correo electronico"
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <input
                      type="text"
                      class="input size-lg my-2 radius"
                      placeholder="DNI"
                    />
                    <input
                      type="text"
                      class="input size-lg my-2 radius"
                      placeholder="Crear contrasena"
                    />

                    <div class="is flex is-justify-content-end">
                      <!-- <Button
                        size="medium"
                        class="button is-primary is-rounded is-raised mt-4 fullBsum"
                      >
                        Registrate
                      </Button> -->
                    </div>
                  </div>
                </div>

                <div class="login-Div column">
                  <div class="text-login-div">
                    <h2 class="input-Title mb-5">Ya tengo Cuenta</h2>
                  </div>

                  <div class="container-input-login">
                    <input
                      type="text "
                      class="input is-rounded size-lg radius"
                      placeholder="DNI"
                    />
                    <div class="is flex is-justify-content-end">
                      <!-- <Button

                        size="medium"
                        class="button is-primary is-rounded is-raised mt-4 fullBsum"
                      >
                        Iniciar sesion
                      </Button> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="Fiat-Exchange-DIV exchange column is-4-tablet is-4-desktop wow fadeInRightBig mx-4"
              data-wow-delay="0.3s"
              data-wow-duration="0.5s"
            >
              <h5 class="ex-head">
                Fiat
                <br />
                Exchange
              </h5>
              <div class="timerlive is-flex is-justify-content-center">
                <small class="colorFecha mb-4">
                  {{ currentDate }} {{ time }}
                </small>
              </div>
              <div class="env-res-div is-flex is-flex-direction-column box">
                <div class="is-flex is-justify-content-space-between my-2">
                  <h4 class="title-env-res">Tu Envias</h4>

                  <p class="number-en-res">$/1500.00</p>
                </div>
                <div class="is-flex is-justify-content-space-between my-2">
                  <h4 class="title-env-res">Recibiras</h4>
                  <p class="number-en-res">359.60 USDT</p>
                </div>
              </div>
              <hr width="100%" />
              <div class="box">
                <div class="is-flex is-justify-content-space-between my-2">
                  <p class="code-Tras">Código de transacción:</p>
                  <p class="number-tras">2203B1857B8</p>
                </div>
                <div class="is-flex is-justify-content-space-between my-2">
                  <p class="code-Tras">Tipo de cambio:</p>
                  <p class="number-tras">S/ 4.090</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style  scoped lang="scss">
.Empecemos {
  color: var(---6042f9);
  text-align: left;
  // font: normal normal 600 36px/46px 'Open Sans';
  font-size: 36px;
  font-weight: 600;
  line-height: normal;
  color: #6042f9;
}
.sub-EMP {
  font-family: 'Open Sans', sans-serif !important;
  font-size: 24px !important;
  line-height: 34px !important;
  font-weight: 500 !important;
  color: #4f457c;
}
.input-Title {
  color: var(--unnamed-color-33276a);
  text-align: left;

  // font: normal normal 600 18px/28px Open Sans;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;

  color: #33276a;
  opacity: 1;
}
.colorFecha {
  color: #4f457c !important;
  font-size: 14.4px !important;
}
.radius {
  border-radius: 12px !important;
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

// .banner {
//   padding-top: 265px !important;
// }
.title-env-res {
  color: #6042f9;
  font-size: 18px;
  align-items: center;
  display: flex;
  text-align: center;
  justify-content: center;
}
.number-en-res {
  color: #4f457c;
  font-size: 24px;
}
.code-Tras {
  color: #6129eb;
  font-size: 14.4px;
}
.number-tras {
  font-size: 14.4px;
}
</style>