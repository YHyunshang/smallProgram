/**
 * Created by 李华良 on 2019-07-05
 */
import * as React from 'react'
import { View } from 'react-native'
import Box from './Box'
import styles from './BoxFloor.styles'

export interface Props {
  data: {
    id: string | number
    link: string // 跳转链接
    linkType: string // 跳转地址类型
    imgUrl: string // 图片地址
    name: string // 标题
  }[]
  countPerLine: number // 每行个数
}

function BoxFloor({ data, countPerLine }: Props) {
  const rows = Array.apply(null, {
    length: Math.ceil(data.length / countPerLine),
  }).map((ele, idx) => data.slice(idx * countPerLine, (idx + 1) * countPerLine))

  const colStyles = [styles.col, { width: `${100 / countPerLine}%` }]

  const rowCount = rows.length

  return (
    <View style={styles.container}>
      {rows.map((cols, idx) => (
        <View
          key={idx}
          style={[styles.row, idx < rowCount - 1 ? styles.notLastRow : {}]}
        >
          {cols.map(({ imgUrl, link, linkType, name, id }) => (
            <View style={colStyles} key={id}>
              <Box
                image={imgUrl}
                link={{ type: linkType, uri: link }}
                title={name}
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

export default BoxFloor
