export const fetchCustomerData = async (customer: string) => {
    const respose = await fetch(
        `https://coolview-api-v2-545989770214.us-central1.run.app/service-order/v1/?Customer=${customer}`
    );

    if (!respose.ok) {
        throw new Error("Error get data")
    }

    return await respose.json();

}