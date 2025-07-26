import { Account, Client, Databases } from "node-appwrite";
import { appwriteConfig } from "./config";
import { cookies } from "next/headers";

// node-appwrite
export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId);
  
  const session = (await cookies()).get('appwrite-session')

  if (!session || !session.value) throw new Error('No session found')
  
  client.setSession(session.value)

  return {
    get account() {
      return new Account(client)
    },
    get database() {
      return new Databases(client)
    }
  }
   
}

export const createAdminClient = async () => {
    
}