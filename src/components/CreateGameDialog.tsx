export function Header() {
  return (
    <div className="flex justify-content-start">
      <h2>Add Game</h2>
    </div>
  );
}

export function Content({ onChangeField, createFields }) {
  return (
    <div className="dialog-content-subContainer  flexContainer column">
      <div className="margin-box">
        <input
          type="text"
          name="title"
          className="input"
          onChange={onChangeField}
          value={createFields.title}
          placeholder="Enter Title"
        />
      </div>
      <div className="margin-box">
        <textarea
          name="description"
          className="input textarea"
          onChange={onChangeField}
          value={createFields.description}
          placeholder="Enter Description"
        />
      </div>
      <div className="margin-box flex justify-content-start">
        <input
          type="checkbox"
          value={createFields.isFavorite}
          name="isFavorite"
          onChange={onChangeField}
        />
        <span>Add to favorites?</span>
      </div>
    </div>
  );
}

export function Footer({ handleSave, isSubmitting }) {
  const btnStyle = isSubmitting ? "cursor-not-allowed" : "button";
  const label = isSubmitting ? "Saving..." : "Save";
  return (
    <div className="flex justify-content-end">
      <button className={btnStyle} onClick={handleSave} disabled={isSubmitting}>
        {label}
      </button>
    </div>
  );
}

export const CreateGameDialog = {
  Header,
  Content,
  Footer
};
