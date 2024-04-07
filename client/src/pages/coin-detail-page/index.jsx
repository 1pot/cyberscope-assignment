import {useState, useEffect} from 'react'
import CoinDetail from '../../components/coin-detail'
import {useParams} from 'react-router-dom'
import axios from 'axios'

const CoinDetailPage = () => {
    const [coin, setCoin] = useState()
    const {id} = useParams()

    const fetchCoin = async () => {
        try {
            const response = await axios.get(`/api/coins/${id}`)
            if (response && response?.data) {
                setCoin(response.data.coin)
            }
        } catch (error) {
            console.error('Error fetching coin:', error)
        }
    }

    useEffect(() => {
        fetchCoin()
    }, [])

    return coin ? <CoinDetail coin={coin} /> : <div>Loading...</div>
}

export default CoinDetailPage
