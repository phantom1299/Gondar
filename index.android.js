import { AppRegistry } from 'react-native';
// import Auth0 from 'react-native-auth0';
import App from './src/app';

// const auth0 = new Auth0({
//   domain: 'mlx.eu.auth0.com',
//   clientId: '5TURFeY22RUuFuWZbiYrgyvPOpu11fYH'
// });

// auth0.webAuth
//   .authorize({ scope: 'openid email', audience: 'https://mlx.eu.auth0.com/userinfo' })
//   .then(
//     credentials => {
//       console.log(credentials);
//     }
//     // Successfully authenticated
//     // Store the accessToken
//   )
//   .catch(error => console.log(error));

AppRegistry.registerComponent('gondar', () => App);
