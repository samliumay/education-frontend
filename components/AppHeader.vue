<template>
  <header class="px-5 py-3 bg-[#f5f5ef]">
    <div class="md:flex justify-between items-center container mx-auto">
      <NuxtLink
        to="/"
        :aria-label="$t('common.goToMain')"
      >
        <Logo />
      </NuxtLink>
      <nav>
        <ul class="flex gap-2">
          <li
            v-for="link in navigationLinks"
            :key="link.name"
          >
            <NuxtLink :to="link.link">{{ link.name }}</NuxtLink>
          </li>
        </ul>
      </nav>
      <!-- <n-button>
        <NuxtLink to="/login">{{ $t('common.login') }}</NuxtLink>
      </n-button> -->
    </div>
  </header>
</template>
<script setup lang="ts">
// import { NButton } from 'naive-ui'

import Logo from '../assets/icons/logo.svg'

const navigationLinks = [
  // { name: 'courses', link: '/' },
  // { name: 'workshops', link: '/' },
  // { name: 'summer school', link: '/' },
  { name: 'Kurs angebote', link: '/' },
  { name: 'Veranstaltungen bei Clavis', link: '/veranstaltungen-bei-clavis' },
  { name: 'Angebote für Schulen', link: '/angebote-fuer-schulen' },
]
</script>
