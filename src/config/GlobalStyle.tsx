import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
    /* Variables */
    :root {
        --vh: 1vh;
        --toolbar-min-height: 56px;

        @media (min-width: 600px) {
            --toolbar-min-height: 64px;
        }
    

    }
`;
export default GlobalStyle;
