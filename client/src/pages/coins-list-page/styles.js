import styled from 'styled-components'

export const Button = styled.button`
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 0.3125rem;
    padding: 0.625rem 1.25rem;
    margin: 0;
    cursor: pointer;
    outline: none;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`
export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.625rem;
`
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.25rem;
`
