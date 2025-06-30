export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  readonly accessToken: string;
  readonly tokenType: string;
  readonly refreshToken: string;
  readonly user: UserLoginData;
}

export interface UserLoginData {
  readonly id: number;
  readonly email: string;
  readonly password: string;
  readonly createdAt: string;
}

export interface UserProfileResponse {
  readonly id: number;
  readonly email: string;
  readonly nom: string;
  readonly prenom: string;
  readonly createdAt: string;
}
