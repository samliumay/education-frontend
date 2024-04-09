<template>
  <main class="px-4 md:pl-10 md:pr-[270px] py-6">
    <n-breadcrumb class="mb-10">
      <n-breadcrumb-item сlass="text-brand-gray">
        <NuxtLink to="/">{{ $t('common.main') }}</NuxtLink>
      </n-breadcrumb-item>
      <n-breadcrumb-item сlass="text-brand-gray"> {{ $t('common.info.legal') }} </n-breadcrumb-item>
    </n-breadcrumb>

    <template v-if="data">
      <RichText :html="data" without-block-padding />
    </template>
    <template v-else>
      <h1 class="text-brand-black text-5xl mb-10 font-medium">
        Clavis Schule Impressum
      </h1>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Wer wir sind
      </h2>
      <h3 class="text-brand-black mb-2">
        Clavis Kunst und Wissenschaft Privatschule GmbH i.G.
      </h3>
      <div class="text-brand-gray mb-10">
        <p>
          Vertreten durch die Geschäftsführerinnen, Frau Margarita
          Stroutchenkova, Frau Olga Novik
        </p>
        <p class="text-brand-black font-medium">
          Immanuelkirchstraße 4 10405 Berlin
        </p>
        <p>
          <span class="text-brand-black font-medium">Phone Secretary:</span>
          <a href="tel:+493071537477">+49 (0)30 71537477</a>
        </p>
        <p>
          <span class="text-brand-black font-medium">Phone Administrator:</span>
          <a href="tel:+4917615683600">+49 (0)176 15683600</a>
        </p>
        <p>
          <span class="text-brand-black font-medium">E-mail:</span>
          <a href="mailto:info@clavis-schule.de">info@clavis-schule.de</a>
        </p>
        <p>
          <span class="text-brand-black font-medium">Web:</span>
          <a
class="text-brand-red underline"
href="www.clavis-schule.de"
>www.clavis-schule.de</a>
        </p>
        <p class="text-brand-black font-medium m-0">UStID DE356490222</p>
      </div>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        V.iS.d.P.
      </h2>
      <p class="text-brand-gray mb-10">
        Verantwortlich im Sinne des Presserechtes für journalistische und
        redaktionelle Texte auf dieser Website: Margarita Stroutchenkova
        (Clavis-Schulleitung).
      </p>

      <h2 class="text-brand-black text-2xl md:text-4xl mb-6 font-medium">
        Haftungsausschluss
      </h2>
      <h3 class="text-brand-black mb-2">Haftung für Inhalte</h3>
      <p class="text-brand-gray mb-2">
        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die
        Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
        jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7
        Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
        Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
        Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
        gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
        forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
        Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
        Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
        Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
        entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
        entfernen.
      </p>
      <h3 class="text-brand-black mb-2">Haftung für Links</h3>
      <p class="text-brand-gray mb-2">
        Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
        Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
        waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
        inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
        Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden
        von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
      </p>
      <h3 class="text-brand-black mb-2">Urheberrecht</h3>
      <p class="text-brand-gray mb-2">
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
        sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden,
        werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
        Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
        Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
        entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden
        wir derartige Inhalte umgehend entfernen.
      </p>
      <h3 class="text-brand-black mb-2">Hinweis zur Gender-Formulierung</h3>
      <p class="text-brand-gray mb-10">
        Der Lesbarkeit halber nutzen wir hauptsächlich die neutrale Form der
        Ansprache (meistens maskuline). Wir weisen darauf hin, dass die Clavis
        Kunst und Wissenschaft niemanden auf Grund von Geschlecht, Sexualität,
        Religion, Ethnie, äußerer Erscheinungen usw. diskriminiert
      </p>
    </template>
  </main>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'

import RichText from '@/components/cms/blocks/misc/RichText.vue'
import { getApiAddress } from '@/utils/getApiAddress'

const { locale } = useI18n()

const { data } = await useAsyncData(
  'products',
  () =>
    $fetch(getApiAddress(`/api/v2/wagtail/legal/`), {
      params: {
        locale: locale.value,
        fields: '*',
        name: 'Impressum',
      },
    }).then(req => req.items[0].contents),
  { watch: [locale], deep: true },
)
</script>
