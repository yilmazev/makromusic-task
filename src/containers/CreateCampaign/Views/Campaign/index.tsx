import { usePackageStore } from "@/stores/updateStore"
import React, { useEffect, useState } from "react"

const Campaign: React.FC = () => {
    const { currentStep } = usePackageStore()
    const [ DynamicPage, setDynamicPage ] = useState<React.ComponentType<any> | null>(null)

    const getPageName = (step: number) => {
        switch (step) {
        case 2:
            return "Packages"
        case 3:
            return "Date"
        case 4:
            return "Confirm"
        default:
            return ""
        }
    }

    useEffect(() => {
        const loadDynamicPage = async () => {
            const module = await import(`./Views/${getPageName(currentStep)}`)
            setDynamicPage(() => module.default)
        }

        loadDynamicPage()
    }, [ currentStep ])

    return (
        <div>
            {DynamicPage && <DynamicPage /> }
        </div>
    )
}

export default Campaign