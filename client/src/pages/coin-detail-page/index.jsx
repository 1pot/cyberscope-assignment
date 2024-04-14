import {useState, useEffect, useCallback} from 'react'
import CoinDetail from '../../components/coin-detail'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from '../../components/loading-spinner'
import {isEmptyObject} from '../../utils/utils'

const CoinDetailPage = () => {
    const [coin, setCoin] = useState({})
    const {id} = useParams()

    const fetchCoin = useCallback(() => {
        // eslint-disable-next-line no-extra-semi
        ;(async () => {
            try {
                const response = await axios.get(`/api/coins/${id}`)
                if (response && response?.data) {
                    setCoin(response.data.coin)
                }
            } catch (error) {
                if (error.response) {
                    const {status} = error.response

                    // Handle specific HTTP status codes returned by the CoinGecko API
                    switch (status) {
                        case 400:
                            console.error({success: false, error: 'Bad request'})
                            break
                        case 401:
                            console.error({success: false, error: 'Unauthorized'})
                            break
                        case 403:
                            console.error({success: false, error: 'Forbidden'})
                            break
                        case 404:
                            console.error({success: false, error: 'Not found'})
                            break
                        case 429:
                            console.error({success: false, error: 'Rate limit exceeded'})
                            break
                        case 500:
                            console.error({success: false, error: 'Internal server error'})
                            break
                        default:
                            console.error({success: false, error: 'An error occurred'})
                    }
                } else {
                    // Handle other types of errors
                    console.error({success: false, error: 'An error occurred'})
                }
            }
        })()
    }, [id])

    useEffect(() => {
        fetchCoin()
        // Cleanup function to cancel pending requests
        return () => {}
    }, [fetchCoin])

    const emptyCoin = isEmptyObject(coin)

    return emptyCoin ? <LoadingSpinner /> : <CoinDetail coin={coin} />
}

export default CoinDetailPage
