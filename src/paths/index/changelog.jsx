import { useNavigate } from "react-router-dom";
import Oneko from "../../components/extras/oneko";

const Changelog = () => {
  const navigate = useNavigate();

  document.title = "Changelog | Transitstat.us";

  return (
    <div>
      <Oneko />
      <h1>Changelog</h1>
      <button
        onClick={() => {
          if (history.state.idx && history.state.idx > 0) {
            navigate(-1);
          } else {
            navigate("/", { replace: true }); //fallback
          }
        }}
        className='settingsButton'
        style={{
          marginTop: "0.5rem",
        }}
      >
        Back Home
      </button>
      <table>
        <thead>
          <tr>
            <th>Version</th>
            <th>Changes</th>
          </tr>
        </thead>
        <tbody>
          <tr id='1-9-1'>
            <td>v1.9.1</td>
            <td>
              <ul>
                <li>Began setup for holiday vehicles.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-9-0'>
            <td>v1.9.0</td>
            <td>
              <ul>
                <li>Added arrows to map.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-8-2'>
            <td>v1.8.2</td>
            <td>
              <ul>
                <li>Improved constrast with GA Tech colors.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-8-1'>
            <td>v1.8.1</td>
            <td>
              <ul>
                <li>Removed ads script for better performance.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-8-0'>
            <td>v1.8.0</td>
            <td>
              <ul>
                <li>
                  Added tools to the settings page
                  <ul>
                    <li>Code Cache Clearing</li>
                    <li>Transit Data Cache Clearing</li>
                    <li>Settings Resetting</li>
                    <li>Application Resetting</li>
                  </ul>
                </li>
                <li>Modified cat mode script to work better on mobile.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-7-1'>
            <td>v1.7.1</td>
            <td>
              <ul>
                <li>Added cat mode :3</li>
              </ul>
            </td>
          </tr>
          <tr id='1-7-0'>
            <td>v1.7.0</td>
            <td>
              <ul>
                <li>Fixed issues with new ETAs system</li>
                <li>
                  Started using Data manager
                  <ul>
                    <li>Allows for less data usage</li>
                    <li>Allows for better offline usage</li>
                    <li>Causes lower latency when quickly changing pages</li>
                  </ul>
                </li>
              </ul>
            </td>
          </tr>
          <tr id='1-6-7'>
            <td>v1.6.7</td>
            <td>
              <ul>
                <li>Added expiration time for alerts system</li>
              </ul>
            </td>
          </tr>
          <tr id='1-6-6'>
            <td>v1.6.6</td>
            <td>
              <ul>
                <li>Added alerts system</li>
                <li>Replaced favorite lines with favorite agencies</li>
              </ul>
            </td>
          </tr>
          <tr id='1-6-5'>
            <td>v1.6.5</td>
            <td>
              <ul>
                <li>Fixed GCSU Typo</li>
              </ul>
            </td>
          </tr>
          <tr id='1-6-4'>
            <td>v1.6.4</td>
            <td>
              <ul>
                <li>Sorted Inactive Routes</li>
                <li>Improved map auto-zoom</li>
                <li>Only show map shapes for selected route</li>
              </ul>
            </td>
          </tr>
          <tr id='1-6-3'>
            <td>v1.6.3</td>
            <td>
              <ul>
                <li>Fixed ETA sorting</li>
              </ul>
            </td>
          </tr>
          <tr id='1-6-2'>
            <td>v1.6.2</td>
            <td>
              <ul>
                <li>Fixed 404 error page</li>
              </ul>
            </td>
          </tr>
          <tr id='1-6-1'>
            <td>v1.6.1</td>
            <td>
              <ul>
                <li>Fixed API docs title</li>
              </ul>
            </td>
          </tr>
          <tr id='1-6-0'>
            <td>v1.6.0</td>
            <td>
              <ul>
                <li>Added API docs</li>
              </ul>
            </td>
          </tr>
          <tr id='1-5-1'>
            <td>v1.5.1</td>
            <td>
              <ul>
                <li>Fixed missing line heart</li>
                <li>Removed agency heart</li>
              </ul>
            </td>
          </tr>
          <tr id='1-5-0'>
            <td>v1.5.0</td>
            <td>
              <ul>
                <li>Added NC State</li>
                <li>Added UNC Charlotte</li>
                <li>Added UNC Greensboro</li>
                <li>Added UNC Wilmington</li>
                <li>Added University of Alabama</li>
              </ul>
            </td>
          </tr>
          <tr id='1-4-1'>
            <td>v1.4.1</td>
            <td>
              <ul>
                <li>Fixed commented out code</li>
              </ul>
            </td>
          </tr>
          <tr id='1-4-0'>
            <td>v1.4.0</td>
            <td>
              <ul>
                <li>Increased map max zoom level</li>
                <li>Added saved lines option</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-10'>
            <td>v1.3.10</td>
            <td>
              <ul>
                <li>Added bus descriptions</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-9'>
            <td>v1.3.9</td>
            <td>
              <ul>
                <li>Fixed error message typo</li>
                <li>Removed duplicated changelog entry</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-8'>
            <td>v1.3.8</td>
            <td>
              <ul>
                <li>OK the API actually works this time</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-7'>
            <td>v1.3.7</td>
            <td>
              <ul>
                <li>OH SHIT OH FUCK GO BACK</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-6'>
            <td>v1.3.6</td>
            <td>
              <ul>
                <li>Changed API endpoint root for better analytics</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-5'>
            <td>v1.3.5</td>
            <td>
              <ul>
                <li>More descriptive page titles</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-4'>
            <td>v1.3.4</td>
            <td>
              <ul>
                <li>Page titles</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-3'>
            <td>v1.3.3</td>
            <td>
              <ul>
                <li>Minor map popup formatting</li>
                <li>Removed null island vehicles from map auto pan</li>
                <li>Slightly changed header</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-2'>
            <td>v1.3.2</td>
            <td>
              <ul>
                <li>Added a small bit to the about section</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-1'>
            <td>v1.3.1</td>
            <td>
              <ul>
                <li>More accurate last updated timestamps</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-0'>
            <td>v1.3.0</td>
            <td>
              <ul>
                <li>Added capacities to passio vehicles</li>
              </ul>
            </td>
          </tr>
          <tr id='1-2-4'>
            <td>v1.2.4</td>
            <td>
              <ul>
                <li>Fixed map last updated timestamp</li>
              </ul>
            </td>
          </tr>
          <tr id='1-2-3'>
            <td>v1.2.3</td>
            <td>
              <ul>
                <li>Fixed bug in station pages having invalid ETAs</li>
              </ul>
            </td>
          </tr>
          <tr id='1-2-2'>
            <td>v1.2.2</td>
            <td>
              <ul>
                <li>Fixed bug in station popups having invalid ETAs</li>
              </ul>
            </td>
          </tr>
          <tr id='1-2-1'>
            <td>v1.2.1</td>
            <td>
              <ul>
                <li>Sorted line names in line selector</li>
              </ul>
            </td>
          </tr>
          <tr id='1-2-0'>
            <td>v1.2.0</td>
            <td>
              <ul>
                <li>Added more error messages</li>
                <li>Handled passio go not having ETAs</li>
                <li>Autofit markers on map loading</li>
                <li>New "lasts updated" on map</li>
                <li>Communication if Passio GO's API is the problem</li>
              </ul>
            </td>
          </tr>
          <tr id='1-1-4'>
            <td>v1.1.4</td>
            <td>
              <ul>
                <li>Added oopsy poopsy messages</li>
              </ul>
            </td>
          </tr>
          <tr id='1-1-3'>
            <td>v1.1.3</td>
            <td>
              <ul>
                <li>Fixed missing strings in config</li>
                <li>Slightly modified changelog</li>
              </ul>
            </td>
          </tr>
          <tr id='1-1-2'>
            <td>v1.1.2</td>
            <td>
              <ul>
                <li>Ensured icons aren't duplicates</li>
              </ul>
            </td>
          </tr>
          <tr id='1-1-1'>
            <td>v1.1.1</td>
            <td>
              <ul>
                <li>Added proper 404 page</li>
                <li>Made opengraph image professional</li>
              </ul>
            </td>
          </tr>
          <tr id='1-1-0'>
            <td>v1.1.0</td>
            <td>
              <ul>
                <li>Added everything map</li>
              </ul>
            </td>
          </tr>
          <tr id='1-0-1'>
            <td>v1.0.1</td>
            <td>
              <ul>
                <li>Added changelog IDs</li>
              </ul>
            </td>
          </tr>
          <tr id='1-0-0'>
            <td>v1.0.0</td>
            <td>
              <ul>
                <li>Fixed manifest short name</li>
                <li>Improved home page layout</li>
                <li>Added station favorites</li>
                <li>Added changelog page</li>
              </ul>
            </td>
          </tr>
          <tr id='0-10-2'>
            <td>v0.10.2 Beta</td>
            <td>
              <ul>
                <li>Added icons required for PWA</li>
                <li>Fixed manifest</li>
              </ul>
            </td>
          </tr>
          <tr id='0-10-1'>
            <td>v0.10.1 Beta</td>
            <td>
              <ul>
                <li>Added Georgia College & State Shuttles</li>
                <li>Added Georgia State Shuttles</li>
                <li>Added Georgia Tech Shuttles</li>
                <li>Added Georgia Southern Shuttles</li>
                <li>Added MIT Shuttles</li>
              </ul>
            </td>
          </tr>
          <tr id='0-10-0'>
            <td>v0.10.0 Beta</td>
            <td>
              <ul>
                <li>Migrated UChicago Shuttles Endpoint</li>
                <li>Migrated Rutgers Shuttles Endpoint</li>
              </ul>
            </td>
          </tr>
          <tr id='0-9-1'>
            <td>v0.9.1 Beta</td>
            <td>
              <ul>
                <li>Added privacy policy</li>
                <li>Added about page</li>
                <li>Added settings page</li>
              </ul>
            </td>
          </tr>
          <tr id='0-9-0'>
            <td>v0.9.0 Beta</td>
            <td>
              <ul>
                <li>Implemented limited PWA functionality</li>
                <li>Collapsed inactive lines in selector</li>
              </ul>
            </td>
          </tr>
          <tr id='0-8-0'>
            <td>v0.8.0 Beta</td>
            <td>
              <ul>
                <li>Added UChicago Shuttles</li>
                <li>Added Rutgers Shuttles</li>
                <li>Used config name scheme for vehicles</li>
              </ul>
            </td>
          </tr>
          <tr id='0-7-1'>
            <td>v0.7.1 Beta</td>
            <td>
              <ul>
                <li>Adjusted font sizes</li>
              </ul>
            </td>
          </tr>
          <tr id='0-7-0'>
            <td>v0.7.0 Beta</td>
            <td>
              <ul>
                <li>Added timestamps to predictions</li>
              </ul>
            </td>
          </tr>
          <tr id='0-6-3'>
            <td>v0.6.3 Beta</td>
            <td>
              <ul>
                <li>Fixed map navigation</li>
                <li>Added default map viewpoints</li>
              </ul>
            </td>
          </tr>
          <tr id='0-6-1'>
            <td>v0.6.1 Beta</td>
            <td>
              <ul>
                <li>Added map controls</li>
                <li>Added south shore line</li>
              </ul>
            </td>
          </tr>
          <tr id='0-6-0'>
            <td>v0.6.0 Beta</td>
            <td>
              <ul>
                <li>Added map</li>
              </ul>
            </td>
          </tr>
          <tr id='0-5-4'>
            <td>v0.5.4 Beta</td>
            <td>
              <ul>
                <li>Accounted for trains/buses not existing</li>
                <li>Fixed minor CSS bugs</li>
              </ul>
            </td>
          </tr>
          <tr id='0-5-1'>
            <td>0.5.1 Beta</td>
            <td>
              <ul>
                <li>Ported over Amtraker error handling</li>
              </ul>
            </td>
          </tr>
          <tr id='0-5-0'>
            <td>v0.5.0 Beta</td>
            <td>
              <ul>
                <li>Added support for multiple agencies</li>
                <li>Improved config options</li>
                <li>Minor text formatting changes</li>
                <li>Added Metra</li>
              </ul>
            </td>
          </tr>
          <tr id='0-4-0'>
            <td>v0.4.0 Beta</td>
            <td>
              <ul>
                <li>Initial Release</li>
                <li>Added CTA Trains</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={() => {
          if (history.state.idx && history.state.idx > 0) {
            navigate(-1);
          } else {
            navigate("/", { replace: true }); //fallback
          }
        }}
        className='settingsButton'
        style={{
          marginTop: "0.5rem",
        }}
      >
        Back Home
      </button>
    </div>
  );
};

export default Changelog;
