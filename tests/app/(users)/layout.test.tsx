import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardLayout from '@/app/(users)/layout';

describe('DashboardLayout', () => {
  it('shouldRenderSingleChildElement', () => {
    render(
      <DashboardLayout>
        <div data-testid="single-child">Hello</div>
      </DashboardLayout>
    );
    expect(screen.getByTestId('single-child')).toHaveTextContent('Hello');
  });

  it('shouldRenderMultipleChildrenElements', () => {
    render(
      <DashboardLayout>
        <div data-testid="child-1">First</div>
        <span data-testid="child-2">Second</span>
      </DashboardLayout>
    );
    expect(screen.getByTestId('child-1')).toHaveTextContent('First');
    expect(screen.getByTestId('child-2')).toHaveTextContent('Second');
  });

  it('shouldPreserveChildrenPropsAndStructure', () => {
    const ChildComponent = ({ label }: { label: string }) => (
      <button data-testid="child-btn" aria-label={label}>{label}</button>
    );
    render(
      <DashboardLayout>
        <ChildComponent label="ClickMe" />
      </DashboardLayout>
    );
    const btn = screen.getByTestId('child-btn');
    expect(btn).toHaveAttribute('aria-label', 'ClickMe');
    expect(btn).toHaveTextContent('ClickMe');
  });

  it('shouldHandleNullOrUndefinedChildren', () => {
    const { container: nullContainer } = render(
      <DashboardLayout>{null}</DashboardLayout>
    );
    expect(nullContainer).toBeDefined();
    expect(nullContainer).toBeEmptyDOMElement();

    const { container: undefinedContainer } = render(
      <DashboardLayout>{undefined}</DashboardLayout>
    );
    expect(undefinedContainer).toBeDefined();
    expect(undefinedContainer).toBeEmptyDOMElement();
  });

  it('shouldRenderWithEmptyArrayChildren', () => {
    const { container } = render(
      <DashboardLayout>{[]}</DashboardLayout>
    );
    expect(container).toBeDefined();
    expect(container).toBeEmptyDOMElement();
  });

  it('shouldRenderPrimitiveChildren', () => {
    const { rerender } = render(
      <DashboardLayout>42</DashboardLayout>
    );
    expect(screen.getByText('42')).toBeInTheDocument();

    rerender(
      <DashboardLayout>Hello world</DashboardLayout>
    );
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });
});