import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ShopContextProvider from "./context/ProductContext.jsx";
import { Provider } from "react-redux";
import store from "./app/mainStore.js";
import AuthProvider from "./context/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { TooltipProvider } from "./components/ui/Tooltip.jsx";
import { SearchContextProvider } from "./context/SearchContext";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <ShopContextProvider>
              <SearchContextProvider>
                <App />
              </SearchContextProvider>
            </ShopContextProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </Provider>
  </QueryClientProvider>
);
