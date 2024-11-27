import axios from "axios"
const baseUrl = '/api/number'

const infer = async (matrix: number[][]) => {    
    const response = await axios.post(baseUrl,
        {
            data: JSON.stringify(matrix)
        }
    )

    return response
} 

export default { infer }