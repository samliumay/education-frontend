// main
import SeoText from '@/components/cms/blocks/main/SeoText.vue'

import AgeGroups from '../components/cms/blocks/main/AgeGroups.vue'
import Carousel from '../components/cms/blocks/main/Carousel.vue'
import CatalogCards from '../components/cms/blocks/main/CatalogCards.vue'
import Catalogs from '../components/cms/blocks/main/Catalogs.vue'
import Infographics from '../components/cms/blocks/main/Infographics.vue'
import ProductCarousel from '../components/cms/blocks/main/ProductCarousel.vue'
import Quote from '../components/cms/blocks/main/Quote.vue'
import RunningText from '../components/cms/blocks/main/RunningText.vue'
import SocialMedia from '../components/cms/blocks/main/SocialMedia.vue'
import Video from '../components/cms/blocks/main/Video.vue'
import PriceBlock from '../components/cms/blocks/misc/PriceBlock.vue'
// catalog
import AppProductCard from '../components/cms/blocks/products/ProductCard.vue'

export const mapTypeBlock = {
  'products.ProductPage': AppProductCard,
  "carousel": Carousel,
  "infographics": Infographics,
  "seo_text": SeoText,
  "catalog_cards": CatalogCards,
  "catalogs": Catalogs,
  "quote_block": Quote,
  "running_text": RunningText,
  "product_carousel": ProductCarousel,
  "catalog_list": ProductCarousel,
  "social_media": SocialMedia,
  "age_groups": AgeGroups,
  "video_block": Video,
  "tariff_block": PriceBlock,
}
