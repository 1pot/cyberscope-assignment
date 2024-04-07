import styled, {keyframes} from 'styled-components'

// Keyframe animation for spinning
const spinAnimation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

// Styled Spinner component
const Spinner = styled.div`
    border: 0.25rem solid rgba(0, 0, 0, 0.1);
    border-top: 0.25rem solid #007bff;
    border-radius: 50%;
    width: 3.125rem;
    height: 3.125rem;
    animation: ${spinAnimation} 0.65s linear infinite;
`

// Wrapper to center the spinner
const SpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

// #007bff
const LoadingSpinner = () => (
    <SpinnerWrapper>
        <Spinner />
    </SpinnerWrapper>
)

export default LoadingSpinner
