export interface SuccessSignUp {
  message: string;
  user: UserResponse;
  token: string;
}

export interface FailedSignUp {
  statusMsg: string;
  message: string;
}

export interface UserResponse {
  name: string;
  email: string;
  role: string;
}
