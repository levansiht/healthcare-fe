// Export all healthcare API services
export { userService } from "./userService";
export { planService } from "./planService";
export { exerciseService } from "./exerciseService";
export { sessionService } from "./sessionService";
export { setService } from "./setService";
export { bodyTrackService } from "./bodyTrackService";
export { workoutService } from "./workoutService";
export { authService } from "./authService";

export type {
  User,
  Plan,
  Exercise,
  Session,
  Set,
  BodyTrack,
  MembershipTier,
  MuscleGroup,
  CreateUserRequest,
  UpdateUserRequest,
  CreatePlanRequest,
  UpdatePlanRequest,
  CreateExerciseRequest,
  UpdateExerciseRequest,
  CreateSessionRequest,
  UpdateSessionRequest,
  CreateSetRequest,
  UpdateSetRequest,
  CreateBodyTrackRequest,
  UpdateBodyTrackRequest,
} from "../types/api";
