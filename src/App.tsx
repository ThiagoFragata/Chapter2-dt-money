import styled from "styled-components"

const Title = styled.h1 `
  font-size: 64px;
  color: #f77f00;
`

export function App() {
  return <div className="container">
    <Title>Hello, World!</Title>
  </div>;
}