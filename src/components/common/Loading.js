import React from 'react'
import {ActivityIndicator, StyleSheet, Text, View, Dimensions} from 'react-native'
let width = Dimensions.get('window').width
let height = Dimensions.get('window').height
export default class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.minShowingTime = 200
    this.state = {
      isLoading: false,
      setIsLoading: (isLoading) => {
        if (isLoading != this.state.isLoading) {
          let curTimeLong = new Date().getTime()
          if (isLoading) {
            this.startTime = curTimeLong
            this.setState({
              isLoading
            })
          } else {
            let hasShowingTimeLong = curTimeLong - this.startTime
            if (hasShowingTimeLong < this.minShowingTime) {
              setTimeout(() => {
                this.setState({
                  isLoading
                })
              }, this.minShowingTime - hasShowingTimeLong)
            } else {
              this.setState({
                isLoading
              })
            }
          }
        }
      }
    }
  }
    /**
     * @description: 展示loading图标
     */
    showLoading = () => {
      this.state.setIsLoading(true)
    }
    /**
     * @description: 隐藏loading图标
     */
    dismissLoading = () => {
      this.state.setIsLoading(false)
    }
    render() {
      if (!this.state.isLoading) {
        return null
      }
      return (
        <View style={styles.loadingContent}>
          <View style={styles.loading}>
            <ActivityIndicator color="white"/>
            <Text style={styles.loadingTitle}>{this.props.title}...</Text>
          </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  loadingContent: {
    flex: 1,
    width,
    height,
    position: 'absolute',
    zIndex: 100,
    backgroundColor: '#10101099'
  },
  loading: {
    backgroundColor: '#10101099',
    height: 80,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: (height - 80) / 2,
    left: (width - 100) / 2
  },
  loadingTitle: {
    marginTop: 10,
    fontSize: 14,
    color: 'white'
  }
})
