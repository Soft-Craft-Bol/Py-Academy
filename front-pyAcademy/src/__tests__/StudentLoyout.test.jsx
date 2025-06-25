import { render, screen } from "@testing-library/react";
import { StudentLayout } from "@/shared/layouts/StudentLayout";
import React from "react";

// Mock de componentes hijos
vi.mock("@/shared/ui/organisms/NavbarUser", () => ({
    NavbarUser: () => <nav data-testid="navbar-user">NavbarUser</nav>,
}));
vi.mock("@/shared/ui/organisms/Sidebar", () => ({
    Sidebar: (props) => <aside data-testid="sidebar">Sidebar {props.isSidebarOpen ? "open" : "closed"}</aside>,
}));
vi.mock("@/shared/ui/organisms/chatbot/ChatbotWidget", () => ({
    ChatbotWidget: () => <div data-testid="chatbot-widget">ChatbotWidget</div>,
}));
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        Outlet: () => <div data-testid="outlet">Outlet</div>,
    };
});

describe("StudentLayout", () => {
    it("renderiza NavbarUser, Sidebar, Outlet y ChatbotWidget", () => {
        render(<StudentLayout />);
        expect(screen.getByTestId("navbar-user")).toBeInTheDocument();
        expect(screen.getByTestId("sidebar")).toBeInTheDocument();
        expect(screen.getByTestId("outlet")).toBeInTheDocument();
        expect(screen.getByTestId("chatbot-widget")).toBeInTheDocument();
    });
});
