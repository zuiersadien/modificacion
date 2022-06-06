<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { footer } from '/@src/data/footer'
import { CallPrivacyPolicies } from '/@src/utils/api/backOffice'

const textPolicies = ref('')

const callingPrivacyPolicies = async () => {
  let respuesta = await CallPrivacyPolicies()
  // let resSuccess=respuesta.success
  // let resMessage=respuesta.message
  textPolicies.value = respuesta
}

onMounted(() => {
  callingPrivacyPolicies()
})
</script>

<template>
  <section>
    <Hero color="grey" class="product-hero" size="fullheight" mask="wave">
      <template #body>
        <Container>
          <PageTitle
            class="colorModify p-0 pb-6"
            :title="textPolicies.title"
            subtitle="Documentos"
          />
          <div class="colorP" v-html="textPolicies.content"></div>
        </Container>
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
.colorP {
  color: #747990;
}
</style>