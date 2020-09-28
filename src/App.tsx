import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  useEffect(() => {
    // Todas as verificacoes, tarefas ou acoes a serem executadas antes da
    // aplicacao inicializar devem ser chamadas antes daqui
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#312e38"
        translucent
      />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#312e38' }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
