import * as React from 'react'
import styles from './ProductFilter.styles'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import {
  iconChecked,
  iconSortAsc,
  iconSortDesc,
  iconUnchecked,
} from '@const/resources'

export enum StorageChoices {
  InStore = '1', // 有货
  All = '0', // 所有
}

export enum Sort {
  ASC = 'ASC', // 升序
  DESC = 'DESC', // 降序
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
  const { storage, priceSorter } = filters
  const storageFilterImg = {
    [StorageChoices.InStore]: iconChecked,
    [StorageChoices.All]: iconUnchecked,
  }[storage]
  const sortImg = {
    [Sort.ASC]: iconSortAsc,
    [Sort.DESC]: iconSortDesc,
    // [Sort.None]: iconSort,
  }[priceSorter]

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.filterBtn}
        activeOpacity={0.95}
        onPress={() => {
          onFilterChange({
            ...filters,
            storage:
              storage === StorageChoices.All
                ? StorageChoices.InStore
                : StorageChoices.All,
          })
        }}
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
          <Image style={styles.filterImg} source={storageFilterImg}></Image>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.filterBtn}
        activeOpacity={0.95}
        onPress={() =>
          onFilterChange({
            ...filters,
            priceSorter: priceSorter === Sort.ASC ? Sort.DESC : Sort.ASC,
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
