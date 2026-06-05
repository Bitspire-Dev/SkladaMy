import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import StructuredData from "../StructuredData";

describe("StructuredData", () => {
  it("should render script tag with JSON-LD", () => {
    const { container } = render(<StructuredData />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
  });

  it("should contain organization schema", () => {
    const { container } = render(<StructuredData />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();

    const json = JSON.parse(script?.textContent || "{}");
    expect(json["@context"]).toBe("https://schema.org");
    expect(json["@type"]).toBe("LocalBusiness");
  });

  it("should include company data", () => {
    const { container } = render(<StructuredData />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const json = JSON.parse(script?.textContent || "{}");

    expect(json.name).toBeTruthy();
    expect(json.telephone).toBeTruthy();
    expect(json.url).toBeTruthy();
  });

  it("should include address with city and region", () => {
    const { container } = render(<StructuredData />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const json = JSON.parse(script?.textContent || "{}");

    expect(json.address).toBeDefined();
    expect(json.address["@type"]).toBe("PostalAddress");
    expect(json.address.addressCountry).toBe("PL");
  });

  it("should include geo coordinates", () => {
    const { container } = render(<StructuredData />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const json = JSON.parse(script?.textContent || "{}");

    expect(json.geo).toBeDefined();
    expect(json.geo["@type"]).toBe("GeoCoordinates");
    expect(json.geo.latitude).toBeTruthy();
    expect(json.geo.longitude).toBeTruthy();
  });
});
