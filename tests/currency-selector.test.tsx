import React from 'react'
import { expect, describe, it, beforeEach, vi } from 'vitest'
import { CurrencySelector } from '../src/currency-selector'
import { render, screen, act } from '@testing-library/react';

const currencies = [
  { id: "1", name: "USD" },
  { id: "2", name: "EUR" },
  { id: "3", name: "GBP" },
  { id: "4", name: "JPY" },
  { id: "5", name: "CAD" },
  { id: "6", name: "AUD" },
  { id: "7", name: "CHF" },
  { id: "8", name: "CNY" },
  { id: "9", name: "SEK" },
];

describe('CurrencySelector', () => {
  const defaultRender = () => {
    render(<CurrencySelector
      currencies={currencies}
    />)
  }

  it('should render', () => {
    defaultRender()

    expect(screen.getByTestId('currency-selector')).toBeDefined()
  })

  it('should render 9 currencies', () => {
    defaultRender()

    expect(screen.getAllByTestId('currency-item', { exact: false })).toHaveLength(9)

    const currencyItems = screen.getAllByTestId('currency-item', { exact: false })

    currencyItems.forEach((currencyItem, index) => {
      expect(currencyItem).toHaveTextContent(currencies[index].name)
    })
  })

  it('should select currency on click', () => {
    defaultRender()

    act(() => {
      screen.getAllByTestId('currency-item', { exact: false })[0].click()
    })

    expect(
      screen.getByTestId('selected-currency', { exact: false })
    ).toHaveTextContent(currencies[0].name)
  })

  it('should be able to select multiple currencies', () => {
    defaultRender()

    const currencyItems = screen.getAllByTestId('currency-item', { exact: false })

    act(() => {
      currencyItems
        .forEach((currencyItem) => currencyItem.click())
    })

    const selectedItems = screen.getAllByTestId('selected-currency', { exact: false })

    expect(selectedItems).toHaveLength(9)

    selectedItems.forEach((selectedItem, index) => {
      expect(selectedItem).toHaveTextContent(currencies[index].name)
    })
  })

  it('should be able to deselect currency through X button', () => {
    defaultRender()

    const currencyItems = screen.getAllByTestId('currency-item', { exact: false })

    act(() => {
      currencyItems[0].click()
    })

    expect(
      screen.getByTestId('selected-currency', { exact: false })
    ).toHaveTextContent(currencies[0].name)

    act(() => {
      screen.getByTestId('close-selected', { exact: false }).click()
    })

    expect(
      screen.queryByTestId('selected-currency', { exact: false })
    ).toBeNull()
  })

  it('should be able to deselect multiple currencies through X button', () => {
    defaultRender()

    const currencyItems = screen.getAllByTestId('currency-item', { exact: false })

    act(() => {
      currencyItems.forEach((currencyItem) => currencyItem.click())
    })

    const selectedItems = screen.getAllByTestId('selected-currency', { exact: false })

    expect(selectedItems).toHaveLength(9)

    const closeBtns = screen.getAllByTestId('close-selected', { exact: false })

    closeBtns.forEach((closeBtn, index) => {
      act(() => {
        closeBtn.click()
      })

      expect(
        screen.queryByTestId(`selected-currency-${index}`)
      ).toBeNull()
    })

    expect(
      screen.queryAllByTestId('selected-currency', { exact: false })
    ).toHaveLength(0)
  })

  it('should be able to deselect currency through currency item', () => {
    defaultRender()

    const currencyItems = screen.getAllByTestId('currency-item', { exact: false })

    act(() => {
      currencyItems[0].click()
    })

    expect(
      screen.getByTestId('selected-currency', { exact: false })
    ).toHaveTextContent(currencies[0].name)

    act(() => {
      currencyItems[0].click()
    })

    expect(
      screen.queryByTestId('selected-currency', { exact: false })
    ).toBeNull()
  })

  it('should be able to deselect multiple currencies through currency items', () => {
    defaultRender()

    const currencyItems = screen.getAllByTestId('currency-item', { exact: false })

    act(() => {
      currencyItems.forEach((currencyItem) => currencyItem.click())
    })

    const selectedItems = screen.getAllByTestId('selected-currency', { exact: false })

    expect(selectedItems).toHaveLength(9)

    currencyItems.forEach((currencyItem, index) => {
      act(() => {
        currencyItem.click()
      })

      expect(
        screen.queryByTestId(`selected-currency-${index}`)
      ).toBeNull()
    })

    expect(
      screen.queryAllByTestId('selected-currency', { exact: false })
    ).toHaveLength(0)
  })

  it('should call onChange upon selecting currency', () => {
    const onChange = vi.fn()

    render(<CurrencySelector
      currencies={currencies}
      onChange={onChange}
    />)

    const currencyItems = screen.getAllByTestId('currency-item', { exact: false })

    act(() => {
      currencyItems[0].click()
    })

    expect(onChange).toHaveBeenCalledWith([currencies[0]])
  })

  it('should call onChange upon deselecting currency through currency item', () => {
    const onChange = vi.fn()

    render(<CurrencySelector
      currencies={currencies}
      onChange={onChange}
    />)

    const currencyItems = screen.getAllByTestId('currency-item', { exact: false })

    act(() => {
      currencyItems[0].click()
    })

    expect(onChange).toHaveBeenCalledWith([currencies[0]])

    act(() => {
      currencyItems[0].click()
    })

    expect(onChange).toHaveBeenCalledWith([])
  })

  it('should call onChange upon deselecting currency through X button', () => {
    const onChange = vi.fn()

    render(<CurrencySelector
      currencies={currencies}
      onChange={onChange}
    />)

    const currencyItems = screen.getAllByTestId('currency-item', { exact: false })

    act(() => {
      currencyItems[0].click()
    })

    expect(onChange).toHaveBeenCalledWith([currencies[0]])

    act(() => {
      screen.getByTestId('close-selected', { exact: false }).click()
    })

    expect(onChange).toHaveBeenCalledWith([])
  })

  it('should call onSelect upon selecting currency', () => {
    const onSelect = vi.fn()

    render(<CurrencySelector
      currencies={currencies}
      onSelect={onSelect}
    />)

    const currencyItems = screen.getAllByTestId('currency-item', { exact: false })

    act(() => {
      currencyItems[0].click()
    })

    expect(onSelect).toHaveBeenCalledWith(currencies[0])
  })

  it('should not call onSelect upon deselecting currency', () => {
    const onSelect = vi.fn()

    render(<CurrencySelector
      currencies={currencies}
      onSelect={onSelect}
    />)

    const currencyItems = screen.getAllByTestId('currency-item', { exact: false })

    act(() => {
      currencyItems[0].click()
    })

    expect(onSelect).toHaveBeenCalledWith(currencies[0])

    act(() => {
      currencyItems[0].click()
    })

    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('should call onDeselect upon deselecting currency through currency item', () => {
    const onDeselect = vi.fn()

    render(<CurrencySelector
      currencies={currencies}
      onDeselect={onDeselect}
    />)

    const currencyItems = screen.getAllByTestId('currency-item', { exact: false })

    act(() => {
      currencyItems[0].click()
    })

    expect(onDeselect).toHaveBeenCalledTimes(0)

    act(() => {
      currencyItems[0].click()
    })

    expect(onDeselect).toHaveBeenCalledWith(currencies[0])
  })

  it('should call onDeselect upon deselecting currency through X button', () => {
    const onDeselect = vi.fn()

    render(<CurrencySelector
      currencies={currencies}
      onDeselect={onDeselect}
    />)

    const currencyItems = screen.getAllByTestId('currency-item', { exact: false })

    act(() => {
      currencyItems[0].click()
    })

    expect(onDeselect).toHaveBeenCalledTimes(0)

    act(() => {
      screen.getByTestId('close-selected', { exact: false }).click()
    })

    expect(onDeselect).toHaveBeenCalledWith(currencies[0])
  })
})
