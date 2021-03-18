export function Header({ title }) {
  return (
    <div className="flex justify-content-start">
      <h2>{title}</h2>
    </div>
  );
}

export function Content({ message }) {
  return (
    <div className="dialog-content-subContainer  flex justify-content-start column margin-box">
      <span>{message}</span>
    </div>
  );
}

export function Footer({ handleRemoveItem, isSubmitting, label, title, id }) {
  const btnStyle = isSubmitting ? "cursor-not-allowed" : "warning";
  console.log({ id });
  function onClick() {
    handleRemoveItem({ title, id });
  }
  return (
    <div className="flex justify-content-end">
      <button
        className={btnStyle}
        onClick={onClick}
        disabled={isSubmitting}
        style={isSubmitting ? { background: "#ff6760" } : {}}
      >
        {label}
      </button>
    </div>
  );
}

export const WarningDialog = {
  Header,
  Content,
  Footer
};
