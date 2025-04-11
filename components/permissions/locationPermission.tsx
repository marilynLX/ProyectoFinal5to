import { useForegroundPermissions } from "expo-location";
import { PermissionLayout } from "./permissionLayout";

export function LocationPermissions(){
    const [permission, requestPermission] = useForegroundPermissions();
    
    return (
        <PermissionLayout 
        icon ="location"
        title="Ubicación"
        granted={permission?.granted || false}
        requestPermission={requestPermission}
        />
    );
}