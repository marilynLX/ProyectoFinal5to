// contactsPermissions.js
import { useEffect, useState } from "react";
import { PermissionLayout } from "./permissionLayout";
import {getPermissionsAsync, PermissionResponse, requestPermissionsAsync } from "expo-contacts";

export function ContactsPermissions() {
  const [permission, setPermission] = useState<PermissionResponse | undefined>(undefined);
//funcion para solicitar acceso a contactos
const requestPermission = () => {
  requestPermissionsAsync()
  .then((result) => {
    setPermission(result);
  });
}
  //verificar el estado del servicio
  useEffect (() => {
    getPermissionsAsync()
    .then((result) => {
      console.log(result);
      setPermission(result);
    });
  }, []);

  return (
    <PermissionLayout
      icon="user"  
      title="Contactos"
      granted={permission?.granted || false}
      requestPermission={requestPermission}
    />
  );
}
