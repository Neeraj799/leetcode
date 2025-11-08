import { useMutation, useQuery } from "@tanstack/react-query";
import { sessionApi } from "../api/axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

/**
 * Helper hook: Automatically attaches Clerk JWT token
 * to any API call using sessionApi.
 */
const useApi = () => {
  const { getToken } = useAuth();

  const withAuth = async (apiFn, ...args) => {
    const token = await getToken();
    if (!token) throw new Error("No auth token available");
    return apiFn(...args, token);
  };

  return { withAuth };
};

/**
 * Create a new coding session.
 */
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

/**
 * Fetch all active sessions.
 */
export const useActiveSessions = () => {
  const { withAuth } = useApi();

  return useQuery({
    queryKey: ["activeSessions"],
    queryFn: () => withAuth(sessionApi.getActiveSessions),
    retry: false, // don't retry on 401 or token issues
  });
};

/**
 * Fetch recently completed or joined sessions.
 */
export const useMyRecentSessions = () => {
  const { withAuth } = useApi();

  return useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: () => withAuth(sessionApi.getMyRecentSessions),
    retry: false,
  });
};

/**
 * Fetch a single session by ID (auto-refreshes every 5s).
 */
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

/**
 * Join an existing session (as participant).
 */
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

/**
 * End an active session (host only).
 */
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
