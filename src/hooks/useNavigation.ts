"use client";
import { useRouter } from "next/router";

export function useNavigation() {
  const router = useRouter();

  const navigate = (path: string, query?: Record<string, string>) => {
    if (query) {
      const queryString = new URLSearchParams(query).toString();
      router.push(`${path}?${queryString}`);
    } else {
      router.push(path);
    }
  };

  const goBack = () => router.back();

  return {
    navigate,
    goBack,
    pathname: router.pathname,
    query: router.query,
    preFetch: router.prefetch,
  };
}
