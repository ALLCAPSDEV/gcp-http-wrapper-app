export interface AppCreatorOptions {
  apiKey?: boolean;
  httpMethods?: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'OPTIONS',
    'PATCH',
    'HEAD',
    'CONNECT',
    'TRACE'
  ];
}
