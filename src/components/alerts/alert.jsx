const Alert = ({ alert }) => {

  return <details>
    <summary
      style={{
        padding: "4px 6px",
        fontSize: "1rem",
        backgroundColor: "#444",
      }}
    >
      {alert.title}
    </summary>
    <div
      className='routes'
      style={{
        marginTop: "4px",
      }}
    >
      <div style={{
        padding: '4px 6px',
        backgroundColor: '#333',
      }}>{alert.message}</div>
    </div>
  </details>

  return <>I am an alert!</>
};

export default Alert;