import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ToDoList from '..';

// Sort
test('Sort with 5 input non-empty elements', async () => {
  render(<ToDoList />);

  const addBtn = screen.getByRole('button', { name: /add/i });

  for (let i = 0; i < 5; i++) {
    fireEvent.click(addBtn);
  }

  const inputs = screen.getAllByRole('textbox');
  const filteredInputs = inputs.filter((input: HTMLElement) => (input as HTMLInputElement).placeholder !== 'Search');

  for (let i = 0; i < 5; i++) {
    const input = filteredInputs[i] as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'This is to do item ' + i } });
  }

  const sortBtn = screen.getByRole('button', { name: /sort/i });
  fireEvent.click(sortBtn);

  await waitFor(() => {
    const sortedFirstInput = filteredInputs[0] as HTMLInputElement;
    expect(sortedFirstInput.value).toBe('This is to do item ' + (filteredInputs.length - 1));
  });

});