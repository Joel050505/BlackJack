export default function WinningModal({winner, onClose}) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Game Over</h2>
        <p>{winner} wins!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
