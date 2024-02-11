import { apiCreateCampaign } from "@/services/api"
import { create } from "zustand"
import { PersistOptions, persist } from "zustand/middleware"

type CreateStore = {
    campaignData: any
    createCampaign: () => Promise<void>
}

export const useCreateStore = create<CreateStore>(
    persist<CreateStore>(
        (set) => ({
            campaignData: null,
            createCampaign: async () => {
                try {
                    const response = await apiCreateCampaign()
                    const data: any = response

                    if (data && data.error) {
                        throw new Error(data.error)
                    }

                    set((state) => ({ ...state, campaignData: data }))
                } catch (error) {
                    console.error(error)
                }
            }
        }),
        { name: "campaignData" } as PersistOptions<CreateStore>
    ) as any
)