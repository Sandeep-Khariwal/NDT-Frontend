"use client";
import { createPart } from "@/api/partSlice";
import { FormValue, Part } from "@/interface/part.interface";
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
import { useEffect, useRef, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { getDepartmentNames, getDepartmentParts } from "@/api/departmentSlice";
import { Department } from "@/interface/auth.interface";
import { IoArrowBackOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

const statusColors: any = {
  Accepted: "#5ce65c",
  Hold: "#6395ee",
  Release: "#ff746c",
};

const ViewDataBase = (props: {
  id: string;
  isAdmin: boolean;
  onClickBack: () => void;
}) => {
  const [user, setUser] = useState<Department | null>(null);
  const [addPartModal, setAddPartModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [parts, setParts] = useState<Part[]>([]);
  const [partsStore, setPartsStore] = useState<Part[]>([]);
  const [allDepartments, setAllDepartments] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null)
  const [formValues, setFormValues] = useState<FormValue>({
    department: user?.name!!,
    partName: "",
    heatNumber: "",
  });
  useEffect(() => {
    const userData = localStorage.getItem("ndtUser");
    const user = JSON.parse(userData!!);
    setUser(user);

    getDepartmentAllParts();
    getAllDepartmentNames();
  }, []);


  useEffect(() => {
    if (!search) {
      setParts(partsStore);
    }
  }, [search]);

  const getDepartmentAllParts = () => {
    getDepartmentParts(props.id)
      .then((x: any) => {
        setParts(x.departmentParts);
        setPartsStore(x.departmentParts);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getAllDepartmentNames = () => {
    getDepartmentNames()
      .then((x: any) => {
        const names = x.map((d: any) => d.name);
        setAllDepartments(names);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (field: any, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const submutForm = () => {
    createPart(props.id, formValues)
      .then((x: any) => {
        setAddPartModal(false);
        getDepartmentAllParts();
        if (scrollRef.current) {
          scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onSearchChange = (e: any) => {
    setSearch(e.target.value.toLowerCase());
    const filteredData = partsStore.filter((s: Part) => {
      if (
        s.name?.toLocaleLowerCase().includes(search) ||
        s.heatNumber?.toLocaleLowerCase().includes(search)
      ) {
        return s;
      }
    });
    setParts(filteredData);
  };

  return (
    <>
      <Toaster />
      <Stack w={"80%"} m={"auto"} h={"100%"}>
        <Flex align={"end"} justify={"space-between"}>
          <Stack>
            {props.isAdmin && (
              <Flex align={"center"} justify={"start"} gap={10}>
                <IoArrowBackOutline
                  style={{ cursor: "pointer", fontSize: "1.4rem" }}
                  onClick={() => props.onClickBack()}
                />
                <Text lh={1} style={{ fontSize: "1rem", fontWeight: "500" }}>
                  Back
                </Text>
              </Flex>
            )}
            <Text lh={1} style={{ fontSize: "1.5rem", fontWeight: "700" }}>
              Welcome, {user?.name} 👋
            </Text>
            <Text style={{ color: "#8B8F9C", fontSize: "0.875rem" }}>
              Good to see you!
            </Text>
          </Stack>
          <TextInput
            placeholder="Search part by id/Name"
            c={"#FFF"}
            w={"15rem"}
            onChange={(e) => onSearchChange(e)}
            styles={{
              input: {
                backgroundColor: "#10141c",
                color: "#FFF",
                border: "none",
                fontFamily: "Poppins",
              },
            }}
          />
          <Button
            variant="filled"
            color="#0d968d"
            radius={"xl"}
            ff={"monospace"}
            onClick={() => setAddPartModal(true)}
          >
            + Add Part
          </Button>
        </Flex>
        <ScrollArea
          w={"100%"}
          h={"100%"}
          mx={"auto"}
          style={{
            backgroundColor: "#10141c",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <Text
            ff={"heading"}
            style={{ fontSize: "1.125rem", marginBottom: "1rem" }}
          >
            Edens Created This Week
          </Text>
          <Table highlightOnHover>
            <thead>
              <tr style={{ color: "#8B8F9C", textAlign: "start" }}>
                <th
                  style={{
                    textAlign: "start",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    fontFamily: "Poppins",
                  }}
                >
                  Part Name
                </th>
                <th
                  style={{
                    textAlign: "center",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    fontFamily: "Poppins",
                  }}
                >
                  Heat Number
                </th>
                <th
                  style={{
                    textAlign: "center",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    fontFamily: "Poppins",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    textAlign: "center",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    fontFamily: "Poppins",
                  }}
                >
                  Incoming Date & Time
                </th>

                <th
                  style={{
                    textAlign: "center",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    fontFamily: "Poppins",
                  }}
                >
                  Release Date & Time
                </th>

                <th
                  style={{
                    textAlign: "center",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    fontFamily: "Poppins",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {parts.length > 0 &&
                parts.map((item: Part, index) => (
                  <tr key={index} style={{ color: "#ffffff" }}>
                    <td
                      style={{
                        textAlign: "start",
                        paddingTop: "1rem",
                        paddingBottom: "1rem",
                        fontFamily: "monospace",
                      }}
                    >
                      {item.name}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        paddingTop: "1rem",
                        paddingBottom: "1rem",
                        fontFamily: "monospace",
                      }}
                    >
                      {item.heatNumber}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        paddingTop: "1rem",
                        paddingBottom: "1rem",
                        fontFamily: "monospace",
                      }}
                    >
                      <Badge
                        variant="light"
                        color={statusColors[item.status]}
                        style={{
                          textTransform: "capitalize",
                          borderRadius: "4px",
                          padding: "5px 10px",
                          fontFamily: "monospace",
                        }}
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        paddingTop: "1rem",
                        paddingBottom: "1rem",
                        fontFamily: "monospace",
                      }}
                    >
                      {item.incomingDate}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        paddingTop: "1rem",
                        paddingBottom: "1rem",
                        fontFamily: "monospace",
                      }}
                    >
                      {item.releaseDate}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        paddingTop: "1rem",
                        paddingBottom: "1rem",
                        fontFamily: "monospace",
                      }}
                    >
                      <DropdownMenu
                        partId={item._id}
                        onClickStatus={() => {
                          getDepartmentAllParts();
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
            <Text ref={scrollRef} />
          </Table>
        </ScrollArea>
      </Stack>
      <Modal
        opened={addPartModal}
        onClose={() => setAddPartModal(false)}
        title="Add Part"
      >
        <Select
          ff={"Poppins"}
          my={10}
          label="Select part name"
          placeholder="Pick department"
          data={["Spigot", "Mount"]}
          onChange={(value) => handleInputChange("partName", value)}
        />
        <TextInput
          ff={"Poppins"}
          my={10}
          label="Enter Heat Number"
          placeholder="Enter Heat Number"
          onChange={(event) =>
            handleInputChange("heatNumber", event.target.value)
          }
        />
        <Button
          variant="filled"
          color="#0d968d"
          radius={"lg"}
          onClick={submutForm}
          ff={"Poppins"}
        >
          Submit
        </Button>
      </Modal>
    </>
  );
};

export default ViewDataBase;
