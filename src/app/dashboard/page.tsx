import { Badge, Box, Button, Card, Container, Flex, Image, Stack, Table, Text } from "@mantine/core";

const data = [
  {
    name: "Eden's Product Design Process and UX Flow",
    group: 'Designers',
    status: 'In Progress',
    dueDate: '01/07/2021',
    complete: '24%',
  },
  {
    name: 'Atlas: Personal Blog Template Publishing Process',
    group: 'Developers',
    status: 'In Complete',
    dueDate: '02/07/2021',
    complete: '32%',
  },
  {
    name: 'Chameleon: E-commerce Mobile App Template',
    group: 'Management',
    status: 'Completed',
    dueDate: '03/07/2021',
    complete: '40%',
  },
  {
    name: "Eden's Product Design Process and UX Flow",
    group: 'Social Media',
    status: 'Follow Me',
    dueDate: '04/07/2021',
    complete: '48%',
  },
];


const statusColors:any = {
  'In Progress': 'yellow',
  'In Complete': 'blue',
  Completed: 'green',
  'Follow Me': 'teal',
};


function Dashboard() {
  return (
    <Container w={"80%"} h={"100vh"} style={{ backgroundColor: '#121317', color: '#ffffff', padding: '2rem', borderRadius: '8px' }}>
      <Text style={{ fontSize: '1.5rem', fontWeight: '700' }}>Welcome, Eren 👋</Text>
      <Text style={{ color: '#8B8F9C', fontSize: '0.875rem' }}>Good to see you boss!</Text>

      <Container style={{ backgroundColor: '#1B1E23', padding: '1rem', borderRadius: '8px', marginTop: '1.5rem' }}>
        <Text style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Edens Created This Week</Text>
        <Table verticalSpacing="md" highlightOnHover>
          <thead>
            <tr style={{ backgroundColor: '#1F222A', color: '#8B8F9C' }}>
              <th>Name</th>
              <th>Group</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Complete</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item:any, index) => (
              <tr key={index} style={{ color: '#ffffff' }}>
                <td>{item.name}</td>
                <td>{item.group}</td>
                <td>
                  <Badge
                    color={statusColors[item.status]}
                    style={{
                      textTransform: 'capitalize',
                      borderRadius: '4px',
                      padding: '5px 10px',
                    }}
                  >
                    {item.status}
                  </Badge>
                </td>
                <td>{item.dueDate}</td>
                <td>{item.complete}</td>
                <td>
                  <Button
                    style={{
                      backgroundColor: '#323544',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                    }}
                    size="xs"
                  >
                    Remind All →
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Container>
  );
}

export default Dashboard;
