import {TableContainer, TableWrapper, Table, Th, Td, Link} from './styles'

const CoinListTable = ({coins}) => {
    return (
        <TableContainer>
            <TableWrapper>
                <Table>
                    <thead>
                        <tr>
                            <Th>Name</Th>
                            <Th>Symbol</Th>
                            <Th>Current Price</Th>
                            <Th>Highest Price (24h)</Th>
                            <Th>Lowest Price (24h)</Th>
                            <Th>Price Change (24h)</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {coins &&
                            coins.map((coin) => {
                                return (
                                    <tr key={coin.id}>
                                        <Td>
                                            <Link href={`/coin/${coin.id}`}>{coin.name}</Link>
                                        </Td>
                                        <Td>{coin.symbol}</Td>
                                        <Td>{coin.currentPrice}</Td>
                                        <Td>{coin.highestPrice24}</Td>
                                        <Td>{coin.lowestPrice24}</Td>
                                        <Td>{coin.priceChange24}</Td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </Table>
            </TableWrapper>
        </TableContainer>
    )
}

export default CoinListTable
