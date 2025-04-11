// microphonePermissions.js
import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import { PermissionLayout } from "./permissionLayout";

export function MicrophonePermissions() {

 const [permission, requestPermission] = useMicrophonePermissions();

  return (
    <PermissionLayout
      icon="mic"
      title="Micrófono"
      granted={permission?.granted || false}
      requestPermission={requestPermission}
    />
  );
}
