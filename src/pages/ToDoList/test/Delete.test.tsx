import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ToDoList from '..';

test('The delete button does exist', async () => {
  render(<ToDoList />);
  const addBtn = screen.getByRole('button', { name: /add/i });
  fireEvent.click(addBtn);

  const deleteBtn = screen.getByTestId('delete-icon');

  await waitFor(() => {
    expect(deleteBtn).toBeInTheDocument();
  });
});

test('Delete 1 of 5 input elements', async () => {
  render(<ToDoList />);
  const addBtn = screen.getByRole('button', { name: /add/i });

  for (let i = 0; i < 5; i++) {
    fireEvent.click(addBtn);
  }

  const icons = screen.getAllByTestId('delete-icon');
  fireEvent.click(icons[0]);
  const finalIcons = screen.getAllByTestId('delete-icon');

  await waitFor(() => {
    expect(finalIcons).toHaveLength(4);
  });

});