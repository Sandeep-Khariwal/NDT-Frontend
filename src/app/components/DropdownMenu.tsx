import { UpdatePart } from "@/api/partSlice";
import { Button, Menu } from "@mantine/core";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import toast, { Toaster } from "react-hot-toast";

export default function DropdownMenu(props:{partId:string,onClickStatus:()=>void}) {

  const updatePartStatus =(status:string)=>{
    UpdatePart(props.partId,status)
    .then((x:any) => {
      toast.success("Status updated!!")
      props.onClickStatus()
    })
    .catch((e) => {
      console.log(e);
    });
  }
  return (<>
   <Toaster/>
 
    <Menu offset={10} width={100}  position="bottom-start" >
      <Menu.Target>
        <Button variant="subtle" >
          •••
        </Button>
      </Menu.Target>

      <Menu.Dropdown style={{ zIndex: 1, padding:4, borderRadius:20 }}>
        <Menu.Item style={{marginTop:3,fontFamily:"Poppins"}} onClick={()=>updatePartStatus("Accepted")} >Accepted</Menu.Item>
        <Menu.Item style={{marginTop:3,fontFamily:"Poppins"}} onClick={()=>updatePartStatus("Hold")}>Hold</Menu.Item>
        <Menu.Item style={{marginTop:3,fontFamily:"Poppins"}} onClick={()=>updatePartStatus("Release")}>Release</Menu.Item>
      </Menu.Dropdown>
    </Menu>
    </>);
}
