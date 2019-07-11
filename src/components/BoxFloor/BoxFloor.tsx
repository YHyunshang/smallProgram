/**
 * Created by 李华良 on 2019-07-05
 */
import React from 'react'
import { View, StyleSheet } from 'react-native'
import Box from './Box'

export interface Props {
  data: array<object>;
}

class BoxFloor extends React.Component<Props, object> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const { data } = this.props

    return (
      <View style={styles.container}>
        {data.map(({ url, image, title }, idx) => (
          <Box image={image} url={url} title={title} key={idx} />
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
})

export default BoxFloor
