import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Reserver from "./pages/Reserver";
import Blog from "./pages/Blog";
import Avis from "./pages/Avis";
import APropos from "./pages/APropos";
import NotFound from "./pages/NotFound";
import FloatingContactWidgets from "./components/FloatingContactWidgets";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/reserver" element={<Reserver />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/avis" element={<Avis />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingContactWidgets />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
