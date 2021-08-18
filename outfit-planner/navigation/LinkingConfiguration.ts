import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              OutfitsTab: 'one',
            },
          },
          TabTwo: {
            screens: {
              MenuListScreen: 'MenuListScreen',
              ProductsList: 'ProductsList'
            },
          },
        },
      },
      Auth: {
        screens:{
          AuthScreen: 'auth'
        }
      },
      NotFound: '*',
    },
  },
};
