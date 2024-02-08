import { usePackageStore } from "@/stores/packageStore"

export const usePackageActions = () => {
    const { setStep, setStepData } = usePackageStore()

    return {
        setStep,
        setStepData,
    }
}