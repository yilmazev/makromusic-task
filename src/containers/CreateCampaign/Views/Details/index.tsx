const Details: React.FC = () => {
    return (
        <div className="flex flex-col gap-11">
            <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-6">
                <div className="mb-6">
                    <div className="mb-0.5 text-primary-900">Bölgeni seç</div>
                    <p className="text-sm text-gray-500">Kampanyayı yayınlamak istediğin bölgeyi seç.</p>
                </div>
            </div>
            <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-6">
                <div className="mb-6">
                    <div className="mb-0.5 text-primary-900">Parçanın türünü seç</div>
                    <p className="text-sm text-gray-500">Seçtiğin parçanın türlerini belirle.</p>
                </div>
            </div>
            
        </div>
    )
}

export default Details