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

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Provider store={store}>
            <ShopContextProvider>
              <App />
            </ShopContextProvider>
          </Provider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);
