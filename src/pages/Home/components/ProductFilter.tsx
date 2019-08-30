import * as React from 'react'
import styles from './ProductFilter.styles'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { object } from 'prop-types'
import {
  iconChecked,
  iconSort,
  iconSortAsc,
  iconSortDesc,
  iconUnchecked,
} from '@const/resources'

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
    storage === StorageChoices.InStore ? iconChecked : iconUnchecked
  const sortImg = {
    [Sort.ASC]: iconSortAsc,
    [Sort.DESC]: iconSortDesc,
    [Sort.None]: iconSort,
  }[priceSorter]
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.filterBtn}
        activeOpacity={0.95}
        onPress={() =>
          onFilterChange({
            ...filters,
            // @ts-ignore
            storage: enumNext(StorageChoices, storage),
          })
        }
      >
        <View style={styles.filterBox}>
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
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.filterBtn}
        activeOpacity={0.95}
        onPress={() =>
          onFilterChange({
            ...filters,
            // @ts-ignore
            priceSorter: enumNext(Sort, priceSorter),
          })
        }
      >
        <View style={styles.filterBox}>
          <Text style={styles.filterText}>价格</Text>
          <Image style={styles.sortImg} source={sortImg}></Image>
        </View>
      </TouchableOpacity>
    </View>
  )
}
