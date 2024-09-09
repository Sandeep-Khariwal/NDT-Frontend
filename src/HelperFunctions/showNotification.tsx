import { Notification } from '@mantine/core';

export default function ShowNotification(props:{
    message:string,
    tittle:string
}) {
  return (
    <Notification color="pink" title={props.tittle}>
      {props.message}
    </Notification>
  );
}