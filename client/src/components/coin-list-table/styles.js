import styled from 'styled-components'

export const TableContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const TableWrapper = styled.div`
    width: 100%;
    max-width: 75rem;
    overflow-x: auto;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
    border-radius: 0.625rem;
`

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-radius: 0.625rem;
    overflow: hidden;
`

export const Th = styled.th`
    padding: 1.25rem 0.625rem;
    background-color: #007bff;
    color: #ffffff;
    font-weight: bold;
    text-align: left;
`

export const Td = styled.td`
    padding: 0.9375rem 0.625rem;
    background-color: #f8f8f8;
    color: #333333;
`
export const Link = styled.a`
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;

    &:hover {
        color: #0056b3;
        text-decoration: underline;
    }
`
