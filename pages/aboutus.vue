<template>
  <div class="bg-brand-green px-3 sm:px-10 relative overflow-hidden text-white pb-6 sm:pb-[96px]">
    <n-breadcrumb class="mt-6 mb-10">
      <n-breadcrumb-item сlass="text-brand-gray">
        <NuxtLink to="/">Главная</NuxtLink>
      </n-breadcrumb-item>
      <n-breadcrumb-item сlass="text-brand-gray"> О нас </n-breadcrumb-item>
    </n-breadcrumb>

    <h1 class="text-[48px] sm:text-[72px] leading-tight">
      Clavis Berlin - Kunstschule und Wissenschafts für Kinder und Jugendliche
    </h1>

    <div class="grid grid-cols-2">
      <div />
      <p>
        Clavis ist ein neues Lernzentrum für Schüler*innen verschiedener
        Altersgruppen, dass ein breites Spektrum an Kursen anbietet, wie z. B.
        Kunst und visuelles Theater, Naturwissenschaften, Mathematik und
        Digitales Zeichnen
      </p>
    </div>

    <img
      src="/icons/aboutus/header_arcs.svg"
      alt="Arcs"
      class="absolute bottom-0 left-1/2 -translate-x-full translate-y-1/4"
    />
  </div>

  <h2
    class="flex items-center justify-centr text-brand-red font-medium text-[28px] sm:text-[36px] mt-6 sm:mt-36 px-3 sm:px-10"
  >
    Unser Ziel ist es, die außerschulischen Fähigkeiten und Interessen unserer
    Schüler*innen zu fördern, indem wir ihnen die Möglichkeit geben, im Rahmen
    einzigartiger Lehrpläne und auf Basis modernster pädagogischer Methodiken
    frei und aus eigenem Antrieb zu lernen
  </h2>

  <div class="mt-6 sm:mt-24">
    <h2 class="font-semibold text-[36px] sm:text-[56px] mb-[48px]">
      Unsere Angebote
    </h2>

    <div class="grid grid-cols-2">
      <div class="flex justify-center items-center">
        <img src="/icons/aboutus/pen.svg" alt="Pen" />
      </div>
      <div>
        <h3 class="text-brand-red text-[28px] sm:text-[36px] mb-6">
          Bildende Kunst
        </h3>
        <h4 class="text-gray-500 font-medium mb-1">
          Entfaltung künstlerischer Fähigkeiten
        </h4>
        <p class="text-gray-400">
          In unseren Kursen zur bildenden Kunst liegt der Fokus darauf, die
          Kreativität, Vorstellungskraft und Selbstständigkeit der Kinder zu
          fördern. Wir vermitteln ihnen nicht nur künstlerische Techniken und
          den Umgang mit verschiedenen Materialien, sondern unterstützen sie
          auch dabei, Ausdauer zu entwickeln und Projekte erfolgreich
          abzuschließen.
        </p>
        <h4 class="text-gray-500 font-medium mb-1">
          Mehr als nur Kunstunterricht
        </h4>
        <p class="text-gray-400">
          Unser Konzept geht über den traditionellen Kunstunterricht hinaus. Wir
          organisieren künstlerische Veranstaltungen und Ausflüge, die den
          Kindern praktische Einblicke in die Kunstwelt bieten. Zusätzlich
          stellen wir die im Unterricht entstandenen Werke in Ausstellungen vor
          und bieten Kreativ-Workshops an, um das Lernerlebnis zu bereichern.
        </p>
      </div>

      <div>
        <h3 class="text-brand-red text-[28px] sm:text-[36px] mb-6">
          Theater: Kreativität auf der Bühne
        </h3>
        <h4 class="text-gray-500 font-medium mb-1">
          Kinder als Hauptautoren ihrer Stücke
        </h4>
        <p class="text-gray-400">
          In unseren Theaterkursen sind die Kinder die treibende Kraft hinter
          dem kreativen Prozess. Aus ersten Ideen und Impulsen entwickeln sie
          zusammenhängende Geschichten, die in Bühnenkonzepte umgesetzt werden.
          Dies fördert ihre individuelle Kreativität und hilft ihnen, neue
          Perspektiven einzunehmen und sich selbst sowie ihre Umwelt besser zu
          verstehen.
        </p>
        <h4 class="text-gray-500 font-medium mb-1">
          Mehrsprachiges Theatererlebnis
        </h4>
        <p class="text-gray-400">
          Unsere Theaterkurse sind auch ein Ort der sprachlichen Vielfalt.
          Verschiedene Sprachen werden genutzt, um die Kinder zum spontanen und
          kreativen Ausdruck zu ermutigen und das Verständnis für andere zu
          fördern.
        </p>
      </div>
      <div class="flex justify-center items-center">
        <img src="/icons/aboutus/stars.svg" alt="Stars" />
      </div>

      <div class="flex justify-center items-center">
        <img src="/icons/aboutus/book.svg" alt="Book" />
      </div>
      <div>
        <h3 class="text-brand-red text-[28px] sm:text-[36px] mb-6">
          Sprachen: Spielerischer Spracherwerb
        </h3>
        <h4 class="text-gray-500 font-medium mb-1">
          Aktives und kommunikatives Lernen
        </h4>
        <p class="text-gray-400">
          Unser Sprachkursprogramm konzentriert sich auf spielerische und
          kommunikative Lehrmethoden. Wir nutzen Theaterspiele,
          Improvisationsübungen und Dialoge, um den Kindern zu helfen, Stress zu
          überwinden und Freude an der neuen Sprache und der Kommunikation zu
          finden.
        </p>
      </div>

      <div>
        <h3 class="text-brand-red text-[28px] sm:text-[36px] mb-6">
          Mathematik & Naturwissenschaften: Denken fördern
        </h3>
        <h4 class="text-gray-500 font-medium mb-1">
          Mathematik als Schlüssel zur intellektuellen Entwicklung
        </h4>
        <p class="text-gray-400">
          In unseren Mathematikkursen legen wir Wert darauf, den Schülern
          beizubringen, wie sie Probleme systematisch angehen und lösen können.
          Wir fördern die Entwicklung organisierter Denkweisen und die
          Fähigkeit, Probleme bewusst zu behandeln.
        </p>
        <h4 class="text-gray-500 font-medium mb-1">
          Ein ganzheitlicher Ansatz
        </h4>
        <p class="text-gray-400">
          Unsere Kurse in Mathematik und Naturwissenschaften umfassen Fleiß,
          Beobachtung der Phänomene unserer Welt und das Konstruieren. Wir
          unterstützen die Kinder darin, Fragen zu stellen und nach Lösungen zu
          suchen, was eine grundlegende Fähigkeit für ihr weiteres Leben
          darstellt.
        </p>
      </div>
      <div class="flex justify-center items-center">
        <img src="/icons/aboutus/planet.svg" alt="Planet" />
      </div>
    </div>
  </div>

  <Ticker :item="tickerItems" class="mt-24 mb-12" />

  <AboutTutors :block-data="instructors" />

  <div class="grid grid-cols-2 mt-8">
    <div>
      <h2 class="font-semibold text-[36px] sm:text-[56px] mb-[48px] ml-10">
        Werte
        <br />
        & Grundsätze
      </h2>
      <img class="block ml-2" src="/icons/aboutus/dots.svg" />
    </div>
    <div class="grid grid-cols-2 gap-6 pr-2">
      <div class="rounded-[12px] bg-brand-light-gray p-4">
        <div class="flex items-center justify-center aspect-square">
          <img src="/icons/aboutus/heart.svg" alt="Heart" />
        </div>

        <AppDivider class="my-4 px-4" />

        <p class="font-semibold">
          Wir überwinden Sprachbarrieren durch gemeinsame Interessen
        </p>
      </div>
      <div class="rounded-[12px] bg-brand-light-gray p-4">
        <div class="flex items-center justify-center aspect-square">
          <img src="/icons/aboutus/key.svg" alt="Key" />
        </div>

        <AppDivider class="my-4 px-4" />

        <p class="font-semibold">
          Wir wollen ein optimales Lernumfeld mit bestmöglichen Lernbedingungen
          schaffen
        </p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6 pl-10">
      <div class="rounded-[12px] bg-brand-light-gray p-4">
        <div class="flex items-center justify-center aspect-square">
          <img src="/icons/aboutus/books.svg" alt="Books" />
        </div>

        <AppDivider class="my-4 px-4" />

        <p class="font-semibold">
          Toleranz und gegenseitiger Respekt sind die Grundlage unseres Handelns
        </p>
      </div>
      <div class="rounded-[12px] bg-brand-light-gray p-4">
        <div class="flex items-center justify-center aspect-square">
          <img src="/icons/aboutus/star.svg" alt="Star" />
        </div>

        <AppDivider class="my-4 px-4" />

        <p class="font-semibold">
          Wir setzen uns für Fairness, Integration und transparente
          Kommunikation ein
        </p>
      </div>
    </div>

    <div class="relative">
      <img
        class="absolute top-1/2 left-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 z-0"
        alt="Border"
        src="/icons/aboutus/border.svg"
      />
      <div
        class="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center gap-6"
      >
        <img src="/icons/aboutus/quotes.svg" alt="Quotes" />
        <p class="font-semibold text-[20px] sm:text-[24px] w-3/5">
          Lernen ist Erfahrung. Alles andere ist einfach nur Information
        </p>
        <p class="text-gray-400">Albert Einstein</p>
      </div>
    </div>
  </div>

  <Ticker :item="tickerItems" class="mt-24 mb-12" />

  <div class="aspect-square px-10 relative mt-3 sm:mt-10">
    <div
      class="border-[1px] border-brand-red rounded-[1000px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  h-full w-full border-dashed absolute z-0"
    />
    <div
      class="z-10 top-1/4 -translate-y-1/4 absolute rounded-[12px] bg-brand-light-gray p-6"
    >
      <p class="flex items-center">
        <img src="/icons/star.svg" alt="Star" />
        <span class="text-brand-red text-[20px] sm:text-[24px] ml-1">
          Interdisziplinär
        </span>
      </p>
      <p class="mt-4 text-[18px]">
        Themen werden fächerübergreifend unterrichtet
      </p>
    </div>
    <div
      class="z-10 top-1/4 -translate-y-1/4 right-0 absolute rounded-[12px] bg-brand-light-gray p-6"
    >
      <p class="flex items-center">
        <img src="/icons/star.svg" alt="Star" />
        <span class="text-brand-red text-[20px] sm:text-[24px] ml-1">
          Lernen erlernen
        </span>
      </p>
      <p class="mt-4 text-[18px]">Eigenständig und selbstbewusst lernen</p>
    </div>
    <div
      class="z-10 bottom-1/4 translate-y-1/4 absolute rounded-[12px] bg-brand-light-gray p-6"
    >
      <p class="flex items-center">
        <img src="/icons/star.svg" alt="Star" />
        <span class="text-brand-red text-[20px] sm:text-[24px] ml-1">
          Problem & historisch orientiert
        </span>
      </p>
      <p class="mt-4 text-[18px]">
        Lehrmethoden basierend auf anschaulichen Beispielen
      </p>
    </div>
    <div
      class="z-10 bottom-1/4 translate-y-1/4 right-0 absolute rounded-[12px] bg-brand-light-gray p-6"
    >
      <p class="flex items-center">
        <img src="/icons/star.svg" alt="Star" />
        <span class="text-brand-red text-[20px] sm:text-[24px] ml-1">
          Multilingual
        </span>
      </p>
      <p class="mt-4 text-[18px]">
        Durch Mehrsprachigkeit Aufgeschlossenheit lernen
      </p>
    </div>
    <div
      class="z-10 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 absolute rounded-[12px] bg-brand-light-gray p-6"
    >
      <p class="flex items-center">
        <img src="/icons/star.svg" alt="Star" />
        <span class="text-brand-red text-[20px] sm:text-[24px] ml-1">
          Multisensorisch
        </span>
      </p>
      <p class="mt-4 text-[18px]">Mit allen Sinnen lernen</p>
    </div>
    <h2
      class="font-semibold text-[36px] sm:text-[56px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
    >
      Methodologischer
      <br />
      Ansatz
    </h2>
  </div>

  <div class="mt-24 bg-brand-light-gray pt-12 pb-8">
    <h2
      class="font-semibold text-[36px] sm:text-[56px] mb-[48px] px-3 sm:px-10"
    >
      Unsere Ansätze und Werte bei Clavis Berlin
    </h2>

    <AppDivider class="mb-12" />

    <div class="grid grid-cols-3 px-3 sm:px-10 gap-6">
      <h3 class="text-brand-red text-[28px] sm:text-[36px]">
        Sicherheit: Ein sicheres Umfeld für unsere Schüler
      </h3>
      <div class="col-span-2 mr-8">
        <h4 class="text-gray-500 font-medium mb-1">
          Kindgerechte und sichere Räumlichkeiten
        </h4>
        <p class="text-gray-400 mb-1">
          Alle unsere Räumlichkeiten sind kindgerecht gestaltet und erfüllen
          hohe Sicherheitsstandards. Wir legen großen Wert auf die regelmäßige
          Überprüfung und Einhaltung von Sicherheitsmaßnahmen. Alle zwei Jahre
          führen wir umfassende Kontrollen durch, um sicherzustellen, dass
          unsere Einrichtungen den neuesten Sicherheitsanforderungen
          entsprechen.
        </p>
        <h4 class="text-gray-500 font-medium mb-1">
          Brandschutz und individuelle
        </h4>
        <p class="text-gray-400 mb-1">
          Sicherheitsvereinbarungen In all unseren Räumlichkeiten sind
          professionell installierte Rauchmelder und Feuerlöscher vorhanden.
          Zudem bieten wir im Rahmen des Teilnehmervertrages eine
          Zusatzvereinbarung an, die es Eltern ermöglicht, individuelle
          Regelungen für das Abholen ihrer Kinder zu treffen.
        </p>
      </div>
    </div>

    <AppDivider class="mb-12 mt-12" />

    <div class="grid grid-cols-3 px-3 sm:px-10 gap-6">
      <h3 class="text-brand-red text-[28px] sm:text-[36px]">
        Verpflegung: Gesunde Ernährung im Fokus
      </h3>
      <div class="col-span-2 mr-8">
        <h4 class="text-gray-500 font-medium mb-1">
          Förderung von Gedächtnis und Konzentration
        </h4>
        <p class="text-gray-400 mb-1">
          Eine gesunde und ausgewogene Ernährung ist entscheidend für die
          kognitive Entwicklung und das Wohlbefinden unserer Schüler. Wir bieten
          qualitativ hochwertige Produkte an, die frei von Konservierungs- und
          Zusatzstoffen sind, um Gedächtnis und Konzentration zu unterstützen.
        </p>
        <h4 class="text-gray-500 font-medium mb-1">
          Gesunde Alternativen zu Süßigkeiten
        </h4>
        <p class="text-gray-400 mb-1">
          Um den Konsum von Süßigkeiten zu reduzieren, stellen wir gesunde
          Alternativen wie getrocknete Früchte zur Verfügung. Dies fördert ein
          bewusstes Ernährungsverhalten bei unseren Schülern.
        </p>
      </div>
    </div>

    <AppDivider class="mb-12 mt-12" />

    <div class="grid grid-cols-3 px-3 sm:px-10 gap-6">
      <h3 class="text-brand-red text-[28px] sm:text-[36px]">
        Datenschutz, Fotografie & Video: Verantwortungsvoller Umgang mit Daten
      </h3>
      <div class="col-span-2 mr-8">
        <h4 class="text-gray-500 font-medium mb-1">
          Einhaltung der Datenschutzbestimmungen
        </h4>
        <p class="text-gray-400 mb-1">
          Unsere Unterlagen und Veröffentlichungen werden regelmäßig von einem
          internen Datenschutzbeauftragten überprüft, um die Einhaltung aller
          Datenschutzbestimmungen sicherzustellen.
        </p>
        <h4 class="text-gray-500 font-medium mb-1">
          Umgang mit Foto- und Videoaufnahmen
        </h4>
        <p class="text-gray-400 mb-1">
          Foto- und Videoaufnahmen vom Unterricht werden nur mit ausdrücklicher
          Erlaubnis der Eltern gemacht und ausschließlich für die
          Öffentlichkeitsarbeit der Schule verwendet.
        </p>
      </div>
    </div>

    <AppDivider class="mb-12 mt-12" />

    <div class="grid grid-cols-3 px-3 sm:px-10 gap-6">
      <h3 class="text-brand-red text-[28px] sm:text-[36px]">
        Versicherung & Haftbarkeit: Umfassender Schutz
      </h3>
      <div class="col-span-2 mr-8">
        <h4 class="text-gray-500 font-medium mb-1">
          Betriebshaftpflichtversicherung und erweiterte
        </h4>
        <p class="text-gray-400 mb-1">
          Führungszeugnisse Unsere Schule ist durch eine
          Betriebshaftpflichtversicherung abgesichert. Zudem verfügen unser
          Personal und alle Dozierenden über aktuelle erweiterte
          Führungszeugnisse, was ein weiterer Beleg für unser Engagement für
          Sicherheit und Verantwortung ist.
        </p>
      </div>
    </div>
  </div>

  <Socials class="mb-6" />
</template>
<script setup lang="ts">
import AppDivider from '../components/AppDivider.vue'
import Socials from '../components/cms/blocks/main/Socials.vue'
import Ticker from '../components/cms/blocks/main/Ticker.vue'
import AboutTutors from '../components/cms/blocks/products/details/AboutTutors.vue'

const tickerItems = {
  left_text: [
    'Эмоциональный интелект',
    'Общение',
    'Образование',
    'Родительское сообщество',
  ],
  right_text: [
    'Искусство',
    'Многоязычность',
    'Гуманистический подход',
    'Наука',
    'Искусство',
    'Многоязычность',
  ],
}

const instructors = []
</script>
