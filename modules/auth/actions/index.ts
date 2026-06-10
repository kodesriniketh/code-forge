"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

/*
 * getUserById(id)
 * Fetches a user from the database using their ID.
 * Also includes all linked authentication accounts
 * (Google, GitHub, etc.) associated with that user.
 */
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        accounts: true,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/*
 * getAccountByUserId(userId)
 * Finds the first account linked to a specific user.
 * Useful for checking whether the user signed in
 * through an OAuth provider such as Google or GitHub.
 */
export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: {
        userId,
      },
    });

    return account;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/*
 * currentUser()
 * Retrieves the currently authenticated user's session
 * using NextAuth and returns only the user object.
 */
export const currentUser = async () => {
  const user = await auth();
  return user?.user;
};
