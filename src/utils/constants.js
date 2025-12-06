export const UserRolesEnum = {
  ADMIN: "admin",
  PROJECT_ADMIN: "project_admin",
  MEMBER: "member"
}

export const AvailableUserRole = Object.values(UserRolesEnum)
// converts the object to array so that anyone who is comfortable in either of them can use them.

export const TaskStatusEnum = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done"
}

export const AvailableTaskStatus = Object.values(TaskStatusEnum)
