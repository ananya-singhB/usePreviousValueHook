import React, { useState } from "react";
import { render, screen, act } from "@testing-library/react";
import usePreviousValue from "../hooks/usePrevious";

function Harness() {
    const [tick, setTick] = useState(0);
    const [prev, setPrev] = usePreviousValue<string>();

    return (
        <div>
            <div data-testid="prev">{prev ?? "undefined"}</div>
            <button onClick={() => setPrev("Alice")}>set-alice</button>
            <button onClick={() => setPrev("Bob")}>set-bob</button>
            <button onClick={() => setPrev("Charlie")}>set-charlie</button>
            <button onClick={() => setTick((t) => t + 1)}>rerender</button>
        </div>
    );
}

describe("usePreviousValue (manual ref-based)", () => {
    it("should return undefined initially and update manually", () => {
        render(<Harness />);

        expect(screen.getByTestId("prev").textContent).toBe("undefined");

        // Set to Alice (ref updated, no re-render yet)
        act(() => {
            screen.getByText("set-alice").click();
        });
        expect(screen.getByTestId("prev").textContent).toBe("undefined");

        // Force re-render, now previous reflects the ref
        act(() => {
            screen.getByText("rerender").click();
        });
        expect(screen.getByTestId("prev").textContent).toBe("Alice");
    });

    it("tracks value history correctly across updates", () => {
        render(<Harness />);

        // Set Alice, then render and read previous
        act(() => {
            screen.getByText("set-alice").click();
        });
        act(() => {
            screen.getByText("rerender").click();
        });
        expect(screen.getByTestId("prev").textContent).toBe("Alice");

        // Set Bob, then render, & previous should be Bob
        act(() => {
            screen.getByText("set-bob").click();
        });
        act(() => {
            screen.getByText("rerender").click();
        });
        expect(screen.getByTestId("prev").textContent).toBe("Bob");

        // Set Charlie, then render, & previous should be Charlie
        act(() => {
            screen.getByText("set-charlie").click();
        });
        act(() => {
            screen.getByText("rerender").click();
        });
        expect(screen.getByTestId("prev").textContent).toBe("Charlie");
    });
});
