import { apiGetDates } from "@/services/api"
import { useUpdateStore } from "@/stores/updateStore"
import React, { useEffect, useState } from "react"

interface Date {
    id: number;
    name: string;
    date_range: string[];
    price: number;
    description: string;
    currency: string;
}

const DateView: React.FC = () => {
    const { selectedDate, setSelectedDate } = useUpdateStore()
    const [ dates, setDates ] = useState<Date[]>([])

    useEffect(() => {
        const fetchDates = async () => {
            try {
                const response = await apiGetDates()
    
                // En pahalı tarihten, ucuz tarihe doğru sırala
                const sortedDates = response.sort((a: Date, b: Date) => b.price - a.price)
    
                setDates(sortedDates)
    
                // Default en pahalı tarihi seç
                if (selectedDate === null) {
                    setSelectedDate(sortedDates[0])
                }
            } catch (error) {
                console.error(error)
            }
        }
    
        fetchDates()
    }, [])

    const formatDateRange = (dateRange: string[]) => {
        const startDate = new Date(dateRange[0])
        const endDate = new Date(dateRange[1])
        
        const options = { month: "long", day: "numeric" }
        
        const formattedStartDate = startDate.toLocaleDateString("tr-TR", options)
        const formattedEndDate = endDate.toLocaleDateString("tr-TR", options)
    
        return `${formattedStartDate} - ${formattedEndDate}`
    }

    return (
        <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-6">
            <div className="mb-6">
                <div className="text-sm tracking-[-0.02rem] text-gray-500">Güzel seçim! Şimdi kampanya görselini belirle</div>
                <div className="text-xl tracking-[-0.02rem] text-primary-900">Tahmini başlangıç tarihini seç</div>
            </div>
            <div className="flex flex-col gap-3">
                {dates.map((item) => (
                    <div className="relative size-full" key={item.id}>
                        <input
                            type="radio"
                            id={`package-${item.id}`}
                            name="package"
                            onChange={() => setSelectedDate(item)}
                            checked={selectedDate?.id === item.id}
                            className="peer"
                            hidden
                        />
                        <label htmlFor={`package-${item.id}`} className="block w-full cursor-pointer rounded-xl border border-gray-200 p-4 text-gray-900 transition-all peer-checked:border-primary-600 peer-checked:bg-primary-25">
                            <span className="mb-1 text-sm tracking-[-0.02rem] text-primary-600">{item.name}</span>
                            <div className="flex items-end justify-between">
                                <div className="flex flex-col">
                                    <span className="mb-0.5 tracking-[-0.02rem] text-gray-900">{formatDateRange(item.date_range)}</span>
                                    <p className="text-sm tracking-[-0.02rem] text-gray-500">{item.description}</p>
                                </div>
                                <span className="text-right font-semibold tracking-[-0.02rem] text-priceGray">
                                    {item.price === 0
                                        ? "Ücretsiz"
                                        : "₺" + item.price
                                    }
                                </span>
                            </div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DateView