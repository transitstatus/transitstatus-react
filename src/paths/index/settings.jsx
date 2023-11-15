import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Oneko from "../../components/extras/oneko";
import {
  clearCodeCache,
  clearLocalStorage,
  clearSettings,
  clearTransitDataCache,
} from "../../components/extras/cacheManager";

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
        Below are some settings/tools you can set/use. I plan on adding more
        functionality (mostly in the name of simple theming) but that will
        probably take some time and testing.
      </p>
      {loading ? (
        <p
          style={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          Settings are currently loading...
        </p>
      ) : (
        <>
          <div className='settingsPage'>
            <h3>Settings</h3>
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
            <span>
              <label htmlFor='setting_theme'>Select a Theme:</label>
              <select>
                <option value={"dark"} id='setting_theme'>
                  Dark
                </option>
              </select>
            </span>
            <button
              onClick={() => {
                console.log("Saving settings as:", settings);
                localStorage.setItem(
                  "transitstatus_v1_settings",
                  JSON.stringify(settings)
                );
                location.reload();
              }}
            >
              Save Settings and Reload
            </button>
          </div>
          <div className='settingsPage'>
            <h3>Tools</h3>
            <button
              onClick={() => {
                clearCodeCache();
              }}
            >
              Clear Code Cache
            </button>
            <button
              onClick={() => {
                clearTransitDataCache();
              }}
            >
              Clear Transit Data Cache
            </button>
            <button
              onClick={() => {
                clearSettings();
              }}
            >
              Reset Settings
            </button>
            <button
              onClick={() => {
                clearLocalStorage();
              }}
            >
              Reset Everything
            </button>
          </div>
          <br />
          <p>
            <i>
              If you're looking for the privacy policy, it's on the about page.
            </i>
          </p>
          <br />
        </>
      )}
      <button
        onClick={() => {
          if (history.state.idx && history.state.idx > 0) {
            navigate(-1);
          } else {
            navigate("/", { replace: true }); //fallback
          }
        }}
        className='settingsButton'
      >
        Back Home
      </button>
    </div>
  );
};

export default Settings;
