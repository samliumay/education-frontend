<template>
  <article>
    <n-h1>{{ $t('terms.title') }}</n-h1>
    <n-p>{{ $t('terms.description') }}</n-p>
    <n-h2>1. {{ $t('terms.title1') }}</n-h2>
    <n-p>{{ $t('terms.t1p1') }}</n-p>
    <n-p>{{ $t('terms.t1p2') }}</n-p>
    <n-h2>2. {{ $t('terms.title2') }}</n-h2>
    <n-p>{{ $t('terms.t2p1') }}</n-p>
    <AppContacts />
    <n-h2>3. {{ $t('terms.title3') }}</n-h2>
    <n-p>{{ $t('terms.t3p1') }}</n-p>
    <n-h2>4. {{ $t('terms.title4') }}</n-h2>
    <n-h3>1. {{ $t('terms.t4sub1') }}</n-h3>
    <n-p>{{ $t('terms.t4sub1p1') }}</n-p>
    <n-h3>2. {{ $t('terms.t4sub2') }}</n-h3>
    <n-p>{{ $t('terms.t4sub2p1') }}</n-p>
    <n-h3>3. {{ $t('terms.t4sub3') }}</n-h3>
    <n-p>{{ $t('terms.t4sub3p1') }}</n-p>
    <n-p>{{ $t('terms.t4sub3p2') }}</n-p>
    <n-p>{{ $t('terms.t4sub3p3') }}</n-p>
    <n-p>{{ $t('terms.t4sub3p4') }}</n-p>
    <n-h3>4. {{ $t('terms.t4sub4') }}</n-h3>
    <n-p>{{ $t('terms.t4sub4p1') }}</n-p>
    <n-p>{{ $t('terms.t4sub4p2') }}</n-p>
    <n-h2>5. {{ $t('terms.title5') }}</n-h2>
    <n-h3>1. {{ $t('terms.t5sub1') }}</n-h3>
    <n-p>{{ $t('terms.t5sub1p1') }}</n-p>
    <n-h3>2. {{ $t('terms.t5sub2') }}</n-h3>
    <n-p>{{ $t('terms.t5sub2p1') }}</n-p>
    <n-h3>3. {{ $t('terms.t5sub3') }}</n-h3>
    <n-p>{{ $t('terms.t5sub3p1') }}</n-p>
    <n-p>{{ $t('terms.t5sub3p2') }}</n-p>
    <n-p>{{ $t('terms.t5sub3p3') }}</n-p>
    <n-p>{{ $t('terms.t5sub3p4') }}</n-p>
    <table>
      <tr>
        <td>{{ $t('terms.upTo', 0) }}</td>
        <td>{{ $t('terms.percentCosts', 0) }}</td>
      </tr>
    </table>
    <n-h3>4. {{ $t('terms.t5sub4') }}</n-h3>
    <n-p>{{ $t('terms.t5sub4p1') }}</n-p>
    <n-p>{{ $t('terms.t5sub4p2') }}</n-p>
    <n-h2>6. {{ $t('terms.title6') }}</n-h2>
    <n-h3>1. {{ $t('terms.t6sub1') }}</n-h3>
    <n-p>{{ $t('terms.t6sub1p1') }}</n-p>
    <n-p>{{ $t('terms.t6sub1p2') }}</n-p>
    <AppContacts />
    <n-p>{{ $t('terms.t6sub1p3') }}</n-p>
    <n-h3>2.{{ $t('terms.t6sub2') }}</n-h3>
    <n-p>{{ $t('terms.t6sub2p1') }}</n-p>
    <n-p>{{ $t('terms.t6sub2p2') }}</n-p>

    <n-h2>7. {{ $t('terms.title7') }}</n-h2>
    <n-h3>1. {{ $t('terms.t7sub1') }}</n-h3>
    <n-p>{{ $t('terms.t7sub1p1') }}</n-p>
    <n-p>{{ $t('terms.t7sub1p2') }}</n-p>
    <n-h3>2. {{ $t('terms.t7sub2') }}</n-h3>
    <n-p>{{ $t('terms.t7sub2p1') }}</n-p>
    <n-p>{{ $t('terms.t7sub2p2') }}</n-p>
    <n-p>{{ $t('terms.t7sub2p3') }}</n-p>
    <n-p>{{ $t('terms.t7sub2p4') }}</n-p>
    <n-p>{{ $t('terms.t7sub2p5') }}</n-p>
  </article>
</template>
<script setup lang="ts">
import { NH1, NH2, NH3, NP } from 'naive-ui'

import AppContacts from '@/components/AppContacts.vue'
</script>
