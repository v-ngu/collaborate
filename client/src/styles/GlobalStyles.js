import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
    // Colors
      --main-beige: #ECE2CC;
      --main-green: #004C3E;
      --main-gray: #2E2E30;
      --main-yellow: #ffb000;

      --ultra-light-gray: #F3F4F6;
      --light-gray: #DBDADB;
      --medium-gray: #7B7B7C;

      --hover-color: rgba(255, 255, 255, 0.1);

    // Spacing
      --tiny-space: 7px;
      --small-space: 14px;
      --standard-space: 21px;
      --large-space: 63px;

    // Border
      --border-radius: 5px;
      --standard-border: 1px solid var(--light-gray);
      --dark-border: 1px solid var(--main-gray);

    // Others
      --header-height: 57px;
    }

    /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
      font-family: "Open Sans", sans-serif;
      line-height: 1.5;
      margin: 0px auto;
      color: var(--main-gray);
      width: 100vw;
      height: 100vh;
    }
    h1 {
      font-size: 1.5em;
    }
    h2 {
      font-size: 1.375em;
    }
    h3 {
      font-size: 1.25em;
    }
    h4 {
      font-size: 1.125em;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    button {
        font-family: "Open Sans", sans-serif;
        font-size: 1em;
        font-weight: 500;
    }
    a {
      color: var(--main-gray);
      text-decoration: none;
    }
    a:hover {
      color: var(--main-yellow);
    }
    textarea {
      font-family: "Open Sans", sans-serif;
      font-size: 1em;
    }
`;

export default GlobalStyle;