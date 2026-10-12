import { Client, Account, Avatars, Databases } from 'react-native-appwrite'

// Appwrite realtime reads winlocalStorage, which doesn't exist in React Native.
// Without it the SDK crashes before subscribing, so we give it a simple in-memory version.
if (typeof window !== 'undefined' && !window.localStorage) {
  const store = {}
  window.localStorage = {
    getItem: (key) => (key in store ? store[key] : null),
    setItem: (key, value) => { store[key] = String(value) },
    removeItem: (key) => { delete store[key] },
  }
}

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
   .setPlatform('dev.netninja.shelfie')

export const account = new Account(client)
export const avatars = new Avatars(client)
export const databases = new Databases(client)
