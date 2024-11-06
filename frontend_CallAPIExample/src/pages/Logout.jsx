import { redirect } from "react-router-dom";
import { removeAuthToken } from "../ulties/auth";

export function action() {
    removeAuthToken()
    return redirect('/')
}