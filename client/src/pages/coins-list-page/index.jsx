import CoinListTable from '../../components/coin-list-table'
import {useState, useEffect, useCallback} from 'react'
import {Button, PaginationContainer, Container} from './styles'
import LoadingSpinner from '../../components/loading-spinner'
import axios from 'axios'

const CoinListPage = () => {
    const [coins, setCoins] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    // function to handle pagination
    const handlePageChange = useCallback((newPage) => {
        setCurrentPage(newPage)
    }, [])

    const fetchCoins = useCallback(() => {
        // eslint-disable-next-line no-extra-semi
        ;(async () => {
            try {
                const response = await axios.get(`/api/coins?page=${currentPage}`)
                if (response && response?.data) {
                    setCoins(response.data.coins)
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
    }, [currentPage])

    // Fetch coins whenever currentPage changes
    useEffect(() => {
        fetchCoins()
        // Cleanup function to cancel pending requests
        return () => {}
    }, [fetchCoins])

    return coins.length > 0 ? (
        <Container>
            <CoinListTable coins={coins} />
            <PaginationContainer>
                <Button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </Button>
                <Button onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
            </PaginationContainer>
        </Container>
    ) : (
        <LoadingSpinner />
    )
}

export default CoinListPage
