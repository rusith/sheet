import { test, expect } from "vitest";
import { render, fireEvent } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import Cell from "./Cell";

const user = userEvent.setup();

const VIEW_LABEL = 'View Value'
const EDIT_LABEL = 'Edit Value'

test("should be in the view mode by default", async () => {
  const { findByLabelText } = render(() => <Cell />);
  const viewValue = await findByLabelText(VIEW_LABEL);
  expect(viewValue).toBeVisible();
});

test("should hide the view and show edit when double clicked", async () => {
  const { getByRole, queryByLabelText } = render(() => <Cell />);
  const cell = getByRole("cell");
  await user.dblClick(cell);
  const viewValue = queryByLabelText(VIEW_LABEL);
  expect(viewValue).toBeFalsy();

  const editValue = queryByLabelText(EDIT_LABEL);
  expect(editValue).toBeVisible();
  expect(editValue).toHaveFocus();
});

test("should return to view when the Edit Value lose focus", async () => {
  const { getByRole, queryByLabelText } = render(() => <Cell />);
  const cell = getByRole("cell");
  await user.dblClick(cell);
  let editValue = queryByLabelText(EDIT_LABEL);
  fireEvent.blur(editValue!);

  const viewValue = queryByLabelText(VIEW_LABEL);
  expect(viewValue).to.toBeVisible();

  editValue = queryByLabelText(EDIT_LABEL);
  expect(editValue).to.toBeFalsy();
});


test("should update the view value when input was changed and focus was removed", async () => {
  const { getByRole, queryByLabelText } = render(() => <Cell />);
  const cell = getByRole("cell");
  await user.dblClick(cell);
  let editValue = queryByLabelText(EDIT_LABEL);

  await user.type(editValue!, "New Value")

  fireEvent.blur(editValue!);

  const viewValue = queryByLabelText(VIEW_LABEL);
  expect(viewValue).to.toBeVisible();
  expect(viewValue).toHaveTextContent('New Value');
});

test('should have selected class when clicked', () => {

});