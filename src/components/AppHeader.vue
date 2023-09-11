<template>
  <header class="p-5 flex justify-between items-center bg-slate-300">
    <div>
      <Logo />
    </div>
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
    <n-button>{{ $t('common.login') }}</n-button>
  </header>
</template>
<script setup lang="ts">
import { NButton } from 'naive-ui'

import Logo from '@/assets/icons/logo.svg'

const navigationLinks = [
  { name: 'courses', link: '/' },
  { name: 'workshops', link: '/' },
  { name: 'summer school', link: '/' },
  { name: 'menu', link: '/' },
]
</script>
