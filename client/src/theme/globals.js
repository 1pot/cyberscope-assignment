import {createGlobalStyle} from 'styled-components'

export const GlobalStyles = createGlobalStyle`

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 100%;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
}
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
figure,
blockquote,
dl,
dd {
  padding: 0;
  margin: 0;
}

html:focus-within {
  scroll-behavior: smooth;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}
`
