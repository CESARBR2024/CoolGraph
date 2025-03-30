import React, { useEffect, useState } from "react";

const ChildComponent: React.FC = () => {
    const [tabName, setTabName] = useState<string>("");
    const [customer, setCustomer] = useState<string>("");
    const [path, setPath] = useState<string[]>([]);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
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

    return (
        <div>
            <h1>Child Project</h1>
            <p>Tab Name: {tabName || "No tabName received"}</p>
            <p>Customer: {customer || "No customer received"}</p>
            <p>Path: {path.join(", ") || "No path received"}</p>
        </div>
    );
};

export default ChildComponent;
