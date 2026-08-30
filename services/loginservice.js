import { post } from "../utils/apiclients";
export async function Login_function(payload) {
    return await post("https://restful-booker.herokuapp.com/auth", payload);
}
