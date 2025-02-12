export interface AuthFormError {
  message: string;
  field?: string;
}

export interface AuthInputProps {
  label: string;
  type?: "text" | "email" | "password";
  id: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

export interface AuthResponse {
  error?: string;
  success?: boolean;
}

export interface UserProfile {
  id: string;
  userId: string;
  displayName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  lastActive: Date | null;
  updatedAt: Date | null;
}

export interface User {
  id: string;
  email: string;
  createdAt: Date;
  profile?: UserProfile;
}
