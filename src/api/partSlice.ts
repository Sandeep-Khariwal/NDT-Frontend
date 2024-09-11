import { FormValue } from "@/interface/part.interface";
import ApiHelper from "./ApiHelper";

const URL = "https://ndt-backend.onrender.com";

export function createPart(id:string,formValue: FormValue) {
  console.log("data : ", formValue);

  return new Promise((resolve, reject) => {
    ApiHelper.post(`${URL}/api/v1/part/create/${id}`, formValue)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}
export function UpdatePart(id:string,status:string) {
  console.log("part : ", id,status);
  
  return new Promise((resolve, reject) => {
    ApiHelper.put(`${URL}/api/v1/part/update/${id}`, {status:status})
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}


