export function FuturePaymentInfo({
  expiresAt,
  canceledAt,
}: {
  expiresAt: Date | null;
  canceledAt: number | null;
}) {
  return (
    <div>
      {canceledAt ? (
        <p className="text-sm text-red-800">
          Subscription will end at{" "}
          {new Date(canceledAt * 1000).toLocaleDateString()}
        </p>
      ) : (
        <p className="text-sm text-left text-muted-foreground">
          Next payment: {expiresAt && new Date(expiresAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
