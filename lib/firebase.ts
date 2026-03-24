import { initializeApp, getApps, cert, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const BUCKET_NAME = "website-builder-system.firebasestorage.app";

function initFirebase() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // Local dev: use FIREBASE_SERVICE_ACCOUNT_KEY env var (JSON string)
  // Production (Firebase App Hosting): ADC is provided automatically
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    return initializeApp({
      credential: cert(serviceAccount),
      storageBucket: BUCKET_NAME,
    });
  }

  return initializeApp({
    credential: applicationDefault(),
    storageBucket: BUCKET_NAME,
  });
}

const app = initFirebase();

export const db = getFirestore(app);
export const storage = getStorage(app);
export const bucket = storage.bucket();
