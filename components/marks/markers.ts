import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getLocations() {
    try {
        const q = query(collection(db, "locations"), orderBy("timestamp", "desc"), limit(15));
        const querySnapshot = await getDocs(q);
        
        const locations = querySnapshot.docs.map(doc => ({
            latitude: doc.data().latitude,
            longitude: doc.data().longitude,
            timestamp: doc.data().timestamp // Se obtiene la fecha de registro
        }));

        return locations;
    } catch (error) {
        console.error("Error al obtener las ubicaciones:", error);
        return [];
    }
}
