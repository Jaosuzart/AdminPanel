import admin from 'firebase-admin';
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./firebase-service-account.json', 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: serviceAccount.project_id
});

const db = admin.firestore();

db.collection('users').get().then(snapshot => {
  console.log('SUCCESS! Snapshot empty?', snapshot.empty);
  process.exit(0);
}).catch(err => {
  console.error('FIREBASE ERROR:', err.message || err);
  process.exit(1);
});
