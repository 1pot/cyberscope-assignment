import {
    Card,
    CardHeader,
    Heading,
    CardBody,
    Stack,
    Box,
    DescriptionCard,
    Label,
    Text
} from './styles'

const CoinDetail = ({coin}) => {
    const {day, week, twoWeeks, month, twoMonths, twoHundredDays, year} =
        coin?.marketData?.priceChanges
    const {currentPrice, highestPrice24, lowestPrice24} = coin?.marketData

    return (
        <Card>
            <CardHeader>
                <Heading>{coin?.name}</Heading>
            </CardHeader>
            <CardBody>
                <Stack>
                    <CardHeader>
                        <Heading>Market Data</Heading>
                    </CardHeader>
                    <Box>
                        <Label>Current Price:</Label>
                        <Text>{currentPrice}</Text>
                    </Box>
                    <Box>
                        <Label>Price Change (24h):</Label>
                        <Text>{day}</Text>
                    </Box>
                    <Box>
                        <Label>Price Change (1W):</Label>
                        <Text>{week}</Text>
                    </Box>
                    <Box>
                        <Label>Price Change (2W):</Label>
                        <Text>{twoWeeks}</Text>
                    </Box>
                    <Box>
                        <Label>Price Change (1M):</Label>
                        <Text>{month}</Text>
                    </Box>
                    <Box>
                        <Label>Price Change (2M):</Label>
                        <Text>{twoMonths}</Text>
                    </Box>
                    <Box>
                        <Label>Price Change (200D):</Label>
                        <Text>{twoHundredDays}</Text>
                    </Box>
                    <Box>
                        <Label>Price Change (1Y):</Label>
                        <Text>{year}</Text>
                    </Box>
                    <Box>
                        <Label>Highest Price (24H):</Label>
                        <Text>{highestPrice24}</Text>
                    </Box>
                    <Box>
                        <Label>Lowest Price (24H):</Label>
                        <Text>{lowestPrice24}</Text>
                    </Box>
                </Stack>
            </CardBody>
            <DescriptionCard>
                <CardHeader>
                    <Heading>About {coin?.name}</Heading>
                </CardHeader>
                <Text>{coin?.description}</Text>
            </DescriptionCard>
        </Card>
    )
}

export default CoinDetail
