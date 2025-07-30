"use server"

import { createAdminClient } from "../appwrite";
import { InputFile } from 'node-appwrite/file';
import { appwriteConfig } from "../appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.actions";


// handle error
 const handleError = (error: unknown, message: string) => {
  console.error(error, message);
  throw error;
};


// queries
const createQueries = (currentUser: Models.Document) => {
  const queries = [
    Query.or([
      Query.equal('owner', [currentUser.$id]),
      Query.contains('users', [currentUser.email])
    ])
  ]

  return queries
}

// upload new file
export const uploadFile = async ({ file, ownerId, accountId, path }: UploadFileProps) => {
  const { storage, databases } = await createAdminClient();

  try {
    const inputFile = InputFile.fromBuffer(file, file.name);

    const bucketFile = await storage.createFile(appwriteConfig.bucketId, ID.unique(), inputFile);

        const fileDocument = {
          type: getFileType(bucketFile.name).type,
          name: bucketFile.name,
          url: constructFileUrl(bucketFile.$id),
          extension: getFileType(bucketFile.name).extension,
          size: bucketFile.sizeOriginal,
          owner: ownerId,
          accountId,
          users: [],
          bucketFileId: bucketFile.$id,
        };

      const newFile = await databases
        .createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.filesCollectionId,
          ID.unique(),
          fileDocument
        )
        .catch(async (error: unknown) => {
          await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
          handleError(error, 'Failed to create file document');
        });

      revalidatePath(path);
      return parseStringify(newFile);
    
  } catch (error) {
    handleError(error, 'Failed to upload file');
  }
};

// get file from appwrite
export const getFiles = async (fileId: string) => {
  const { databases } = await createAdminClient()

  try {
    const currentUser = await getCurrentUser();

   
    

    if (!currentUser) throw new Error('User not found');

    const queries = createQueries(currentUser)

     console.log('current user',currentUser);

     console.log('queries', queries);
     

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      queries
    );

    console.log('files',files)
    

    return parseStringify(files)

  } catch (error) {
    handleError(error, 'Failed to get files');
  }
}