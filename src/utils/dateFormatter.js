const DAYS = {
    en: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
    vi: ['CHỦ NHẬT', 'THỨ HAI', 'THỨ BA', 'THỨ TƯ', 'THỨ NĂM', 'THỨ SÁU', 'THỨ BẢY']
  };
  
  const MONTHS = {
    en: [
      'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
      'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ],
    vi: [
      'THÁNG MỘT', 'THÁNG HAI', 'THÁNG BA', 'THÁNG TƯ', 'THÁNG NĂM', 'THÁNG SÁU',
      'THÁNG BẢY', 'THÁNG TÁM', 'THÁNG CHÍN', 'THÁNG MƯỜI', 'THÁNG MƯỜI MỘT', 'THÁNG MƯỜI HAI'
    ]
  };
  
  export const formatDate = (date, language = 'en') => {
    const day = DAYS[language][date.getDay()];
    const month = MONTHS[language][date.getMonth()];
    const dateNum = date.getDate();
    const year = date.getFullYear();
  
    return {
      day,
      month,
      date: dateNum,
      year,
      // Vietnamese format: day, date month year
      // English format: day, month date, year
      formatted: language === 'vi' 
        ? `${dateNum} ${month}, ${year}`
        : `${month} ${dateNum}, ${year}`
    };
  };