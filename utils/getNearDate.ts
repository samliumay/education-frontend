export const getNearDate = (dayOfWeek: string, time: string) => {
  const dayIndexes = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]
  const targetDayIndex = dayIndexes.indexOf(String(dayOfWeek).toLowerCase())

  if (targetDayIndex === -1) {
    throw new Error('Invalid day of week')
  }

  const [hours, minutes] = time.split(':').map(Number)
  const date = new Date()
  date.setHours(hours)
  date.setMinutes(minutes)
  date.setSeconds(0)
  date.setMilliseconds(0)

  // Calculate the day of the week we need to move to
  let dayDiff = (targetDayIndex - date.getDay() + 7) % 7
  if (dayDiff === 0 && date < new Date()) {
    // If the specified time has already passed today, move to the next week
    dayDiff = 7
  }
  date.setDate(date.getDate() + dayDiff)

  // Format the date as day.month
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  return `${day}.${month}`
}
