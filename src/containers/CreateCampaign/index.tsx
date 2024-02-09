import Button from "@/components/Button"
import { useUpdateStore } from "@/stores/updateStore"
import React, { useEffect, useState } from "react"

const CreateCampaign: React.FC = () => {
    const { selectedTrack, isTrackNotInAir, region, trackGenre, selectedPackage, currentStep, setCurrentStep, setStepData } = useUpdateStore()
    const [ isContinue, setIsContinue ] = useState<boolean>(false)
    const [ DynamicPage, setDynamicPage ] = useState<React.ComponentType<any> | null>(null)

    const handleContinue = () => (isContinue) && setCurrentStep(currentStep + 1)

    const handleGoBack = () => (currentStep > 0) && setCurrentStep(currentStep - 1)

    const getPageName = (step: number) => {
        switch (step) {
        case 0:
            return "Track"
        case 1:
            return "Details"
        case 2:
            return "Campaign"
        case 3:
            return "Payment"
        default:
            return ""
        }
    }

    useEffect(() => {
        const loadDynamicPage = async () => {
            const module = await import(`./Views/${getPageName(currentStep)}`)
            setDynamicPage(() => module.default)
        }

        loadDynamicPage()
    }, [ currentStep ])

    const checkIsContinue = () => {
        // Parça
        if (currentStep === 0) {
            const isTrackSelected = (isTrackNotInAir && selectedTrack === null) || (!isTrackNotInAir && selectedTrack !== null)
            return isTrackSelected
        }

        // Detaylar
        if (currentStep === 1) {
            const isDetailsValid = ((region === "Türkiye") || (region === "Global")) && (trackGenre.length > 0)
            return isDetailsValid
        }

        // Paket seç
        if (currentStep === 2) {
            const isDetailsValid = (selectedPackage)
            return isDetailsValid
        }
        return false
    }
    
    useEffect(() => {
        setIsContinue(checkIsContinue())
    }, [ selectedTrack, isTrackNotInAir, region, trackGenre, currentStep ])

    useEffect(() => {
        const storedStepData = localStorage.getItem("stepData")
        if (storedStepData) {
            const { selectedTrack, isTrackNotInAir, region, trackGenre, selectedPackage, currentStep } = JSON.parse(storedStepData)
            setStepData(selectedTrack, isTrackNotInAir, region, trackGenre, selectedPackage, currentStep)
        }
    }, [])

    return (
        <div className="w-full">
            {DynamicPage &&
                <>
                    <DynamicPage />
                    <div className="flex w-full items-center justify-end gap-2.5">
                        <Button variant="secondary" onClick={handleGoBack} disabled={currentStep === 0}>Geri Dön</Button>
                        <Button onClick={handleContinue} disabled={!isContinue}>Devam Et</Button>
                    </div>
                </> }
        </div>
    )
}

export default CreateCampaign