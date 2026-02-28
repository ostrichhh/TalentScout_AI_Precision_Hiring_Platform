export const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        resolve(event.target.result);
      } else {
        reject(new Error('Failed to read file as data URI'));
      }
    };
    reader.onerror = () => {
      reject(new Error('File reader error'));
    };
    reader.readAsDataURL(file);
  });
};