import { fireEvent, render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { signIn, useSession, signOut } from "next-auth/client";
import { SignInButton } from ".";

jest.mock("next-auth/client");
jest.mock("next/router");

describe("SignInButton component", () => {
  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText("Acesse com Github")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValue([
      {
        user: { name: "John Doe", email: "john.doe@example.com" },
        expires: "fake-expires",
      },
      false,
    ]);

    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("redirects to github login correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    const signInMocked = mocked(signIn);

    render(<SignInButton />);

    const signInButton = screen.getByText("Acesse com Github");

    fireEvent.click(signInButton);

    expect(signInMocked).toHaveBeenCalledWith("github");
  });

  it("redirects to github logout correctly when user is authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: "John Doe", email: "john.doe@example.com" },
        expires: "fake-expires",
      },
      false,
    ]);

    const signOutMocked = mocked(signOut);

    render(<SignInButton />);

    const signInButton = screen.getByText("John Doe");

    fireEvent.click(signInButton);

    expect(signOutMocked).toHaveBeenCalled();
  });
});
