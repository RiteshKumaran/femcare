import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources - Femcare",
  description: "Educational resources and videos about women's health",
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}