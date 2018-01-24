
export class User {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  emailVerified: string;
  phoneNumber: string;
  isAnonymous: string;
  providerData: {
    uid: string;
    displayName: string;
    photoURL: string;
    email: string;
    phoneNumber: string;
    providerId: string;
  }[];
  apiKey: string;
  appName: string;
  authDomain: string;
  stsTokenManager: {
    apiKey: string;
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  };
  redirectEventId: string;
  lastLoginAt: string;
  createdAt: string;
}

const mockExpiry = () => {
  const now = new Date();
  return now.setHours(now.getHours() + 1);
};

export const mockUser = {
  'uid': '',
  'displayName': null,
  'photoURL': null,
  'email': 'tom@githop.com',
  'emailVerified': false,
  'phoneNumber': null,
  'isAnonymous': false,
  'providerData': [{
    'uid': 'tom@githop.com',
    'displayName': null,
    'photoURL': null,
    'email': 'tom@githop.com',
    'phoneNumber': null,
    'providerId': 'password'
  }],
  'apiKey': '',
  'appName': '[DEFAULT]',
  'authDomain': 'githop-backend.firebaseapp.com',
  'stsTokenManager': {
    'expirationTime': mockExpiry()
  },
  'redirectEventId': null,
  'lastLoginAt': '1516525393000',
  'createdAt': '1492928904000'
};
