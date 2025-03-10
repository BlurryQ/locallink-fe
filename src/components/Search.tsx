import '../styles/search.css';

export default function Search() {
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search concerts, conferences, meet ups and more"
        autoFocus
      />
    </>
  );
}
