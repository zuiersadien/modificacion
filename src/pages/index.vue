<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts"></script>

<template>
  <section id="home">
    <div
      class="banner"
      :style="{
        backgroundImage: 'url(/assets/images/banner-bg.png)',
      }"
    >
      <div class="illustration">
        <img src="/assets/images/banner-bg-1.png" alt="" class="one" />
        <img src="/assets/images/banner-bg-2.png" alt="" class="two" />
        <img src="/assets/images/banner-map.png" alt="" class="three" />
      </div>

      <div class="hero-area">
        <div class="container">
          <div class="columns align-items-center justify-content-between">
            <div class="column is-6-tablet is-7-desktop">
              <div
                class="banner-content wow fadeInUp"
                data-wow-duration="0.5s"
                data-wow-delay="0.3s"
              >
                <h3 class="subtitle">Rápido y seguro</h3>
                <h1 class="head">Compra/Venta criptomonedas</h1>
                <p class="text">
                  Contamos con un sistema de atención inmediata, realiza tu
                  transacción en un ambiente seguro y confiable.
                </p>
              </div>
            </div>
            <div
              class="column is-6-tablet is-4-desktop wow fadeInRightBig"
              data-wow-delay="0.3s"
              data-wow-duration="0.5s"
            >
              <!-- TODO: Include component FiatExchange -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics Start -->
    <div class="statistic">
      <div class="container">
        <div class="columns">
          <div
            class="column is-6-tablet is-3-desktop wow fadeInUp"
            data-wow-duration="0.3s"
            data-wow-delay="0.3s"
          >
            <div class="platfrom-box has-text-centered">
              <div class="icon">
                <img src="/assets/images/offer-icon-1.png" alt="" />
              </div>
              <p class="text">
                Transacciones
                <br />
                inmediatas
              </p>
            </div>
          </div>
          <div
            class="column is-3-desktop is-6-tablet wow fadeInUp"
            data-wow-duration="0.4s"
            data-wow-delay="0.4s"
          >
            <div class="platfrom-box has-text-centered">
              <div class="icon">
                <img src="/assets/images/offer-icon-2.png" alt="" />
              </div>
              <p class="text">
                Intercambio
                <br />
                en minutos
              </p>
            </div>
          </div>
          <div
            class="column is-3-desktop is-6-tablet wow fadeInUp"
            data-wow-duration="0.5s"
            data-wow-delay="0.5s"
          >
            <div class="platfrom-box has-text-centered">
              <div class="icon">
                <img src="/assets/images/offer-icon-3.png" alt="" />
              </div>
              <p class="text">
                Experiencia
                <br />
                comprobada
              </p>
            </div>
          </div>
          <div
            class="column is-3-desktop is-6-tablet wow fadeInUp"
            data-wow-duration="0.6s"
            data-wow-delay="0.6s"
          >
            <div class="platfrom-box has-text-centered">
              <div class="icon">
                <img src="/assets/images/offer-icon-4.png" alt="" />
              </div>
              <p class="text">
                Depósitos
                <br />
                Bancarios
              </p>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="content">
              <div class="bg-pic">
                <img src="/assets/images/stasictic-bg.png" alt="" />
              </div>
              <div
                class="section-head has-text-centered wow fadeInUp"
                data-wow-duration="0.3s"
                data-wow-delay="0.2s"
              >
                <h4 class="lasthead">La confianza de nuestros clientes</h4>
                <h2 class="title">Estadísticas de hoy</h2>
                <p class="text"></p>
              </div>

              <div class="container justify-content-center">
                <div class="columns">
                  <div
                    class="column wow fadeInUp"
                    data-wow-duration="0.3s"
                    data-wow-delay="0.3s"
                  >
                    <div class="statis-boxx">
                      <div class="icon">
                        <img src="/assets/images/stasictic-icon-1.png" alt="" />
                      </div>
                      <div class="statis-content">
                        <h3 class="subtitle">428</h3>
                        <p class="text">Transactions realizadas</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="column wow fadeInUp"
                    data-wow-duration="0.4s"
                    data-wow-delay="0.4s"
                  >
                    <div class="statis-boxx">
                      <div class="icon">
                        <img src="/assets/images/stasictic-icon-2.png" alt="" />
                      </div>
                      <div class="statis-content">
                        <h3 class="subtitle">USDT</h3>
                        <p class="text">Es la principal criptomoneda</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="column wow fadeInUp"
                    data-wow-duration="0.5s"
                    data-wow-delay="0.5s"
                  >
                    <div class="statis-boxx">
                      <div class="icon">
                        <img src="/assets/images/stasictic-icon-3.png" alt="" />
                      </div>
                      <div class="statis-content">
                        <h3 class="subtitle">13 Mins</h3>
                        <p class="text">Tiempo aproximado de atención</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
