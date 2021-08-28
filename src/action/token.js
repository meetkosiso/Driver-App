import api from "../api/token";

export const createToken = (data) => async () => {
  const token = await api.createToken(data).catch((err) => err);

  if (token instanceof Error) {
    return token;
  }

  return token;
};
