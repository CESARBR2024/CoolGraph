import { useEffect, useState } from "react";
import OSDashboard from "./Pages/Tableros/Dashboards/shared/OS";
import HeinekenParque from "./Pages/Tableros/Dashboards/HEINEKEN/parque";



const CoolGraphReciberMessage = () => {



    const [tabName, setTabName] = useState<string>("");
    const [customer, setCustomer] = useState<string>("");
    const [path, setPath] = useState<string[]>([]);
    const [data, setData] = useState<any>(null); // Estado para los datos de la API
    const [loading, setLoading] = useState<boolean>(true); // Estado para mostrar el loading
    const [error, setError] = useState<string>(""); // Estado para el error

    console.log("tabname =>", tabName)


    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            console.log("mensaje recibido:", event.data)
            // Verifica el origen del mensaje por seguridad
            if (event.origin === "http://localhost:5173") {
                // Asegúrate de que el mensaje contiene las propiedades correctas
                const { tabName, customer, path } = event.data;

                // Si los datos están presentes, actualiza el estado
                if (tabName) setTabName(tabName);
                if (customer) setCustomer(customer);
                if (path) setPath(path);
            } else {
                console.error("Message received from unauthorized origin:", event.origin);
            }
        };

        window.addEventListener("message", handleMessage);

        // Limpiar el listener cuando el componente se desmonte
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    useEffect(() => {
        console.log("tabName actualizado:", tabName); //
        if (customer && tabName) {
            // Creamos la URL de la API con los parámetros necesarios
            let url = `https://coolview-api-v2-545989770214.us-central1.run.app/service-order/v1/?Customer=${customer}`;
            if (path && path.length > 0) {
                url += `&Path=${encodeURIComponent(path.join(','))}`;
            }

            // Hacemos el fetch a la API con la URL generada
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Datos recibidos de la API:", data);  // Agregamos un console log para los datos de la API
                    setData(data);  // Guardamos los datos en el estado
                    setLoading(false);  // Finalizamos la carga
                })
                .catch((err) => {
                    console.error("Error al obtener los datos del API:", err);  // Agregamos un console log para el error
                    setError("Error al obtener los datos del API");
                    setLoading(false);
                });
        }
    }, [customer, tabName, path]); // Se ejecuta cuando 'customer', 'tabName' o 'path' cambian


    // Renderizado de diferentes reportes basados en tipo de reporte
    const renderReport = () => {
        switch (tabName) {
            case "OS":
                return <OSDashboard data={data} />;

            case "Prueba":
                return <HeinekenParque data={data} />;
            default:
                return <h1>No recibió ninguna tabname</h1>;
        }
    };




    return (

        renderReport()

    );
};

export default CoolGraphReciberMessage;
