import * as React from 'react'
import { cleanup, fireEvent, render } from 'react-testing-library'

import { withTheme } from '../../../../test'

import { MonthPicker } from './MonthPicker'

afterEach(cleanup)

const now = new Date()

describe('MonthPicker', () => {
    it('should render correctly with month and year', () => {
        const { container } = render(withTheme(
            <MonthPicker
                month={new Date().getMonth()}
                year={new Date().getFullYear()}
            />))
        expect(container).toMatchSnapshot()
    })

    it('should change de visible year on "Ano anterior" button click', () => {
        const { getByTitle, getAllByText } = render(withTheme(
            <MonthPicker
                month={now.getMonth()}
                year={now.getFullYear()}
            />))
        fireEvent.click(getByTitle('Ano anterior'))
        const expectedYear = now.getFullYear() - 1
        expect(getAllByText(expectedYear.toString())).toHaveLength(1)
    })

    it('should change de visible year on "Ano posterior" button click', () => {
        const { getByTitle, getAllByText } = render(withTheme(
            <MonthPicker
                month={now.getMonth()}
                year={now.getFullYear()}
            />))
        fireEvent.click(getByTitle('Ano posterior'))
        const expectedYear = now.getFullYear() + 1
        expect(getAllByText(expectedYear.toString())).toHaveLength(1)
    })

    it('should call "onChange" when a month is selected', () => {
        const onChange = jest.fn()
        const { getByText } = render(withTheme(
            <MonthPicker
                month={now.getMonth()}
                year={now.getFullYear()}
                onChange={onChange}
            />))
        fireEvent.click(getByText('Jan'))
        expect(onChange).toHaveBeenCalledWith(new Date(now.getFullYear(), now.getMonth()))
    })

    it('should call "onChange" when a month is selected, with the given year', () => {
        const onChange = jest.fn()
        const { getByText, getByTitle } = render(withTheme(
            <MonthPicker
                month={now.getMonth()}
                year={now.getFullYear()}
                onChange={onChange}
            />))
        fireEvent.click(getByTitle('Ano anterior'))
        fireEvent.click(getByText('Jan'))
        const expectedYear = now.getFullYear() - 1
        expect(onChange).toHaveBeenCalledWith(new Date(expectedYear, now.getMonth()))
    })

    it('should fill the prop year if non is given', () => {
        const { rerender, getAllByText } = render(withTheme(
            <MonthPicker
                month={now.getMonth()}
                year={now.getFullYear()}
            />))

        rerender(withTheme(
            <MonthPicker
                month={now.getMonth()}
            />))
        expect(getAllByText(new Date().getFullYear().toString())).toHaveLength(1)
    })

    it('should change the visible year on re-render', () => {
        const { rerender, getAllByText } = render(withTheme(
            <MonthPicker
                month={now.getMonth()}
            />))

        const newYear = now.getFullYear() + 1

        rerender(withTheme(
            <MonthPicker
                month={now.getMonth()}
                year={newYear}
            />))
        expect(getAllByText(newYear.toString())).toHaveLength(1)
    })

})
