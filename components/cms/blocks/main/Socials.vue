<template>
  <div class="mx-[28px] md:mx-[48px] flex flex-col items-center">
    <h2 class="text-[48px] mb-[48px] font-medium">Social Media</h2>

    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <div
          class="flex gap-2 justify-between w-7/12 rounded-lg border-2 border-brand-gray px-4"
        >
          <div class="flex flex-col justify-center gap-4 w-5/12">
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-fit h-fit"
            >
              <img
                src="../../../../assets/icons/socials/tiktok.svg"
                class="w-[90px] h-[90px]"
                alt="youtube"
              />
              <div class="flex gap-3 items-center">
                <p class="text-xl font-medium text-brand-red">TikTok</p>
                <img
                  src="../../../../assets/icons/chevron_left.svg"
                  class="w-[8px] h-[18px]"
                  alt="youtube"
                />
              </div>
            </a>

            <p class="text-brand-gray">
              Lorem ipsum dolor sit amet consectetur. Euismod elit enim cursus
              arcu et pretium.
            </p>
          </div>

          <div class="flex w-7/12">
            <img
              src="../../../../assets/images/socials/tiktok.png"
              class="w-full h-full"
              alt="tiktok"
            />
          </div>
        </div>

        <div
          class="flex gap-2 justify-between w-5/12 rounded-lg border-2 border-brand-gray px-4"
        >
          <div class="flex flex-col justify-center gap-4 w-7/12">
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-fit h-fit"
            >
              <img
                src="../../../../assets/icons/socials/facebook.svg"
                class="w-[90px] h-[90px]"
                alt="youtube"
              />
              <div class="flex gap-3 items-center">
                <p class="text-xl font-medium text-brand-red">Facebook</p>
                <img
                  src="../../../../assets/icons/chevron_left.svg"
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

          <div class="flex w-5/12">
            <img
              src="../../../../assets/icons/socials/facebook_tower.svg"
              class="w-full h-full"
              alt="tiktok"
            />
          </div>
        </div>
      </div>

      <div class="flex gap-2">
        <div
          class="flex gap-2 justify-between w-5/12 rounded-lg border-2 border-brand-gray px-4"
        >
          <div class="flex flex-col justify-center gap-4 w-5/12">
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-fit h-fit"
            >
              <img
                src="../../../../assets/icons/socials/instagram.svg"
                class="w-[90px] h-[90px]"
                alt="instagram"
              />
              <div class="flex gap-3 items-center">
                <p class="text-xl font-medium text-brand-red">Instagram</p>
                <img
                  src="../../../../assets/icons/chevron_left.svg"
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

          <div class="flex w-7/12">
            <img
              src="../../../../assets/icons/products/workshop_cloud.svg"
              class="w-full h-full"
              alt="tiktok"
            />
          </div>
        </div>

        <div
          class="flex gap-2 justify-between w-7/12 rounded-lg border-2 border-brand-gray px-4"
        >
          <div class="flex flex-col justify-center gap-4 w-7/12">
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-fit h-fit"
            >
              <img
                src="../../../../assets/icons/socials/youtube.svg"
                class="w-[90px] h-[90px]"
                alt="youtube"
              />
              <div class="flex gap-3 items-center">
                <p class="text-xl font-medium text-brand-red">Youtube</p>
                <img
                  src="../../../../assets/icons/chevron_left.svg"
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

          <div class="flex w-5/12">
            <img
              src="../../../../assets/images/socials/youtube.png"
              class="w-full h-full"
              alt="youtube"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../types/cms'

defineProps<{
  items: PageBlock[]
}>()
</script>
