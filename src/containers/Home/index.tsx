"use client"

import Button from "@/components/Button"
import { useCreateStore } from "@/stores/createStore"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Home: React.FC = () => {
    const router = useRouter()
    const { createCampaign } = useCreateStore()

    const [ isLoading, setIsLoading ] = useState<boolean>(false)

    const handleCreateCampaign = async () => {
        setIsLoading(true)

        try {
            await createCampaign()
            router.push("/create-campaign")
        } catch {
            setIsLoading(false)
        }
    }

    return (
        <Button size="large" isLoading={isLoading} onClick={handleCreateCampaign}>Kampanya Oluştur</Button>
    )
}

export default Home