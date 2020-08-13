

import React from 'react';
import { Scene, Router, Stack} from 'react-native-router-flux';
import { Provider } from 'react-redux';

import App from './screens/App';
import Home from './screens/Home';
import Login from './screens/Login';
import BC from './screens/BC';
import PL from './screens/PL';

import DKN from './screens/LOT/DKN';
import DKLT from './screens/LOT/DKLT';
import DKDMVS from './screens/LOT/DKDMVS';
import PDN from './screens/LOT/PDN';
import PDLT from './screens/LOT/PDLT';
import PDDMVS from './screens/LOT/PDDMVS';

import HSNS from './screens/TTCN/HSNS';
import QHNT from './screens/TTCN/QHNT';
import QTCTTD from './screens/TTCN/QTCTTD';
import QTCTHT from './screens/TTCN/QTCTHT';
import QTDTTCT from './screens/TTCN/QTDTTCT';
import QTDTNCT from './screens/TTCN/QTDTNCT';
import QTHDLD from './screens/TTCN/QTHDLD';
import QTTDLPC from './screens/TTCN/QTTDLPC';
import QTKT from './screens/TTCN/QTKT';
import QTKL from './screens/TTCN/QTKL';
import QTDG from './screens/TTCN/QTDG';
import QTNL from './screens/TTCN/QTNL';

import TDG from './screens/DG/TDG';
import KPINV from './screens/DG/KPINV';
import KPICN from './screens/DG/KPICN';

import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import createSaga from 'redux-saga';
import rootSaga from './sagas/rootSaga';
const sagaMidd =  createSaga();
const store = createStore(reducer, applyMiddleware(sagaMidd));

const Main = () => (
  <Provider store = {store}>
    <Router>
      <Stack key="root">
        <Scene key="app" component={App} hideNavBar={true} />
        <Scene key="login" component={Login} hideNavBar={true} />
        <Scene key="home" component={Home} hideNavBar={true} />
        <Scene key="bc" component={BC} hideNavBar={true} />
        <Scene key="pl" component={PL} hideNavBar={true} />

        <Scene key="dkn" component={DKN} hideNavBar={true} />
        <Scene key="dklt" component={DKLT} hideNavBar={true} />
        <Scene key="dkdmvs" component={DKDMVS} hideNavBar={true} />
        <Scene key="pdn" component={PDN} hideNavBar={true} />
        <Scene key="pdlt" component={PDLT} hideNavBar={true} />
        <Scene key="pddmvs" component={PDDMVS} hideNavBar={true} />
        
        <Scene key="hsns"  component={HSNS} hideNavBar={true} />
        <Scene key="qhnt" component={QHNT} hideNavBar={true} />
        <Scene key="qtcttd" component={QTCTTD} hideNavBar={true} />
        <Scene key="qtctht" component={QTCTHT} hideNavBar={true} />
        <Scene key="qtdttct" component={QTDTTCT} hideNavBar={true} />
        <Scene key="qtdtnct" component={QTDTNCT} hideNavBar={true} />
        <Scene key="qthdld" component={QTHDLD} hideNavBar={true} />
        <Scene key="qttdlpc" component={QTTDLPC} hideNavBar={true} />
        <Scene key="qtkt" component={QTKT} hideNavBar={true} />
        <Scene key="qtkl" component={QTKL} hideNavBar={true} />
        <Scene key="qtdg" component={QTDG} hideNavBar={true} />
        <Scene key="qtnl" component={QTNL} hideNavBar={true} />

        <Scene key="tdg" component={TDG} hideNavBar={true} />
        <Scene key="kpinv" component={KPINV} hideNavBar={true} />
        <Scene key="kpicn" component={KPICN} hideNavBar={true} />
      </Stack>
    </Router>
  </Provider>
);
sagaMidd.run(rootSaga)
export default Main;