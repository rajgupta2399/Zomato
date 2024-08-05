import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn } from "lucide-react";
import Login from "./Login";
import Signup from "./Signup";
import { UrlState } from "@/Context";
import { useEffect } from "react";

const Auth = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const { isAuthenticated, loading } = UrlState;
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if (isAuthenticated && !loading)
      navigate(`/?${longLink ? `createNew=${longLink}` : ""}`);
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="flex justify-center align-middle my-[75px]">
      <div className="">
        <h1 className="text-2xl font-semibold text-center my-5">
          {searchParams.get("createNew")
            ? "Hold Up..!! Let's Login First"
            : "Login / Signup"}
        </h1>
        <Tabs defaultValue="login" className="w-[320px] sm:w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signup">
            <Signup />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
