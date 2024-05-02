import {
    Card,
    CardHeader,
    Heading,
    CardBody,
    Stack,
    Box,
    DescriptionCard,
    Label,
    Text,
    Description
} from './styles'
import {sanitizedCoin} from '../../utils/utils'

const PriceText = ({price, symbol}) => {
    // Check if the price is a nevative number
    const isNegative = typeof price === 'number' && price < 0
    const isPending = typeof price === 'string' && price === 'Pending...'

    return (
        <Text negative={!!isNegative} pending={!!isPending} symbol={symbol}>
            {symbol && !isPending && '$ '}
            {price}
            {!symbol && !isPending && '%'}
        </Text>
    )
}

const CoinDetail = ({coin}) => {
    const validatedCoin = sanitizedCoin(coin)

    return (
        <Card>
            <CardHeader>
                <Heading>{validatedCoin?.name}</Heading>
            </CardHeader>
            <CardBody>
                <Stack>
                    <CardHeader>
                        <Heading>Market Data</Heading>
                    </CardHeader>
                    <Box>
                        <Label>Current Price:</Label>
                        <PriceText price={validatedCoin?.currentPrice} symbol={true} />
                    </Box>
                    <Box>
                        <Label>Price Change (24h):</Label>
                        <PriceText price={validatedCoin?.day} symbol={true} />
                    </Box>
                    <Box>
                        <Label>Price Change (1W):</Label>
                        <PriceText price={validatedCoin?.week} />
                    </Box>
                    <Box>
                        <Label>Price Change (2W):</Label>
                        <PriceText price={validatedCoin?.twoWeeks} />
                    </Box>
                    <Box>
                        <Label>Price Change (1M):</Label>
                        <PriceText price={validatedCoin?.month} />
                    </Box>
                    <Box>
                        <Label>Price Change (2M):</Label>
                        <PriceText price={validatedCoin?.twoMonths} />
                    </Box>
                    <Box>
                        <Label>Price Change (200D):</Label>
                        <PriceText price={validatedCoin?.twoHundredDays} />
                    </Box>
                    <Box>
                        <Label>Price Change (1Y):</Label>
                        <PriceText price={validatedCoin?.year} />
                    </Box>
                    <Box>
                        <Label>Highest Price (24H):</Label>
                        <PriceText price={validatedCoin?.highestPrice24} symbol={true} />
                    </Box>
                    <Box>
                        <Label>Lowest Price (24H):</Label>
                        <PriceText price={validatedCoin?.lowestPrice24} symbol={true} />
                    </Box>
                </Stack>
            </CardBody>
            <DescriptionCard>
                <CardHeader>
                    <Heading>About {validatedCoin?.name}</Heading>
                </CardHeader>
                <Description>{validatedCoin?.description}</Description>
            </DescriptionCard>
        </Card>
    )
}

export default CoinDetail
