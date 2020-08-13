

import {Dimensions} from 'react-native';

export const color = '#23434d';
export const screen = Dimensions.get('window');
export const setting = [
  {
    icon: require('../icons/ic_user.png'),
    title: 'My Profile',
    type: 'profile'
  },
  {
    icon: require('../icons/ic_protect.png'),
    title: 'Security',
    type: 'security',
  },
  {
    icon: require('../icons/ic_protect.png'),
    title: 'Change Password',
    type: 'pass',
  },
  {
    icon: require('../icons/ic_api.png'),
    title: 'API Access',
    type: 'api',
  },
  {
    icon: require('../icons/ic_kyc.png'),
    title: 'VeriME KYC',
    type: 'kyc',
  },
  {
    icon: require('../icons/ic_info.png'),
    title: 'About Us',
    type: 'about',
  },
]