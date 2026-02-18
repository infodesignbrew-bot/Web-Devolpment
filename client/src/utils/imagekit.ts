const BASE_URL = import.meta.env.VITE_IMAGEKIT_URL;

export const getImage = (path, width = 1200) => {
  return `${BASE_URL}/${path}?tr=w-${width},q-80,f-auto`;
};
