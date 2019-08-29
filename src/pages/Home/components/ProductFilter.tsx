import * as React from 'react'
import styles from './ProductFilter.styles'
import { View, Image, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { object } from 'prop-types'

export enum StorageChoices {
  InStore, // 有货
  All, // 所有
}

export enum Sort {
  ASC, // 升序
  DESC, // 降序
  None, // 不排序
}

export function sort2String(key) {
  switch (key) {
    case Sort.ASC:
      return 'ASC'
    case Sort.DESC:
      return 'DESC'
    default:
      return ''
  }
}

function enumNext(enumDef: { [index: string]: number }, current: number) {
  // todo: 类型/值检查
  const length = Object.keys(enumDef).length / 2
  const nextIdx = (current + 1) % length
  const nextVal = enumDef[enumDef[nextIdx]]
  console.log(current, nextIdx, nextVal)
  return nextVal
}

interface Props {
  filters: {
    storage: StorageChoices
    priceSorter: Sort
  }
  onFilterChange: (filters: Props['filters']) => void
}

export default function ProductFilter({ filters, onFilterChange }: Props) {
  console.log(filters)
  const { storage, priceSorter } = filters
  const storeFilterImg =
    storage === StorageChoices.InStore
      ? require('@img/icon-checked.png')
      : require('@img/icon-unchecked.png')
  const sortImg = {
    [Sort.ASC]: require('@img/icon-sort-asc.png'),
    [Sort.DESC]: require('@img/icon-sort-desc.png'),
    [Sort.None]: require('@img/icon-sort.png'),
  }[priceSorter]
  return (
    <View style={styles.container}>
      <View style={styles.filterItemBox}>
        <TouchableOpacity
          activeOpacity={0.95}
          style={styles.filterBox}
          onPress={() =>
            onFilterChange({
              ...filters,
              // @ts-ignore
              storage: enumNext(StorageChoices, storage),
            })
          }
        >
          <Text
            style={[
              styles.filterText,
              filters.storage === StorageChoices.InStore &&
                styles.filterTextActive,
            ]}
          >
            有货
          </Text>
          <Image style={styles.filterImg} source={storeFilterImg}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.filterItemBox}>
        <TouchableOpacity
          activeOpacity={0.95}
          style={styles.filterBox}
          onPress={() =>
            onFilterChange({
              ...filters,
              // @ts-ignore
              priceSorter: enumNext(Sort, priceSorter),
            })
          }
        >
          <Text style={styles.filterText}>价格</Text>
          <Image style={styles.sortImg} source={sortImg}></Image>
        </TouchableOpacity>
      </View>
    </View>
  )
}
