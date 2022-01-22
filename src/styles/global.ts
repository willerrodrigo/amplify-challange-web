import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    html, body, #root {
        height: 100%;
        width: 100%;
        font-family: 'Roboto', sans-serif;
    }

    #app {
        display: flex;
        justify-content: center;
    }
`;
