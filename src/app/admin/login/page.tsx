import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid place-items-center px-4">
      <LoginForm />
    </div>
  );
}
