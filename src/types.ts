export type Product = {
  id: number
  type: string
  name: string
  description: string
  language: string
  age_group: string
  min_number_of_meeting_per_week: number
  category: string
  schedule_slots: [
    {
      id: number
      weekday: string
      start: string
      end: string
      space: number
      instructor: string
    },
  ]
}
