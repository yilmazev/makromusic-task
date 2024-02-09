"use client"

import { create } from "zustand"
import { combine } from "zustand/middleware"

type UpdateStore = {
    isLoading: boolean
    isTrackNotInAir: boolean
    selectedTrack: any
    region: string
    trackGenre: string[]
    selectedPackage: any
    currentStep: number
    stepData: string[]
    setIsLoading: (isLoading: boolean) => void
    setIsTrackNotInAir: (isTrackNotInAir: boolean) => void
    setSelectedTrack: (selectedTrack: any) => void
    setRegion: (region: string) => void
    setTrackGenre: (trackGenre: string[]) => void
    setSelectedPackage: (selectedPackage: any) => void
    setCurrentStep: (currentStep: number) => void
    setStepData: (selectedTrack: any, isTrackNotInAir: boolean, region: string, trackGenre: string[], selectedPackage: any, currentStep: number) => void
}

export const useUpdateStore = create<UpdateStore>(
    combine(
        {
            isLoading: false,
            isTrackNotInAir: false,
            selectedTrack: null,
            region: "",
            trackGenre: [] as string[],
            selectedPackage: null,
            currentStep: 0,
            stepData: [] as string[],
        },
        (set) => ({
            setIsLoading: (isLoading) => set({ isLoading }),
            setIsTrackNotInAir: (isTrackNotInAir) => set({ isTrackNotInAir }),
            setSelectedTrack: (selectedTrack) => set({ selectedTrack }),
            setRegion: (region) => set({ region }),
            setTrackGenre: (trackGenre) => set({ trackGenre }),
            setSelectedPackage: (selectedPackage) => set({ selectedPackage }),
            setCurrentStep: (currentStep) => set({ currentStep }),
            setStepData: (selectedTrack, isTrackNotInAir, region, trackGenre, selectedPackage, currentStep) => {
                set({
                    selectedTrack,
                    isTrackNotInAir,
                    region,
                    trackGenre,
                    selectedPackage,
                    currentStep,
                })
            },
        })
    )
)

if (typeof window !== "undefined") {
    useUpdateStore.subscribe((state) => {
        const stepData = {
            isTrackNotInAir: state.isTrackNotInAir,
            selectedTrack: state.selectedTrack,
            region: state.region,
            trackGenre: state.trackGenre,
            selectedPackage: state.selectedPackage,
            currentStep: state.currentStep,
        }

        localStorage.setItem("stepData", JSON.stringify(stepData))
    })
}