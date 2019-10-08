/**
 * Created by 李华良 on 2019-07-15
 */
import * as React from 'react'
import { createIconSetFromFontello } from 'react-native-vector-icons'

const fontelloConfig = require('./config.json')

const Icon = createIconSetFromFontello(fontelloConfig)

export default Icon
