import { usePackageActions } from "@/actions/packageActions"
import Button from "@/components/Button"
import { usePackageStore } from "@/stores/packageStore"
import React, { useEffect, useState } from "react"
import Campaign from "./Views/Campaign"
import Details from "./Views/Details"
import Payment from "./Views/Payment"
import Track from "./Views/Track"

const CreateCampaign: React.FC = () => {
    const { currentStep, selectedTrack, isTrackNotInAir } = usePackageStore()
    const { setStep, setStepData } = usePackageActions()
    const [ isContinue, setIsContinue ] = useState<boolean>(false)

    const checkIsContinue = (step: number, notInAir: boolean, track: any) => {
        return step === 0 && ((notInAir && track === null) || (!notInAir && track !== null))
    }

    const handleContinue = () => isContinue && setStep(currentStep + 1)
    const handleGoBack = () => currentStep > 0 && setStep(currentStep - 1)

    useEffect(() => {
        setIsContinue(checkIsContinue(currentStep, isTrackNotInAir, selectedTrack))
    }, [ selectedTrack, isTrackNotInAir, currentStep ])

    useEffect(() => {
        const storedStepData = localStorage.getItem("stepData")
        if (storedStepData) {
            const { selectedTrack, isTrackNotInAir, currentStep } = JSON.parse(storedStepData)
            setStepData(selectedTrack, isTrackNotInAir, currentStep)
        }
    }, [])

    return (
        <div className="w-full">
            {currentStep === 0 && <Track />}
            {currentStep === 1 && <Details />}
            {currentStep === 2 && <Campaign />}
            {currentStep === 3 && <Payment />}
            <div className="flex w-full items-center justify-end gap-2.5">
                <Button variant="secondary" onClick={handleGoBack} disabled={currentStep === 0}>Geri Dön</Button>
                <Button onClick={handleContinue} disabled={!isContinue}>Devam Et</Button>
            </div>
        </div>
    )
}

export default CreateCampaign