import './search.css';

const Pearch=()=>{
  return(
    <div className="search-container container">
        <input
          type="text"
          placeholder="분석하고 싶은 음원의 URL을 입력하세요"
          className="search-input"
        />
        <button className="search-button">Search</button>
    </div>

  );
};

export default Pearch;