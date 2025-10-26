import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const { user, signInWithGitHub, signInWithGoogle } = useAuth();
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleGitHubSignIn = async () => {
    try {
      setIsGitHubLoading(true);
      await signInWithGitHub();
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in with GitHub");
      setIsGitHubLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      await signInWithGoogle();
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in with Google");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Clinical Extraction System
          </CardTitle>
          <CardDescription className="text-base">
            Sign in to access AI-powered clinical data extraction
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button
              onClick={handleGitHubSignIn}
              disabled={isGitHubLoading || isGoogleLoading}
              variant="outline"
              size="lg"
              className="w-full gap-3 h-12 text-base transition-all hover:shadow-medium"
            >
              <Github className="w-5 h-5" />
              {isGitHubLoading ? "Connecting..." : "Continue with GitHub"}
            </Button>

            <Button
              onClick={handleGoogleSignIn}
              disabled={isGitHubLoading || isGoogleLoading}
              variant="outline"
              size="lg"
              className="w-full gap-3 h-12 text-base transition-all hover:shadow-medium"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {isGoogleLoading ? "Connecting..." : "Continue with Google"}
            </Button>
          </div>

          <div className="pt-4 text-center text-sm text-muted-foreground border-t">
            <p>Secure authentication for HIPAA-compliant data extraction</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;