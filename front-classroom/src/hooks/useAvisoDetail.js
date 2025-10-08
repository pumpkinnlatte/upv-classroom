import { useState, useEffect } from "react";
import { getAvisoById, getArchivos } from "../services/apiGet";

export const useAvisoDetail = (avisoId) => {
    const [aviso, setAviso] = useState(null);
    const [avisoFiles, setAvisoFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAvisoDetails = async () => {
            try {
                const avisoData = await getAvisoById(avisoId);

                console.log("Aviso Data:", avisoData);

                setAviso(avisoData);

                const files = await getArchivos(avisoId, "aviso");
                setAvisoFiles(files);
            } catch (error) {
                console.error("Error fetching aviso details:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAvisoDetails();
    }, [avisoId]);

    return { aviso, avisoFiles, loading, error };
};
