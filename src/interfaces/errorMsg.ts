import { google } from '@google-cloud/logging/build/protos/protos';

export interface ErrorMsg extends google.rpc.IStatus {
  status?: number;
}
