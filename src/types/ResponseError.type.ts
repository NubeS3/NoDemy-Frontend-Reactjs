interface ResponseError {
  code: number;
  error: string;
}

export function isResponseError(object: any): object is ResponseError {
  return typeof object.code === 'number' && typeof object.error === 'string';
}

export default ResponseError;
