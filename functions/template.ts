export function getTemplate({
  redirectPath,
  withError,
}: {
  redirectPath: string;
  withError: boolean;
}): string {
  return `
    <!doctype html>
    <html lang="en" data-theme="dark">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <title>Protected Content</title>
            <meta name="description" content="This content is protected and requires a password to continue.">
            <link rel="shortcut icon" href="https://fhctheatre.org/favicon.ico">
            <style>
                @font-face { 
                    font-family: "Merriweather";
                    src: url('https://fonts.googleapis.com/css2?family=Merriweather&display=swap');
                }

                @font-face {
                    font-family: "Dischouse";
                    src: url('https://fhctheatre.org/fonts/DISCHOUSE.ttf');
                }

                body {
                    margin: 0;
                    background-color: #ddddde;
                }
                .header {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    background-color: #007041;
                }
                .header .title {
                    font-family: 'Dischouse';
                    font-size: 4rem;
                    color: #fff;
                    padding: 0.5em;
                }
                .page {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    text-align: center;
                    min-height: calc(100vh - 7rem);
                    padding: 1rem 0;
                    max-width: 1080px;
                    margin: 0 auto;
                    font-family: 'Merriweather';
                    background-color: #fff;
                    color: #007041;
                }
                .error {
                    background: white;
                    border-radius: 8px;
                    color: #f0f780;
                    padding: 0.5em 1em;
                }
                h1 {
                    font-size: 1.25rem;
                }
            </style>
        </head>
        <body>
            <header class="header">
                <div class="title">Forest Hills Central Theatre</div>
            </header>
            <main class="page">
                <article>
                    <hgroup>
                        <h1>This page is protected.</h1>
                        <p>Please enter the the password for this content.</p>
                    </hgroup>
                    ${
                      withError
                        ? `<p class="error">Incorrect password entered, please try again.</p>`
                        : ""
                    }
                    <form method="POST" action="/portalLogin">
                        <input type="hidden" name="redirect" value="${redirectPath}" />
                        <input type="password" name="password" placeholder="Enter Password" aria-label="Password" autocomplete="current-password" required autofocus/>
                        <button type="submit">Login</button>
                    </form>
                </article>
            </main>
        </body>
    </html>
    `;
}
