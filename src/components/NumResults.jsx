export default function NumResults({ number }) {
  return (
    <p className="num-results">
      {number === 0 ? (
        "Search for a movie!"
      ) : (
        <>
          Found <strong>{number}</strong> top results
        </>
      )}
    </p>
  );
}
