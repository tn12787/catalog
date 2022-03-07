import { fireEvent, getByLabelText, getByText, waitFor } from '@testing-library/react';

import WelcomePage from 'pages/welcome';
import { renderWithProviders } from 'tests/utils/render';
import { testInvitation } from '__mocks__/data/invitations';
import { testGetInvitationHandler } from '__mocks__/handlers/invitations';
import { server } from '__mocks__/server';

const render = () => renderWithProviders(<WelcomePage />);

jest.mock('next/router', () => ({ useRouter: jest.fn(() => ({ push: { id: jest.fn() } })) }));

describe('Welcome Page', () => {
  it('Shows a the welcome page', () => {
    const { getByText, getAllByRole } = render();
    expect(getByText(/Welcome/)).toBeVisible();
    expect(getAllByRole('progressbar')).toHaveLength(2);
  });

  it('If we were invited, there should be an invite page', async () => {
    server.use(testGetInvitationHandler([testInvitation({})]));

    const { getAllByRole } = render();
    await waitFor(() => expect(getAllByRole('progressbar')).toHaveLength(3));
  });

  it('If should let us walk through the onboarding process', async () => {
    server.use(testGetInvitationHandler([testInvitation({})]));
    const { getByLabelText, getByText } = render();

    // can't move past first step without selecting a segment
    expect(getByText(/Next/)).toBeDisabled();

    // select a segment and move forwards
    fireEvent.click(getByLabelText(/manage several artists/));
    expect(getByText(/Next/)).not.toBeDisabled();
    fireEvent.click(getByText(/Next/));

    await waitFor(() => expect(getByText(/very own workspace/)).toBeVisible());
  });
});
