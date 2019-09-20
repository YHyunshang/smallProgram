/**
 * Created by 李华良 on 2019-08-22
 */
import * as React from 'react'
import {
  View,
  Dimensions,
  LayoutAnimation,
  Image,
  TouchableOpacity,
} from 'react-native'
import chunk from 'lodash/chunk'
import styles from './Box.styles'
import BoxItem, {
  Props as BoxItemProps,
} from '@components/business/Content/BoxItem'
import { iconExpand } from '@const/resources'

const windowWith = Dimensions.get('window').width

export interface Column extends BoxItemProps {
  key: string | number
}

interface Props {
  data: Column[]
  maxRow?: number
  columnNumber: number
}

export default function Box({ data, columnNumber, maxRow = 2 }: Props) {
  const gridData = chunk(data, columnNumber)
  const rowTotal = gridData.length
  const colWidth = windowWith / columnNumber

  const [showAll, setShowAll] = React.useState(false)

  LayoutAnimation.easeInEaseOut()

  return (
    <View style={styles.container}>
      {gridData.slice(0, maxRow).map((row, idx) => (
        <View style={[styles.row, idx !== 0 && styles.rowNotFirst]} key={idx}>
          {row.map(({ key, ...boxItemProps }) => (
            <View style={[styles.column, { width: colWidth }]} key={key}>
              <BoxItem {...boxItemProps} />
            </View>
          ))}
        </View>
      ))}
      <View style={[!showAll && { height: 0, overflow: 'hidden' }]}>
        {gridData.slice(maxRow).map((row, idx) => (
          <View style={[styles.row, styles.rowNotFirst]} key={idx}>
            {row.map(({ key, ...boxItemProps }) => (
              <View style={[styles.column, { width: colWidth }]} key={key}>
                <BoxItem {...boxItemProps} />
              </View>
            ))}
          </View>
        ))}
      </View>
      {rowTotal > maxRow && (
        <View style={styles.toggleBox}>
          <TouchableOpacity
            style={styles.toggleBtn}
            onPress={() => setShowAll(!showAll)}
          >
            <Image
              style={[
                styles.toggleImg,
                { transform: [{ rotate: showAll ? '180deg' : '0deg' }] },
              ]}
              source={iconExpand}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
