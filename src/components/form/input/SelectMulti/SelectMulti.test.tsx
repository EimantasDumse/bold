import * as React from 'react'
import { cleanup, fireEvent, render } from 'react-testing-library'

import { withTheme } from '../../../../test'
import { DefaultItemType } from '../Select/Select'
import { SelectMulti } from '../SelectMulti'

import { SelectMultiProps } from './SelectMulti'

const items: DefaultItemType[] = [
    { value: 1, label: 'Apple' },
    { value: 2, label: 'Banana' },
    { value: 3, label: 'Grape' },
    { value: 4, label: 'Orange' },
    { value: 5, label: 'Pear' },
]

// tslint:disable jsx-no-lambda
const createSelect = (props: Partial<SelectMultiProps> = {}) => {
    return withTheme(
        <SelectMulti items={items} itemToString={item => item.label} {...props} />
    )
}

afterEach(cleanup)

it('should render correctly when closed', () => {
    const { container } = render(createSelect())
    expect(container).toMatchSnapshot()
})

it('should render correctly when opened', () => {
    const { container } = render(createSelect({ isOpen: true }))
    expect(container).toMatchSnapshot()
})

it('should accept value prop', () => {
    const { queryAllByText } = render(createSelect({ value: [items[0], items[4]] }))
    expect(queryAllByText(items[0].label, { selector: 'span' }).length).toEqual(1)
    expect(queryAllByText(items[1].label, { selector: 'span' }).length).toEqual(0)
    expect(queryAllByText(items[4].label, { selector: 'span' }).length).toEqual(1)
})

it('should open the select menu when input is focused', () => {
    const { container } = render(createSelect())
    expect(container.querySelector('ul')).toBeFalsy()
    fireEvent.focus(container.querySelector('input'))
    expect(container.querySelector('ul')).toBeTruthy()
})

it('should call the onChange event when an item is clicked', () => {
    const onChange = jest.fn()
    const { getByText } = render(createSelect({ onChange, isOpen: true }))
    expect(onChange).not.toHaveBeenCalled()
    fireEvent.click(getByText(items[2].label))
    expect(onChange).toHaveBeenLastCalledWith([items[2]], expect.anything())
    fireEvent.click(getByText(items[4].label))
    expect(onChange).toHaveBeenLastCalledWith([items[2], items[4]], expect.anything())
})

describe('remove item', () => {
    it('should call onChange with the new value', () => {
        const onChange = jest.fn()
        const { container } = render(createSelect({ onChange, isOpen: true, value: [items[0], items[1]] }))
        fireEvent.click(container.querySelectorAll('span[title="Remover"]')[0])
        expect(onChange).toHaveBeenLastCalledWith([items[1]], expect.anything())
    })
    it('should not focus nor toggle the menu opened state', () => {
        const { container } = render(createSelect({ value: [items[0]] }))
        const menu = container.querySelector('ul')
        const input = container.querySelector('input')

        expect(menu).toBeFalsy()
        fireEvent.click(container.querySelectorAll('span[title="Remover"]')[0])
        expect(menu).toBeFalsy()

        expect(document.activeElement).not.toEqual(input)
    })
})
