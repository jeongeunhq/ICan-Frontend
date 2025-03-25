// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen } from '@testing-library/react';
import GoalProgress from '@/components/goalDetail/GoalProgress';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';

// Framer Motion Mock 추가
jest.mock('framer-motion', () => ({
  motion: {
    // eslint-disable-next-line react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('GoalProgress', () => {
  const mockColor = {
    100: '#F3F4F6',
    DEFAULT: '#3B82F6',
  };

  it('진행률 텍스트와 퍼센트가 올바르게 렌더링된다', () => {
    render(<GoalProgress doneItems={3} todoItems={10} color={mockColor} />);

    expect(screen.getByText('23%')).toBeInTheDocument();

    expect(
      screen
        .getAllByText((content, element) => element?.textContent === '3/13')
        .some((el) => el.textContent === '3/13'),
    ).toBe(true);

    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('진행률이 0일 때도 정상 렌더링된다', () => {
    render(<GoalProgress doneItems={0} todoItems={0} color={mockColor} />);

    expect(screen.getByText('0%')).toBeInTheDocument();

    expect(
      screen.queryAllByText(
        (content, element) => element?.textContent === '0/0',
      ).length,
    ).toBeGreaterThan(0);
  });

  it('진행률 bar 색상이 전달된 color.DEFAULT와 일치한다', () => {
    render(<GoalProgress doneItems={5} todoItems={5} color={mockColor} />);

    const progressBar = screen.getByTestId('progress-bar');
    const computedStyle = window.getComputedStyle(progressBar);

    expect(computedStyle.backgroundColor).toBe('rgb(59, 130, 246)');
    expect(parseFloat(computedStyle.width)).toBeGreaterThan(0);
  });
});
