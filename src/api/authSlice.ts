import { AuthData } from "@/interface/auth.interface";
import ApiHelper from "./ApiHelper";

const URL = "http://localhost:8080";

export function Signup(formValue: AuthData) {
  return new Promise((resolve, reject) => {
    ApiHelper.post(`${URL}/api/v1/auth/signup`, formValue)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}
export function Login(formValue: AuthData) {
  return new Promise((resolve, reject) => {
    ApiHelper.post(`${URL}/api/v1/auth/login`, formValue)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}
