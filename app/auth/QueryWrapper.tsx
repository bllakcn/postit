"use client";

import {
  QueryClient,
  QueryClientProvider,
  QueryClientProviderProps,
} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function QueryWrapper({ children }: QueryClientProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
    </QueryClientProvider>
  );
}
