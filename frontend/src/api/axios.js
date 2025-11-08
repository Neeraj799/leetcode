import axiosInstance from "../lib/axios";

// Small helper to attach Authorization header when a token is provided
const withAuthHeader = (token) =>
  token ? { headers: { Authorization: `Bearer ${token}` } } : {};

export const sessionApi = {
  createSession: async (data, token) => {
    const response = await axiosInstance.post(
      "/sessions/",
      data,
      withAuthHeader(token)
    );
    return response.data;
  },

  getActiveSessions: async (token) => {
    const response = await axiosInstance.get(
      "/sessions/active",
      withAuthHeader(token)
    );
    return response.data;
  },

  getMyRecentSessions: async (token) => {
    const response = await axiosInstance.get(
      "/sessions/my-recent",
      withAuthHeader(token)
    );
    return response.data;
  },

  getSessionById: async (id, token) => {
    const response = await axiosInstance.get(
      `/sessions/${id}`,
      withAuthHeader(token)
    );
    return response.data;
  },

  joinSession: async (id, token) => {
    const response = await axiosInstance.post(
      `/sessions/${id}/join`,
      {},
      withAuthHeader(token)
    );
    return response.data;
  },

  endSession: async (id, token) => {
    const response = await axiosInstance.post(
      `/sessions/${id}/end`,
      {},
      withAuthHeader(token)
    );
    return response.data;
  },

  getStreamToken: async (token) => {
    const response = await axiosInstance.get(
      `/chat/token`,
      withAuthHeader(token)
    );
    return response.data;
  },
};
