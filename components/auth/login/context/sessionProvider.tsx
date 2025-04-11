// providers/SessionProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Tipo de datos para el contexto
type ContextDefinition = {
  loading: boolean;
  user: User | null;
  message?: string;
  tinacoInfo?: any;
  login: (email: string, password: string) => void;
  logout: () => void;
  update: (name: string, phone?: string) => void;
  guardarInfoTinaco: (nivel: number) => void;
  obtenerInfoTinaco: () => Promise<any>;
};

// Contexto de sesión
const SessionContext = createContext<ContextDefinition | undefined>(undefined);

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [tinacoInfo, setTinacoInfo] = useState<any>(null);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, async (data) => {
      if (data) {
        setUser(data);
        const tinacoData = await obtenerInfoTinaco();
        if (tinacoData) {
          setTinacoInfo(tinacoData);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsuscribe();
  }, []);

  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email.toLowerCase(), password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error: unknown) => {
        setMessage(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      });
  };

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setMessage(undefined);
    }).catch((error: unknown) => {
      setMessage(`No se pudo cerrar sesión: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    });
  };

  const update = (name: string, phone?: string) => {
    if (!auth.currentUser) return;

    updateProfile(auth.currentUser, { displayName: name })
      .then(() => {
        setMessage("Perfil actualizado correctamente");
      })
      .catch((error: unknown) => {
        setMessage(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      });
  };

  const guardarInfoTinaco = async (nivel: number) => {
    if (!user) return;

    try {
      await setDoc(doc(db, "users", user.uid, "tinacoInfo", "tinaco001"), {
        nivel: nivel,
        fecha: new Date().toISOString(),
      });
    } catch (error: unknown) {
      setMessage(`Error guardando los datos del tinaco: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  const obtenerInfoTinaco = async () => {
    if (!user) return;

    const docRef = doc(db, "users", user.uid, "tinacoInfo", "tinaco001");

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        setMessage("No se encontró información del tinaco.");
        return null;
      }
    } catch (error: unknown) {
      setMessage(`Error obteniendo los datos del tinaco: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  return (
    <SessionContext.Provider value={{
      loading,
      user,
      message,
      tinacoInfo,
      login,
      logout,
      update,
      guardarInfoTinaco,
      obtenerInfoTinaco
    }}>
      {children}
    </SessionContext.Provider>
  );
};

function useSessionState() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionState() debe ser usado dentro de SessionProvider");
  }
  return context;
}

export { SessionProvider, useSessionState };