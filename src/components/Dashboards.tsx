import { useEffect, useState } from "react";

// Tipo para los datos recibidos
interface CoolGraphMessage {
    customer: string;
    path?: string[];
}

const CoolGraph = () => {
    const [data, setData] = useState<any>(null);  // Aquí guardamos los datos que obtenemos del API
    const [loading, setLoading] = useState<boolean>(true);  // Para manejar el estado de carga
    const [error, setError] = useState<string | null>(null);  // Para manejar los errores

    useEffect(() => {
        // Función para manejar el mensaje recibido desde Consola (iframe)
        const handleMessage = (event: MessageEvent) => {
            // Verificamos que el mensaje sea desde la fuente correcta (iframe)
            if (event.origin !== "http://localhost:5173") return;

            // Verificamos si el mensaje tiene los datos necesarios
            if (event.data?.customer) {
                const { customer, path } = event.data;

                // Creamos la URL de la API con los parámetros necesarios
                let url = `https://coolview-api-v2-545989770214.us-central1.run.app/service-order/v1/?Customer=${customer}`;
                if (path && path.length > 0) {
                    url += `&Path=${encodeURIComponent(path.join(','))}`;

                }

                // Hacemos el fetch a la API con la URL generada
                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        setData(data);  // Guardamos los datos en el estado
                        setLoading(false);  // Finalizamos la carga
                    })
                    .catch((err) => {
                        setError("Error al obtener los datos del API");
                        setLoading(false);
                    });
            }
        };

        // Escuchamos los mensajes
        window.addEventListener("message", handleMessage);

        // Limpiamos el event listener cuando el componente se desmonta
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;  // Mostramos "Loading..." mientras esperamos los datos
    }

    if (error) {
        return <div>{error}</div>;  // Mostramos el error si ocurre
    }

    return (
        <div>
            {/* Aquí puedes mostrar los datos en el formato que necesites */}
            <h1>Data from API:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default CoolGraph;
