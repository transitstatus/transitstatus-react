import { useNavigate } from "react-router-dom";

const Changelog = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Changelog</h1>
      <table>
        <thead>
          <tr>
            <th>Version</th>
            <th>Changes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1.0.0</td>
            <td>
              <ul>
                <li>Fixed manifest short name</li>
                <li>Improved home page layout</li>
                <li>Added station favorites</li>
                <li>Added changelog page</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>0.10.2 Beta</td>
            <td>
              <ul>
                <li>Added icons required for PWA</li>
                <li>Fixed manifest</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>0.10.1 Beta</td>
            <td>
              <ul>
                <li>Added Georgia Collegee & State Shuttles</li>
                <li>Added Georgia State Shuttles</li>
                <li>Added Georgia Tech Shuttles</li>
                <li>Added Georgia Southern Shuttles</li>
                <li>Added MIT Shuttles</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>0.10.0 Beta</td>
            <td>
              <ul>
                <li>Migrated UChicago Shuttles Endpoint</li>
                <li>Migrated Rutgers Shuttles Endpoint</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>0.9.1 Beta</td>
            <td>
              <ul>
                <li>Added privacy policy</li>
                <li>Added about page</li>
                <li>Added settings page</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>0.9.0 Beta</td>
            <td>
              <ul>
                <li>Implemented limited PWA functionality</li>
                <li>Collapsed inactive lines in selector</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>0.8.0 Beta</td>
            <td>
              <ul>
                <li>Added UChicago Shuttles</li>
                <li>Added Rutgers Shuttles</li>
                <li>Used config name scheme for vehicles</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>0.7.1 Beta</td>
            <td>
              <ul>
                <li>Adjusted font sizes</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>0.7.0 Beta</td>
            <td>
              <ul>
                <li>Added timestamps to predictions</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>0.6.3 Beta</td>
            <td>
              <ul>
                <li>Fixed map navigation</li>
                <li>Added default map viewpoints</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>0.6.1 Beta</td>
            <td>
              <ul>
                <li>Added map controls</li>
                <li>Added south shore line</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>0.6.0 Beta</td>
            <td>
              <ul>
                <li>Added map</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>0.5.4 Beta</td>
            <td>
              <ul>
                <li>Accounted for trains/buses not existing</li>
                <li>Fixed minor CSS bugs</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>0.5.1 Beta</td>
            <td>
              <ul>
                <li>Ported over Amtraker error handling</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>0.5.1 Beta</td>
            <td>
              <ul>
                <li>Ported over Amtraker error handling</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>0.5.0 Beta</td>
            <td>
              <ul>
                <li>Added support for multiple agencies</li>
                <li>Improved config options</li>
                <li>Minor text formatting changes</li>
                <li>Added Metra</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>0.4.0 Beta</td>
            <td>
              <ul>
                <li>Initial Release</li>
                <li>Added CTA Trains</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
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

export default Changelog;
