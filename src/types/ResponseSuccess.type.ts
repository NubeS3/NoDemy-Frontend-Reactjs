interface ResponseSuccess {
  code: number;
  data: any;
}

export function isResponseSuccess(object: any): object is ResponseSuccess {
  return typeof object.code === 'number' && object.hasOwnProperty('data');
}

export default ResponseSuccess;
