"use client"

import { create } from "zustand"
import { combine } from "zustand/middleware"

type PackageStore = {
    selectedTrack: null | undefined | any;
    isTrackNotInAir: boolean;
    searchQuery: string;
    currentStep: number;
    setSearchQuery: (query: string) => void;
    setSelectedTrack: (track: any) => void;
    setIsTrackNotInAir: (value: boolean) => void;
    setStep: (step: number) => void;
};

export const usePackageStore = create<PackageStore>(
    combine(
        {
            selectedTrack: null,
            isTrackNotInAir: false,
            searchQuery: "",
            currentStep: parseInt(localStorage.getItem("currentStep") || "0", 10)
        },
        (set) => ({
            setSearchQuery: (query: string) => set({ searchQuery: query }),
            setSelectedTrack: (track) => set({ selectedTrack: track }),
            setIsTrackNotInAir: (value) => set({ isTrackNotInAir: value }),
            setStep: (step) => {
                set({ currentStep: step })
                localStorage.setItem("currentStep", step.toString())
            },
        })
    )
)

usePackageStore.subscribe(
    (state) => {
        const campaignData = JSON.parse(localStorage.getItem("campaignData") || "{}")

        campaignData.data.track_id = state.isTrackNotInAir ? null : state.selectedTrack?.uri || null

        localStorage.setItem("campaignData", JSON.stringify(campaignData))
    }
)