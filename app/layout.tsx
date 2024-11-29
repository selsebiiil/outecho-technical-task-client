import ClientProvider from "./ClientProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <div className="container mx-auto p-4">{children}</div>
        </ClientProvider>
      </body>
    </html>
  );
}
