import CoinListTable from '../../components/coin-list-table'
import {useState, useEffect} from 'react'
import {Button, PaginationContainer, Container} from './styles'
import LoadingSpinner from '../../components/loading-spinner'
import axios from 'axios'

const CoinListPage = () => {
    const [coins, setCoins] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    // function to handle pagination
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
    }

    const fetchCoins = async () => {
        try {
            const response = await axios.get(`/api/coins?page=${currentPage}`)
            if (response && response?.data) {
                setCoins(response.data.coins)
            }
        } catch (error) {
            console.error('Error fetching coins:', error)
        }
    }

    // Fetch coins whenever currentPage changes
    useEffect(() => {
        fetchCoins()
    }, [currentPage])

    return coins.length > 0 ? (
        <Container>
            <CoinListTable coins={coins} />
            <PaginationContainer>
                <Button onClick={() => handlePageChange(currentPage - 1)}>Previous</Button>
                <Button onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
            </PaginationContainer>
        </Container>
    ) : (
        <LoadingSpinner />
    )
}

export default CoinListPage
