import { NhostClient } from "@nhost/nhost-js";
import { writable } from "svelte/store";

export const nhostClient = new NhostClient({
    authUrl: 'https://nhost.crewnew.com/v1/auth',
    storageUrl: 'https://nhost.crewnew.com/v1/storage',
    graphqlUrl: 'https://nhost.crewnew.com/v1/graphql',
    functionsUrl: 'https://nhost.crewnew.com/v1/functions'
})

// Create 2 Svelte stores that’s values can be read and written from anywhere in the app 
export const isSignedIn = writable(null);
export const user = writable(null);

// We're using below the nhostClient.auth.onAuthStateChanged to listen for changes in the user's auth state. If a user signs in or out, this will be triggered, updating the "isSignedIn" and "user" stores accordingly. 
nhostClient.auth.onAuthStateChanged(
    (event, session) => {
        // First, let us console log the state and the session info with JWT 		and the user info if signed up or logged in 
        console.log(`auth state changed. State is now ${event} with session: `, session);
        if (event === 'SIGNED_IN') {
            isSignedIn.set(true);
            user.set(session?.user);
        }
        else {
            isSignedIn.set(false);
            user.set(null);
        }
    }
);

export async function signIn(parameters) {
    console.log("signIn(parameters): ", parameters);

    let params = {
        email: parameters.email,
        password: parameters.password,
    };

    if (parameters.email) {
        params.email = parameters.email;
    }
    if (parameters.password) {
        params.password = parameters.password;
    }

    // TODO: sanitize inputs

    const data = await nhostClient.auth.signIn(params);

    return {
        ...data,
    };
}