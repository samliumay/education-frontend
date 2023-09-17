<template>
  <header class="px-5 py-3 bg-[#f5f5ef]">
    <div class="flex justify-between items-center container mx-auto">
      <router-link to="/">
        <Logo />
        <p class="hidden">{{ $t('common.goToMain') }}</p>
      </router-link>
      <nav>
        <ul class="flex gap-2">
          <li
            v-for="link in navigationLinks"
            :key="link.name"
          >
            <router-link :to="link.link">{{ link.name }}</router-link>
          </li>
        </ul>
      </nav>
      <!-- <n-button>
        <router-link to="/login">{{ $t('common.login') }}</router-link>
      </n-button> -->
    </div>
  </header>
</template>
<script setup lang="ts">
// import { NButton } from 'naive-ui'

import Logo from '@/assets/icons/logo.svg'

const navigationLinks = [
  // { name: 'courses', link: '/' },
  // { name: 'workshops', link: '/' },
  // { name: 'summer school', link: '/' },
  { name: 'Kurs angebote', link: '/' },
  { name: 'Veranstaltungen bei Clavis', link: '/veranstaltungen-bei-clavis' },
  { name: 'Angebote für Schulen', link: '/angebote-fuer-schulen' },
]
</script>
