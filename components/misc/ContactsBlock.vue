<template>
  <div
    class="bg-white mb-6 mt-3 lg:mt-6 rounded-[12px] border-[1px] p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-6"
  >
    <p class="font-semibold text-[20px] col-span-2 flex items-center">
      {{ $t('schoolOffer.questions') }}
      <span class="text-brand-red">{{ $t('schoolOffer.workhours') }}</span>
    </p>
    <div>
      <p class="font-medium text-[20px]">{{ $t('common.info.phone') }}</p>
      <p class="text-[20px] mt-2 text-gray-400">+49 (0)30 71537477</p>
      <p class="text-[20px] mt-2 text-gray-400">+49 (0)30 71537477</p>
    </div>
    <div>
      <p class="font-medium text-[20px]">{{ $t('common.info.mail') }}</p>
      <p class="text-[20px] mt-2 text-gray-400">info@clavis-schule.de</p>
    </div>
  </div>
</template>
