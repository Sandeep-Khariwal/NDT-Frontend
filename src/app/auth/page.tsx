"use client";
import { useState } from "react";
import {
  Stack,
  Container,
  Text,
  Button,
  TextInput,
  Anchor,
  Box,
  Group,
  Select,
  Notification,
} from "@mantine/core";
import { AuthData } from "@/interface/auth.interface";
import { Login, Signup } from "@/api/authSlice";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
// import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';

export default function AuthPage() {
  const [active, setActive] = useState(false);
  const router = useRouter();
    // Initialize state with default values
    const [authData, setAuthData] = useState<AuthData>({
      name: "",
      email: "",
      password: "",
    });

  const handleToggle = () => {
    setActive(!active);
  };

    // Handle input changes
    const handleChange = (name:string,value:string) => {
      setAuthData({ ...authData, [name]: value });
    };
  
    // Handle form submission (this is a placeholder)
    const handleSubmit = (e:any) => {
      e.preventDefault();
      if(!active){
        Login(authData)
        .then((x:any)=>{
          toast.success("Login successfully")
          console.log(x);
          const {user,token} = x
          window.localStorage.setItem("ndtToken",token)
          window.localStorage.setItem("ndtUser",JSON.stringify(user))
          router.push("/")
          console.log("user : ", user,token);
        }).catch((e)=>{
          const {message} = e.response.data
          toast.error(message)
          console.log(e);
        })
      } else {
        Signup(authData)
        .then((x)=>{
          toast.success("Account Created successfully")
          setActive(false)
        }).catch((e)=>{
          const {message} = e.response.data
          toast.error(message)
          console.log(e);
        })
      }
    };
  return (
    <Box
      style={{
        backgroundColor: "#c9d6ff",
        background: "linear-gradient(to right, #e2e2e2, #c9d6ff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Toaster/>
      <Container
        style={{
          backgroundColor: "#fff",
          borderRadius: "30px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.35)",
          position: "relative",
          overflow: "hidden",
          width: "768px",
          maxWidth: "100%",
          minHeight: "480px",
        }}
      >
        <Stack
          className={`form-container sign-up ${active ? "active" : ""}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "50%",
            zIndex: active ? 5 : 1,
            opacity: active ? 1 : 0,
            transition: "all 0.6s ease-in-out",
          }}
        >
          <form
            style={{
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              padding: "0 40px",
              height: "100%",
            }}
          >
            <Text lh={1.5} component="h1"  fz={"2rem"} fw={700} ff={"Poppins"}>
              Create Account
            </Text>
            <Text lh={3}>or use your email for registration</Text>
            <TextInput
              placeholder="Enter Department Name"
              required
              onChange={(e)=>handleChange("name",e.target.value)}
              styles={{
                input: {
                  width: "18rem",
                  height: "2rem",
                  border: "1px solid #5c6bc0",
                  backgroundColor: "transparent",
                  outline: "none",
                  padding: "3px",
                  borderRadius: "0.4rem",
                  "&:focus": {
                    borderColor: "#5c6bc0",
                    outline: "none",
                  },
                },
              }}
            />
            <TextInput
              placeholder="Email"
              type="email"
              required
              onChange={(e)=>handleChange("email",e.target.value)}
              styles={{
                input: {
                  margin: "1rem",
                  width: "18rem",
                  height: "2rem",
                  border: "1px solid #5c6bc0",
                  backgroundColor: "transparent",
                  outline: "none",
                  padding: "3px",
                  borderRadius: "0.4rem",
                  "&:focus": {
                    borderColor: "##5c6bc0",
                    outline: "none",
                  },
                },
              }}
            />

            <TextInput
              placeholder="Password"
              type="password"
              required
              onChange={(e)=>handleChange("password",e.target.value)}
              styles={{
                input: {
                  width: "18rem",
                  height: "2rem",
                  border: "1px solid #5c6bc0",
                  backgroundColor: "transparent",
                  outline: "none",
                  padding: "3px",
                  borderRadius: "0.4rem",
                  "&:focus": {
                    borderColor: "#5c6bc0",
                    outline: "none",
                  },
                },
              }}
            />
            <Button
            onClick={handleSubmit}
              style={{
                backgroundColor: "#512da8",
                color: "#fff",
                fontSize: "12px",
                padding: "10px 45px",
                borderRadius: "8px",
                fontWeight: 600,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginTop: "10px",
                border: "1px solid #FFF",
                cursor: "pointer",
              }}
            >
              Sign Up
            </Button>
          </form>
        </Stack>

        <Stack
          className={`form-container sign-in ${active ? "" : "active"}`}
          gap={20}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "50%",
            zIndex: active ? 2 : 5,
            transition: "all 0.6s ease-in-out",
          }}
        >
          <form
            style={{
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              padding: "0 40px",
              height: "100%",
            }}
          >
            <Text lh={1.5} component="h1" fz={"2rem"} fw={700} ff={"Poppins"}>
              Sign In
            </Text>
            <Text lh={2}>or use your email, and password</Text>
            <TextInput
              placeholder="Email"
              type="email"
              required
              onChange={(e)=>handleChange("email",e.target.value)}
              styles={{
                input: {
                  margin: "1rem",
                  width: "18rem",
                  height: "2rem",
                  border: "1px solid #5c6bc0",
                  backgroundColor: "transparent",
                  outline: "none",
                  padding: "3px",
                  borderRadius: "0.4rem",
                  "&:focus": {
                    borderColor: "#5c6bc0",
                    outline: "none",
                  },
                },
              }}
            />
            <TextInput
              placeholder="Password"
              type="password"
              required
              onChange={(e)=>handleChange("password",e.target.value)}
              styles={{
                input: {
                  width: "18rem",
                  height: "2rem",
                  border: "1px solid #5c6bc0",
                  backgroundColor: "transparent",
                  outline: "none",
                  padding: "3px",
                  borderRadius: "0.4rem",
                  "&:focus": {
                    borderColor: "#5c6bc0",
                    outline: "none",
                  },
                },
              }}
            />
            <Anchor
              href="#"
              style={{
                color: "#333",
                fontSize: "13px",
                marginTop: "15px",
                marginBottom: "10px",
              }}
            >
              Forget Your Password?
            </Anchor>
            <Button
            onClick={handleSubmit}
              style={{
                backgroundColor: "#512da8",
                color: "#fff",
                fontSize: "12px",
                padding: "10px 45px",
                borderRadius: "8px",
                fontWeight: 600,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginTop: "10px",
                border: "1px solid #FFF",
                cursor: "pointer",
              }}
            >
              Sign In
            </Button>
          </form>
        </Stack>

        <Box
          className={`toggle-container ${active ? "active" : ""}`}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: "50%",
            height: "100%",
            overflow: "hidden",
            transition: "all 0.6s ease-in-out",
            zIndex: 1000,
            borderRadius: active ? "0 150px 100px 0" : "150px 0 0 100px",
          }}
        >
          <Box
            className={`toggle ${active ? "active" : ""}`}
            style={{
              backgroundColor: "#512da8",
              background: "linear-gradient(to right, #5c6bc0, #512da8)",
              height: "100%",
              width: "200%",
              position: "relative",
              left: "-100%",
              transform: active ? "translateX(50%)" : "translateX(0)",
              transition: "all 0.6s ease-in-out",
            }}
          >
            <Box
              className="toggle-panel toggle-left"
              style={{
                position: "absolute",
                width: "50%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: "0 30px",
                textAlign: "center",
                top: 0,
                transform: active ? "translateX(0)" : "translateX(-200%)",
                transition: "all 0.6s ease-in-out",
              }}
            >
              <Text component="h1" style={{ color: "#fff" }}>
                Welcome Back!
              </Text>
              <Text
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "0.3px",
                  margin: "20px 0",
                  color: "#fff",
                }}
              >
                Enter your personal details to use all of the site features
              </Text>
              <Button
                onClick={handleToggle}
                style={{
                  backgroundColor: "transparent",
                  borderColor: "#fff",
                  color: "#fff",
                  fontSize: "12px",
                  padding: "10px 45px",
                  borderRadius: "8px",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  marginTop: "10px",
                  border: "1px solid #FFF",
                  cursor: "pointer",
                }}
              >
                Sign In
              </Button>
            </Box>
            <Box
              className="toggle-panel toggle-right"
              style={{
                position: "absolute",
                right: 0,
                width: "50%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: "0 30px",
                textAlign: "center",
                top: 0,
                transform: active ? "translateX(200%)" : "translateX(0)",
                transition: "all 0.6s ease-in-out",
              }}
            >
              <Text component="h1" style={{ color: "#fff" }}>
                Hello, Friend!
              </Text>
              <Text
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "0.3px",
                  margin: "20px 0",
                  color: "#fff",
                }}
              >
                Register with your personal details to use all of the site
                features
              </Text>
              <Button
                onClick={handleToggle}
                style={{
                  backgroundColor: "transparent",
                  borderColor: "#fff",
                  color: "#fff",
                  fontSize: "12px",
                  padding: "10px 45px",
                  borderRadius: "8px",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  marginTop: "10px",
                  border: "1px solid #FFF",
                  cursor: "pointer",
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
