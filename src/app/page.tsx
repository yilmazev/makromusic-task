import Home from "@/containers/Home"
import DefaultLayout from "@/layouts/defaultLayout"
import Image from "next/image"

const HeaderContent = () => {
    return (
        <Image src="/assets/images/logo.png" alt="makromusic Task Logo" width={263} height={50} priority={true} />
    )
}

export default function Index() {
    return (
        <DefaultLayout header={<HeaderContent />}>
            <Home />
        </DefaultLayout>
    )
}