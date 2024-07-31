import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import crypto from "crypto";

import nextConnect from "next-connect";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";

const getFileName = (file) => {
  let filename = uuidv4() + "-" + new Date().getTime();
  filename +=
    "." +
    file.originalname.substring(
      file.originalname.lastIndexOf(".") + 1,
      file.originalname.length
    );
  return filename;
};

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads", // destination folder
    filename: (req, file, cb) => cb(null, getFileName(file)),
  }),
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

function runMiddleware(
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse,
  fn: (...args: any[]) => void
): Promise<any> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse
): Promise<void> {
  await runMiddleware(req, res, upload.single("file"));
  const file = req.file;
  const others = req.body;
  console.log(file);
  res.status(200).json({ fileName: file.filename });
}
