import { PermissionLayout } from "./permissionLayout";
import * as MediaLibrary from 'expo-media-library';

export function GalleryPermissions(){
      const [permission, requestPermission] = MediaLibrary.usePermissions();

    return (
        <PermissionLayout 
        icon ="images"
        title="galeria"
        granted={permission?.granted || false}
        requestPermission={requestPermission}
        />
    );
}