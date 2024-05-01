import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ToDoList from '..';

// Search
test('Search with 5 input non-empty elements', async () => {
  render(<ToDoList />);

  const addBtn = screen.getByRole('button', { name: /add/i });

  for (let i = 0; i < 5; i++) {
    fireEvent.click(addBtn);
  }

  const inputs = screen.getAllByRole('textbox');
  const filteredInputs = inputs.filter((input: HTMLElement) => (input as HTMLInputElement).placeholder !== 'Search');
  const searchInput = screen.getByPlaceholderText('Search');

  for (let i = 0; i < 5; i++) {
    const input = filteredInputs[i] as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'This is to do item ' + i } });
  }

  fireEvent.change(searchInput, { target: { value: 'This is to do item ' + (filteredInputs.length - 1) } });
  const resultFilteredInputs = inputs.filter((input: HTMLElement) => (input as HTMLInputElement).placeholder !== 'Search');

  await waitFor(() => {
    expect(resultFilteredInputs[0]).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(resultFilteredInputs[filteredInputs.length - 1]).toBeInTheDocument();
  });

});

// Filter search
test('Filter search with 5 input non-empty elements', async () => {
  const container = render(<ToDoList />).container;

  const addBtn = screen.getByRole('button', { name: /add/i });

  for (let i = 0; i < 5; i++) {
    fireEvent.click(addBtn);
  }

  const checkboxes = screen.queryAllByTitle('checkbox');
  fireEvent.click((checkboxes[0]));

  let filteringSearchBtn = screen.getByText('All');
  fireEvent.click(filteringSearchBtn);

  await waitFor(() => {
    expect(checkboxes[0]).toBeInTheDocument();
  });

  filteringSearchBtn = screen.getByText('Completed');
  fireEvent.click(filteringSearchBtn);

  await waitFor(() => {
    expect(checkboxes[1]).not.toBeInTheDocument();
  });

  filteringSearchBtn = screen.getByText('Completed');
  fireEvent.click(filteringSearchBtn);

  filteringSearchBtn = screen.getByText('UnCompleted');
  fireEvent.click(filteringSearchBtn);

  await waitFor(() => {
    expect(checkboxes[0]).not.toBeInTheDocument();
  });

});



