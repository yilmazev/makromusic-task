import Button from "@/components/Button"
import { useUpdateStore } from "@/stores/updateStore"
import Image from "next/image"
import React, { useEffect, useState } from "react"

const ConfirmView: React.FC = () => {
    /**
     * ! UYARI:
     * ! Performansı düşürmesi sebebiyle get-on-spotify apisine istek atıp şarkı bilgileri almak yerine, state ortamında sakladığım veriyi yazdırdım.  
     */

    const { isTrackNotInAir, selectedTrack, selectedPackage, selectedDate, setCurrentStep } = useUpdateStore()
    const [ totalPrice, setTotalPrice ] = useState<number>(0)
    const [ currency, setCurrency ] = useState<string>("")

    const formatDateRange = (dateRange: string[]) => {
        const startDate = new Date(dateRange[0])
        const endDate = new Date(dateRange[1])
    
        const options = { month: "long", day: "numeric" } as Intl.DateTimeFormatOptions
    
        const formattedStartDate = startDate.toLocaleDateString("tr-TR", options)
        const formattedEndDate = endDate.toLocaleDateString("tr-TR", options)
    
        return `${formattedStartDate} - ${formattedEndDate}`
    }    

    useEffect(() => {
        // Para birimi sembolü
        if (selectedPackage.currency === "TRY") {
            setCurrency("₺")
        } else if (selectedPackage.currency === "USD") {
            setCurrency("$")
        }

        // Toplam fiyat
        if(selectedDate !== null) {
            setTotalPrice(selectedPackage.price + selectedDate.price)
        } else {
            setTotalPrice(selectedPackage.price)
        }
    }, [ selectedPackage, selectedDate ])

    return (
        <div className="w-full">
            <div className="mb-6 border-b border-gray-200 pb-6">
                <span className="text-2xl tracking-[-0.02rem] text-primary-900">Onayla ve ödemeye geç</span>
            </div>
            <div className="flex justify-between gap-24">
                <div className="flex w-full flex-col gap-4">
                    <span className="text-lg">Kampanya özetin</span>
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="mb-0.5 text-sm text-gray-700">Tıklanma</span>
                            <p className="text-gray-900">{selectedPackage.click.toLocaleString()} tıklanma</p>
                        </div>
                        <Button variant="tertiary" onClick={() => setCurrentStep(2)}>Düzenle</Button>
                    </div>
                    {selectedDate &&
                        <div className="flex items-end justify-between">
                            <div>
                                <span className="mb-0.5 text-sm text-gray-700">Başlangıç tarihi</span>
                                <p className="text-gray-900">{formatDateRange(selectedDate.date_range)}</p>
                            </div>
                            <Button variant="tertiary" onClick={() => setCurrentStep(3)}>Düzenle</Button>
                        </div>
                    }
                </div>
                <div className="flex w-full max-w-md flex-col rounded-3xl border border-gray-200">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <span className="text-sm text-gray-500">Kampanya özeti</span>
                    </div>
                    <div className="flex flex-col gap-6 p-6">
                        {!isTrackNotInAir &&
                            <div className="flex items-center rounded-2xl border border-gray-200 p-4">
                                <Image className="rounded-xl" src={selectedTrack.album.images[0].url} alt={selectedTrack.label} loading="lazy" width={48} height={48} />
                                <div className="ml-3 flex flex-col">
                                    <p className="mb-1 tracking-[-0.02rem] text-gray-900">{selectedTrack.label}</p>
                                    <p className="text-sm tracking-[-0.02rem] text-gray-500">{selectedTrack.artist}</p>
                                </div>
                            </div>
                        }
                        <div className="flex flex-col">
                            <span className="mb-4 text-gray-900">Ödeme detayları</span>
                            <div className="mb-6 flex flex-col gap-3 border-b border-gray-200 pb-4">
                                <div className="flex w-full items-center justify-between">
                                    <p className="text-sm text-gray-900">Paket</p>
                                    <p className="text-sm text-gray-900">{selectedPackage.price} {currency}</p>
                                </div>
                                {(selectedDate && selectedDate.price > 0) &&
                                    <div className="flex w-full items-center justify-between">
                                        <p className="text-sm text-gray-900">Tarih</p>
                                        <p className="text-sm text-gray-900">{selectedDate.price} ₺
                                        </p>
                                    </div>
                                }
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-900">Toplam</p>
                                    <p className="text-sm text-gray-900">{totalPrice} {currency}</p>
                                </div>
                            </div>
                        </div>
                        <Button isFull={true} size="medium">Ödemeye geç</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmView