export type AuthNextStep =
  | "Verification"
  | "CompleteProfile"
  | "Password"
  | "Register"
  | "Dashboard"
  | "Login"
  | "Home";

type RouterLike = {
  push: (href: string) => void;
};

export function handleNextStep(
  nextStep: AuthNextStep | null,
  router: RouterLike,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
) {
  if (!nextStep) return;

  if (nextStep === "Verification" && data?.attemptId) {
    sessionStorage.setItem("attemptId", data.attemptId);
  }

  switch (nextStep) {
    case "Verification":
      router.push("/verify-email");
      break;

    case "CompleteProfile":
      router.push("/complete-profile");
      break;

    case "Password":
      router.push("/password");
      break;

    case "Register":
      router.push("/register");
      break;

    case "Dashboard":
      router.push("/dashboard");
      break;

    case "Login":
      router.push("/login");
      break;

    case "Home":
      router.push("/");
      break;
  }
}
