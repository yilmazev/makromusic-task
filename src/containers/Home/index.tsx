"use client"

import Button from "@/components/Button"
import { useCreateStore } from "@/stores/createStore"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Home: React.FC = () => {
    const router = useRouter()
    const { createCampaign } = useCreateStore()

    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ isRequestFailed, setIsRequestFailed ] = useState<boolean>(false)

    const handleCreateCampaign = async () => {
        setIsLoading(true)

        try {
            await createCampaign()
            router.push("/create-campaign")
            
            // API probleminde uyarı göster
            setTimeout(() => {
                setIsRequestFailed(true)
            }, 3000)
        } catch {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <Button size="large" isLoading={isLoading} onClick={handleCreateCampaign}>Kampanya Oluştur</Button>
            {isRequestFailed &&
                <p className="text-center text-sm text-red-400">İstek zaman aşımına uğradı.<br />Lütfen tekrar deneyiniz.</p>
            }
        </div>
    )
}

export default Home