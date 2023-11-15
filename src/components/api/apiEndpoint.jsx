import { useState } from "react";
import { JsonView, darkStyles, collapseAllNested } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

const APIEndpoint = (props) => {

  const actualProps = {
    baseURL: props.baseURL ?? "https://store.transitstat.us/passio_go/rutgers",
    endpoint: props.endpoint ?? "",
  };

  const [json, setJson] = useState({
    message: "Click the button to test the API endpoint",
  });

  return (
    <>
      <JsonView
        data={json}
        shouldExpandNode={collapseAllNested}
        style={{
          ...darkStyles,
          container: "json_view_container",
          label: "json_view_label",
          nullValue: "json_view_null",
          undefinedValue: "json_view_undefined",
          numberValue: "json_view_number",
          stringValue: "json_view_string",
          booleanValue: "json_view_boolean",
          punctuation: "json_view_punctuation",
        }}
      />
      <button
        onClick={() => {
          fetch(`${actualProps.baseURL}${actualProps.endpoint}`)
            .then((res) => {
              if (res.headers.get("Content-Type").includes('text')) {
                return res.text();
              }

              if (!res.ok) {
                setJson({ error: res.statusText });
              } else {
                return res.json();
              }
            })
            .then((data) => setJson(data))
            .catch((e) => {
              console.log(e);
              setJson({ error: 'There was an error with your request. Ensure all required fields are filled with valid inputs.' });
            });
        }}
        style={{
          backgroundColor: "#444",
          color: "#fff",
          border: "none",
          padding: "4px 8px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "18px",
          margin: "8px 0",
        }}
      >
        Send Request
      </button>
    </>
  );
};

export default APIEndpoint;
