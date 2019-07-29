/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import CMS from './src/pages/CMS'

AppRegistry.registerComponent(appName, () => CMS);
AppRegistry.registerComponent('RNCMS', () => CMS)
