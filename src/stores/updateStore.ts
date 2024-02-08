"use client"

import { create } from "zustand"
import { combine } from "zustand/middleware"

type PackageStore = {
    isLoading: boolean;
    selectedTrack: null | any;
    isTrackNotInAir: boolean;
    searchQuery: string;
    currentStep: number;
    setSearchQuery: (query: string) => void;
    setSelectedTrack: (track: any) => void;
    setIsTrackNotInAir: (value: boolean) => void;
    setStep: (step: number) => void;
    setStepData: (selectedTrack: any, isTrackNotInAir: boolean, currentStep: number) => void;
    setIsLoading: (isLoading: boolean) => void;
}

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
    const stepData = {
        isTrackNotInAir: state.isTrackNotInAir,
        selectedTrack: state.selectedTrack,
        currentStep: state.currentStep,
    }

    localStorage.setItem("stepData", JSON.stringify(stepData))
})