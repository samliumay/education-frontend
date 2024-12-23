import type { mapTypeBlock } from 'mappers/cms'

export type PageBlockMeta = {
  type: keyof typeof mapTypeBlock
  detail_url?: string
}

export type PageBlock = {
  id: number
  meta: PageBlockMeta
  field: string
  items: PageBlock[]
  [x: string]: any
}

export type PageResponse = {
  meta: {
    total_count: number
  }
  items: PageBlock[]
}

export type CmsImage = {
  id: number
  meta: {
    type: string
    detail_url: string
    download_url: string
    focal_point_x: number
    focal_point_y: number
    focal_point_width: number
    focal_point_height: number
  }
  title: string
}

// Components
export type ProductComponentExtraProps = {
  type: 'academy' | 'workshop' | 'course'
}
