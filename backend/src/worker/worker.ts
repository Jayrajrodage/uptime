import { Worker, Job } from "bullmq";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import dotenv from "dotenv";
import { redisClient } from "../utils/redisClient";
import { REGION_TO_LAMBDA_NAME } from "../utils/types";
dotenv.config();

export const startWorker = async () => {
  const worker = new Worker(
    "uptimeQueue",
    async (job: Job) => {
      try {
        if (job.name !== "uptimeQueue") {
          console.log("❌ Wrong job name");
          return;
        }
        const { monitorId, url, subregion, regionCode, headers } = job.data;
        const functionName = REGION_TO_LAMBDA_NAME[regionCode];
        if (!functionName) {
          console.error(
            `❌ No Lambda function mapped for regionCode: ${regionCode}`
          );
          return;
        }
        const lambda = new LambdaClient({
          region: regionCode,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
          },
        });

        const payload = {
          monitorId,
          url,
          subregion,
          headers,
        };

        const command = new InvokeCommand({
          FunctionName: functionName,
          Payload: Buffer.from(JSON.stringify(payload)),
        });
        const response = await lambda.send(command);

        const responsePayload = response.Payload
          ? new TextDecoder().decode(response.Payload)
          : null;

        console.log(`✅ Lambda invoked for ${regionCode} →`, responsePayload);
      } catch (error) {
        console.error(`❌ Lambda invocation failed`, error);
        throw new Error(`Lambda invocation failed: ${error}`);
      }
    },
    {
      connection: redisClient,
    }
  );
  worker.on("ready", () => {
    console.log("🚀 Worker is ready");
  });

  worker.on("completed", (job) => {
    console.log(`✅ Job ${job.id} completed`);
  });

  worker.on("failed", (job, err) => {
    console.error(`❌ Job ${job?.id} failed:`, err);
  });
};
