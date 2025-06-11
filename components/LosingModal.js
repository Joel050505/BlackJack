export default function LosingModal({onClose}) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>You lost!</h2>
        <p>Better luck next time!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
