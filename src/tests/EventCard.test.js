import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { AuthContextProvider } from "../contexts/AuthContext";
import EventCard from "../components/EventCard";

describe("EventCard", () => {
  const validProps = {
    id: 1,
    title: "test title",
    description: "test description",
  };

  const setup = () => {
    render(
      <AuthContextProvider>
        <EventCard {...validProps} />
      </AuthContextProvider>
    ); 
  };

  it("renders correctly", () => {
    const rendered = renderer.create(
      <AuthContextProvider>
        <EventCard {...validProps} />
      </AuthContextProvider>
    );
    expect(rendered).toMatchSnapshot();
  });

  it("renders correct values for props", () => {
    setup();

    expect(screen.getByText("test title")).toHaveClass("event-card__title");
    expect(screen.getByText("test description")).toHaveClass("event-card__description");
  });
});