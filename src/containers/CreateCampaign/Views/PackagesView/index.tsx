import { apiGetPackages } from "@/services/api"
import { useUpdateStore } from "@/stores/updateStore"
import React, { useEffect, useState } from "react"

interface Package {
    id: number;
    name: string;
    click: number;
    price: number;
    description: string;
    currency: string;
}

const PackagesView: React.FC = () => {
    const { region, selectedPackage, setSelectedPackage } = useUpdateStore()
    const [ packages, setPackages ] = useState<Package[]>([])
    const [ currency, setCurrency ] = useState<string>("")

    function formatNumberWithDot(number: number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await apiGetPackages()
    
                // Region'a göre filtrele
                const filteredPackages = response.filter((item: any) => {
                    if (region === "Türkiye") {
                        setCurrency("₺")
                        return item.currency === "TRY"
                    } else if (region === "Global") {
                        setCurrency("$")
                        return item.currency === "USD"
                    }
                    return false
                })
    
                // En pahalı paketden, ucuz pakete doğru sırala
                const sortedPackages = filteredPackages.sort((a: Package, b: Package) => b.price - a.price)
    
                setPackages(sortedPackages)
    
                // Default en pahalı paketi seç
                if(selectedPackage === null) {
                    setSelectedPackage(sortedPackages[0])
                }
            } catch (error) {
                console.error(error)
            }
        }
    
        fetchPackages()
    }, [ region ])

    return (
        <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-6">
            <div className="mb-6">
                <div className="tracking-[-0.02rem] text-primary-900">Senin için uygun olan paketi seç</div>
            </div>
            <div className="flex flex-col gap-3">
                {packages.map((item) => (
                    <div key={item.id} className="relative size-full">
                        <input
                            type="radio" 
                            id={`package-${item.id}`} 
                            name="package" 
                            onChange={() => setSelectedPackage(item)}
                            checked={selectedPackage?.id === item.id}
                            className="peer"
                            hidden
                        />
                        <label htmlFor={`package-${item.id}`} className="block w-full cursor-pointer rounded-xl border border-gray-200 p-4 text-gray-900 transition-all peer-checked:border-primary-600 peer-checked:bg-primary-25">
                            <span className="mb-1 text-sm tracking-[-0.02rem] text-primary-600">{item.name}</span>
                            <div className="flex items-end justify-between">
                                <div className="flex flex-col">
                                    <span className="tracking-[-0.02rem] text-gray-900">{formatNumberWithDot(item.click)} tıklanma</span>
                                    <p className="text-sm tracking-[-0.02rem] text-gray-500">{item.description}</p>
                                </div>
                                <span className="text-right text-sm tracking-[-0.02rem] text-priceGray">{currency + item.price}</span>
                            </div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PackagesView