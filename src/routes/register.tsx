import { createFileRoute } from "@tanstack/react-router";
import RegisterPage from "@/app/auth/register";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});
