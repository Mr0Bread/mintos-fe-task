import { useState } from "react";

type CurrencyEntity = {
  id: string
  name: string
};

function SelectedCurrency(props: {
  currency: CurrencyEntity,
  onCloseClick: (id: string) => void
}) {
  return (
    <div
      className="bg-slate-200 p-3 rounded relative"
      data-testid={`selected-currency-${props.currency.id}`}
    >
      {props.currency.name}
      <button
        className="absolute -top-[10px] -right-[10px] w-6 h-6 rounded-full border border-1 leading-none bg-slate-600 text-white shadow-[0px_0px_0px_3px_white] hover:bg-white hover:text-slate-600 hover:border-slate-600"
        onClick={() => props.onCloseClick(props.currency.id)}
        data-testid={`close-selected-${props.currency.id}`}
      >
        X
      </button>
    </div>
  );
}

/**
 * @param props - Component props
 * @param props.currencies - List of currencies to select from
 * @param props.onChange - Callback when the selected currencies change. Called with the list of selected currencies.
 * @param props.onSelect - Callback when a currency is selected. Called with the selected currency.
 * @param props.onDeselect - Callback when a currency is deselected. Called with the deselected currency.
 */
export function CurrencySelector(props: {
  currencies: CurrencyEntity[]
  onChange?: (currencies: CurrencyEntity[]) => void
  onSelect?: (currency: CurrencyEntity) => void
  onDeselect?: (currency: CurrencyEntity) => void
}) {
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);

  const changeCurrencies = (currencies: string[]) => {
    const isAdding = currencies.length > selectedCurrencies.length;
    setSelectedCurrencies(currencies);
    props.onChange?.(props.currencies.filter((currency) => currencies.includes(currency.id)));

    if (isAdding) {
      props.onSelect?.(props.currencies.find((currency) => !selectedCurrencies.includes(currency.id))!);
    } else {
      props.onDeselect?.(props.currencies.find((currency) => !currencies.includes(currency.id))!);
    }
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      changeCurrencies([...selectedCurrencies, event.target.id]);
    } else {
      changeCurrencies(selectedCurrencies.filter((id) => id !== event.target.id));
    }
  }

  return (
    <div
      className="flex flex-col items-center"
      data-testid="currency-selector"
    >
      <div
        className="w-full grid grid-cols-3 mb-4 gap-4"
      >
        {selectedCurrencies.map((id) => (
          <SelectedCurrency
            key={id}
            currency={props.currencies.find((currency) => currency.id === id)!}
            onCloseClick={(id) => changeCurrencies(selectedCurrencies.filter((currencyId) => currencyId !== id))}
          />
        ))}
      </div>
      <div
        className="grid grid-cols-3 gap-4"
      >
        {props.currencies.map((currency) => (
          <label
            className="border border-gray-300 rounded-md p-4 cursor-pointer hover:bg-slate-200 transition-colors"
            key={currency.id}
            data-testid={`currency-item-${currency.id}`}
          >
            <input
              type="checkbox"
              id={currency.id}
              key={currency.id}
              checked={selectedCurrencies.includes(currency.id)}
              className="mr-3"
              onChange={onChange}
            />
            {currency.name}
          </label>
        ))}
      </div>
    </div>
  );
}
