"use client"

import { create } from "zustand"
import { combine } from "zustand/middleware"
import { apiCreateCampaign } from "../services/api"

type CampaignStore = {
    isLoading: boolean
    campaignData: null | undefined | any
    createCampaign: () => Promise<void>
}

export const useCampaignStore = create<CampaignStore>(
    combine(
        {
            isLoading: false,
            campaignData: null,
        },
        (set) => ({
            createCampaign: async () => {
                set({ isLoading: true })

                try {
                    const response = await apiCreateCampaign()
                    const data: any = response

                    if (data && data.error) {
                        throw new Error(data.error)
                    }

                    set({ campaignData: data })
                    localStorage.setItem("campaignData", JSON.stringify(data))
                } catch (error) {
                    console.error(error)
                    set({ isLoading: false })
                }
            },
        })
    )
)