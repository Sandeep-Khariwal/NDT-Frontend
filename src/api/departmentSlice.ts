import { FormValue } from "@/interface/part.interface";
import ApiHelper from "./ApiHelper";
import { AuthData } from "@/interface/auth.interface";

const URL = "http://localhost:8080";

export function createNewDepartment(id: string,formValue: AuthData) {

  return new Promise((resolve, reject) => {
    ApiHelper.post(`${URL}/api/v1/department/create/${id}`,formValue)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}
export function getSubDepartmentsById(id: string) {

  return new Promise((resolve, reject) => {
    ApiHelper.get(`${URL}/api/v1/department/getSubDepartments/${id}`)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

export function getDepartmentParts(id:string) {
  return new Promise((resolve, reject) => {
    ApiHelper.get(`${URL}/api/v1/department/getDepartmentParts/${id}`)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

export function getDepartmentNames() {
  return new Promise((resolve, reject) => {
    ApiHelper.get(`${URL}/api/v1/department/getAllDepartmentNames`)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}