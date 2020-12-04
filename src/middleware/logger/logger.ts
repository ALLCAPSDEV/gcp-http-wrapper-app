/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import { Logging, Log } from '@google-cloud/logging';
import { Merge } from 'type-fest';
import { google } from '@google-cloud/logging/build/protos/protos';

const logging = new Logging();

export default class Logger {
  private log: Log;
  private requestObj: Request;
  private defaultMeta: Merge<
    google.logging.v2.ILogEntry,
    {
      timestamp?: google.protobuf.ITimestamp | Date | null;
      severity?: google.logging.type.LogSeverity | string | null;
    }
  >;
  constructor(logName: string, request: Request) {
    this.requestObj = request;
    this.log = logging.log(logName);
    const traceHeaders = request.header('X-Cloud-Trace-Context') as string;
    const [trace] = traceHeaders.split('/');
    this.defaultMeta = {
      labels: {
        execution_id: request.header('function-execution-id') as string,
      },
      resource: {
        type: 'cloud_function',
        labels: {
          function_name: process.env.FUNCTION_NAME || 'visionapi-dev-endpoint',
          project_id: process.env.GCP_PROJECT!,
          region: 'europe-west2',
        },
      },
      trace: `projects/scan2recycle/traces/${trace}`,
    };
    const entry = this.log.entry(this.defaultMeta, 'Request Received');
    this.log.info(entry);
  }

  response(res: Response, msg: string | Record<string, unknown>) {
    const metadata = {
      ...this.defaultMeta,
      httpRequest: {
        requestMethod: this.requestObj.method,
        requestUrl: this.requestObj.url,
        status: this.requestObj.statusCode,
        userAgent: this.requestObj.get('user-agent'),
      },
    };
    const entry = this.log.entry(metadata, msg);
    return this.log.info(entry);
  }

  info(msg: string | Record<string, unknown>) {
    const entry = this.log.entry(this.defaultMeta, msg);
    return this.log.info(entry);
  }

  error(msg: string | Record<string, unknown>) {
    const entry = this.log.entry(this.defaultMeta, msg);
    return this.log.error(entry);
  }
}
