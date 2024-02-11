import Button from "@/components/Button"
import { Spinner } from "@/components/Icons"
import { useUpdateStore } from "@/stores/updateStore"
import React, { Suspense, lazy, useEffect, useState } from "react"
const TrackView = lazy(() => import("./Views/TrackView"))
const DetailsView = lazy(() => import("./Views/DetailsView"))
const PackageView = lazy(() => import("./Views/PackagesView"))
const DateView = lazy(() => import("./Views/DateView"))
const ConfirmView = lazy(() => import("./Views/ConfirmView"))

const CreateCampaign: React.FC = () => {
    const { selectedTrack, isTrackNotInAir, region, trackGenre, selectedPackage, selectedDate, currentStep, setCurrentStep } = useUpdateStore()
    const [ isContinue, setIsContinue ] = useState<boolean>(false)
    const [ isStepLoaded, setIsStepLoaded ] = useState<boolean>(false)

    const handleContinue = () => (isContinue) && setCurrentStep(currentStep + 1)
    const handleGoBack = () => (currentStep > 0) && setCurrentStep(currentStep - 1)

    const getStepContent = () => {
        switch (currentStep) {
        case 0:
            return <TrackView />
        case 1:
            return <DetailsView />
        case 2:
            return <PackageView />
        case 3:
            return <DateView />
        case 4:
            return <ConfirmView />
        default:
            return ""
        }
    }
    
    useEffect(() => {
        setIsStepLoaded(true)
    }, [ currentStep ])
    
    useEffect(() => {
        const checkIsContinue = () => {
            switch (currentStep) {
            case 0:
                return (isTrackNotInAir && selectedTrack === null) || (!isTrackNotInAir && selectedTrack !== null)
          
            case 1:
                return ((region === "Türkiye" || region === "Global") && trackGenre.length > 0)
          
            case 2:
                return selectedPackage !== null

            case 3:
                return selectedDate !== null
          
            default:
                return false
            }
        }    
        
        setIsContinue(checkIsContinue())
    }, [ selectedTrack, isTrackNotInAir, region, trackGenre, selectedPackage, selectedDate, currentStep ])

    return (
        <div className="w-full">
            <Suspense
                fallback={
                    isStepLoaded && <div className="flex w-full justify-center">
                        <Spinner className="size-12 animate-spin fill-none" />
                    </div>
                }
            >
                {isStepLoaded && getStepContent()}
            </Suspense>
            {currentStep < 4 &&
                 <div className="flex w-full items-center justify-end gap-2.5">
                     <Button variant="secondary" onClick={handleGoBack} disabled={currentStep === 0}>Geri Dön</Button>
                     <Button onClick={handleContinue} disabled={!isContinue}>Devam Et</Button>
                 </div> }
        </div>
    )
}

export default CreateCampaign