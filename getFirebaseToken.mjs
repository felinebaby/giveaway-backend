import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9Wm_g5GdHix-6KUc9yAEuObHlvwFRBfg",

  authDomain: "giveawayapp-6de69.firebaseapp.com",

  projectId: "giveawayapp-6de69",
};

const email = process.env.TEST_EMAIL || "pricey@forbidden.com";
const password = process.env.TEST_PASSWORD || "abcdef";

async function main() {
  try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const cred = await signInWithEmailAndPassword(auth, email, password);
    const token = await cred.user.getIdToken(true);

    console.log("UID:", cred.user.uid);
    console.log("\nPASTE THIS IN POSTMAN AS YOUR BEARER TOKEN:\n");
    console.log(token);
  } catch (err) {
    console.error("Failed to get token:", err);
  }
}

main();
