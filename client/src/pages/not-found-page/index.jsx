import styled from 'styled-components'

// Styled components
const NotFoundContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f7fafc;
`

const NotFoundContent = styled.div`
    text-align: center;
`

const NotFoundTitle = styled.h1`
    font-size: 3rem;
    margin-bottom: 1rem;
`

const NotFoundMessage = styled.p`
    font-size: 1.5rem;
    margin-bottom: 2rem;
`

const PageNotFound = () => {
    return (
        <NotFoundContainer>
            <NotFoundContent>
                <NotFoundTitle>404</NotFoundTitle>
                <NotFoundMessage>Page Not Found</NotFoundMessage>
                <p>Oops! The page you are looking for does not exist.</p>
                {/* You can add additional content or links here */}
            </NotFoundContent>
        </NotFoundContainer>
    )
}

export default PageNotFound
