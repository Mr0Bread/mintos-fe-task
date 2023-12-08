import { CurrencySelector } from "./currency-selector";

function App() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
    >
      <CurrencySelector
        currencies={[
          { id: "1", name: "USD" },
          { id: "2", name: "EUR" },
          { id: "3", name: "GBP" },
          { id: "4", name: "JPY" },
          { id: "5", name: "CAD" },
          { id: "6", name: "AUD" },
          { id: "7", name: "CHF" },
          { id: "8", name: "CNY" },
          { id: "9", name: "SEK" },
        ]}
        onChange={(currencies) => console.log(currencies)}
        onSelect={(currency) => console.log('Selected', currency)}
        onDeselect={(currency) => console.log('Deselected', currency)}
      />
    </div>
  );
}

export default App
