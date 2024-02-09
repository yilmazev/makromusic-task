import { apiGetPackages } from "@/services/api"
import { usePackageStore } from "@/stores/updateStore"
import axios from "axios"
import React, { useEffect, useState } from "react"

interface Package {
    id: number;
    name: string;
    click: number;
    price: number;
    description: string;
    currency: string;
}

const Packages: React.FC = () => {
    /**
     * * Notlar:
     * * - 'get-packages' route ile çekilmesi lazım, default selected olarak en pahalı paketin seçilmesi gerekiyor, datalar region:currency'e göre filtrelenmiş bir şekilde gösterilmesi lazım. (+)
     */
    
    const { region, selectedPackage, setSelectedPackage } = usePackageStore()
    const [ packages, setPackages ] = useState<Package[]>([])

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await apiGetPackages()
    
                // Region'a göre filtrele
                const filteredPackages = response.filter((item: any) => {
                    if (region === "Türkiye") {
                        return item.currency === "TRY"
                    } else if (region === "Global") {
                        return item.currency === "USD"
                    }
                    return false
                })
    
                // En pahalı paketden, ucuz pakete doğru sırala
                const sortedPackages = filteredPackages.sort((a: Package, b: Package) => b.price - a.price)
    
                setPackages(sortedPackages)
    
                // Default en pahalı paketi seç
                setSelectedPackage(sortedPackages[0])
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled:", error)
                } else {
                    console.error(error)
                }
            }
        }
    
        fetchPackages()
    }, [])

    return (
        <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-6">
            <div className="mb-6">
                <div className="tracking-[-0.02rem] text-primary-900">Senin için uygun olan paketi seç</div>
            </div>
            <div className="flex flex-col gap-3">
                {packages.map((item) => (
                    <div key={item.id} className="relative size-full">
                        <input type="radio" id={`package-${item.id}`} name="package" onChange={() => setSelectedPackage(item)} checked={selectedPackage?.id === item.id} className="peer" hidden />
                        <label htmlFor={`package-${item.id}`}  className="block w-full cursor-pointer rounded-xl border border-gray-200 p-4 text-gray-900 transition-all peer-checked:border-primary-600 peer-checked:bg-primary-25">
                            <span className="mb-1 text-sm tracking-[-0.02rem] text-primary-600">{item.name}</span>
                            <div className="flex items-end justify-between">
                                <div className="flex flex-col">
                                    <span className="tracking-[-0.02rem] text-gray-900">{item.click} tıklanma</span>
                                    <p className="text-sm tracking-[-0.02rem] text-gray-500">{item.description}</p>
                                </div>
                                <span className="text-right text-sm tracking-[-0.02rem] text-priceGray">₺{item.price}</span>
                            </div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Packages