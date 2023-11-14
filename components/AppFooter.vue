<template>
  <footer class="bg-[#E7E7D9] py-6">
    <div
      class="md:items-center mx-auto container px-5 md:px-0 py-3 flex justify-between flex-col md:flex-row"
    >
      <!-- navigation -->
      <nav>
        <ul class="space-y-2 font-bold">
          <li>
            <NuxtLink to="/kontaktieren-sie-uns">
              Kontaktieren Sie uns
            </NuxtLink>
          </li>
          <li>
            <a
              href="https://clavis-schule.de/wp-content/uploads/2023/08/230830_Stundenplan_druck-1.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stundenplan
            </a>
          </li>
          <li>
            <NuxtLink to="/agb">AGB</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/datenschutz">Datenschutz</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/impressum">Impressum</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/instructors">Fakultät & Mitarbeiter</NuxtLink>
          </li>
        </ul>
      </nav>
      <!-- social networks -->
      <ul class="flex gap-2 my-4 md:my-0">
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
          <option value="de-DE">de</option>
          <option value="en-US">en</option>
        </select>
      </div>
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
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

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
