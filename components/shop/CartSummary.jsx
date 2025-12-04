export default function CartSummary({ products }) {
  const items = products.filter((p) => p.inCart);

  const totalPrice = items.reduce((sum, p) => sum + p.price, 0).toFixed(2);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Cart Summary</h2>

      {items.length === 0 && <p>No items in cart.</p>}

      <ul className="space-y-2 mb-4">
        {items.map((item) => (
          <li key={item.id} className="text-sm">
            {item.name} — £{item.price}
          </li>
        ))}
      </ul>

      <p className="font-medium">Total items: {items.length}</p>
      <p className="font-medium">Total price: £{totalPrice}</p>
    </div>
  );
}
