import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';
import S3 from 'aws-sdk/clients/s3';
import mime from 'mime';


/*
  * @name uploadToS3
  * @param {S3} s3
  * @param {File} fileData
  * @returns {Promise<{success:boolean; message: string; data: object;}>}

export const uploadToS3 = async (s3: S3, fileData?: Express.Multer.File) => {
  try {
    const fileContent = fs.readFileSync(fileData!.path);

    const params = {
      Bucket: "pw2",
      Key: fileData!.originalname,
      Body: fileContent
    };
    
    try {
      const res = await s3.upload(params).promise();

      console.log("File Uploaded with Successfull", res.Location);

      return {success: true, message: "File Uploaded with Successfull", data: res.Location};
    } catch (error) {
      return {success: false, message: "Unable to Upload the file", data: error};
    }
  } catch (error) {
    return {success:false, message: "Unalbe to access this file", data: {}};
  }
}
*/

/*const s3 = new S3({
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    accessKeyId: `${process.env.R2_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.R2_ACCESS_KEY_SECRET}`,
    signatureVersion: 'v4',
});*/

/**
 *  @param { string } filePath
 */
/*
export default async function uploadFile(filePath:any) {
    const fileContent = fs.readFileSync(filePath);
    const fileExtension = path.extname(filePath);
    const fileType = mime.getType(filePath);
    const fileName = `${randomUUID()}${fileExtension}`;
    
    //const name = process.env.R2_BUCKET_NAME;
    const params = {
        Bucket: process.env.R2_BUCKET_NAME,
        Key: `assets/${fileName}`,
        Body: fileContent,
        //ContentType: fileType
    };

    const bucketParams = {
        Bucket: process.env.R2_BUCKET_NAME,
        Key: `assets/${fileName}`,
        Body: filePath.data,
      };

    const upload = await s3.upload({
        Bucket: "pw2",
        Key: `assets/${fileName}`,
        Body: fileContent,
      }).promise();

    const fileUrl = `${process.env.R2_PUBLIC_URL}/${upload.Key}`;

    return fileUrl;
}
*/