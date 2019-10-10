/**
 * Created by 李华良 on 2019-09-29
 */
export enum TimeUnit {
  Hour = 'hour',
  Min = 'minute',
  Sec = 'second',
  MsH = 'millisecond-hundred'
}
export function padTimeByUnit(duration:number, unit: TimeUnit) {
  const g = (num:number) => `${num}`.padStart(unit === TimeUnit.MsH ? 1 : 2, '0')

  let val
  switch (unit) {
    case TimeUnit.Hour:
      val = duration / 3600000
      break
    case TimeUnit.Min:
      val = (duration % 3600000) / 60000
      break
    case TimeUnit.Sec:
      val = ((duration % 3600000) % 60000) / 1000
      break
    case TimeUnit.MsH:
      val = (((duration % 3600000) % 60000) % 1000) / 100
      break
    default:
      val = 0
      break
  }
  return g(Math.floor(val))
}