import { SessionProvider } from "@/components/auth/login/context/sessionProvider"
import ProfileView from "@/components/auth/login/profile/profileView"

export default function Profile(){
    return(
        <SessionProvider>
        <ProfileView/>
        </SessionProvider>
    )
}