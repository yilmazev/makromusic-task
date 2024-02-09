"use client"

import { apiCreateCampaign } from "@/services/api"
import { create } from "zustand"
import { combine } from "zustand/middleware"

type CreateStore = {
    isLoading: boolean
    campaignData: null | undefined | any
    createCampaign: () => Promise<void>
}

/**
 * TODO: 
 * localStorage ve sessionStorage birlikte kullanılacak, kodlar içerisine ve konsola not düşürülecek.
*/

export const useCreateStore = create<CreateStore>(
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