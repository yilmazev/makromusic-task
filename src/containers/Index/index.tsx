"use client"

import Button from "@/components/Button"
import { useCampaignStore } from "@/stores/campaignStore"
import { useRouter } from "next/navigation"

const Index: React.FC = () => {
    /*
        Notlar:
        - Kampanya oluştura tıkladıktan sonra 'create-campaign' endpointine istek at
    */

    const router = useRouter()
    const { isLoading, createCampaign } = useCampaignStore()

    // Kampanya oluştur
    const handleCreateCampaign = async () => {
        await createCampaign()
        
        if (!isLoading) {
            router.push("/create-campaign")
        }
    }

    return (
        <Button size="large" isLoading={isLoading} onClick={handleCreateCampaign}>Kampanya Oluştur</Button>
    )
}

export default Index