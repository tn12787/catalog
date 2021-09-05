export interface ImageReaderOptionsType {
  limit?: number;
}

export const readImage = async (
  file: File,
  options?: ImageReaderOptionsType
): Promise<string> => {
  const fileLimit = options?.limit ?? 4096; // kb

  if (file.size > fileLimit * 1000) {
    return Promise.reject(null);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      resolve(reader.result as string);
    });
    reader.readAsDataURL(file);
  });
};
