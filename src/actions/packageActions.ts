import { usePackageStore } from "@/stores/updateStore"

export const usePackageActions = () => {
    const { setStep, setStepData } = usePackageStore()

    return {
        setStep,
        setStepData,
    }
}