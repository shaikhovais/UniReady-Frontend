import AuthCard from "./AuthCard";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPassword/ForgotPasswordForm";

interface formType {
  mode: "login" | "register" | "forgot-password";
}

const AuthForm = ({ mode }: formType) => {
  return (
    <AuthCard>
      {mode === "login" && <LoginForm />}

      {mode === "register" && <RegisterForm />}

      {mode === "forgot-password" && <ForgotPasswordForm />}
    </AuthCard>
  );
};

export default AuthForm;