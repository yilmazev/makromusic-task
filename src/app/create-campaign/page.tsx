"use client"

import CreateCampaign from "@/containers/CreateCampaign"
import BaseLayout from "@/layouts/baseLayout"
import { useUpdateStore } from "@/stores/updateStore"
import React from "react"

const StepIndicator = () => {
    const { currentStep } = useUpdateStore()
  
    const steps = [
        { title: "Parçan", showSubtitle: true },
        { title: "Detaylar", showSubtitle: true },
        { title: "Kampanyan", showSubtitle: true },
        { title: "Kampanya paketi", showSubtitle: false },
        { title: "Kampanya tarihi", showSubtitle: false },
        { title: "Kampanya onayla", showSubtitle: false },
        { title: "Ödeme", showSubtitle: true }
    ]
  
    return (
        <div className="flex items-center gap-4">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    {step.showSubtitle && (
                        <>
                            <p className="tracking-[-0.04rem] text-gray-400">{step.title}</p>
                            <div className="relative h-1 w-8 rounded-2xl bg-gray-200">
                                <div
                                    className={`h-full rounded-2xl bg-primary-600 transition-all duration-500 ${
                                        (currentStep >= 2 && index >= 2 && index <= 4)
                                            ? "w-2"
                                            : currentStep > index
                                                ? "w-full"
                                                : currentStep === index
                                                    ? "w-2"
                                                    : "w-0"
                                    }`}
                                />
                            </div>
                        </>
                    )}
                </React.Fragment>
            ))}
        </div>
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
        <BaseLayout header={<HeaderContent />}>
            <CreateCampaign />
        </BaseLayout>
    )
}