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
        <tr id='1-14-3'>
            <td>
              <a href='#1-14-3'>v1.14.3</a>
            </td>
            <td>
              <ul>
                <li>Added Christmas colors and snowflakes with holiday themed transit vehicles.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-14-2'>
            <td>
              <a href='#1-14-2'>v1.14.2</a>
            </td>
            <td>
              <ul>
                <li>Added Brightline.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-14-1'>
            <td>
              <a href='#1-14-1'>v1.14.1</a>
            </td>
            <td>
              <ul>
                <li>Added WMATA.</li>
                <li>Fixed bug with non arrow icons.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-14-0'>
            <td>
              <a href='#1-14-0'>v1.14.0</a>
            </td>
            <td>
              <ul>
                <li>
                  Upgraded caching system to use localforage, for better speed
                  and reliability.
                </li>
                <li>Removed opengraph test.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-13-3'>
            <td>
              <a href='#1-13-3'>v1.13.2</a>
            </td>
            <td>
              <ul>
                <li>Testing out opengraph.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-13-2'>
            <td>
              <a href='#1-13-2'>v1.13.2</a>
            </td>
            <td>
              <ul>
                <li>Fixed icon rendering bug.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-13-1'>
            <td>
              <a href='#1-13-1'>v1.13.1</a>
            </td>
            <td>
              <ul>
                <li>Added UP Big Boy shapes.</li>
                <li>Enabled UP Big Boy.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-13-0'>
            <td>
              <a href='#1-13-0'>v1.13.0</a>
            </td>
            <td>
              <ul>
                <li>Moved icon generation to the client side.</li>
                <ul>
                  <li>Better performance.</li>
                  <li>Lower bandwidth usage.</li>
                  <li>
                    Lower error rate from lag between GTFS processing and
                    realtime.
                  </li>
                </ul>
              </ul>
            </td>
          </tr>
          <tr id='1-12-5'>
            <td>
              <a href='#1-12-5'>v1.12.5</a>
            </td>
            <td>
              <ul>
                <li>Testing UP Big Boy tracking.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-12-4'>
            <td>
              <a href='#1-12-4'>v1.12.4</a>
            </td>
            <td>
              <ul>
                <li>Added RIT.</li>
                <li>Fixed image loading bug.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-12-3'>
            <td>
              <a href='#1-12-3'>v1.12.3</a>
            </td>
            <td>
              <ul>
                <li>Updated icons to be a single image.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-12-2'>
            <td>
              <a href='#1-12-2'>v1.12.2</a>
            </td>
            <td>
              <ul>
                <li>Made map popups to always be above.</li>
                <li>Added "View Full Station" button to station popups.</li>
                <li>Modified header to be simpler and smaller.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-12-1'>
            <td>
              <a href='#1-12-1'>v1.12.1</a>
            </td>
            <td>
              <ul>
                <li>Added run number prefix customization.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-12-0'>
            <td>
              <a href='#1-12-0'>v1.12.0</a>
            </td>
            <td>
              <ul>
                <li>
                  Added the ability to track a train/bus via a run/vehicle
                  number.
                </li>
              </ul>
            </td>
          </tr>
          <tr id='1-11-16'>
            <td>
              <a href='#1-11-16'>v1.11.16</a>
            </td>
            <td>
              <ul>
                <li>Fixed accidental removal of Metra.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-11-15'>
            <td>
              <a href='#1-11-15'>v1.11.15</a>
            </td>
            <td>
              <ul>
                <li>Added MARTA.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-11-14'>
            <td>
              <a href='#1-11-14'>v1.11.14</a>
            </td>
            <td>
              <ul>
                <li>Removed snowpiercer specific redirect.</li>
                <li>Enabled snowpiercer heading.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-11-13'>
            <td>
              <a href='#1-11-13'>v1.11.13</a>
            </td>
            <td>
              <ul>
                <li>
                  Made <code>/snowpiercer</code> redirect to{" "}
                  <code>/snowpiercer/track/PRCR</code>.
                </li>
                <li>Added links to changelog.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-11-12'>
            <td>
              <a href='#1-11-12'>v1.11.12</a>
            </td>
            <td>
              <ul>
                <li>Added snowpiercer.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-11-11'>
            <td>
              <a href='#1-11-11'>v1.11.11</a>
            </td>
            <td>
              <ul>
                <li>Adjusted map icons and sizes.</li>
                <li>Re-enabled bay area with bugs fixed.</li>
                <li>
                  Fixed text wrapping issues encountered with long station
                  names.
                </li>
              </ul>
            </td>
          </tr>
          <tr id='1-11-10'>
            <td>
              <a href='#1-11-10'>v1.11.10</a>
            </td>
            <td>
              <ul>
                <li>Changed map filtering to work better with merged lines.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-11-9'>
            <td>
              <a href='#1-11-9'>v1.11.9</a>
            </td>
            <td>
              <ul>
                <li>Fixed API page to account for more than one shape type.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-11-8'>
            <td>
              <a href='#1-11-8'>v1.11.8</a>
            </td>
            <td>
              <ul>
                <li>Added "Boris" as a cat option for "Show Cat :3".</li>
                <ul>
                  <li>
                    <a href='/images/boris.jpg' target='__blank'>
                      Picture of real life Boris
                    </a>
                    .
                  </li>
                </ul>
              </ul>
            </td>
          </tr>
          <tr id='1-11-7'>
            <td>
              <a href='#1-11-7'>v1.11.7</a>
            </td>
            <td>
              <ul>
                <li>
                  Hiding inactive routes menu when there are no inactive routes.
                </li>
                <li>
                  Used memoization to partially improve performance on the
                  agency index page.
                </li>
              </ul>
            </td>
          </tr>
          <tr id='1-11-6'>
            <td>
              <a href='#1-11-6'>v1.11.6</a>
            </td>
            <td>
              <ul>
                <li>Minor change to map config.</li>
                <li>Added Amtrak beta (transitstat.us/amtraker)</li>
              </ul>
            </td>
          </tr>
          <tr id='1-11-5'>
            <td>
              <a href='#1-11-5'>v1.11.5</a>
            </td>
            <td>
              <ul>
                <li>Re-enabled previously disabled agencies</li>
              </ul>
            </td>
          </tr>
          <tr id='1-11-4'>
            <td>
              <a href='#1-11-4'>v1.11.4</a>
            </td>
            <td>
              <ul>
                <li>Temporarily Disabled:</li>
                <ul>
                  <li>UNCC</li>
                  <li>UNCG</li>
                  <li>UNCW</li>
                  <li>MIT</li>
                  <li>GA Tech</li>
                </ul>
              </ul>
            </td>
          </tr>
          <tr id='1-11-3'>
            <td>
              <a href='#1-11-3'>v1.11.3</a>
            </td>
            <td>
              <ul>
                <li>Fixed error handling on agency main page.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-11-2'>
            <td>
              <a href='#1-11-2'>v1.11.2</a>
            </td>
            <td>
              <ul>
                <li>Removed loading of unnecessary raster tiles.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-11-1'>
            <td>
              <a href='#1-11-1'>v1.11.1</a>
            </td>
            <td>
              <ul>
                <li>Added background lines for better contrast on the map.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-11-0'>
            <td>
              <a href='#1-11-0'>v1.11.0</a>
            </td>
            <td>
              <ul>
                <li>Replaced map data source.</li>
                <li>Changed map style.</li>
                <li>Added Columbia Univeristy.</li>
                <li>Fixed error logs to be more accurate.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-10-5'>
            <td>
              <a href='#1-10-5'>v1.10.5</a>
            </td>
            <td>
              <ul>
                <li>Added infrastructure to support multi vehicle agencies.</li>
                <li>Began testing on Bay Area integration.</li>
                <li>Extended improvement survey end date.</li>
                <li>Added new years message.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-10-4'>
            <td>
              <a href='#1-10-4'>v1.10.4</a>
            </td>
            <td>
              <ul>
                <li>Kept icons flat with map upon rotation and pitch.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-10-3'>
            <td>
              <a href='#1-10-3'>v1.10.3</a>
            </td>
            <td>
              <ul>
                <li>Added improvement survey.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-10-2'>
            <td>
              <a href='#1-10-2'>v1.10.2</a>
            </td>
            <td>
              <ul>
                <li>Made map attribution slightly shorter.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-10-1'>
            <td>
              <a href='#1-10-1'>v1.10.1</a>
            </td>
            <td>
              <ul>
                <li>Fixed screenshots path in manifest.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-10-0'>
            <td>
              <a href='#1-10-0'>v1.10.0</a>
            </td>
            <td>
              <ul>
                <li>Updated manifest.</li>
                <li>Now yeets service worker on code cache clearing.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-9-5'>
            <td>
              <a href='#1-9-5'>v1.9.5</a>
            </td>
            <td>
              <ul>
                <li>Rolled back map request changes.</li>
                <li>Ensuring data manager is only spawned once.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-9-4'>
            <td>
              <a href='#1-9-4'>v1.9.4</a>
            </td>
            <td>
              <ul>
                <li>
                  Modified setting mentioned in 1.9.3 to remove the line short
                  name, NOT remove all letters.
                </li>
                <li>Testing out a new request method for map tiles.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-9-3'>
            <td>
              <a href='#1-9-3'>v1.9.3</a>
            </td>
            <td>
              <ul>
                <li>
                  Added ability to remove letters from run numbers (currently
                  only for Metra).
                </li>
              </ul>
            </td>
          </tr>
          <tr id='1-9-2'>
            <td>
              <a href='#1-9-2'>v1.9.2</a>
            </td>
            <td>
              <ul>
                <li>Fixed edge case with data manager.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-9-1'>
            <td>
              <a href='#1-9-1'>v1.9.1</a>
            </td>
            <td>
              <ul>
                <li>Began setup for holiday vehicles.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-9-0'>
            <td>
              <a href='#1-9-0'>v1.9.0</a>
            </td>
            <td>
              <ul>
                <li>Added arrows to map.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-8-2'>
            <td>
              <a href='#1-8-2'>v1.8.2</a>
            </td>
            <td>
              <ul>
                <li>Improved constrast with GA Tech colors.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-8-1'>
            <td>
              <a href='#1-8-1'>v1.8.1</a>
            </td>
            <td>
              <ul>
                <li>Removed ads script for better performance.</li>
              </ul>
            </td>
          </tr>
          <tr id='1-8-0'>
            <td>
              <a href='#1-8-0'>v1.8.0</a>
            </td>
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
            <td>
              <a href='#1-7-1'>v1.7.1</a>
            </td>
            <td>
              <ul>
                <li>Added cat mode :3</li>
              </ul>
            </td>
          </tr>
          <tr id='1-7-0'>
            <td>
              <a href='#1-7-0'>v1.7.0</a>
            </td>
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
            <td>
              <a href='#1-6-7'>v1.6.7</a>
            </td>
            <td>
              <ul>
                <li>Added expiration time for alerts system</li>
              </ul>
            </td>
          </tr>
          <tr id='1-6-6'>
            <td>
              <a href='#1-6-6'>v1.6.6</a>
            </td>
            <td>
              <ul>
                <li>Added alerts system</li>
                <li>Replaced favorite lines with favorite agencies</li>
              </ul>
            </td>
          </tr>
          <tr id='1-6-5'>
            <td>
              <a href='#1-6-5'>v1.6.5</a>
            </td>
            <td>
              <ul>
                <li>Fixed GCSU Typo</li>
              </ul>
            </td>
          </tr>
          <tr id='1-6-4'>
            <td>
              <a href='#1-6-4'>v1.6.4</a>
            </td>
            <td>
              <ul>
                <li>Sorted Inactive Routes</li>
                <li>Improved map auto-zoom</li>
                <li>Only show map shapes for selected route</li>
              </ul>
            </td>
          </tr>
          <tr id='1-6-3'>
            <td>
              <a href='#1-6-3'>v1.6.3</a>
            </td>
            <td>
              <ul>
                <li>Fixed ETA sorting</li>
              </ul>
            </td>
          </tr>
          <tr id='1-6-2'>
            <td>
              <a href='#1-6-2'>v1.6.2</a>
            </td>
            <td>
              <ul>
                <li>Fixed 404 error page</li>
              </ul>
            </td>
          </tr>
          <tr id='1-6-1'>
            <td>
              <a href='#1-6-1'>v1.6.1</a>
            </td>
            <td>
              <ul>
                <li>Fixed API docs title</li>
              </ul>
            </td>
          </tr>
          <tr id='1-6-0'>
            <td>
              <a href='#1-6-0'>v1.6.0</a>
            </td>
            <td>
              <ul>
                <li>Added API docs</li>
              </ul>
            </td>
          </tr>
          <tr id='1-5-1'>
            <td>
              <a href='#1-5-1'>v1.5.1</a>
            </td>
            <td>
              <ul>
                <li>Fixed missing line heart</li>
                <li>Removed agency heart</li>
              </ul>
            </td>
          </tr>
          <tr id='1-5-0'>
            <td>
              <a href='#1-5-0'>v1.5.0</a>
            </td>
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
            <td>
              <a href='#1-4-1'>v1.4.1</a>
            </td>
            <td>
              <ul>
                <li>Fixed commented out code</li>
              </ul>
            </td>
          </tr>
          <tr id='1-4-0'>
            <td>
              <a href='#1-4-0'>v1.4.0</a>
            </td>
            <td>
              <ul>
                <li>Increased map max zoom level</li>
                <li>Added saved lines option</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-10'>
            <td>
              <a href='#1-3-10'>v1.3.10</a>
            </td>
            <td>
              <ul>
                <li>Added bus descriptions</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-9'>
            <td>
              <a href='#1-3-9'>v1.3.9</a>
            </td>
            <td>
              <ul>
                <li>Fixed error message typo</li>
                <li>Removed duplicated changelog entry</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-8'>
            <td>
              <a href='#1-3-8'>v1.3.8</a>
            </td>
            <td>
              <ul>
                <li>OK the API actually works this time</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-7'>
            <td>
              <a href='#1-3-7'>v1.3.7</a>
            </td>
            <td>
              <ul>
                <li>OH SHIT OH FUCK GO BACK</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-6'>
            <td>
              <a href='#1-3-6'>v1.3.6</a>
            </td>
            <td>
              <ul>
                <li>Changed API endpoint root for better analytics</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-5'>
            <td>
              <a href='#1-3-5'>v1.3.5</a>
            </td>
            <td>
              <ul>
                <li>More descriptive page titles</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-4'>
            <td>
              <a href='#1-3-4'>v1.3.4</a>
            </td>
            <td>
              <ul>
                <li>Page titles</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-3'>
            <td>
              <a href='#1-3-3'>v1.3.3</a>
            </td>
            <td>
              <ul>
                <li>Minor map popup formatting</li>
                <li>Removed null island vehicles from map auto pan</li>
                <li>Slightly changed header</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-2'>
            <td>
              <a href='#1-3-2'>v1.3.2</a>
            </td>
            <td>
              <ul>
                <li>Added a small bit to the about section</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-1'>
            <td>
              <a href='#1-3-1'>v1.3.1</a>
            </td>
            <td>
              <ul>
                <li>More accurate last updated timestamps</li>
              </ul>
            </td>
          </tr>
          <tr id='1-3-0'>
            <td>
              <a href='#1-3-0'>v1.3.0</a>
            </td>
            <td>
              <ul>
                <li>Added capacities to passio vehicles</li>
              </ul>
            </td>
          </tr>
          <tr id='1-2-4'>
            <td>
              <a href='#1-2-4'>v1.2.4</a>
            </td>
            <td>
              <ul>
                <li>Fixed map last updated timestamp</li>
              </ul>
            </td>
          </tr>
          <tr id='1-2-3'>
            <td>
              <a href='#1-2-3'>v1.2.3</a>
            </td>
            <td>
              <ul>
                <li>Fixed bug in station pages having invalid ETAs</li>
              </ul>
            </td>
          </tr>
          <tr id='1-2-2'>
            <td>
              <a href='#1-2-2'>v1.2.2</a>
            </td>
            <td>
              <ul>
                <li>Fixed bug in station popups having invalid ETAs</li>
              </ul>
            </td>
          </tr>
          <tr id='1-2-1'>
            <td>
              <a href='#1-2-1'>v1.2.1</a>
            </td>
            <td>
              <ul>
                <li>Sorted line names in line selector</li>
              </ul>
            </td>
          </tr>
          <tr id='1-2-0'>
            <td>
              <a href='#1-2-0'>v1.2.0</a>
            </td>
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
            <td>
              <a href='#1-1-4'>v1.1.4</a>
            </td>
            <td>
              <ul>
                <li>Added oopsy poopsy messages</li>
              </ul>
            </td>
          </tr>
          <tr id='1-1-3'>
            <td>
              <a href='#1-1-3'>v1.1.3</a>
            </td>
            <td>
              <ul>
                <li>Fixed missing strings in config</li>
                <li>Slightly modified changelog</li>
              </ul>
            </td>
          </tr>
          <tr id='1-1-2'>
            <td>
              <a href='#1-1-2'>v1.1.2</a>
            </td>
            <td>
              <ul>
                <li>Ensured icons aren't duplicates</li>
              </ul>
            </td>
          </tr>
          <tr id='1-1-1'>
            <td>
              <a href='#1-1-1'>v1.1.1</a>
            </td>
            <td>
              <ul>
                <li>Added proper 404 page</li>
                <li>Made opengraph image professional</li>
              </ul>
            </td>
          </tr>
          <tr id='1-1-0'>
            <td>
              <a href='#1-1-0'>v1.1.0</a>
            </td>
            <td>
              <ul>
                <li>Added everything map</li>
              </ul>
            </td>
          </tr>
          <tr id='1-0-1'>
            <td>
              <a href='#1-0-1'>v1.0.1</a>
            </td>
            <td>
              <ul>
                <li>Added changelog IDs</li>
              </ul>
            </td>
          </tr>
          <tr id='1-0-0'>
            <td>
              <a href='#1-0-0'>v1.0.0</a>
            </td>
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
            <td>
              <a href='#0-10-2'>v0.10.2 Beta</a>
            </td>
            <td>
              <ul>
                <li>Added icons required for PWA</li>
                <li>Fixed manifest</li>
              </ul>
            </td>
          </tr>
          <tr id='0-10-1'>
            <td>
              <a href='#0-10-1'>v0.10.1 Beta</a>
            </td>
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
            <td>
              <a href='#0-10-0'>v0.10.0 Beta</a>
            </td>
            <td>
              <ul>
                <li>Migrated UChicago Shuttles Endpoint</li>
                <li>Migrated Rutgers Shuttles Endpoint</li>
              </ul>
            </td>
          </tr>
          <tr id='0-9-1'>
            <td>
              <a href='#0-9-1'>v0.9.1 Beta</a>
            </td>
            <td>
              <ul>
                <li>Added privacy policy</li>
                <li>Added about page</li>
                <li>Added settings page</li>
              </ul>
            </td>
          </tr>
          <tr id='0-9-0'>
            <td>
              <a href='#0-9-0'>v0.9.0 Beta</a>
            </td>
            <td>
              <ul>
                <li>Implemented limited PWA functionality</li>
                <li>Collapsed inactive lines in selector</li>
              </ul>
            </td>
          </tr>
          <tr id='0-8-0'>
            <td>
              <a href='#0-8-0'>v0.8.0 Beta</a>
            </td>
            <td>
              <ul>
                <li>Added UChicago Shuttles</li>
                <li>Added Rutgers Shuttles</li>
                <li>Used config name scheme for vehicles</li>
              </ul>
            </td>
          </tr>
          <tr id='0-7-1'>
            <td>
              <a href='#0-7-1'>v0.7.1 Beta</a>
            </td>
            <td>
              <ul>
                <li>Adjusted font sizes</li>
              </ul>
            </td>
          </tr>
          <tr id='0-7-0'>
            <td>
              <a href='#0-7-0'>v0.7.0 Beta</a>
            </td>
            <td>
              <ul>
                <li>Added timestamps to predictions</li>
              </ul>
            </td>
          </tr>
          <tr id='0-6-3'>
            <td>
              <a href='#0-6-3'>v0.6.3 Beta</a>
            </td>
            <td>
              <ul>
                <li>Fixed map navigation</li>
                <li>Added default map viewpoints</li>
              </ul>
            </td>
          </tr>
          <tr id='0-6-1'>
            <td>
              <a href='#0-6-1'>v0.6.1 Beta</a>
            </td>
            <td>
              <ul>
                <li>Added map controls</li>
                <li>Added south shore line</li>
              </ul>
            </td>
          </tr>
          <tr id='0-6-0'>
            <td>
              <a href='#0-6-0'>v0.6.0 Beta</a>
            </td>
            <td>
              <ul>
                <li>Added map</li>
              </ul>
            </td>
          </tr>
          <tr id='0-5-4'>
            <td>
              <a href='#0-5-4'>v0.5.4 Beta</a>
            </td>
            <td>
              <ul>
                <li>Accounted for trains/buses not existing</li>
                <li>Fixed minor CSS bugs</li>
              </ul>
            </td>
          </tr>
          <tr id='0-5-1'>
            <td>
              <a href='#0-5-1'>v0.5.1 Beta</a>
            </td>
            <td>
              <ul>
                <li>Ported over Amtraker error handling</li>
              </ul>
            </td>
          </tr>
          <tr id='0-5-0'>
            <td>
              <a href='#0-5-0'>v0.5.0 Beta</a>
            </td>
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
            <td>
              <a href='#0-4-0'>v0.4.0 Beta</a>
            </td>
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
