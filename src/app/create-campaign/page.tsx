"use client"

import CreateCampaign from "@/containers/CreateCampaign"
import DefaultLayout from "@/layouts/defaultLayout"
import { usePackageStore } from "@/stores/packageStore"
import React, { useEffect } from "react"

const StepIndicator = () => {
    const setStep = usePackageStore((state) => state.setStep)
    const currentStep = usePackageStore((state) => state.currentStep)

    const stepTitles = [ "Parçan", "Detaylar", "Kampanyan", "Ödeme" ]
  
    useEffect(() => {
        const savedStep = localStorage.getItem("currentStep")
        if (savedStep) {
            setStep(Number(savedStep))
        }
    }, [ setStep ])

    return (
        <>
            {stepTitles.map((title, index) => (
                <React.Fragment key={index}>
                    <p className="text-gray-400">{title}</p>
                    <div className="h-1 w-8 rounded-2xl bg-gray-200">
                        <div
                            className={`h-full rounded-2xl bg-primary-600 transition-all duration-500 ${
                                (index === currentStep && "w-2") ||
                                (index < currentStep && "w-full") ||
                                (index > currentStep && "w-0")
                            }`}
                        />
                    </div>
                </React.Fragment>
            ))}
        </>
    )
}

  
const headerContent = () => {
    return (
        <div className="flex w-full items-center justify-between gap-36">
            <h1 className="text-xl">Kampanya Oluştur</h1>
            <div className="flex items-center gap-4">
                {StepIndicator()}
            </div>
            <div />
        </div>
    )
}

export default function Home() {
    return (
        <DefaultLayout headerContent={headerContent()}>
            <CreateCampaign />
        </DefaultLayout>
    )
}