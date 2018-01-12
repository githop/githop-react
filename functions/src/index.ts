import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import { config } from '../firebase-keys';

firebase.initializeApp(config);
const serviceAccount = require('../githop-backend-firebase-adminsdk-9ldd1-9e8f1f6a9c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`
});

const jsonContentType = {"Content-Type": "application/json"};
export const login = functions.https.onRequest((request, response) => {
  const { body: { email, password } } = request;
  return firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        return user.getIdToken(true)
            .then((token: string) => {
              response.writeHead(200, jsonContentType);
              response.end(JSON.stringify(token));
            })
            .catch((e: any) => {
              response.writeHead(500, jsonContentType);
              response.end(JSON.stringify(e))
            });
      })
      .catch((e: any) => {
        response.writeHead(401, jsonContentType);
        response.end(JSON.stringify(e))
      });
});

