import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Accordion from './Accordion';

describe('Accordion', () => {
    it('should render the Accordion component', () => {
        render(<Accordion title="Accordion Title" selectUser={() => {}} />);
        const accordionItem = screen.getByTestId('accordion-item');
        expect(accordionItem).toBeInTheDocument();
    });

    it('should call selectUser when clicking the accordion header', () => {
        const selectUserMock = jest.fn();
        render(<Accordion title="Accordion Title" selectUser={selectUserMock} />);
        const accordionHeader = screen.getByText('Accordion Title');
        act(() => {
            accordionHeader.click();
        });
        expect(selectUserMock).toHaveBeenCalledTimes(1);
        expect(selectUserMock).toHaveBeenCalledWith('Accordion Title');
    });
});
