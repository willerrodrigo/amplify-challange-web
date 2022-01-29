import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    html {
        height: 100%;
    }

    html, body, #root {
        width: 100%;
        font-family: 'Roboto', sans-serif;
        background-color: #e4e6ec;
    }

    :root {
        --button-background-color: #367b92;
        --button-click: #367b92;
        --link-color: #367b92;
        --ion-color-primary-ting: #367b92;

        .Nav__navBar___xtCFA {
            background-color: #e4e6ec;
        }
    }

    #app {
        display: flex;
        justify-content: center;
    }
`;
