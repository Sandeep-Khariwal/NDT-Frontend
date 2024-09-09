import { Card, Flex, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

interface instituteDetailsCardsProps {
  departmentName: string;
  totalParts: number;
  onClickSubDepartment: () => void;
}

export function DepartmentCards(props: instituteDetailsCardsProps) {
  return (
    <>
      <Flex onClick={() => props.onClickSubDepartment()}>
        <SingleInstituteCard
          heading={props.departmentName}
          displayNumber={props.totalParts}
          dashColor="#B54BF6"
        />
      </Flex>
      {/* <SingleInstituteCard
        heading="Part 2"
        displayNumber={props.monthlyRevenue}
        dashColor="#F64BAE"
        // icon={<IconCurrencyRupee />}
      /> */}
      {/* <SingleInstituteCard
        heading="Students"
        displayNumber={props.noOfStudents}
        dashColor="#F6714B"
      />
      <SingleInstituteCard
        heading="Staff"
        displayNumber={props.nofOfTeachers}
        dashColor="#6AF64B"
      /> */}
    </>
  );
}

function SingleInstituteCard(props: {
  heading: string;
  displayNumber: number | string;
  dashColor: string;
  icon?: any;
}) {
  const isMd = useMediaQuery(`(max-width: 968px)`);
  function formatNumber(value: number): number | string {
    if (value < 1000) {
      return value;
    } else {
      return `${value / 1000}k`;
    }
  }
  return (
    <>
      <Card
        bg={"#10141c"}
        radius={10}
        shadow="0px 0px 30px 0px rgba(0, 0, 0, 0.10)"
        h={90}
        w={175}
        style={{ cursor: "pointer" }}
      >
        <Stack
          style={{ borderLeft: `4px solid ${props.dashColor}` }}
          px={8}
          h={"100%"}
          align="start"
          justify="start"
        >
          <Text c={"#0d968d"} fz={14} fw={500} lh={1} w="100%">
            {props.heading}
          </Text>
          <Flex align="center">
            <Text c={"#FFFFFF"} fz={20} fw={500} lh={1}>
              {props.icon ? props.icon : ""}
              {formatNumber(Number(props.displayNumber)) + " Parts"}
            </Text>
          </Flex>
        </Stack>
      </Card>
    </>
  );
}
