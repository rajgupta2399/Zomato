import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as Yup from "yup";
import { BeatLoader } from "react-spinners";
import { Button } from "@nextui-org/react";
import Error from "./Error";
import useFetch from "../Hook/useFetchHook";
import { login } from "../../db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/Context";

const Login = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { data, error, loading, fn: fnLogin } = useFetch(login, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    console.log(data);
    if (error === null && data) {
      fetchUser();
      navigate(`/?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [data, error]);

  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnLogin();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login to your account if you already have one
          </CardDescription>
        </CardHeader>
        <CardContent classname="space-y-2">
          <div className=" mb-4">
            <Input
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={handleInputChange}
            />
          </div>
          {errors.email && <Error message={errors.email} />}
          <div className="mb-1">
            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={handleInputChange}
            />
          </div>
          {errors.password && <Error message={errors.password} />}
        </CardContent>
        <CardFooter>
          <div>
            <Button onClick={handleLogin} className=" bg-red-700 light:bg-red-600">
              {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
