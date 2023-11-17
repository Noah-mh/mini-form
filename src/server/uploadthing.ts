import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";

import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

const handleAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  const userId = session?.user?.id;
  console.log("userId", userId);
  if (!userId) throw new Error("Unauthorized");
  return { userId: userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  imageUpload: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      const { userId } = await handleAuth(req);
      return { userId };
    })
    .onUploadComplete(() => {
      console.log("Upload complete!");
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
