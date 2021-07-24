const Footer = () => {
  return (
    <div
      className="w-100 text-muted py-3 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#0B1641", minHeight: "10vh" }}
    >
      <span className="text-center">
        copyright © 2021 Trinity finance
        <small
          className="d-block mt-2"
          style={{
            lineHeight: "1.25em",
            fontWeight: 300,
          }}
        >
          Rug pull hater. Made with ❤️
        </small>
      </span>
    </div>
  );
};

export default Footer;
