export default function ProductModal({ product, onClose }) {
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p>Price: ${product.price}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
