"use client"

import CreateCampaign from "@/containers/CreateCampaign"
import DefaultLayout from "@/layouts/defaultLayout"
import { useUpdateStore } from "@/stores/updateStore"
import React, { useEffect } from "react"

const StepIndicator = () => {
    const setCurrentStep = useUpdateStore((state) => state.setCurrentStep)
    const currentStep = useUpdateStore((state) => state.currentStep)

    const stepTitles = [ "Parçan", "Detaylar", "Kampanyan", "Ödeme" ]

    useEffect(() => {
        const savedStep = localStorage.getItem("currentStep")
        if (savedStep) {
            setCurrentStep(Number(savedStep))
        }
    }, [ setCurrentStep ])

    return (
        <>
            {stepTitles.map((title, index) => (
                <React.Fragment key={index}>
                    <p className="tracking-[-0.04rem] text-gray-400">{title}</p>
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

const HeaderContent = () => {
    return (
        <div className="flex w-full items-center justify-between gap-36">
            <h1 className="text-xl tracking-[-0.04rem]">Kampanya Oluştur</h1>
            <div className="flex items-center gap-4">
                <StepIndicator />
            </div>
            <div />
        </div>
    )
}

export default function Home() {
    return (
        <DefaultLayout header={<HeaderContent />}>
            <CreateCampaign />
        </DefaultLayout>
    )
}
