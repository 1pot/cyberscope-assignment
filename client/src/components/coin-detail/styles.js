import styled from 'styled-components'

export const Card = styled.div`
    width: 100%;
    border-radius: 0.375rem;
    background-color: #ffffff;
    box-shadow: 0 0.0625rem 0.125rem 0 rgba(0, 0, 0, 0.05);
    padding: 1.25rem;
    color: #007bff;
`

export const CardHeader = styled.div`
    padding: 1.25rem 0;
`

export const DescriptionCard = styled.div`
    padding: 1.25rem;
    border: 0.125rem solid #e2e8f0;
`

export const Heading = styled.h2`
    font-size: 1.125rem;
    font-weight: 700;
`

export const Label = styled.h2`
    font-size: 1rem;
    font-weight: bold;
    color: #4a5568;
`

export const CardBody = styled.div`
    padding: 1.25rem;
    border: 0.125rem solid #e2e8f0;
`

export const Stack = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

export const Box = styled.div`
    display: flex;
    gap: 0.625rem;
    align-items: center;
    @media (max-width: 768px) {
        justify-content: space-between;
    }
`

const shouldForwardProp = (prop) => {
    // Return true to forward all props except 'isnegative'
    if (prop === 'isnegative') {
        return false
    }
    // Otherwise, return true to forward the prop
    return true
}

// Define the Text component with the filtered prop
export const Text = styled.p.withConfig({
    shouldForwardProp
})`
    font-size: 0.875rem;
    color: ${(props) => (props.pending ? '#4a5568' : props.negative ? '#F6465D' : '#0ECB81')};
    word-wrap: break-word;
`

export const Description = styled(Text)`
    color: #4a5568;
`
