import { Times } from "@/components/Icons"
import clsx from "clsx"
import React from "react"
import Select, { MultiValueRemoveProps } from "react-select"

interface CustomOption {
    value: string;
    label: string;
}

const Details: React.FC = () => {
    /*
        Notlar:
        - Burada 'region' string olarak gönderilmeli, keyleri önemli değil fakat burda belirlenenen region'a göre bir sonraki adımda paket gösterimi yapılması gerekiyor.
        Burası checkbox şeklindedir, Global veya Turkiye'den bir tanesi seçilebilmektedir. (+)
        - 'track-genres' route'undan gelmesi gerekmekte datanın ve multiple selection yapılabilir olmalı ve buna göre kayıt atmalı.
    */

    const options: CustomOption[] = [
        { value: "Rock", label: "Rock" },
        { value: "Jazz", label: "Jazz" },
        { value: "Pop", label: "Pop" },
    ]

    const MultiValueContainer: React.FC<any> = React.memo((props) => {
        MultiValueContainer.displayName = "MultiValueContainer"

        return (
            <div className="flex items-center rounded-md border border-gray-300 bg-white px-2 py-1">
                {props.children}
            </div>
        )
    })

    const MultiValueLabel: React.FC<any> = React.memo((props) => {
        MultiValueLabel.displayName = "MultiValueLabel"

        return <span className="m-0 p-0 text-sm text-gray-700">{props.children}</span>
    })

    const MultiValueRemove: React.FC<MultiValueRemoveProps> = React.memo((props) => {
        MultiValueRemove.displayName = "MultiValueRemove"

        return (
            <div className="m-0 cursor-pointer p-0 pt-0.5" onClick={(e) => handleRemoveClick(props, e)} {...props}>
                <Times className="size-3.5 stroke-gray-500 stroke-[3px]" />
            </div>
        )
    })

    const handleRemoveClick = (props: MultiValueRemoveProps, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (props.innerProps && props.innerProps.onClick) {
            props.innerProps.onClick(e)
        }
    }

    return (
        <div className="flex flex-col gap-11">
            <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-6">
                <div className="mb-6">
                    <div className="mb-0.5 text-primary-900">Bölgeni seç</div>
                    <p className="text-sm text-gray-500">Kampanyayı yayınlamak istediğin bölgeyi seç.</p>
                </div>
                <div className="flex gap-5">
                    <div className="relative size-full">
                        <input type="radio" id="region-tr" name="region" className="peer" hidden />
                        <label htmlFor="region-tr" className="block w-full cursor-pointer rounded-[10px] border border-gray-300 px-3 py-2 text-gray-900 transition-all peer-checked:border-primary-600 peer-checked:bg-primary-25">Türkiye</label>
                    </div>
                    <div className="relative size-full">
                        <input type="radio" id="region-global" name="region" className="peer" hidden />
                        <label htmlFor="region-global" className="block w-full cursor-pointer rounded-[10px] border border-gray-300 px-3 py-2 text-gray-900 transition-all peer-checked:border-primary-600 peer-checked:bg-primary-25">Global</label>
                    </div>
                </div>
            </div>
            <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-6">
                <div className="mb-6">
                    <div className="mb-0.5 text-primary-900">Parçanın türünü seç</div>
                    <p className="text-sm text-gray-500">Seçtiğin parçanın türlerini belirle.</p>
                </div>
                <Select
                    isMulti
                    classNames={{ control: () => clsx("!rounded-lg !border-gray-300 px-3 py-1"), input: () => clsx("!m-0 p-0"), multiValue: () => clsx("m-0 p-0"), valueContainer: () => clsx("gap-1 !p-0") }}
                    components={{ MultiValueContainer, MultiValueLabel, MultiValueRemove }}
                    options={options}
                    placeholder={<span className="!text-sm !text-gray-400">Tür ara</span>}
                    noOptionsMessage={() => <span className="!text-sm !text-gray-400">Hiçbir sonuç bulunamadı</span>}
                />
            </div>
        </div>
    )
}

export default Details