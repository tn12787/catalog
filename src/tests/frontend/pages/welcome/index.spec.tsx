import { fireEvent, waitFor } from '@testing-library/react';

import WelcomePage from 'pages/welcome';
import { renderWithProviders } from 'tests/utils/render';
import { testInvitation } from '__mocks__/data/invitations';
import { testGetInvitationHandler } from '__mocks__/handlers/invitations';
import { server } from '__mocks__/server';

const render = () => renderWithProviders(<WelcomePage />);

jest.mock('next/router', () => ({ useRouter: jest.fn(() => ({ push: { id: jest.fn() } })) }));

describe('Welcome Page', () => {
  it('Shows a the welcome page', () => {
    const { getByText } = render();
    expect(getByText(/Welcome/)).toBeVisible();
  });

  it('Should let us walk through the onboarding process', async () => {
    server.use(testGetInvitationHandler([testInvitation({})]));
    const { getByLabelText, getByText, getByPlaceholderText, getAllByRole } = render();

    // should be 3 bars, including the invite page
    await waitFor(() => expect(getAllByRole('progressbar')).toHaveLength(3));

    const NextButtonRegex = /^Next$/;

    // can't move past first step without selecting a segment
    expect(getByText(NextButtonRegex)).toBeDisabled();

    // select a segment and move forwards
    fireEvent.click(getByLabelText(/manage several artists/));
    // wait for user to have loaded
    await waitFor(() => expect(getByText(NextButtonRegex)).not.toBeDisabled());
    fireEvent.click(getByText(NextButtonRegex));

    await waitFor(() => expect(getByText(/Your very own workspace/)).toBeVisible());

    expect(getByText(NextButtonRegex)).toBeDisabled();
    fireEvent.input(getByPlaceholderText(/Your new workspace name/), { target: { value: 'test' } });
    await waitFor(() => expect(getByText(NextButtonRegex)).not.toBeDisabled());

    fireEvent.click(getByText(NextButtonRegex));
  });

  it('Without invites, there should only have 2 steps walk through', async () => {
    server.use(testGetInvitationHandler([]));
    const { getByLabelText, getByText, queryByText, getAllByRole } = render();

    // should be only 2 bars, as we don't have any invites
    await waitFor(() => expect(getAllByRole('progressbar')).toHaveLength(2));

    const NextButtonRegex = /^Next$/;
    const LetsGoRegex = /^Let's go!$/;

    // can't move past first step without selecting a segment
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