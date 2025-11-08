import { useMutation, useQuery } from "@tanstack/react-query";
import { sessionApi } from "../api/axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

const useApi = () => {
  const { getToken } = useAuth();

  const withAuth = async (apiFn, ...args) => {
    const token = await getToken();
    if (!token) throw new Error("No auth token available");
    return apiFn(...args, token);
  };

  return { withAuth };
};

export const useCreateSession = () => {
  const { withAuth } = useApi();

  return useMutation({
    mutationKey: ["createSession"],
    mutationFn: (data) => withAuth(sessionApi.createSession, data),
    onSuccess: () => toast.success("✅ Session created successfully!"),
    onError: (error) =>
      toast.error(
        error.response?.data?.message || "❌ Failed to create session"
      ),
  });
};

export const useActiveSessions = () => {
  const { withAuth } = useApi();

  return useQuery({
    queryKey: ["activeSessions"],
    queryFn: () => withAuth(sessionApi.getActiveSessions),
    retry: false,
  });
};

export const useMyRecentSessions = () => {
  const { withAuth } = useApi();

  return useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: () => withAuth(sessionApi.getMyRecentSessions),
    retry: false,
  });
};

export const useSessionById = (id) => {
  const { withAuth } = useApi();

  return useQuery({
    queryKey: ["session", id],
    queryFn: () => withAuth(sessionApi.getSessionById, id),
    enabled: !!id,
    refetchInterval: 5000,
    retry: false,
  });
};

export const useJoinSession = () => {
  const { withAuth } = useApi();

  return useMutation({
    mutationKey: ["joinSession"],
    mutationFn: (id) => withAuth(sessionApi.joinSession, id),
    onSuccess: () => toast.success("🎉 Joined session successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "❌ Failed to join session"),
  });
};

export const useEndSession = () => {
  const { withAuth } = useApi();

  return useMutation({
    mutationKey: ["endSession"],
    mutationFn: (id) => withAuth(sessionApi.endSession, id),
    onSuccess: () => toast.success("✅ Session ended successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "❌ Failed to end session"),
  });
};
