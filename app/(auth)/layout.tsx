export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 h-full items-center justify-center">
      {children}
    </div>
  );
}
