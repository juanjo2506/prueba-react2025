import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Consume from '../components/Consume'


describe('Consume Component', () => {
    it('Should render correctly', () => {
        const { getByTestId } = render(<Consume />);
        expect(getByTestId('container')).toBeInTheDocument();
    })

    it('Should renders title and graphic container', () => {
        const { getByText, getByTestId } = render(<Consume />);
        expect(getByText('Consume Energy')).toBeInTheDocument();
        expect(getByTestId('chart')).toBeInTheDocument();
    });

    it('Should renders legend items.', async () => {
        const { getByTestId } = render(<Consume />);
        await waitFor(() => getByTestId('chart'));
        const chart = getByTestId('chart');
        expect(chart).toHaveAttribute('width', '800');
        expect(chart).toHaveAttribute('height', '400');
    });

    it('Should calls useEffect when svgRef changes.', () => {
        const useEffectSpy = jest.spyOn(React, 'useEffect');
        const { rerender } = render(<Consume />);
        rerender(<Consume />);
        expect(useEffectSpy).toHaveBeenCalledTimes(2);
    })
})