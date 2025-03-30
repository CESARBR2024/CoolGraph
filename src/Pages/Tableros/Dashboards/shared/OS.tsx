import React from "react";
import { Grid, Container, Flex } from "@mantine/core";
import "../shared/Styles/OS.css"

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

const OSDashboard: React.FC<OSProps> = ({ data }) => {
    if (!data) {
        return <div>Cargando datos...</div>; // O muestra un mensaje de error si es necesario
    }
    return (
        <Container fluid>
            <div>
                <Grid>

                    <Grid.Col span={{ base: 12, md: 12, lg: 4 }}>
                        <header className="Header">
                            {/* Contenedor flexible para alinear el título a la izquierda y el filtro a la derecha */}
                            <Flex justify="space-between" align="center" style={{ width: "100%" }}>
                                {/* Contenedor del título */}
                                <div>
                                    <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                                        <div className="Title_Dashboard_First">Estatus de Ordenes de Servicio</div>
                                        <div className="Label_Register_HH">

                                            {data.total_ordenes} Ordenes de Servicio totales
                                        </div>
                                    </div>

                                    <p className="Description_Dashboard">
                                        Estatus de Ordenes de Servicio actuales.
                                    </p>
                                </div>


                                <div style={{ marginLeft: "auto" }}>

                                </div>
                            </Flex>
                        </header>
                    </Grid.Col>




                    {/* Tarjetas*/}
                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                        <div className="chart-containerP">
                            <div
                                className="Data_ContainerP"
                                style={{
                                    backgroundColor:
                                        "var(--Background-Success-light, rgba(18, 184, 134, 0.10))",
                                    transition: "height 0.3s ease-in-out", // Animación suave
                                }}
                            >
                                <div
                                    className="Data_Label_Value"
                                    style={{
                                        color: "var(--Text-Success-default, #12B886)",
                                    }}
                                >
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <div> Total de Ordenes de servicio</div>
                                        <div
                                            className="Porcent_All_HH"
                                            style={{
                                                color: " #12B886",
                                                backgroundColor: "rgba(18, 184, 134, 0.10)",
                                                height: "1.2rem",
                                            }}
                                        >
                                            {data.total_ordenes}%
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="Data_Percent_Value"
                                    style={{
                                        display: "flex",
                                        gap: "12px",
                                        alignItems: "center",
                                        paddingBottom: "0.4rem",
                                    }}
                                >
                                    <div>{data.total_ordenes}</div>
                                    <div className="Data_Value">de {data.total_ordenes} HH</div>
                                </div>

                                <div className="Data_Value">
                                    Acción: Ninguna, con registro de lectura en los últimos 7 días.
                                </div>
                            </div>
                        </div>
                    </Grid.Col>


                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                        <div className="chart-containerP">
                            <div
                                className="Data_ContainerP"
                                style={{
                                    backgroundColor:
                                        "var(--Background-Success-light, rgba(250, 82, 82, 0.10))",
                                    transition: "height 0.3s ease-in-out", // Animación suave
                                }}
                            >
                                <div
                                    className="Data_Percent_Value"
                                    style={{
                                        color: "var(--Text-Success-default, #FA5252)",
                                    }}
                                >
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <div> Sin Dato</div>
                                        <div
                                            className="Porcent_All_HH"
                                            style={{
                                                color: " #FA5252",
                                                backgroundColor: "rgba(250, 82, 82, 0.10)",
                                                height: "1.2rem",
                                            }}
                                        >
                                            {data.total_ordenes}%
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="Data_Percent_Value"
                                    style={{
                                        display: "flex",
                                        gap: "12px",
                                        alignItems: "center",
                                        paddingBottom: "0.4rem",
                                    }}
                                >
                                    <div>{data.total_ordenes}</div>
                                    <div className="Data_Value">de {data.total_ordenes} HH</div>
                                </div>

                                <div className="Data_Value">
                                    Acción: Registrar nuevamente la handheld o activar APP Coolector.
                                </div>
                            </div>
                        </div>
                    </Grid.Col>



                </Grid>


            </div>


        </Container>




    )

}

export default OSDashboard;