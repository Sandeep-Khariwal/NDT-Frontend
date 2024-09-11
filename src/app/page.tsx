"use client";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Menu,
  Modal,
  Notification,
  ScrollArea,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import DropdownMenu from "./components/DropdownMenu";
import { DateInput, DateTimePicker } from "@mantine/dates";
import { FormValue, SubDepartment } from "@/interface/part.interface";
import { createPart } from "@/api/partSlice";
import { useRouter } from "next/navigation";
import { Department } from "@/interface/auth.interface";
import { AddDepartmentModal } from "./components/AddDepartmentModal";
import ViewDataBase from "./components/ViewDataBase";
import { DepartmentCards } from "./components/DashBoardCard";
import { getSubDepartmentsById } from "@/api/departmentSlice";
import toast, { Toaster } from "react-hot-toast";

enum AdminNavbar {
  ADMIN = "Admin",
}
enum UserNavbar {
  DATABASE = "Database",
}
enum ActiveTab {
  ADMIN = "Admin",
  DATABASE = "Database",
}

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [addDepartmentModal, setAddDepartmentModal] = useState<boolean>(false);
  const [user, setUser] = useState<Department | null>(null);
  const [subDepartments, setSubDepartments] = useState<SubDepartment[]>([]);
  const [viewDatabaseId, setViewDatabaseId] = useState<string>("");

  useEffect(() => {
    const userData = localStorage.getItem("ndtUser");
    const user = JSON.parse(userData!!);

    if (user?.admin) {
      setActiveTab(ActiveTab.ADMIN);
      getSubDepartments(user?._id!!);
    } else {
      setActiveTab(ActiveTab.DATABASE);
    }
    setUser(user);
  }, []);

  const getSubDepartments = (id: string) => {
    getSubDepartmentsById(id)
      .then((x: any) => {
        setSubDepartments(x.subDepartments);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const logOut = () => {
    toast.error("Account loged out");
    window.localStorage.removeItem("ndtToken");
    router.push("/auth");
  };

  return (
    <>
      <Toaster />
      <Stack
        w={"100%"}
        h={"15vh"}
        align="center"
        justify="center"
        gap={0}
        bg={"#10141c"}
      >
        <Flex w={"80%"} align={"center"} justify={"space-between"} m={"auto"}>
          <Image
            src={"/assets/logo.png"}
            alt="No image"
            width={100}
            height={70}
          />
          <Flex gap={10}>
            {user?.admin && (
              <Button
                onClick={() => setAddDepartmentModal(true)}
                variant="filled"
                color="#0d968d"
                radius={"xl"}
                ff={"Poppins"}
              >
                + Add Department
              </Button>
            )}
            <Button
              onClick={logOut}
              variant="outline"
              color="red"
              radius={"xl"}
              ff={"monospace"}
            >
              Log out
            </Button>
          </Flex>
        </Flex>
        <Flex w={"80%"} mx={"auto"}>
          {Object.values(user?.admin ? AdminNavbar : UserNavbar).map((item) => (
            <Text
              key={item}
              fw={400}
              fz={"14px"}
              lh={1}
              mx={"1rem"}
              onClick={() => setActiveTab(item)}
              pb={"1rem"}
              style={{
                fontFamily: "Poppins",
                color: "#fff",
                border: "none",
                borderBottom:
                  activeTab === item
                    ? "2px solid #0d968d"
                    : "2px solid transparent",
                cursor: "pointer",
              }}
            >
              {item}
            </Text>
          ))}
        </Flex>
      </Stack>
      <Stack
        w={"100%"}
        h={"85vh"}
        style={{
          backgroundColor: "#000000",
          color: "#ffffff",
          padding: "2rem",
        }}
      >
        {activeTab === ActiveTab.ADMIN && (
          <Flex gap={20} w={"80%"} h={"100%"} mx={"auto"} mt={20}>
            {subDepartments.length > 0 &&
              subDepartments.map((item,i) => (
                <DepartmentCards
                key={i}
                  departmentName={item.name}
                  totalParts={item.departmentParts.length}
                  onClickSubDepartment={() => {
                    
                    setViewDatabaseId(item._id);
                    setActiveTab(ActiveTab.DATABASE);
                  }}
                />
              ))}
          </Flex>
        )}
        {activeTab === ActiveTab.DATABASE && (
          <Stack h={"100%"}>
            <ViewDataBase
              isAdmin={user?.admin!!}
              id={viewDatabaseId?viewDatabaseId:user?._id!!}
              onClickBack={() => {
                setActiveTab(ActiveTab.ADMIN);
              }}
            />
          </Stack>
        )}
      </Stack>

      {addDepartmentModal && (
        <AddDepartmentModal
          isOpen={addDepartmentModal}
          departmentId={user?._id!!}
          setIsOpen={(val: boolean) => {
            setAddDepartmentModal(val);
          }}
          onReloadDepartment={() => {
            getSubDepartments(user?._id!!);
          }}
        />
      )}
    </>
  );
}
