import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Oneko from "../../components/extras/oneko";

const Settings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({});

  document.title = "Settings | Transitstat.us";

  useEffect(() => {
    let tempSettings =
      JSON.parse(localStorage.getItem("transitstatus_v1_settings")) ?? {};

    if (!tempSettings.showCat) {
      tempSettings.showCat = false;
    }

    console.log("Initial Settings:", tempSettings);

    setSettings(tempSettings);
    setLoading(false);
  }, []);

  return (
    <div>
      <Oneko />
      <h1>Settings</h1>
      <p>
        Below are some (well, only one) setting(s) you can set. I plan on adding
        more functionality (mostly in the name of simple theming) but that will
        probably take some time and testing.
      </p>
      <br />
      {loading ? (
        <p
          style={{
            fontSize: "1.4rem",
            fontWeight: "600",
          }}
        >
          Loading settings...
        </p>
      ) : (
        <>
          <div className='settingsPage'>
            <span>
              <input
                id='setting_showCat'
                type='checkbox'
                onChange={(e) => {
                  setSettings((currentSettings) => {
                    const newSettings = {
                      ...currentSettings,
                      showCat: e.target.checked,
                    };

                    //removing cats on the screen if we are unchecking
                    if (!e.target.checked)
                      Array.from(
                        document.getElementsByClassName("oneko")
                      ).forEach((e) => e.remove());

                    console.log("New Settings:", newSettings);
                    return newSettings;
                  });
                }}
                checked={settings.showCat}
              ></input>
              <label htmlFor='setting_showCat'>Show Cat :3</label>
            </span>
            <br />
            <button
              onClick={() => {
                console.log("Saving settings as:", settings);
                localStorage.setItem(
                  "transitstatus_v1_settings",
                  JSON.stringify(settings)
                );
              }}
            >
              Save
            </button>
          </div>
        </>
      )}
      <br />
      <p
        onClick={() => {
          if (history.state.idx && history.state.idx > 0) {
            navigate(-1);
          } else {
            navigate("/", { replace: true }); //fallback
          }
        }}
        style={{
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        Back Home
      </p>
    </div>
  );
};

export default Settings;
