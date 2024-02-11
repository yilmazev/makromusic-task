import Home from "@/containers/Home"
import BaseLayout from "@/layouts/baseLayout"
import Image from "next/image"

const HeaderContent = () => {
    return (
        <Image src="/assets/images/logo.png" alt="makromusic Task Logo" width={263} height={50} priority={true} />
    )
}

export default function Index() {
    return (
        <BaseLayout header={<HeaderContent />}>
            <Home />
        </BaseLayout>
    )
}