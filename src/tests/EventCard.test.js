import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { AuthContextProvider } from "../contexts/AuthContext";
import EventCard from "../components/MyEvents/EventCard";

describe("EventCard", () => {

  const validProps = {
    id: 1,
    title: "test title",
    date: '2023-05-01',
    participants: "user1, user2, user3",
    description: "test description",
    category: "other",
    AdminId: 2,
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
    expect(screen.getByText("With: user1, user2, user3")).toHaveClass("event-card__participants");
    expect(screen.getByText("Event Date: 2023-05-01")).toHaveClass("event-card__date");
  });
});