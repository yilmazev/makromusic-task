"use client"

import Button from "@/components/Button"
import { useCampaignStore } from "@/stores/createStore"
import { usePackageStore } from "@/stores/updateStore"
import { useRouter } from "next/navigation"

const Home: React.FC = () => {
    /**
    * * Notlar:
    * * - Kampanya oluştura tıkladıktan sonra 'create-campaign' endpointine istek at
    */

    const router = useRouter()
    const { isLoading, createCampaign, campaignData } = useCampaignStore()
    const { setCurrentStep } = usePackageStore()

    // Kampanya oluştur
    const handleCreateCampaign = async () => {
        await createCampaign()
        
        if (!isLoading) {
            setCurrentStep(0)
            router.push("/create-campaign")
        }
    }

    return (
        <Button size="large" isLoading={isLoading} onClick={handleCreateCampaign}>Kampanya Oluştur</Button>
    )
}

export default Home