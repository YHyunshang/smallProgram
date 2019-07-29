/**
 * Created by 李华良 on 2019-07-26
 */
function log(level='debug', ...rest) {
  console[level](`<<RN|${level}>>`, ...rest)
}

export function debug(...args: any[]) {
  // @ts-ignore
  return log('debug', ...args)
}

export function info(...args: any[]) {
  // @ts-ignore
  return log('log', ...args)
}

export function warn(...args: any[]) {
  // @ts-ignore
  return log('warn', ...args)
}

export function error(...args: any[]) {
  // @ts-ignore
  return log('error', ...args)
}