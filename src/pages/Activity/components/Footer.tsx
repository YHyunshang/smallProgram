import * as React from 'react'
import styles from './Footer.styles'
import { View, Image, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { Native } from '@utils'

interface Props {
  cartCount: number
  amount: number
}

export default function Footer({ cartCount, amount }: Props) {
  const [badgeLayout, setBadgeLayout] = React.useState({
    width: 20,
    height: 20,
  })
  const onBadgeLayout = ({ nativeEvent: { layout } }) => setBadgeLayout(layout)
  return (
    <View style={styles.container}>
      <View style={styles.cartIconBox}>
        <Image style={styles.cartImg} source={require('@img/cart-gray.png')} />
        {!!cartCount && (
          <Text
            style={[
              styles.cartBadge,
              {
                transform: [
                  { translateY: -(badgeLayout.height / 2) },
                  { translateX: badgeLayout.width / 2 },
                ],
              },
            ]}
            onLayout={onBadgeLayout}
          >
            {cartCount}
          </Text>
        )}
      </View>
      <Text style={styles.price}>
        <Text style={styles.pricePrefix}>¥ </Text>
        {amount / 100}
      </Text>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() =>
          Native.navigateTo({
            type: Native.NavPageType.NATIVE,
            uri: 'B001,B001',
          })
        }
      >
        <LinearGradient
          style={styles.cartPageNavBox}
          colors={['#FF3914', '#FF6042']}
        >
          <Text style={styles.navText}>去结算</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}
