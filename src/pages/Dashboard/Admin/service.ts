import { request } from 'umi';

export const getRegistered = async () => {
  return request(
    'https://api.vika.cn/fusion/v1/datasheets/dst8cwJZs1AbpnB9wa/records?viewId=viw7L46Wj6ns4&fieldKey=name',
    {
      headers: {
        Authorization: 'Bearer uskiqeZCodh9YOuB5uuwjg7',
      },
    },
  );
};
export const getPayment = async () => {
  return request(
    'https://api.vika.cn/fusion/v1/datasheets/dstSkew20EAePPuEMZ/records?viewId=viw7L46Wj6ns4&fieldKey=name',
    {
      headers: {
        Authorization: 'Bearer uskiqeZCodh9YOuB5uuwjg7',
      },
    },
  );
};
export const getClassify = async () => {
  return request(
    'https://api.vika.cn/fusion/v1/datasheets/dst1K5SxVPWsCw004G/records?viewId=viwTzmC05nrTy&fieldKey=name',
    {
      headers: {
        Authorization: 'Bearer uskiqeZCodh9YOuB5uuwjg7',
      },
    },
  );
};
