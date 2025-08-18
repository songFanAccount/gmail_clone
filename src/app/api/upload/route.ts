// import { NextRequest, NextResponse } from "next/server";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// const s3 = new S3Client({ region: process.env.AWS_REGION });

// export async function POST(req: NextRequest) {
//   const { key, contentType, bodyBase64 } = await req.json();
//   const Body = Buffer.from(bodyBase64, "base64");
//   await s3.send(new PutObjectCommand({
//     Bucket: process.env.S3_BUCKET!,
//     Key: key,
//     Body,
//     ContentType: contentType,
//     ACL: "private"
//   }));
//   return NextResponse.json({ ok: true, key });
// }