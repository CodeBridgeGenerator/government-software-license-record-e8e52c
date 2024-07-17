import React from "react";
import { render, screen } from "@testing-library/react";

import Sheet1Page from "../Sheet1Page";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders sheet1 page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Sheet1Page />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("sheet1-datatable")).toBeInTheDocument();
    expect(screen.getByRole("sheet1-add-button")).toBeInTheDocument();
});
