<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { footer } from '/@src/data/footer'
import axios from 'axios'

const textPolicies = ref('')

onMounted(() => {
  axios
    .post('http://127.0.0.1:8000/api/v1/quotation/buy', null)
    .then((res) => {
      // let respuesta = res.data

      console.log(res.data)
    })
    .catch((error) => {
      console.error(error)
      let defaulText =
        'Innovadora Digital S.A.C (“ActivoDigital”) protege su información, privacidad y datos financieros. Esta política (en conjunto con los términos y condiciones de uso y cualquier documento referido en él), define las bases sobre las cuales cualquier información suya recolectada será procesada por nosotros. Por favor lea detalladamente para entender los tipos de información que recolectamos de usted, cómo usamos esa información y las circunstancias bajo las cuales la compartiremos con terceras partes. Al visitar nuestra página web usted acepta y consiente las prácticas descritas en esta política. Para propósitos de las leyes asociadas a la protección de datos, el controlador de la información es Innovadora Digital SAC con RUC 20609329701, ubicado en Calle Vinatea Reynoso 525 Of 201 Urb Simón Bolivar, distrito de Jose Luis Bustamante y Rivero, Provincia de Arequipa, Departamento de Arequipa. Información que podríamos recolectar sobre usted: Podríamos recolectar y procesar los siguientes datos sobre usted: Información proporcionada por usted: Usted podría proporcionarnos información al llenar formatos en nuestra página web y/o interactuar con nosotros vía teléfono, correo electrónico o de otra forma. Esto incluye (pero no se limita a) información proporcionada al registrarse como usuario para utilizar la página web, realizar operaciones utilizando la página web o reportar algún problema en la página web. La información que nos brinda podría incluir su nombre, fecha de nacimiento, dirección, números de cuenta bancarios e interbancarios, descripción personal, ubicación geográfica, fotografía, copias de documentos de identidad, y otros documentos.'
      textPolicies.value = defaulText
    })
})
</script>

<template>
  <Hero color="grey" class="product-hero" size="fullheight" mask="wave">
    <template #body>
      <Container>
        <PageTitle
          class="colorModify p-0 pb-6"
          title="Políticas de privacidad"
          subtitle="Documentos"
        />
        <p class="colorP has-text-centered">
          {{ textPolicies }}
        </p>
      </Container>
    </template>
  </Hero>

  <Footer :content="footer" color="dark" />
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