import { createInstance, User } from '../models';
import GithopBackend from './api-client';

const getLocalStorageKey = () => {
  let key = 'user';
  if (process.env.NODE_ENV === 'development') {
    key = 'dev-' + key;
  }
  return key;
};

export const LOCAL_STORAGE_USER_KEY = getLocalStorageKey();

export const getLocalUser = () => {
  const localUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
  if (localUser) {
    const userModel = createInstance<User>(User, JSON.parse(localUser));
    const expiry = userModel.stsTokenManager.expirationTime;
    if (Date.now() < expiry) {
      return userModel;
    }
  }
  return null;
};

export class UserService {
  static isAuthenticated(): boolean {
    return getLocalUser() != null;
  }

  static login(email: string, password: string): Promise<User> {
    return GithopBackend.login(email, password).then((user: User) => {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
      return createInstance(User, user);
    });
  }

  static logout(): void {
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  }
}
