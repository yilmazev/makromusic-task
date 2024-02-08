import Index from "@/containers/Index"
import DefaultLayout from "@/layouts/defaultLayout"
import Image from "next/image"

const HeaderContent = () => {
    return (
        <Image src="/assets/images/logo.png" alt="makromusic Task Logo" width={263} height={50} priority={true} />
    )
}

export default function Home() {
    return (
        <DefaultLayout header={<HeaderContent />}>
            <Index />
        </DefaultLayout>
    )
}