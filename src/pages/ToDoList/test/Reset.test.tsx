import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ToDoList from '..';

test('The reset all button does exist and works as expected', async () => {
  render(<ToDoList />);
  const resetBtn = screen.getByRole('button', { name: /Reset/i });
  fireEvent.click(resetBtn);

  const inputs = screen.getAllByRole('textbox');
  const filteredInputs = inputs.filter((input: HTMLElement) => (input as HTMLInputElement).placeholder !== 'Search');

  await waitFor(() => {
    expect(filteredInputs).toHaveLength(0);
  });
});