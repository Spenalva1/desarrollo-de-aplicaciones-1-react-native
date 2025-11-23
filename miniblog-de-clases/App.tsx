// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import HomeScreen from './src/screens/HomeScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'MiniBlog' }}
          />
          <Stack.Screen
            name="CreatePost"
            component={CreatePostScreen}
            options={{ title: 'Crear Post' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
