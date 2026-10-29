
import { z } from "zod";

export const shortenUrlSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, "URL is required")
    .url("Invalid URL")
    .refine(
      (value) => {
        const parsedUrl = new URL(value);

        return ["http:", "https:"].includes(parsedUrl.protocol);
      },
      {
        message: "Only HTTP and HTTPS URLs are allowed",
      }
    ),
});
