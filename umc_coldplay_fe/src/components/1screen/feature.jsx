import './feature.css';

const Feature = () => {
  return (
    <section id="features" className="features">
      {/* 첫 번째 아이템 */}
      <div className="feature-item">
        <div className="feature-image">
          <img src="path/to/score-image.jpg" alt="화성 분석 이미지" />
        </div>
        <p>화성 분석</p>
      </div>

      {/* 두 번째 아이템 */}
      <div className="feature-item">
        <div className="feature-image">
          <img src="path/to/score-image.jpg" alt="악보 분석 이미지" />
        </div>
        <p>악보 분석</p>
      </div>

      {/* 세 번째 아이템 */}
      <div className="feature-item">
        <div className="feature-image">
          <img src="path/to/stem-image.jpg" alt="스템 분리 이미지" />
        </div>
        <p>스템 분리</p>
      </div>
    </section>
  );
};

export default Feature;