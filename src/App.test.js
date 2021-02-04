import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import ButtonBar from './components/ButtonBar';

test('renders new item form', () => {
  render(<App />);
  const addLabel = screen.getByText(/Add new item/i);
  expect(addLabel).toBeInTheDocument();
});

test('handles adding new item', () => {
  render(<App />);
  const addItemForm = screen.getByTestId('addItemForm')
  const addItemInput = screen.getByTestId('addItemFormInput')

  //Type a new to-do into the input and submit it
  fireEvent.change(addItemInput, { target: { value: 'I am a new item' } })
  fireEvent.submit(addItemForm)

  //Look for a new item in the to-do list, along with a 'delete' button (so we can be sure the first check isn't just finding our input if something went wrong with submission)
  const newItem = screen.getByText('I am a new item')
  const newItemDeleteBtn = screen.getByText('Delete item')

  //Confirm the above, and that the input is now empty since the new item was submitted
  expect(newItem).toBeInTheDocument()
  expect(newItemDeleteBtn).toBeInTheDocument()
  expect(addItemInput.value).toBeFalsy()
});

test('renders button bar', () => {
  render(<ButtonBar />);
  const linkElement = screen.getByText(/Delete checked/i);
  expect(linkElement).toBeInTheDocument();
});

//TO DO: add more tests to check interactivity
