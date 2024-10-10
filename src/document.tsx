import { Meta, Title, Links, Main, Scripts } from 'ice';

export default function Document() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="洪泽权自建运营系统" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" /> */}
        <Meta />
        <Title />
        <Links />
      </head>
      <body>
        <Main />
        <Scripts />
      </body>
    </html>
  );
}
