// generate-env.ts
const fs = require('fs');
const path = './src/environments';
const file = `${path}/environment.ts`;

if (!fs.existsSync(path)) {
  fs.mkdirSync(path, { recursive: true });
}

const content = `
export const environment = {
  production: true,
  firebase: {
    apiKey: '${process.env.FIREBASE_API_KEY}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
    projectId: '${process.env.FIREBASE_PROJECT_ID}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
    appId: '${process.env.FIREBASE_APP_ID}'
  }
};
`;

fs.writeFileSync(file, content);
console.log('✅ environment.ts oluşturuldu');
