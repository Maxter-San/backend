import path from 'path';
import { randomUUID } from 'crypto';
import S3 from 'aws-sdk/clients/s3.js';

const s3 = new S3({
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: `${process.env.R2_ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.R2_ACCESS_KEY_SECRET}`,
  signatureVersion: 'v4',
});
 
export default async function uploadFile(buffer:Buffer, mimetype:string, originalname:string) {
  const fileExtension = path.extname(originalname);
  const fileName = `${randomUUID()}${fileExtension}`;

  const upload = await s3.upload({
    Bucket: process.env.R2_BUCKET_NAME as string,
    Key: `assets/${fileName}`,
    Body: buffer,
    ContentType: mimetype,
    
  }).promise();

  const fileUrl = `${process.env.R2_PUBLIC_URL}/${upload.Key}`;

  return fileUrl;
}