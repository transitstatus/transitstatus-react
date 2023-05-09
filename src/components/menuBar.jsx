const MenuBar = () => {
  return (
    <div className='header'>
      <h2
        onClick={() => {
          if (history.state.idx && history.state.idx > 0) {
            navigate(-1);
          } else {
            navigate("/", { replace: true }); //fallback
          }
        }}
        className='click'
      >
        Back
      </h2>
    </div>
  );
};

export default MenuBar;