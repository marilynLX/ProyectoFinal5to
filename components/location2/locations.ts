// locationDatasource.ts
import { db } from "../../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function saveLocation(latitude: number, longitude: number) {
    try {
        const docRef = await addDoc(collection(db, "locations"), {
            latitude,
            longitude,
            timestamp: new Date()
        });
        console.log("Ubicacion guardada con ID:", docRef.id);
    } catch (error) {
        console.error("Error al agregar el documento: ", error);
        throw error;
    }
}

export async function getLocations() {
    try {
        const querySnapshot = await getDocs(collection(db, "locations"));
        const locations = querySnapshot.docs.map(doc => ({
            latitude: doc.data().latitude,
            longitude: doc.data().longitude,
            timestamp: doc.data().timestamp
        }));
        return locations;
    } catch (error) {
        console.error("Error al obtener ubicaciones:", error);
        throw error;
    }
}

