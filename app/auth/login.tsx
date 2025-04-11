import LoginView from "@/components/auth/login/loginView";
import { SessionProvider } from "@/components/auth/login/context/sessionProvider";

//auth/login
export default function Login(){
    return(
        <SessionProvider>
            <LoginView/>
        </SessionProvider>
    )
}