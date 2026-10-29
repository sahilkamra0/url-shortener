
import crypto from "node:crypto";
import { prisma } from "../prisma";


export async function createShortUrl(url: string) {
  let shortCode = crypto.randomBytes(4).toString("hex");

  while (
    await prisma.shortUrl.findUnique({
      where: { shortCode },
    })
  ) {
    shortCode = crypto.randomBytes(4).toString("hex");
  }

  const savedUrl = await prisma.shortUrl.create({
    data: {
      shortCode,
      originalUrl: url,
      clicks: 0,
    },
  });

  return savedUrl;
}



export async function getUrlAnalytics(shortCode: string) {
  return await prisma.shortUrl.findUnique({
    where: { shortCode },
  });
}
