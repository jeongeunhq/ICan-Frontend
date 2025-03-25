import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { act, waitFor, render, screen } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GoalHeader from '@/components/goalDetail/GoalHeader';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';

const mockUpdate = jest.fn();
const mockDelete = jest.fn();

jest.mock('@/hooks/useGoals', () => ({
  useGoals: jest.fn(() => ({
    data: [
      {
        goalId: 1,
        title: '테스트 목표',
        color: 'goal01',
      },
    ],
    isLoading: false,
  })),
  useUpdateGoal: jest.fn(() => ({
    mutate: mockUpdate,
  })),
  useDeleteGoal: jest.fn(() => ({
    mutate: mockDelete,
  })),
}));

jest.mock('@/hooks/useClickOutside', () => ({
  useClickOutside: jest.fn(() => [null]),
}));

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('GoalHeader', () => {
  const setup = () =>
    renderWithClient(<GoalHeader id="1" setGoalAvailable={() => {}} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('목표 제목이 렌더링된다', () => {
    setup();
    expect(screen.getByText('테스트 목표')).toBeInTheDocument();
  });

  it('목표 수정 버튼 클릭 시 input으로 전환된다', async () => {
    setup();
    const editBtn = screen.getByRole('button', { name: /목표 수정/i });
    await userEvent.click(editBtn);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('제목과 색상 수정 후 저장 시 useUpdateGoal이 호출된다', async () => {
    setup();

    const editBtn = screen.getByRole('button', { name: /목표 수정/i });
    await userEvent.click(editBtn);

    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, '새 제목');

    const newColorButton = await screen.findByLabelText('색상 변경: goal02');
    await act(async () => {
      await userEvent.click(newColorButton);
    });

    const saveBtn = screen.getByRole('button', { name: /수정 완료/i });
    await userEvent.click(saveBtn);
    await waitFor(() =>
      expect(mockUpdate).toHaveBeenCalledWith({
        goalId: 1,
        updatedFields: {
          title: '새 제목',
          color: 'goal02',
        },
      }),
    );
  });

  it('삭제 버튼 클릭 시 모달이 나타난다', async () => {
    setup();
    const deleteBtn = screen.getByLabelText(/삭제/i);
    await userEvent.click(deleteBtn);
    expect(
      screen.getByText(/해당 목표를 삭제 하시겠어요/i),
    ).toBeInTheDocument();
  });
});
