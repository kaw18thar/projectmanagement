export const UserRolesEnum = {
  ADMIN: "admin",
  PROJECT_ADMIN: "peoject_admin",
  MEMBER: "member",
};
export const AvailableUserRole = Object.values(UserRolesEnum); // will send the values of the object above it, UserRolesEnum, which are ("admin", "project_admin", "member")
export const TaskStatusEnum = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
};
export const AvailableTaskStatuses = Object.values(TaskStatusEnum); // will send the values of the object above it TaskStatusEnum which are: ("todo", "in_progress", "done")
