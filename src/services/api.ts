import axios from "axios"

const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT

export const apiCreateCampaign = async () => {
    try {
        const response = await axios.get(`${apiEndpoint}/create-campaign`)
        return response.data
    } catch (error) {
        return error
    }
}

export const apiSearchOnSpotify = async (searchQuery: string) => {
    try {
        const response = await axios.get(`${apiEndpoint}/search-on-spotify?q=${searchQuery}`)
        return response.data?.tracks?.items
    } catch (error) {
        return []
    }
}

export const apiTrackGenres = async (searchQuery: string) => {
    try {
        const response = await axios.get(`${apiEndpoint}/track-genres`)
        return response.data
    } catch (error) {
        return []
    }
}