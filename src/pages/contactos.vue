<script setup lang="ts">
import { contactInfo } from '/@src/data/pages/contact'
import { genericFaq } from '/@src/data/blocks/advanced/faq'
// import { socialLinks } from '/@src/data/blocks/advanced/social'
// import { plantValues } from '/@src/data/blocks/advanced/values'
import { footer } from '/@src/data/footer'
</script>

<template>
  <section>
    <Hero color="grey" class="product-hero" size="fullheight" mask="wave">
      <template #body>
        <div>
          <Container>
            <PageTitle
              class="colorModify"
              title="Central de atención al cliente"
              subtitle="Contacto"
            />
            <ContactInfo :infos="contactInfo" />
          </Container>

          <Container>
            <SectionTitle
              class="colorModify"
              title="Preguntas frecuentes"
              subtitle="¿Tienes alguna duda?"
            />
            <FaqListBoxed :items="genericFaq" />
          </Container>
        </div>
      </template>
    </Hero>

    <Footer :content="footer" color="dark" />
  </section>
</template>
<style lang="scss" >
.colorModify {
  & > .title {
    font-size: 40px !important;
  }
  & > .subtitle {
    font-size: 20px !important;
    & > span {
      background: none !important;
      -webkit-text-fill-color: #7703fc;
    }
  }
}
</style>