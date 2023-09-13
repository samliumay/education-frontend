export type Slot = {
  id: number
  weekday: string
  start: string
  end: string
  space: number
  instructor: string
}

export type Product = {
  id: number
  type: string
  name: string
  description: string
  language: string
  age_group: string
  min_number_of_meeting_per_week: number
  category: string
  schedule_slots: Slot[]
}

export type City = {
  id: number
  name: string
}

export type Country = {
  id: number
  name: string
}

export type FullUser = {
  id?: number
  email: string
  first_name: string
  last_name: string
  phone_number: string
  company_name: string
  city?: number
  country?: number
  state: string
  street: string
  post_code: string
  token: string
}

export type LoginUser = {
  email: string
  password: string
}

export type Offer = {
  meeting_card?: {
    number_of_meetings: number
    price: string
  }
  subscription?: {
    number_of_meetings_per_week: number
    price: string
  }
}
