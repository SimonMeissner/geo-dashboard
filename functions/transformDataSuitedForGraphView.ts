import { Dataset, Feature, TransormedData } from "@/types/types"

export const transformData = (features: Feature[], dataset: Dataset): TransormedData[] => {
    const transformedData: TransormedData[] = []
    features.forEach((country) => {
        Object.keys(country.properties.values[dataset]).forEach((year) => {
            const index = transformedData.findIndex((item: any) => item.year === year)
            if(index === -1) {
                const newData: TransormedData = {
                    year,
                    [country.properties.NUTS_NAME]: country.properties.values[dataset][year],
                }
                transformedData.push(newData);
            } else {
                transformedData[index][country.properties.NUTS_NAME] = country.properties.values[dataset][year]
            }
        })
    })
    return transformedData
}