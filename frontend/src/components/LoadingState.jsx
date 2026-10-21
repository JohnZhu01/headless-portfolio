export default function LoadingState({ label = "Loading content…" }) {
  return (
    <div className="loading-state" role="status" aria-label={label}>
      <div className="loader" aria-hidden="true" />
    </div>
  );
}
