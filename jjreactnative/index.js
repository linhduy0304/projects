import { AppRegistry } from 'react-native';
import {AppConfig} from './app/common/config';
import App from './app/App';

console.log('AppConfig: ', AppConfig);

AppRegistry.registerComponent('JamJaReactNative', () => App);
