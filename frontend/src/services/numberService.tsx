import axios from "axios"
const baseUrl = '/api/number'

const infer = async (matrix: number[][]) => {    
    const response = await axios.post(baseUrl,
        {
            data: JSON.stringify(matrix)
        }
    )
    console.log(response.data)
    return response.data
} 

export default { infer }