<template>
  <div
    class="flex flex-col justify-center items-center gap-4 p-4 w-full col-span-full"
  >
    <img
      src="/icons/not_found.svg"
      alt="Not found Icon"
      class="w-[95px] h-[95px]"
    />
    <p class="text-2xl font-medium">{{ $t('cart.isEmpty') }}</p>
  </div>
</template>
