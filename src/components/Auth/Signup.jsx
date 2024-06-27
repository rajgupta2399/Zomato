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
import { login, signup } from "../../db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/Context";

const Signup = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const handleInputChange = (e) => {
    const {name, value, files} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { data, error, loading, fn: fnSignup } = useFetch(signup, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    console.log(data);
    if (error === null && data) {
      fetchUser();
      navigate(`/?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [error, loading]);

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(formData, {abortEarly: false});
      await fnSignup();
    } catch (error) {
      const newErrors = {};
      if (error?.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });

        setErrors(newErrors);
      } else {
        setErrors({api: error.message});
      }
    }
  };


  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>
            Create a account if You haven't already
          </CardDescription>
        </CardHeader>
        <CardContent classname="space-y-2">
          <div className="mb-4">
            <Input
              name="name"
              type="text"
              placeholder="Enter Name"
              onChange={handleInputChange}
            />
          </div>
          {errors.name && <Error message={errors.name} />}
          <div className="mb-4">
            <Input
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={handleInputChange}
            />
          </div>
          {errors.email && <Error message={errors.email} />}
          <div className="mb-5">
            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={handleInputChange}
            />
          </div>
          {errors.password && <Error message={errors.password} />}
          <div className="space-y-1">
            <input
              name="profile_pic"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignup} className=" bg-green-900">
            {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Create Account"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
