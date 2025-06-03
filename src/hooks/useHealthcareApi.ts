import { useState, useEffect, useCallback } from "react";
import {
  userService,
  planService,
  exerciseService,
  sessionService,
  setService,
  bodyTrackService,
} from "../services";
import {
  User,
  Plan,
  Exercise,
  Session,
  Set,
  BodyTrack,
  MuscleGroup,
} from "../types/api";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, refetch: fetchUsers };
};

export const usePlans = (userId?: number) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await planService.getAllPlans(userId);
      setPlans(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch plans");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return { plans, loading, error, refetch: fetchPlans };
};

export const useExercises = (muscle?: MuscleGroup) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExercises = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await exerciseService.getAllExercises(muscle);
      setExercises(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch exercises"
      );
    } finally {
      setLoading(false);
    }
  }, [muscle]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  return { exercises, loading, error, refetch: fetchExercises };
};

export const useSessions = (planId?: number) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await sessionService.getAllSessions(planId);
      setSessions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch sessions");
    } finally {
      setLoading(false);
    }
  }, [planId]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return { sessions, loading, error, refetch: fetchSessions };
};

export const useSets = (sessionId?: number) => {
  const [sets, setSets] = useState<Set[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await setService.getAllSets(sessionId);
      setSets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch sets");
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchSets();
  }, [fetchSets]);

  return { sets, loading, error, refetch: fetchSets };
};

export const useBodyTracks = (userId?: number) => {
  const [bodyTracks, setBodyTracks] = useState<BodyTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBodyTracks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bodyTrackService.getAllBodyTracks(userId);
      setBodyTracks(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch body tracks"
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchBodyTracks();
  }, [fetchBodyTracks]);

  return { bodyTracks, loading, error, refetch: fetchBodyTracks };
};

export const useEntity = <T>(
  fetchFunction: () => Promise<T>,
  dependencies: unknown[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
};
