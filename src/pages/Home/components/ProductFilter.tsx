import * as React from 'react'
import styles from './ProductFilter.styles'
import { View, Image, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

// enum StorageType =

interface Props {
  filters: {
    storage: boolean
    priceSorter: string
  }
  onFilterChange: {}
}

export default function ProductFilter({ filters, onFilterChange }: Props) {
  const storeFilterImg = filters.storage
    ? require('@img/icon-checked.png')
    : require('@img/icon-unchecked.png')
  const sortImg =
    {
      asc: require('@img/icon-sort-asc.png'),
      desc: require('@img/icon-sort-desc.png'),
    }[filters.priceSorter] || require('@img/icon-sort.png')
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text
          style={[
            styles.filterText,
            filters.storage && styles.filterTextActive,
          ]}
        >
          有货
        </Text>
        <Image style={styles.filterImg} source={storeFilterImg}></Image>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterBox}>
        <Text style={styles.filterText}>价格</Text>
        <Image style={styles.sortImg} source={sortImg}></Image>
      </TouchableOpacity>
    </View>
  )
}
