export type HTTPMethods =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'OPTIONS'
  | 'PATCH'
  | 'HEAD'
  | 'CONNECT'
  | 'TRACE';
export interface AppCreatorOptions {
  httpMethods: HTTPMethods[];
}
