import { mockDesertData } from "../Utils/constants";

export const fetchQueryResponse = (query) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockDesertData);
    }, 1000);
  });
};
