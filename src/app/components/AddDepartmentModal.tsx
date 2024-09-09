import { Signup } from "@/api/authSlice";
import { createNewDepartment } from "@/api/departmentSlice";
import ShowNotification from "@/HelperFunctions/showNotification";
import { AuthData } from "@/interface/auth.interface";
import toast, { Toaster } from "react-hot-toast";
import {
  Button,
  Modal,
  ModalBase,
  Notification,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { BiNotification } from "react-icons/bi";

export function AddDepartmentModal(props: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onReloadDepartment: () => void;
  departmentId: string;
}) {
  const [showNotification, setShowNotification] = useState(false);
  const [authData, setAuthData] = useState<AuthData>({
    name: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (name: string, value: string) => {
    setAuthData({ ...authData, [name]: value });
  };
  // Handle form submission (this is a placeholder)
  const handleSubmit = (e: any) => {
    e.preventDefault();

    createNewDepartment(props.departmentId, authData)
      .then((x) => {
        toast.success("Account created");
        props.setIsOpen(false);
        props.onReloadDepartment();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    setShowNotification(true);
  }, []);
  return (
    <>
      <Toaster />
      {showNotification && (
        <ShowNotification message="Account logged out" tittle="Alert!" />
      )}
      <Modal
        centered
        opened={props.isOpen}
        onClose={() => props.setIsOpen(false)}
        title="Add Department"
      >
        {" "}
        <Stack align="start">
          <TextInput
            ff={"Poppins"}
            placeholder="Enter Department Name"
            required
            onChange={(e) => handleChange("name", e.target.value)}
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
            ff={"Poppins"}
            placeholder="Email"
            type="email"
            required
            onChange={(e) => handleChange("email", e.target.value)}
            my={"1rem"}
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
                  borderColor: "##5c6bc0",
                  outline: "none",
                },
              },
            }}
          />

          <TextInput
            ff={"Poppins"}
            placeholder="Password"
            type="password"
            required
            onChange={(e) => handleChange("password", e.target.value)}
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
            ff={"Poppins"}
            onClick={handleSubmit}
            variant="outline"
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
            Add Department
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
