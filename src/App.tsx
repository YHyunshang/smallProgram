/**
 * Created by 李华良 on 2019-07-11
 */
import * as React from 'react'
import { View, StyleSheet, ScrollView, Image, Text } from 'react-native'

interface State {
}

class App extends React.Component<object, State> {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <ScrollView style={styles.wrapper}>
        <Text>Hello World</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
})

export default App
