export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center w-full items-center h-full bg-gradient-to-r from-sky-500 to-blue-500">
      {children}
    </div>
  );
}
