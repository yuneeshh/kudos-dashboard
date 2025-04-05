import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/api/authApi";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      router.push("/login");
    }

    // Listen for logout event
    const handleLogout = () => {
      logoutUser();
      router.push("/login");
    };

    window.addEventListener("logout", handleLogout);
    return () => window.removeEventListener("logout", handleLogout);
  }, [router]);

  return <>{children}</>;
};

export default AuthGuard;
