import { cleanup, fireEvent, waitFor } from '@testing-library/react';

import WelcomePage from 'pages/welcome';
import { renderWithProviders } from 'tests/utils/render';
import { testInvitation } from '__mocks__/data/invitations';
import { testGetInvitationHandler } from '__mocks__/handlers/invitations';
import { server } from '__mocks__/server';

const render = () => renderWithProviders(<WelcomePage />);

jest.mock('next/router', () => ({ useRouter: jest.fn(() => ({ push: { id: jest.fn() } })) }));

describe('Welcome Page', () => {
  beforeEach(() => {
    server.resetHandlers();
  });

  afterEach(cleanup);

  it('Shows a the welcome page', async () => {
    const { getByText } = render();
    await waitFor(() => expect(getByText(/Welcome/)).toBeVisible());
  });

  it('Should let us walk through the onboarding process', async () => {
    server.use(testGetInvitationHandler([testInvitation({})]));
    const { getByLabelText, getByText, getByPlaceholderText, getAllByRole } = render();

    // should be 4 bars, including the invite page
    await waitFor(() => expect(getAllByRole('progressbar')).toHaveLength(4));

    const NextButtonRegex = /^Next$/;

    await waitFor(() => expect(getByPlaceholderText(/Your name/)).toHaveValue('Test Users'));
    fireEvent.input(getByPlaceholderText(/Your name/), { target: { value: '' } });
    await waitFor(() => expect(getByPlaceholderText(/Your name/)).toHaveValue(''));
    expect(getByText(NextButtonRegex)).toBeDisabled();

    fireEvent.input(getByPlaceholderText(/Your name/), { target: { value: 'Test User' } });
    await waitFor(() => expect(getByText(NextButtonRegex)).not.toBeDisabled());
    fireEvent.click(getByText(NextButtonRegex));
    await waitFor(() => expect(getByText(/How will you/)).toBeVisible());

    // can't move past first step without selecting a segment
    expect(getByText(NextButtonRegex)).toBeDisabled();

    // select a segment and move forwards
    fireEvent.click(getByLabelText(/manage several artists/));
    // wait for user to have loaded
    await waitFor(() => expect(getByText(NextButtonRegex)).not.toBeDisabled());
    fireEvent.click(getByText(NextButtonRegex));

    await waitFor(() => expect(getByText(/Your very own workspace/)).toBeVisible());

    fireEvent.input(getByPlaceholderText(/Your new workspace name/), { target: { value: '' } });
    expect(getByText(NextButtonRegex)).toBeDisabled();
    fireEvent.input(getByPlaceholderText(/Your new workspace name/), { target: { value: 'test' } });
    await waitFor(() => expect(getByText(NextButtonRegex)).not.toBeDisabled());

    fireEvent.click(getByText(NextButtonRegex));
  });

  it('Without invites, there should only have 3 steps walk through', async () => {
    server.use(testGetInvitationHandler([]));
    const { getByLabelText, getByPlaceholderText, getByText, queryByText, getAllByRole } = render();

    // should be only 2 bars, as we don't have any invites
    await waitFor(() => expect(getAllByRole('progressbar')).toHaveLength(3));

    const NextButtonRegex = /^Next$/;
    const LetsGoRegex = /^Let's go!$/;

    // can't move past first step without selecting a segment
    fireEvent.input(getByPlaceholderText(/Your name/), { target: { value: 'Test User' } });
    await waitFor(() => expect(getByText(NextButtonRegex)).not.toBeDisabled());
    fireEvent.click(getByText(NextButtonRegex));
    await waitFor(() => expect(getByText(/How will you/)).toBeVisible());

    expect(getByText(NextButtonRegex)).toBeDisabled();

    // select a segment and move forwards
    fireEvent.click(getByLabelText(/manage several artists/));
    // wait for user to have loaded
    await waitFor(() => expect(getByText(NextButtonRegex)).not.toBeDisabled());
    fireEvent.click(getByText(NextButtonRegex));

    await waitFor(() => expect(getByText(/Your very own workspace/)).toBeVisible());

    expect(queryByText(NextButtonRegex)).toBeNull();
    expect(getByText(LetsGoRegex)).not.toBeNull();
  });
});
