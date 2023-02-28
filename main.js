import firebaseConfig from './hidden/firebaseConfig';
import { getMessaging, getToken } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function component() {
  const element = document.createElement('div');

  element.innerHTML = JSON.stringify(messaging);

  return element;
}

const getFirebaseToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: 'FIREBASE_VAPID_KEY',
    });
    if (!currentToken) {
      console.log(
        "This shouldn't happen - No registration token available. Request permission to generate one."
      );
    } else {
      // we have a token, save it
      console.log('firebase', currentToken);
      bring('post', '/home/register_push', {
        token: currentToken,
        type: 'fireweb',
      });
    }
  } catch (e) {
    console.log('An error occurred while retrieving token. ', e);
  }
};

document.body.appendChild(component());
document.body.appendChild(getFirebaseToken());

/**
 ~/Developer/vite/messaging-bunlde-7063 -  (main) $ yarn build
yarn run v1.22.19
$ vite build
vite v4.1.4 building for production...
✓ 14 modules transformed.
dist/index.html                    0.40 kB
dist/assets/favicon-17e50649.svg   1.52 kB
dist/assets/index-2119a3e3.js     81.16 kB │ gzip: 15.42 kB
✨  Done in 0.44s.
 */
