<template>
  <div class="mx-[28px] md:mx-[48px] flex flex-col items-center">
    <h2 class="text-[48px] mb-[48px] font-medium">Social Media</h2>

    <div class="flex flex-col gap-2">
      <div class="flex gap-5 h-[260px]">
        <NuxtLink
          to="https://www.tiktok.com"
          target="_blank"
          class="flex gap-25 justify-between w-7/12 rounded-lg border-2 border-brand-dark-gray px-5 hover:bg-brand-light-gray cursor-pointer"
        >
          <div class="flex flex-col justify-center gap-4 w-6/12">
            <div
              class="w-fit h-fit"
            >
              <img
                src="/icons/socials/tiktok.svg"
                class="w-[90px] h-[90px]"
                alt="youtube"
              />
              <div class="flex gap-3 items-center">
                <p class="text-xl font-medium text-brand-red">TikTok</p>
                <img
                  src="/icons/chevron_left.svg"
                  class="w-[8px] h-[18px]"
                  alt="youtube"
                />
              </div>
            </div>

            <p class="text-brand-gray">
              Lorem ipsum dolor sit amet consectetur. Euismod elit enim cursus
              arcu et pretium.
            </p>
          </div>

          <div class="flex w-7/12 justify-end">
            <img src="/images/socials/tiktok.png" class="h-full" alt="tiktok" />
          </div>
        </NuxtLink>

        <NuxtLink
          to="https://www.facebook.com/ClavisSchool"
          target="_blank"
          class="flex gap-5 justify-between w-5/12 rounded-lg border-2 border-brand-dark-gray px-5 hover:bg-brand-light-gray cursor-pointer"
        >
          <div class="flex flex-col justify-center gap-4 w-6/12">
            <div class="w-fit h-fit">
              <img
                src="/icons/socials/facebook.svg"
                class="w-[90px] h-[90px]"
                alt="youtube"
              />
              <div class="flex gap-3 items-center">
                <p class="text-xl font-medium text-brand-red">Facebook</p>
                <img
                  src="/icons/chevron_left.svg"
                  class="w-[8px] h-[18px]"
                  alt="facebook"
                />
              </div>
            </div>

            <p class="text-brand-gray">
              Lorem ipsum dolor sit amet consectetur. Euismod elit enim cursus
              arcu et pretium.
            </p>
          </div>

          <div class="flex w-5/12 justify-end pt-8 pr-5">
            <img
              src="/icons/socials/facebook_tower.svg"
              class="h-full"
              alt="tiktok"
            />
          </div>
        </NuxtLink>
      </div>

      <div class="flex gap-2 h-[260px]">
        <NuxtLink
          target="_blank"
          to="https://www.instagram.com/clavis_schule/"
          class="flex gap-5 justify-between w-5/12 rounded-lg border-2 border-brand-dark-gray px-5 hover:bg-brand-light-gray cursor-pointer"
        >
          <div class="flex flex-col justify-center gap-4 w-6/12">
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-fit h-fit"
            >
              <img
                src="/icons/socials/instagram.svg"
                class="w-[90px] h-[90px]"
                alt="instagram"
              />
              <div class="flex gap-3 items-center">
                <p class="text-xl font-medium text-brand-red">Instagram</p>
                <img
                  src="/icons/chevron_left.svg"
                  class="w-[8px] h-[18px]"
                  alt="chevron_left"
                />
              </div>
            </a>

            <p class="text-brand-gray">
              Lorem ipsum dolor sit amet consectetur. Euismod elit enim cursus
              arcu et pretium.
            </p>
          </div>

          <div class="flex w-fit h-fit pr-5 pt-5">
            <img
              src="/icons/products/workshop_cloud.svg"
              class="w-[82px] transform rotate-[15deg]"
              alt="tiktok"
            />
          </div>
        </NuxtLink>

        <NuxtLink
          target="_blank"
          to="https://www.youtube.com/@ClavisSchuleBerlin"
          class="flex gap-5 justify-between w-7/12 rounded-lg border-2 border-brand-dark-gray px-5 hover:bg-brand-light-gray cursor-pointer"
        >
          <div class="flex flex-col justify-center gap-4 w-6/12">
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-fit h-fit"
            >
              <img
                src="/icons/socials/youtube.svg"
                class="w-[90px] h-[90px]"
                alt="youtube"
              />
              <div class="flex gap-3 items-center">
                <p class="text-xl font-medium text-brand-red">Youtube</p>
                <img
                  src="/icons/chevron_left.svg"
                  class="w-[8px] h-[18px]"
                  alt="facebook"
                />
              </div>
            </a>

            <p class="text-brand-gray">
              Lorem ipsum dolor sit amet consectetur. Euismod elit enim cursus
              arcu et pretium.
            </p>
          </div>

          <div class="flex w-5/12 justify-end">
            <img
              src="/images/socials/youtube.png"
              class="h-full"
              alt="youtube"
            />
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// import type { PageBlock } from '../../../../types/cms'

// defineProps<{
//   items: PageBlock[]
// }>()
</script>
