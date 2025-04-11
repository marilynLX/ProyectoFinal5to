// HistoryDataSource.ts
import { db } from "../../lib/firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";

export interface HistoryLocation {
  id: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

export async function fetchHistoryLocations(): Promise<HistoryLocation[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "locations"));
    const historyLocations: HistoryLocation[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      historyLocations.push({
        id: doc.id,
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: (data.timestamp as Timestamp).toDate().toISOString()
      });
    });
    
    return historyLocations.slice(-15);
  } catch (error) {
    console.error("Error fetching history locations:", error);
    throw error;
  }
}