import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./app/mainStore.js";
import AuthProvider from "./context/AuthProvider.jsx";
import { TooltipProvider } from "./components/ui/Tooltip.jsx";
import { SearchContextProvider } from "./context/SearchContext";
import FilterMenuProvider from "./context/FilterMenuProvider";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <FilterMenuProvider>
            <SearchContextProvider>
              <App />
            </SearchContextProvider>
          </FilterMenuProvider>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </Provider>
);
