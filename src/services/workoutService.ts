import { planService } from "./planService";
import { sessionService } from "./sessionService";
import { setService } from "./setService";
import { Plan, Session, Set, CreateWorkoutRequest } from "@/types/api";

export const workoutService = {
  async getCompleteWorkout(planId: number): Promise<{
    plan: Plan;
    sessions: (Session & { sets: Set[] })[];
  }> {
    const plan = await planService.getPlanById(planId);
    const sessions = await sessionService.getSessionsByPlan(planId);

    const sessionsWithSets = await Promise.all(
      sessions.map(async (session) => {
        const sets = await setService.getSetsBySession(session.id);
        return { ...session, sets };
      })
    );

    return {
      plan,
      sessions: sessionsWithSets,
    };
  },

  async getUserWorkoutPlans(userId: number): Promise<Plan[]> {
    return planService.getPlansByUser(userId);
  },

  async createWorkoutSession(
    planId: number,
    sessionData: {
      name: string;
      date: string;
      exercises: {
        exerciseId: number;
        sets: { reps: number; weight: number; restTime?: number }[];
      }[];
    }
  ): Promise<Session & { sets: Set[] }> {
    const session = await sessionService.createSession({
      name: sessionData.name,
      date: sessionData.date,
      planId,
    });

    const allSets: Set[] = [];
    for (const exercise of sessionData.exercises) {
      for (const setData of exercise.sets) {
        const set = await setService.createSet({
          reps: setData.reps,
          weight: setData.weight,
          restTime: setData.restTime || 60, // Default to 60 seconds if not provided
          exerciseId: exercise.exerciseId,
          sessionId: session.id,
        });
        allSets.push(set);
      }
    }

    return { ...session, sets: allSets };
  },

  async getWorkoutSession(
    sessionId: number
  ): Promise<Session & { sets: Set[] }> {
    const session = await sessionService.getSessionById(sessionId);
    const sets = await setService.getSetsBySession(sessionId);

    return { ...session, sets };
  },

  async getWorkoutStats(userId: number): Promise<{
    totalPlans: number;
    totalSessions: number;
    totalSets: number;
    recentSessions: Session[];
  }> {
    const plans = await planService.getPlansByUser(userId);
    let totalSessions = 0;
    let totalSets = 0;
    let allSessions: Session[] = [];

    for (const plan of plans) {
      const sessions = await sessionService.getSessionsByPlan(plan.id);
      totalSessions += sessions.length;
      allSessions = [...allSessions, ...sessions];

      for (const session of sessions) {
        const sets = await setService.getSetsBySession(session.id);
        totalSets += sets.length;
      }
    }

    const recentSessions = allSessions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    return {
      totalPlans: plans.length,
      totalSessions,
      totalSets,
      recentSessions,
    };
  },

  // Backward compatibility methods for useApi.ts hook
  async getWorkouts(pagination?: Record<string, unknown>): Promise<Plan[]> {
    // For backward compatibility, return all plans (this would need userId in real implementation)
    // This is a simplified version - in production you'd need proper user context
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = pagination;
    return planService.getAllPlans();
  },

  async createWorkout(
    data: CreateWorkoutRequest
  ): Promise<Session & { sets: Set[] }> {
    // Create workout session with exercises and sets
    return this.createWorkoutSession(data.planId, {
      name: data.name,
      date: new Date().toISOString().split("T")[0],
      exercises: data.exercises,
    });
  },

  async updateWorkout(
    id: number,
    data: Partial<CreateWorkoutRequest>
  ): Promise<Session> {
    return sessionService.updateSession({
      id,
      name: data.name,
    });
  },

  async deleteWorkout(id: number): Promise<void> {
    const sets = await setService.getSetsBySession(id);
    await Promise.all(sets.map((set) => setService.deleteSet(set.id)));
    return sessionService.deleteSession(id);
  },
};
