

import { Request, Response } from "express";
import { prisma } from "../prisma";
import { shortenUrlSchema } from "../validation";
import { createShortUrl } from "../services/url.service";
import {
  
  getUrlAnalytics,
} from "../services/url.service";


export async function shortenUrl(req: Request, res: Response) {
  const result = shortenUrlSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: result.error.issues[0].message,
    });
  }

  const { url } = result.data;

  try {
    const savedUrl = await createShortUrl(url);

    const PORT = Number(process.env.PORT) || 8000;
    const BASE_URL =
      process.env.BASE_URL || `http://localhost:${PORT}`;

    return res.status(201).json({
      shortUrl: `${BASE_URL}/${savedUrl.shortCode}`,
      shortCode: savedUrl.shortCode,
      originalUrl: savedUrl.originalUrl,
    });
  } catch (error) {
    console.error("Failed to create short URL:", error);

    return res.status(500).json({
      message: "Failed to create short URL",
    });
  }
}




export async function getAnalytics(req: Request, res: Response) {
  const { shortCode } = req.params;

  try {
    const urlData = await getUrlAnalytics(shortCode);

    if (!urlData) {
      return res.status(404).json({
        message: "Short URL not found",
      });
    }

    return res.status(200).json({
      shortCode: urlData.shortCode,
      originalUrl: urlData.originalUrl,
      clicks: urlData.clicks,
      createdAt: urlData.createdAt,
    });
  } catch (error) {
    console.error("Failed to get analytics:", error);

    return res.status(500).json({
      message: "Failed to get analytics",
    });
  }
}



export async function deleteShortUrl(req: Request, res: Response) {
  const { shortCode } = req.params;

  try {
    const urlData = await prisma.shortUrl.findUnique({
      where: { shortCode },
    });

    if (!urlData) {
      return res.status(404).json({
        message: "Short URL not found",
      });
    }

    await prisma.shortUrl.delete({
      where: { shortCode },
    });

    return res.status(200).json({
      message: "Short URL deleted successfully",
      shortCode,
    });
  } catch (error) {
    console.error("Failed to delete short URL:", error);

    return res.status(500).json({
      message: "Failed to delete short URL",
    });
  }
}



export async function redirectShortUrl(req: Request, res: Response) {
  const { shortCode } = req.params;

  try {
    const urlData = await prisma.shortUrl.findUnique({
      where: { shortCode },
    });

    if (!urlData) {
      return res.status(404).json({
        message: "Short URL not found",
      });
    }

    await prisma.shortUrl.update({
      where: { shortCode },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    return res.redirect(urlData.originalUrl);
  } catch (error) {
    console.error("Failed to redirect URL:", error);

    return res.status(500).json({
      message: "Failed to redirect URL",
    });
  }
}



