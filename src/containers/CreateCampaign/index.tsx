import Button from "@/components/Button"
import { usePackageStore } from "@/stores/packageStore"
import React, { useEffect, useState } from "react"
import Campaign from "./Views/Campaign"
import Details from "./Views/Details"
import Payment from "./Views/Payment"
import Track from "./Views/Track"

const CreateCampaign: React.FC = () => {
    /*
        Yapılacaklar:
        - State'ler kontrol edilecek
        - Verilen cevaplar sayfayı yenilenince kayboluyor
    */

    const [ isContinue, setIsContinue ] = useState<boolean>(false)
    const { setStep, currentStep, selectedTrack, isTrackNotInAir } = usePackageStore()

    // Buton kontrolü
    useEffect(() => {
        setIsContinue(
            currentStep === 0 && ((isTrackNotInAir && selectedTrack === null) || (!isTrackNotInAir && selectedTrack !== null))
        )
    }, [ selectedTrack, isTrackNotInAir, currentStep ])

    // Bir sonraki adım
    const handleContinue = async () => {
        if (isContinue) {
            setStep(currentStep + 1)
        }
    }

    // Bir önceki adım
    const handleGoBack = () => {
        setStep(currentStep - 1)
    }

    return (
        <div className="w-full">
            {currentStep === 0 && <Track />}
            {currentStep === 1 && <Details />}
            {currentStep === 2 && <Campaign />}
            {currentStep === 3 && <Payment />}
            <div className="flex w-full items-center justify-end gap-2.5">
                <Button variant="secondary" onClick={handleGoBack} disabled={currentStep === 0}>
                    Geri Dön
                </Button>
                <Button onClick={handleContinue} disabled={!isContinue}>
                    Devam Et
                </Button>
            </div>
        </div>
    )
}

export default CreateCampaign