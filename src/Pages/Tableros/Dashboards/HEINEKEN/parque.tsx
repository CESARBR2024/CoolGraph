import React from "react";
import { Card, Text, Grid, Flex } from "@mantine/core"

interface ApiData {
    total_ordenes: number;
    costo_total: number;
    ordenes_estado: {
        abiertas: number;
        cerradas: number;
    };

    ordenes_por_region: Record<string, { total: number; abiertas: number; cerradas: number }>;
    ordenes_por_zona: Record<string, { total: number; abiertas: number; cerradas: number }>;
}


interface OSProps {
    data: ApiData
}

const HeinekenParque: React.FC<OSProps> = () => {
    return (

        <>
            <h1>Prueba pasada</h1>
            <h2>Se renderiza HEINEKEN PARQ</h2>

        </>






    )

}

export default HeinekenParque;