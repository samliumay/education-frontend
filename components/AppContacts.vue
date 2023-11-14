<template>
  <div>
    <dl>
      <dt>{{ $t('terms.directors') }}</dt>
      <dd>{{ $t('terms.directorsData') }}</dd>
    </dl>
    <dl>
      <dt>{{ $t('terms.address') }}</dt>
      <dd>{{ $t('terms.addressData') }}</dd>
    </dl>
    <dl>
      <dt>{{ $t('terms.phone') }}</dt>
      <dd>{{ $t('terms.phoneData') }}</dd>
    </dl>
    <dl>
      <dt>{{ $t('terms.email') }}</dt>
      <dd>{{ $t('terms.emailData') }}</dd>
    </dl>
    <dl>
      <dt>{{ $t('terms.web') }}</dt>
      <dd>{{ $t('terms.webData') }}</dd>
    </dl>
  </div>
</template>
<style scoped lang="scss">
dt,
dd {
  display: inline-block;
}

dd {
  padding-left: 2rem;
}
</style>
