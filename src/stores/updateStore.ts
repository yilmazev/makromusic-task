import { create } from "zustand"
import { combine } from "zustand/middleware"

type PackageStore = {
  isLoading: boolean;
  selectedTrack: null | undefined | any;
  isTrackNotInAir: boolean;
  searchQuery: string;
  currentStep: number;
  setSearchQuery: (query: string) => void;
  setSelectedTrack: (track: any) => void;
  setIsTrackNotInAir: (value: boolean) => void;
  setStep: (step: number) => void;
  setStepData: (selectedTrack: any, isTrackNotInAir: boolean, currentStep: number) => void; // setStepData ekleniyor
  setIsLoading: (isLoading: boolean) => void;
};

export const usePackageStore = create<PackageStore>(
    combine(
        {
            isLoading: false,
            selectedTrack: null,
            isTrackNotInAir: false,
            searchQuery: "",
            currentStep: JSON.parse(localStorage.getItem("stepData") || "0").currentStep,
        },
        (set) => ({
            setIsLoading: (isLoading) => set({ isLoading }),
            setSearchQuery: (query: string) => set({ searchQuery: query }),
            setSelectedTrack: (track) => set({ selectedTrack: track }),
            setIsTrackNotInAir: (value) => set({ isTrackNotInAir: value }),
            setStep: (step: number) => set({ currentStep: step }),
            setStepData: (selectedTrack, isTrackNotInAir, currentStep) => {
                const stepData = {
                    selectedTrack,
                    isTrackNotInAir,
                    currentStep,
                }

                set(stepData)
                localStorage.setItem("stepData", JSON.stringify(stepData))
            },
        })
    )
)

usePackageStore.subscribe((state) => {
    const campaignData = JSON.parse(localStorage.getItem("campaignData") || "{}")

    campaignData.data.track_id = state.isTrackNotInAir ? null : state.selectedTrack?.uri || null

    const stepData = {
        isTrackNotInAir: state.isTrackNotInAir,
        selectedTrack: state.selectedTrack,
        currentStep: state.currentStep,
    }

    localStorage.setItem("campaignData", JSON.stringify(campaignData))
    localStorage.setItem("stepData", JSON.stringify(stepData))
})
