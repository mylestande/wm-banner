import Banner from "@/components/molecule/Banner/Banner.molecule";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => "mock-url");
});

describe("Banner", () => {
  const mockData = {
    name: "John Doe Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    description: "This is a test description",
    images: [new File([], "test-image.png", { type: "image/png" })],
    color: "#ff5733",
    background: "#f0f0f0",
  };

  it("renders a heading", () => {
    render(<Banner formdata={mockData} />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });

  it("renders a heading with correct text", () => {
    render(<Banner formdata={mockData} />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(mockData.name);
  });

  it("renders a description", () => {
    render(<Banner formdata={mockData} />);

    const description = screen.getByText(mockData.description);

    expect(description).toBeInTheDocument();
  });

  it("applies the correct styles from props", () => {
    render(<Banner formdata={mockData} />);

    const titleElement = screen.getByRole("heading", { level: 1 });
    expect(titleElement).toHaveStyle(`color: ${mockData.color}`);

    const descriptionElement = screen.getByText(mockData.description);
    expect(descriptionElement).toHaveStyle(`color: ${mockData.color}`);
  });

  it("renders truncated name in the figcaption", () => {
    render(<Banner formdata={mockData} />);

    const truncatedName = mockData.name.slice(0, 13);
    expect(screen.getByText(truncatedName)).toBeInTheDocument();
  });

  it("renders default image when no image is provided", () => {
    const formDataWithoutImage = { ...mockData, images: [] };
    render(<Banner formdata={formDataWithoutImage} />);

    const imageElement = screen.getByAltText(mockData.name);
    expect(imageElement).toHaveAttribute("src", "/image.png");
  });

  it("renders a preview of the provided image", () => {
    global.URL.createObjectURL = jest.fn(() => "mock-url");

    render(<Banner formdata={mockData} />);

    const imageElement = screen.getByAltText(mockData.name);
    expect(imageElement).toHaveAttribute("src", "mock-url");
  });
});
