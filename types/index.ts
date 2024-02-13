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
  purchase_options: Array<{
    id: number
    type: string
    base_price: string
  }>
  photo: string
  meeting_card: {
    number_of_meetings: number
    price: string
  }
  subscriptions: [
    {
      number_of_meetings_per_week: number
      price: string
    },
  ]
}

export type City = {
  id: number
  name: string
}

export type Country = {
  id: number
  name: string
}

export type Category = {
  id: number
  name: string
}

export type FullUser = {
  pk?: number
  id?: number
  email: string
  first_name: string
  last_name: string
  phone_number?: string
  company_name?: string
  city?: number
  country?: number
  state?: string
  street?: string
  post_code?: string
  token?: string
}

export type Tariff = 'subscription' | 'meeting_card'

export type Child = {
  child_first_name: string
  child_last_name: string
}

export interface OfferUser extends FullUser, Child {
  selected_schedule_slots: number[]
  product: number
  order_type?: Tariff
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

export type LoginErrors = {
  email?: string[]
  password?: string[]
  non_field_errors?: string[]
}

export type RegistrationErrors = {
  email?: string[]
  phone_number?: string[]
  password1?: string[]
  password2?: string[]
  first_name?: string[]
  last_name?: string[]
  non_field_errors?: string[]
}

export type Instructor = {
  first_name: string
  last_name: string
  job: string
  photo: string[]
}

export interface IEventTarget {
  value: string
}

export enum LoginSteps {
  Options,
  Email,
  RestorePassword,
  ConfirmRestorePassword,
  SignUp,
}

export type OrderItem = {
  id: number
  calculated_price: string
  academy_number_of_weeks: number
  schedule_type: ScheduleType
  product: Product
  order: number
  visitor: number
  purchase_option: number
  schedule_slots: (number | Slot)[]
}

export type Order = {
  id: number
  items: OrderItem[]
  stripe_id: string
  paypal_id: string
  status: OrderStatusType
  payer_first_name: string
  payer_last_name: string
  created_at: string
  user: number
}

export type ScheduleType =
  | 'Course (1 / week)'
  | 'Course (2 / week)'
  | 'Course (3 / week)'
  | 'TERMINKARTEN'
  | 'Academy (1st half)'
  | 'Academy (2nd half)'
  | 'Academy (full day)'

export type OrderStatusType =
  | 'in_cart'
  | 'payment_staged'
  | 'payment_fulfilled'
  | 'payment_declined'

export type AdditionalInfo = {
  email: string
  first_name: string
  last_name: string
  phone_number: string
  company_name: string
  country: string
  street: string
  post_code: string
  city: string
  state: string
}

export type Visitor = {
  id: number
  first_name: string
  last_name: string
  birth_date: string
}

export type VisitorOrders = Visitor & {
  orders: OrderItem[]
}

export enum GetChildStep {
  Select,
  Add,
}

export type AcademySeason = {
  to: string
  from: string
  title: string
  image_url: string | null
}

export type ProductType = 'course' | 'academy' | 'workshop' | 'event' | 'special'
