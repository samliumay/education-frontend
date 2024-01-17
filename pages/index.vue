<template>
  <div class="flex flex-col gap-14 mt-10 mb-20">
    <Slider :items="sliderItems" />

    <div class="flex flex-col gap-14 mx-[28px] md:mx-[48px]">
      <Statistics :items="statisticsItems" />
      <Info :item="textItems" />
      <ProductTypes :items="productTypesItems" />
    </div>

    <AgeGroups :items="ageGroupsItems" />
    <ProductCatalogs :items="productCatalogsItems" />
    <Quote :item="textImageItems" />
    <Ticker :item="tickerItems" />
    <Events :items="eventsItems" />
    <Video :item="videoItems" />
    <Quote :item="secondTextImageItems" />
    <Socials />
    <Ticker :item="tickerItems" />
  </div>
</template>
<script setup lang="ts">
import AgeGroups from '../components/cms/blocks/main/AgeGroups.vue'
import Events from '../components/cms/blocks/main/Events.vue'
import Info from '../components/cms/blocks/main/Info.vue'
import ProductCatalogs from '../components/cms/blocks/main/ProductCatalogs.vue'
import ProductTypes from '../components/cms/blocks/main/ProductTypes.vue'
import Quote from '../components/cms/blocks/main/Quote.vue'
import Slider from '../components/cms/blocks/main/Slider.vue'
import Socials from '../components/cms/blocks/main/Socials.vue'
import Statistics from '../components/cms/blocks/main/Statistics.vue'
import Ticker from '../components/cms/blocks/main/Ticker.vue'
import Video from '../components/cms/blocks/main/Video.vue'

useHead({
  title: 'Clavis - Home',
  meta: [
    {
      name: 'description',
      content: "That's a home page at Clavis",
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://clavis-schule.de/',
    },
  ],
})

const sliderItems = [
  {
    id: 1,
    title_img: {
      meta: {
        download_url:
          'https://media.istockphoto.com/id/499206036/photo/cityscape-of-minsk-belarus-summer-season-sunset-time.jpg?s=1024x1024&w=is&k=20&c=CrCwoFCxhY_JE6SGnnVoTnCL4jG7eHI1o8L-5NXZjck=',
      },
      title: 'Image 1',
    },
    date: '2021-01-01',
    title: 'Title 1',
  },
  {
    id: 2,
    title_img: {
      meta: {
        download_url:
          'https://media.istockphoto.com/id/1326570913/photo/pinsk-brest-region-belarus-pinsk-cityscape-skyline-in-autumn-morning-birds-eye-view-of.jpg?s=2048x2048&w=is&k=20&c=lEaeu3bJZLRi8UBY6y5BLQaUERFZmBCmEeyfnrkfGS0=',
      },
      title: 'Image 2',
    },
    date: '2021-01-02',
    title: 'Title 2',
  },
]

const statisticsItems = [
  {
    id: 1,
    title: '15+',
    description: 'einzigartige Bildungsprogramme',
  },
  {
    id: 2,
    title: '20+',
    description: 'Lehrerinnnen und Lehrer',
  },
  {
    id: 3,
    title: '140',
    description: 'Schülerinnen und Schüler pro Woche',
  },
]

const textItems = {
  text: 'Clavis ist ein neues Lernzentrum für Schüler*innen verschiedener Altersgruppen, dass ein breites Spektrum an Kursen anbietet, wie B. Kunst und visuelles Theater, Naturwissenschaften, Mathematik und Digitales Zeichnen',
}

const productTypesItems = [
  {
    id: 1,
    title: 'Kurse',
    description:
      'Lorem ipsum dolor sit amet consectetur. Tempus rhoncus diam ac est. In diam sem eget ullamcorper',
    title_img: {
      meta: {
        download_url:
          'https://media.istockphoto.com/id/545124972/photo/cathedral-of-holy-spirit-minsk-main-orthodox-church-belarus.jpg?s=2048x2048&w=is&k=20&c=mYBTBJcQdVWXEjGduerxC_DWrBmKckRuhPD3sKzjw2Q=',
      },
      title:
        'Lorem ipsum dolor sit amet consectetur. Tempus rhoncus diam ac est. In diam sem eget ullamcorper',
    },
  },
  {
    id: 2,
    title: 'Akademie',
    description:
      'Lorem ipsum dolor sit amet consectetur. Purus vestibulum justo aliquam maecenas et. Sit lorem',
    title_img: {
      meta: {
        download_url:
          'https://media.istockphoto.com/id/545124972/photo/cathedral-of-holy-spirit-minsk-main-orthodox-church-belarus.jpg?s=2048x2048&w=is&k=20&c=mYBTBJcQdVWXEjGduerxC_DWrBmKckRuhPD3sKzjw2Q=',
      },
      title:
        'Lorem ipsum dolor sit amet consectetur. Purus vestibulum justo aliquam maecenas et. Sit lorem',
    },
  },
  {
    id: 3,
    title: 'Workshops',
    description:
      'Lorem ipsum dolor sit amet consectetur. Interdum magnis ut fames nec ac viverra ultrices hendrerit',
    title_img: {
      meta: {
        download_url:
          'https://media.istockphoto.com/id/545124972/photo/cathedral-of-holy-spirit-minsk-main-orthodox-church-belarus.jpg?s=2048x2048&w=is&k=20&c=mYBTBJcQdVWXEjGduerxC_DWrBmKckRuhPD3sKzjw2Q=',
      },
      title:
        'Lorem ipsum dolor sit amet consectetur. Interdum magnis ut fames nec ac viverra ultrices hendrerit',
    },
  },
]

const ageGroupsItems = [
  {
    id: 1,
    title: '5-7 Jahre',
    description:
      'Lorem ipsum dolor sit amet consectetur. Orci congue faucibus risus id cras.',
    options: [
      {
        id: 'a1',
        title: 'Digital Art',
        title_url:
          'https://media.istockphoto.com/id/1135449521/photo/minsk-gate-to-the-city.jpg?s=2048x2048&w=is&k=20&c=pR0xDY1W1ONFWWw5sMIDucjQlBl109Dc_wbj-UVtpAI=',
      },
      {
        id: 'a2',
        title: 'Digital Art',
        title_url:
          'https://media.istockphoto.com/id/1135449521/photo/minsk-gate-to-the-city.jpg?s=2048x2048&w=is&k=20&c=pR0xDY1W1ONFWWw5sMIDucjQlBl109Dc_wbj-UVtpAI=',
      },
    ],
    title_img: {
      meta: {
        download_url:
          'https://media.istockphoto.com/id/1135449521/photo/minsk-gate-to-the-city.jpg?s=2048x2048&w=is&k=20&c=pR0xDY1W1ONFWWw5sMIDucjQlBl109Dc_wbj-UVtpAI=',
      },
      title: 'Gruppe A Bild',
    },
  },
  {
    id: 2,
    title: '8-11 Jahre',
    description:
      'Lorem ipsum dolor sit amet consectetur. Orci congue faucibus risus id cras.',
    options: [
      {
        id: 'b1',
        title: 'Wissenschaftliche Kurse',
        title_url:
          'https://media.istockphoto.com/id/1135449521/photo/minsk-gate-to-the-city.jpg?s=2048x2048&w=is&k=20&c=pR0xDY1W1ONFWWw5sMIDucjQlBl109Dc_wbj-UVtpAI=',
      },
      {
        id: 'b2',
        title: 'Digital Art',
        title_url:
          'https://media.istockphoto.com/id/1135449521/photo/minsk-gate-to-the-city.jpg?s=2048x2048&w=is&k=20&c=pR0xDY1W1ONFWWw5sMIDucjQlBl109Dc_wbj-UVtpAI=',
      },
    ],
    title_img: {
      meta: {
        download_url:
          'https://media.istockphoto.com/id/1135449521/photo/minsk-gate-to-the-city.jpg?s=2048x2048&w=is&k=20&c=pR0xDY1W1ONFWWw5sMIDucjQlBl109Dc_wbj-UVtpAI=',
      },
      title: 'Gruppe B Bild',
    },
  },
]

const productCatalogsItems = []

const textImageItems = {
  quote_img: {
    meta: {
      download_url: '/media/images/photo_2024-01-16_15-49-41.original.jpg',
    },
    title: 'Quote Image',
  },
  title_img: {
    meta: {
      download_url: '/media/images/Frame_40548.original.png',
    },
    title: 'Title Image',
  },
  description:
    'Clavis ist ein neues Lernzentrum für Schüler*innen verschiedener Altersgruppen, dass ein breites Spektrum an Kursen anbietet, wie z. B. Kunst und visuelles Theater, Naturwissenschaften, Mathematik und Digitales Zeichnen',
  text_color: '#DB3B4D',
  person: {
    first_name: 'Max',
    last_name: 'Mustermann',
  },
}

const secondTextImageItems = {
  quote_img: {
    meta: {
      download_url: '/media/images/photo_2024-01-16_15-55-46.original.jpg',
    },
    title: 'Quote Image',
  },
  title_img: {
    meta: {
      download_url: '/media/images/Frame_40548.original.png',
    },
    title: 'Title Image',
  },
  description:
    'Clavis ist ein neues Lernzentrum für Schüler*innen verschiedener Altersgruppen, dass ein breites Spektrum an Kursen anbietet, wie z. B. Kunst und visuelles Theater, Naturwissenschaften, Mathematik und Digitales Zeichnen',
  text_color: '#000',
  person: {
    first_name: 'Max',
    last_name: 'Mustermann',
  },
}

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

const eventsItems = []
</script>
