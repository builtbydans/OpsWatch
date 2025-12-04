export default function ProductList({ products, onAddToCart }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Products</h2>

      <ul className="space-y-3">
        {products.map((product) => (
          <li
            key={product.id}
            className="p-3 border rounded flex justify-between items-center"
          >
            <div>
              <p>{product.name}</p>
              <p className="text-sm opacity-70">£{product.price}</p>
            </div>

            <button
              className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
              onClick={() => onAddToCart(product)}
            >
              {product.inCart ? "Remove From Cart" : "Add to Cart"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
