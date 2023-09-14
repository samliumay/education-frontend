<template>
  <footer class="flex justify-between items-center bg-slate-300 px-5 py-3">
    <!-- navigation -->
    <nav>
      <ul>
        <li>
          <router-link to="/terms">{{ $t('links.terms') }}</router-link>
        </li>
      </ul>
    </nav>
    <!-- social networks -->
    <ul class="flex gap-2">
      <li
        v-for="social in socialMediaLinks"
        :key="social.key"
      >
        <a
          :href="social.link"
          class="flex rounded-full border-current border-2 p-1.5"
          rel="noopener noreferrer"
          target="_blank"
        >
          <NIcon
            size="20"
            :title="social.key"
          >
            <component :is="social.icon" />
          </NIcon>
          <p class="hidden">{{ social.key }}</p>
        </a>
      </li>
    </ul>
    <div>
      <label for="language">{{ $t('common.chooseLanguage') }}</label>
      <select
        id="language"
        v-model="$i18n.locale"
        class="ml-2 bg-transparent border-none"
      >
        <option value="de">de</option>
        <option value="en">en</option>
      </select>
    </div>
  </footer>
</template>
<script setup lang="ts">
import {
  Envelope,
  Facebook,
  Instagram,
  MapMarkerAlt,
  PhoneAlt,
  Youtube,
} from '@vicons/fa'
import { NIcon } from 'naive-ui'

const socialMediaLinks = [
  {
    key: 'elementor',
    icon: PhoneAlt,
    link: '#elementor-action%3Aaction%3Dpopup%3Aopen%26settings%3DeyJpZCI6IjQwNzAiLCJ0b2dnbGUiOmZhbHNlfQ%3D%3D',
  },
  {
    key: 'email',
    icon: Envelope,
    link: 'mailto:info@clavis-schule.de',
  },
  {
    key: 'google-maps',
    icon: MapMarkerAlt,
    link: 'https://goo.gl/maps/zTtDww6oXWhZoJ9Q6',
  },
  {
    key: 'facebook',
    icon: Facebook,
    link: 'https://www.facebook.com/ClavisSchool',
  },
  {
    key: 'instagram',
    icon: Instagram,
    link: 'https://www.instagram.com/clavis_schule/',
  },
  {
    key: 'youtube',
    icon: Youtube,
    link: 'https://www.youtube.com/@ClavisSchuleBerlin',
  },
]
</script>
