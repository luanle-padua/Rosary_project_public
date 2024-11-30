// MobileLanding.jsx
import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Languages } from 'lucide-react';
import './MobileLanding.css';

const MobileLanding = ({ onStart }) => {
  const { currentLanguage, setLanguage } = useLanguage();

  const introImages = {
    en: '/images/intro-mobile-en.png',
    vi: '/images/intro-mobile-vn.png'
  };


  const descriptions = {
    en: "People, no matter how strong they may seem, also have moments when they feel weak and lost. This happens not only during times of pain or despair but also in moments when life is going well, when we are happy, or when we achieve what we've longed for. Taking a moment each day to pause, reflect, and pray – no matter the circumstances – will help us regain peace and clarity in our hearts, so we can continue walking confidently on our path. Faith is like a light that guides us, helping us not get lost amidst the ups and downs of life.\n\nPray the Rosary is a small gift I wish to share, hoping it will help everyone find a moment of peace. Let’s pray together every day, finding serenity in each prayer, feeling the presence of God, and walking with Mother Mary on our journey.\n\nEach mystery in the Rosary corresponds to different days of the week, helping us reflect on various aspects of Jesus' life. Mondays and Saturdays are times to reflect on joy, on the bright moments of life. Tuesdays and Fridays are for remembering pain and sacrifice, drawing strength from challenges. Wednesdays and Sundays are moments to live again the glory of the Resurrection, reminding us of life and love’s victory. Thursdays are for contemplating the light of Jesus' mission, helping us find guidance in our own lives.\n\nThank you, Tuyet Mai, for helping prepare the audio recordings for this project.\n\nThanh Luan.",
    vi: "Con người, dù mạnh mẽ đến đâu, cũng có những lúc thấy mình yếu đuối và lạc lối. Điều này không chỉ xảy ra khi ta gặp khổ đau hay tuyệt vọng, mà còn cả những lúc cuộc sống đang thuận lợi, vui vẻ, hay khi đạt được điều mình mong ước. Việc dành chút thời gian mỗi ngày để dừng lại, suy ngẫm và cầu nguyện - dù trong hoàn cảnh nào - sẽ giúp ta tìm lại sự bình an và sáng suốt trong tâm hồn, để tiếp tục bước đi vững vàng trên con đường của mình. Đức tin chính là ngọn đèn soi sáng, giúp ta không bị lạc lối giữa những thăng trầm của cuộc đời.\n\nPray the Rosary - Hành trình Mân Côi là món quà nhỏ mình muốn chia sẻ, mong rằng sẽ giúp mọi người tìm thấy một phút giây bình yên trong những ngày bận rộn. Hãy cầu nguyện cùng nhau mỗi ngày, tìm thấy sự an yên trong từng lời kinh, cảm nhận sự hiện diện của Chúa và bước đi với Mẹ Maria trong hành trình của mình.\n\nMỗi mầu nhiệm trong Kinh Mân Côi tương ứng với các ngày trong tuần, giúp chúng ta chiêm nghiệm những khía cạnh khác nhau trong cuộc đời Chúa Giêsu. Thứ Hai và Thứ Bảy là thời gian để suy ngẫm về niềm vui, về những khoảnh khắc tươi sáng trong cuộc đời. Thứ Ba và Thứ Sáu là lúc để nhớ về những đau khổ và hy sinh, tìm thêm sức mạnh trong những thử thách. Thứ Tư và Chủ Nhật là dịp để sống lại niềm vinh quang của Phục Sinh, nhắc nhở ta về sự sống và tình yêu chiến thắng. Thứ Năm là thời gian suy nghĩ về ánh sáng từ sứ vụ của Chúa, giúp ta tìm thấy sự soi sáng trong cuộc sống.\n\nCảm ơn em, Tuyết Mai, đã giúp chuẩn bị các bản thu âm cho dự án này.\n\nThành Luân."
  };



  const handleStart = () => {
    onStart();
  };

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'en' ? 'vi' : 'en');
  };

  return (
    <div className="mobile-container">
      <div className="mobile-content">
        <div className="mobile-section image-section">
          <img
            src={introImages[currentLanguage]}
            alt="Rosary Instructions"
            className="intro-image"
            draggable="false"
          />
        </div>

        <div className="mobile-section button-section">
          <button
            type="button"
            onClick={toggleLanguage}
            className="lang-btn"
            aria-label="Change language"
          >
            <Languages size={22.2} />
            <span className="lang-code">{currentLanguage.toUpperCase()}</span>
          </button>

          <button
            type="button"
            onClick={handleStart}
            className="pray-btn"
          >
            {currentLanguage === 'en' ? "Let's Pray" : 'Hãy cầu nguyện'}
          </button>
        </div>

        <div className="mobile-section text-section">
          {descriptions[currentLanguage].split('\n\n').map((paragraph, index) => (
            <p key={index} className="description-paragraph">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileLanding;