import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ToDoList from '..';

// Save
test('The save button does exist and works as expected', async () => {
  render(<ToDoList />);
  const addBtn = screen.getByRole('button', { name: /add/i });
  fireEvent.click(addBtn);

  const saveBtn = screen.getByRole('button', { name: /Save/i });
  fireEvent.click(saveBtn);

  const inputs = screen.getAllByRole('textbox');
  const filteredInputs = inputs.filter((input: HTMLElement) => (input as HTMLInputElement).placeholder !== 'Search');

  await waitFor(() => {
    expect(filteredInputs).toHaveLength(1);
  });
});