/* Hook: usado para capturar el path enviado desde el dominio de consola*/

import { useState, useEffect } from "react";

const usePathListener = () => {
    const [path, setPath] = useState<string[]>([]);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin != "http://localhost:5173/") return;
            if (event.data?.path) {
                setPath(event.data.path)
            }
        };


        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage)
    }, []);

    return path;
}

export default usePathListener;