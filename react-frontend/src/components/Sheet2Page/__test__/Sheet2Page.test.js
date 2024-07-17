import React from "react";
import { render, screen } from "@testing-library/react";

import Sheet2Page from "../Sheet2Page";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders sheet2 page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Sheet2Page />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("sheet2-datatable")).toBeInTheDocument();
    expect(screen.getByRole("sheet2-add-button")).toBeInTheDocument();
});
