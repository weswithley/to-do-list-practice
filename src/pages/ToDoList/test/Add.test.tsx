import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ToDoList from '..';

test('The add button does exist', () => {
  render(<ToDoList />);
  const addBtn = screen.getByRole('button', { name: /add/i });

  expect(addBtn).toBeInTheDocument();
});

test('Add 5 input empty elements', async () => {
  render(<ToDoList />);
  const addBtn = screen.getByRole('button', { name: /add/i });

  for (let i = 0; i < 5; i++) {
    fireEvent.click(addBtn);
  }

  const inputs = screen.getAllByRole('textbox');
  const filteredInputs = inputs.filter((input: HTMLElement) => (input as HTMLInputElement).placeholder !== 'Search');

  await waitFor(() => {
    expect(filteredInputs).toHaveLength(5);
  });

});

test('Add 5 input non-empty elements', async () => {
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

    await waitFor(() => {
      expect(input.value).toBe('This is to do item ' + i);
    });
  }

});