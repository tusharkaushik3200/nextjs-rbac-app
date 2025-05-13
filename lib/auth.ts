import { getSession } from "next-auth/react"; // or next-auth/client depending on your version
import { prisma } from "./prisma";

// Function to get the current user
export const getCurrentUser = async () => {
  const session = await getSession();

  if (!session || !session.user) {
    return null;
  }

  // Retrieve the user from the database using the user email or id (whichever is in your session)
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email as string, // Assuming the session has an email field
    },
  });
  console.log(currentUser,"currentUser")
  return currentUser;
};
