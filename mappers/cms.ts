// main
import AgeGroups from '../components/cms/blocks/main/AgeGroups.vue'
import Carousel from '../components/cms/blocks/main/Carousel.vue'
import CatalogCards from '../components/cms/blocks/main/CatalogCards.vue'
import Catalogs from '../components/cms/blocks/main/Catalogs.vue'
import Infographics from '../components/cms/blocks/main/Infographics.vue'
import ProductCarousel from '../components/cms/blocks/main/ProductCarousel.vue'
import Quote from '../components/cms/blocks/main/Quote.vue'
import RunningText from '../components/cms/blocks/main/RunningText.vue'
import SeoText from '../components/cms/blocks/main/SeoText.vue'
import SocialMedia from '../components/cms/blocks/main/SocialMedia.vue'
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
  "social_media": SocialMedia,
  "age_groups": AgeGroups,
}
