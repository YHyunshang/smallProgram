/**
 * Created by 李华良 on 2019-08-22
 */
import * as React from 'react'
import { View, Dimensions } from 'react-native'
import chunk from 'lodash/chunk'
import styles from './Box.styles'
import BoxItem, {
  Props as BoxItemProps,
} from '@components/business/Content/BoxItem'

const windowWith = Dimensions.get('window').width

interface Column extends BoxItemProps {
  key: string | number
}

interface Props {
  data: Column[][]
  columnNumber: number
}

export default function Box({ data, columnNumber }: Props) {
  const gridData = chunk(data, columnNumber)
  const rowTotal = gridData.length
  const colWidth = windowWith / columnNumber
  return (
    <View style={styles.container}>
      {gridData.map((row, idx) => (
        <View
          style={[styles.row, idx < rowTotal - 1 && styles.rowNotLast]}
          key={idx}
        >
          {row.map(({ key, ...boxItemProps }) => (
            <View style={[styles.column, { width: colWidth }]} key={key}>
              <BoxItem {...boxItemProps} />
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}
