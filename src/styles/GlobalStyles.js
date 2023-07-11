import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
      --light-green: #59E4A8;
      --gray-blue: #1B2E35;
      --secondary-color: hsl(258deg, 100%, 50%, 0.15);
      --third-color: #CFD9DE;
      --neutral-color: #536471;
      --border: solid 1px #CFD9DE;
      --large-border-color: solid 8px #CFD9DE;

      --small-padding: 10px;
      --standard-padding: 20px;
      --large-padding: 65px;

      --small-margin: 10px;
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
      max-width: 1200px;
      color: var(--gray-blue);
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
`;

export default GlobalStyle;