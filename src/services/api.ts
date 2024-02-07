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