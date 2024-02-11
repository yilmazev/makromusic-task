import { create } from "zustand"
import { persist, PersistOptions } from "zustand/middleware"

type UpdateStore = {
    isTrackNotInAir: boolean
    selectedTrack: any
    region: string
    trackGenre: string[]
    selectedPackage: any
    selectedDate: any
    currentStep: number
    setIsTrackNotInAir: (isTrackNotInAir: boolean) => void
    setSelectedTrack: (selectedTrack: any) => void
    setRegion: (region: string) => void
    setTrackGenre: (trackGenre: string[]) => void
    setSelectedPackage: (selectedPackage: any) => void
    setSelectedDate: (selectedDate: any) => void
    setCurrentStep: (currentStep: number) => void
}

export const useUpdateStore = create<UpdateStore>(
    persist<UpdateStore>(
        (set) => ({
            isTrackNotInAir: false,
            selectedTrack: null,
            region: "",
            trackGenre: [],
            selectedPackage: null,
            selectedDate: null,
            currentStep: 0,
            setIsTrackNotInAir: (isTrackNotInAir) => set({ isTrackNotInAir }),
            setSelectedTrack: (selectedTrack) => set({ selectedTrack }),
            setRegion: (region) => set({ region }),
            setTrackGenre: (trackGenre) => set({ trackGenre }),
            setSelectedPackage: (selectedPackage) => set({ selectedPackage }),
            setSelectedDate: (selectedDate) => set({ selectedDate }),
            setCurrentStep: (currentStep) => set({ currentStep })
        }),
          { name: "stepData" } as PersistOptions<UpdateStore>
    ) as any
)