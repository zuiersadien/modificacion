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

    <!-- Earningpartners Start -->
    <div class="earningpartners">
      <div class="bg">
        <img src="/assets/images/profit-bg.png" alt="" class="dp-bg" />
      </div>
      <div class="deposit-amounts">
        <div class="container">
          <div class="columns">
            <div class="col-12">
              <h3
                class="subtitle wow fadeInUp"
                data-wow-duration="0.3s"
                data-wow-delay="0.3s"
              >
                Criptomonedas en tendencia
              </h3>
              <div class="coin-box">
                <div
                  class="item wow fadeInUp"
                  data-wow-duration="0.3s"
                  data-wow-delay="0.3s"
                >
                  <div class="tumb">
                    <img src="/assets/images/coin-icon-1.png" alt="" />
                  </div>
                  <p class="text">0.00100036 BTC</p>
                </div>
                <div
                  class="item wow fadeInUp"
                  data-wow-duration="0.3s"
                  data-wow-delay="0.3s"
                >
                  <div class="tumb">
                    <img src="/assets/images/coin-icon-2.png" alt="" />
                  </div>
                  <p class="text">0.21220267 LTC</p>
                </div>
                <div
                  class="item wow fadeInUp"
                  data-wow-duration="0.3s"
                  data-wow-delay="0.3s"
                >
                  <div class="tumb">
                    <img src="/assets/images/coin-icon-3.png" alt="" />
                  </div>
                  <p class="text">0.02980346 ETH</p>
                </div>
                <div
                  class="item wow fadeInUp"
                  data-wow-duration="0.3s"
                  data-wow-delay="0.3s"
                >
                  <div class="tumb">
                    <img src="/assets/images/coin-icon-4.png" alt="" />
                  </div>
                  <p class="text">0.02980346 DASH</p>
                </div>
                <div
                  class="item wow fadeInUp"
                  data-wow-duration="0.3s"
                  data-wow-delay="0.3s"
                >
                  <div class="tumb">
                    <img src="/assets/images/coin-icon-5.png" alt="" />
                  </div>
                  <p class="text">0.00100036 ETC</p>
                </div>
                <div
                  class="item wow fadeInUp"
                  data-wow-duration="0.3s"
                  data-wow-delay="0.3s"
                >
                  <div class="tumb">
                    <img src="/assets/images/coin-icon-6.png" alt="" />
                  </div>
                  <p class="text">0.21220267 TRX</p>
                </div>
                <div
                  class="item wow fadeInUp"
                  data-wow-duration="0.3s"
                  data-wow-delay="0.3s"
                >
                  <div class="tumb">
                    <img src="/assets/images/coin-icon-7.png" alt="" />
                  </div>
                  <p class="text">0.02980346 BCH</p>
                </div>
                <div
                  class="item wow fadeInUp"
                  data-wow-duration="0.3s"
                  data-wow-delay="0.3s"
                >
                  <div class="tumb">
                    <img src="/assets/images/coin-icon-8.png" alt="" />
                  </div>
                  <p class="text">1.21220267 USD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Counter Start -->
    <div
      class="counter"
      style="background-image: url('/assets/images/counter-bg.png')"
    >
      <div class="container">
        <div class="columns">
          <div
            class="column is-6-tablet is-3-desktop wow fadeInUp"
            data-wow-duration="0.2s"
            data-wow-delay="0.2s"
          >
            <div class="page-counter">
              <div class="counter-item">
                <h2 class="title">
                  <span class="count-num">36</span>
                  M
                </h2>
                <p class="text">Registered users</p>
              </div>
            </div>
          </div>
          <div
            class="column is-6-tablet is-3-desktop wow fadeInUp"
            data-wow-duration="0.3s"
            data-wow-delay="0.3s"
          >
            <div class="page-counter">
              <div class="counter-item">
                <h2 class="title"><span class="count-num">178</span></h2>
                <p class="text">Countries supported</p>
              </div>
            </div>
          </div>
          <div
            class="column is-6-tablet is-3-desktop wow fadeInUp"
            data-wow-duration="0.4s"
            data-wow-delay="0.4s"
          >
            <div class="page-counter">
              <div class="counter-item">
                <h2 class="title">
                  $
                  <span class="count-num">10</span>
                  M
                </h2>
                <p class="text">Withdrawn each month</p>
              </div>
            </div>
          </div>
          <div
            class="column is-6-tablet is-3-desktop wow fadeInUp"
            data-wow-duration="0.5s"
            data-wow-delay="0.5s"
          >
            <div class="page-counter four">
              <div class="counter-item">
                <h2 class="title">
                  <span class="count-num">18</span>
                  k
                </h2>
                <p class="text">Active investors daily</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Process Start -->
    <div class="process">
      <div class="container">
        <div class="columns">
          <div
            class="column col-8-desktop m-auto wow fadeInUp"
            data-wow-duration="0.3s"
            data-wow-delay="0.3s"
          >
            <div class="upper-content has-text-centered">
              <h4 class="lasthead">
                Watch this video presentation to know more
              </h4>
              <h2 class="title">Simple Process to Start</h2>
              <p class="text">Let's See how it work</p>
            </div>
          </div>
        </div>
        <div class="columns">
          <div
            class="column wow fadeInUp"
            data-wow-duration="0.3s"
            data-wow-delay="0.3s"
          >
            <div class="videoo">
              <img src="/assets/images/video-bg.png" alt="" class="video-bg" />
              <div class="video-box">
                <div class="video-img">
                  <a
                    class="youtube-video mfp-iframe video-play-btn video-icon"
                    href="https://www.youtube.com/watch?v=4DCTTrGjGU4"
                  >
                    <i class="fas fa-play"></i>
                  </a>
                </div>
                <div class="video-text">
                  <p class="text">Watch Video Now</p>
                  <span>
                    <i class="far fa-clock"></i>
                    2:32 minutes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Start -->
    <div
      class="footer"
      style="background-image: url('/assets/images/footer-bg.png')"
    >
      <div class="container">
        <div class="columns">
          <div
            class="column is-4-desktop is-6-tablet wow fadeInUp"
            data-wow-duration="0.3s"
            data-wow-delay="0.2s"
          >
            <div class="footer-box">
              <h4 class="lasthead">Company</h4>
              <ul class="footer-link">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Affiliate</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
          </div>
          <div
            class="column is-4-desktop is-6-tablet wow fadeInUp"
            data-wow-duration="0.4s"
            data-wow-delay="0.3s"
          >
            <div class="footer-box">
              <h4 class="lasthead">Support</h4>
              <ul class="footer-link">
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Knowledge Base</a></li>
              </ul>
            </div>
          </div>
          <div
            class="column is-4-desktop is-6-tablet wow fadeInUp"
            data-wow-duration="0.5s"
            data-wow-delay="0.4s"
          >
            <div class="footer-box">
              <h4 class="lasthead">Policy</h4>
              <ul class="footer-link">
                <li><a href="#">Terms of use</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          <div
            class="column is-4-desktop is-6-tablet wow fadeInUp"
            data-wow-duration="0.6s"
            data-wow-delay="0.5s"
          >
            <div class="footer-box">
              <h4 class="lasthead">Services</h4>
              <ul class="footer-link">
                <li><a href="#">Buy</a></li>
                <li><a href="#">Sell</a></li>
                <li><a href="#">Buy Near You</a></li>
              </ul>
            </div>
          </div>
          <div
            class="column is-4-desktop is-6-tablet wow fadeInUp"
            data-wow-duration="0.7s"
            data-wow-delay="0.6s"
          >
            <div class="footer-box">
              <h4 class="lasthead">Community</h4>
              <ul class="footer-link">
                <li><a href="#">Referral Program</a></li>
                <li><a href="#">Affiliate Program</a></li>
                <li><a href="#">Gooland Blog</a></li>
              </ul>
            </div>
          </div>
          <div
            class="column is-4-desktop is-6-tablet wow fadeInUp"
            data-wow-duration="0.8s"
            data-wow-delay="0.7s"
          >
            <div class="footer-box">
              <h4 class="lasthead">Contacts</h4>
              <ul class="footer-link">
                <li><a href="#">support@gooland</a></li>
                <li>+372 624 6211</li>
                <li>+372 624 600</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="columns">
          <div
            class="col-12 has-text-centered wow fadeInUp"
            data-wow-duration="0.3s"
            data-wow-delay="0.3s"
          >
            <div class="footer-bottom">
              <div class="content">
                <p class="text">
                  Copyright &copy;
                  <a href="#">Criptobank</a>
                  |
                  <a href="#">2022</a>
                </p>
              </div>
              <div class="social-style">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-pinterest-p"></i></a>
                <a href="#"><i class="fab fa-google-plus-g"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
