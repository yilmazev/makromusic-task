"use client"

import Button from "@/components/Button"
import { useRouter } from "next/navigation"
import { useCampaignStore } from "../../stores/campaignStore"

const Index: React.FC = () => {
    const router = useRouter()
    const { isLoading, createCampaign } = useCampaignStore()

    const handleCreateCampaign = async () => {
        await createCampaign()
        if (!isLoading) {
            router.push("/create-campaign")
        }
    }

    return (
        <div>
            <Button size="large" isLoading={isLoading} onClick={handleCreateCampaign}>Kampanya Oluştur</Button>
        </div>
    )
}

export default Index