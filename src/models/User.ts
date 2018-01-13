
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
    expirationTime: string;
  };
  redirectEventId: string;
  lastLoginAt: string;
  createdAt: string;
}
