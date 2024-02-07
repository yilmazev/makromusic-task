import { Check } from "@/components/Icons"
import { apiSearchOnSpotify } from "@/services/api"
import { usePackageStore } from "@/stores/packageStore"
import clsx from "clsx"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import Select from "react-select"

const Track: React.FC = () => {
    /*
        Yapılacaklar:
        - Arama iyileştirilecek
    */

    /*
        Notlar:
        - React-select kütüphanesi kullanılacak
        - Eğer checkbox seçiliyse, search disabled olacak ve null gönderilecek
        - Eğer seçili şarkı yoksa veya checkbox seçili değilse button disabled olmalı
    */

    const { selectedTrack, setSelectedTrack, isTrackNotInAir, setIsTrackNotInAir } = usePackageStore()
    const [ searchQuery, setSearchQuery ] = useState("")
    const [ searchResults, setSearchResults ] = useState([])

    // Arama
    useEffect(() => {
        handleDebouncedSearch()
    }, [ searchQuery ])

    // Gecikmeli arama
    const handleDebouncedSearch = async () => {
        const response = await apiSearchOnSpotify(searchQuery)
        setSearchResults(response)
    }

    // Şarkı seçme
    const handleSelectTrack = (track: any) => {
        setSelectedTrack(track)
    }

    // Parçam yayında değil
    const handleNotInAir = () => {
        if (isTrackNotInAir) {
            setSelectedTrack(null)
        }
        setIsTrackNotInAir(!isTrackNotInAir)
    }
    
    const formatOptionLabel = (option: any) => (
        <div className="flex items-center">
            <Image
                className="rounded-xl"
                src={option.album.images[0].url}
                alt={option.label}
                loading="lazy"
                width={36}
                height={36}
            />
            <div className="ml-2 flex flex-col">
                <p className="text-sm text-gray-500">{option.label}</p>
                <p className="text-xs text-gray-400">{option.artist}</p>
            </div>
        </div>
    )

    const options = searchResults.map((result: {
        id: string;
        name: string;
        artists: { name: string }[];
        album: { name: string; images: { url: string }[] };
        preview_url: string;
        uri: string;
    }) => ({
        value: result.id,
        label: result.name,
        artist: result.artists[0].name,
        album: result.album,
        preview_url: result.preview_url,
        uri: result.uri,
    }))
    
    return (
        <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-6">
            <div className="mb-6">
                <div className="mb-0.5 text-primary-900">Parçanı seç</div>
                <p className="text-sm text-gray-500">Kampanyayı oluşturmak istediğin parçayı seç.</p>
            </div>
            <Select
                classNames={{ control: () => clsx("!rounded-lg !border-gray-300") }}
                placeholder={<p className="!text-sm !text-gray-400">Spotify'da ara</p>}
                options={options}
                onInputChange={(value) => {
                    setSearchQuery(value)
                    if (!value) handleDebouncedSearch()
                }}
                onChange={handleSelectTrack}
                formatOptionLabel={formatOptionLabel}
                isDisabled={isTrackNotInAir}
            />
            <div className="mt-3 flex items-center gap-2">
                <div className="relative size-4">
                    <input type="checkbox" id="off-the-air" onChange={handleNotInAir} className="peer relative size-full cursor-pointer rounded border border-gray-300 bg-white transition-all checked:border-gray-300 checked:bg-gray-300 checked:before:bg-gray-300" />
                    <span className="pointer-events-none absolute left-2/4 top-2.5 -translate-x-2/4 -translate-y-2/4 text-gray-700 opacity-0 transition-opacity peer-checked:opacity-100">
                        <Check className="w-3.5" />
                    </span>
                </div>
                <label htmlFor="off-the-air" className="cursor-pointer pt-1 text-sm text-gray-700">Parçam yayında değil</label>
            </div>
        </div>
    )
}

export default Track