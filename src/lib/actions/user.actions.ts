'use server';

import { Query } from 'node-appwrite';
import { createAdminClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';

/**
 *** Create account flow
 1. user enters full name and email
 2. check if user already exist using the email (we well use this to identify if we still need to create a new user or not)
 3. send OTP to user's email
 4. this will send a secret key for creating a session. the secret key or OTP will be sent to the user's account email. If the user's auth account has
 5. create a new user document if the user is a new user
 6. return the user's accountId that will be used to complete the login
 7. verify OTP and authenticate to login
 */

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal('email', email)]
  );

  return result.total > 0 ? result.documents[0] : null;
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  const existingUser = await getUserByEmail(email);
};
