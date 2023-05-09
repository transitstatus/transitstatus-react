import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  const errorString = error.toString();

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        Please copy the following and email it to me (piero@piemadd.com) so I
        can debug and fix the issue.{" "}
        <b>
          There is a chance your issue is already fixed. Try realoding a few
          times to see if that fixes the issue.
        </b>
      </p>
      <br />
      {errorString.includes("error loading dynamically imported module") ? (
        <p>
          It seems like the issue you are facing is related to our API data.
          Trying again in 2-3 minutes should fix your problem.
        </p>
      ) : null}
      <p>
        <i>
          Current path: {window.location.href}
          <br />
          Current version: v0.0.3 Beta
          <br />
          Current date and time (UTC): {new Date().toUTCString()}
          <br />
          Current date and time (local): {new Date().toLocaleString()}
          <br />
          {error.toString()}
        </i>
      </p>
    </div>
  );
}
