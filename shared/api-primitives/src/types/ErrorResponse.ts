export type ErrorResponse<T extends { name: string }> = { error: T };
