import admin from 'firebase-admin';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, 'firebase-service-account.json'), 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function test() {
  try {
    console.log('Testing connection...');
    const collections = await db.listCollections();
    console.log('Collections:', collections.map(c => c.id));
    
    console.log('Testing read...');
    const snapshot = await db.collection('test_col').get();
    console.log('Read success, empty?', snapshot.empty);
    
  } catch (error) {
    console.error('Error detail:', error);
  }
}

test();
