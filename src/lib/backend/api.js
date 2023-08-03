import { NhostClient } from "@nhost/nhost-js";
import { writable } from "svelte/store";

export const nhostClient = new NhostClient({
    authUrl: 'https://nhost.crewnew.com/v1/auth',
    storageUrl: 'https://nhost.crewnew.com/v1/storage',
    graphqlUrl: 'https://nhost.crewnew.com/v1/graphql',
    functionsUrl: 'https://nhost.crewnew.com/v1/functions'
})

// store
export const isSignedIn = writable(null);
export const user = writable(null);

nhostClient.auth.onAuthStateChanged(
    (event, session) => {
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