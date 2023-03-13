import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { AuthContextProvider } from "../contexts/AuthContext";
import VotedEventCard from "../components/MyEvents/VotedEventCard";

describe("VotedEventCard", () => {
  const validProps = {
    id: 1,
    title: "test title",
    description: "test description",
  };

  const setup = () => {
    render(
      <AuthContextProvider>
        <VotedEventCard {...validProps} />
      </AuthContextProvider>
    ); 
  };

  it("renders correctly", () => {
    const rendered = renderer.create(
      <AuthContextProvider>
        <VotedEventCard  {...validProps} />
      </AuthContextProvider>
    );
    expect(rendered).toMatchSnapshot();
  });

  it("renders correct values for props", () => {
    setup();

    expect(screen.getByText("test title")).toHaveClass("voted-card__title");
    expect(screen.getByText("test description")).toHaveClass("voted-card__description");
  });
});