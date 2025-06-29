export interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly user: UserRegisterData;
}

export interface UserRegisterData {
  readonly id: number;
  readonly nom: string;
  readonly prenom: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt: string;
}
