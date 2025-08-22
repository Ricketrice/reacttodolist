// src/awsConfig.js
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      region: 'ap-southeast-2',
      userPoolId: 'ap-southeast-2_SJ6XL1UHH',        
      userPoolClientId: '1j75ufoq66lq8hp8984rqhtqmk',  
      loginWith: {
        email: true,
        phone: false,
        username: false,
      },
      
    },
  },
});
