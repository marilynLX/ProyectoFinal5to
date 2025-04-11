import { getCalendarPermissionsAsync, PermissionResponse, requestCalendarPermissionsAsync } from "expo-calendar";
import { PermissionLayout } from "./permissionLayout";
import { useEffect, useState } from "react";

export function CalendarPermissions() {
   const [permission, setPermission] = useState<PermissionResponse| undefined>(undefined);
  
      const requestPermission = ()=>{
          requestCalendarPermissionsAsync()
          .then((result)=>{
              setPermission(result);
          }
          )
      }
      useEffect(()=>{
          getCalendarPermissionsAsync()
          .then((result)=>{
              console.log(result);
              setPermission(result);
          })
      }
      ,[]);
  return (
      <PermissionLayout 
          icon="calendar"
          title="Calendar"
          granted={permission?.granted || false}
          requestPermission={requestPermission}
      />
  );
}