import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Costs from '../components/Costs'

describe('Costs Component', () => {
    it('Should render correctly', () => {
        const { getByTestId } = render(<Costs />);
        expect(getByTestId('container')).toBeInTheDocument();
    })

    it('Should renders title and graphic container', () => {
        const { getByText, getByTestId } = render(<Costs />);
        expect(getByText('Costs Energy')).toBeInTheDocument();
        expect(getByTestId('chart')).toBeInTheDocument();
    });

    it('Should renders legend items.', async () => {
        const { getByTestId } = render(<Costs />);
        await waitFor(() => getByTestId('chart'));
        const chart = getByTestId('chart');
        expect(chart).toHaveAttribute('width', '800');
        expect(chart).toHaveAttribute('height', '400');
    });

    it('Should calls useEffect when svgRef changes.', () => {
        const useEffectSpy = jest.spyOn(React, 'useEffect');
        const { rerender } = render(<Costs />);
        rerender(<Costs />);
        expect(useEffectSpy).toHaveBeenCalledTimes(2);
    })
})