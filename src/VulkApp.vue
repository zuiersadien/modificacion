<script setup lang="ts">
import { computed } from 'vue'
import { Head } from '@vueuse/head'

import { useLayout } from '/@src/composable/useLayout'
import { useDarkmode } from '/@src/stores/darkmode'

const darkmode = useDarkmode()
const { LayoutComponent } = useLayout()

const htmlClasses = computed(() => [darkmode.htmlClass])
</script>

<template>
  <Head>
    <html lang="en-US" :class="htmlClasses" />

    <title>Criptobank - Compra y vende criptomonedas en Perú</title>
    <base href="/" />
  </Head>

  <component :is="LayoutComponent" />

  <ClientOnly>
    <ReloadPrompt app-name="Vulk">
      <template #logo>
        <img src="/assets/logo/logo.svg" alt="logo" width="80" height="80" />
      </template>
    </ReloadPrompt>
  </ClientOnly>
</template>
