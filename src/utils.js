// ./src/utils.js

export const availableLocations = [
  {
    cityName: '宜蘭縣',
    StationName: '宜蘭',
    CountyName: '宜蘭縣',
  },
  {
    cityName: '花蓮縣',
    StationName: '花蓮',
    CountyName: '花蓮縣',
  },
  {
    cityName: '臺東縣',
    StationName: '臺東',
    CountyName: '臺東縣',
  },
  {
    cityName: '澎湖縣',
    StationName: '澎湖',
    CountyName: '澎湖縣',
  },
  {
    cityName: '金門縣',
    StationName: '金門',
    CountyName: '金門縣',
  },
  {
    cityName: '連江縣',
    StationName: '馬祖',
    CountyName: '連江縣',
  },
  {
    cityName: '臺北市',
    StationName: '臺北',
    CountyName: '臺北市',
  },
  {
    cityName: '新北市',
    StationName: '板橋',
    CountyName: '新北市',
  },
  {
    cityName: '桃園市',
    StationName: '新屋',
    CountyName: '桃園市',
  },
  {
    cityName: '臺中市',
    StationName: '臺中',
    CountyName: '臺中市',
  },
  {
    cityName: '臺南市',
    StationName: '臺南市南區',
    CountyName: '臺南市',
  },
  {
    cityName: '高雄市',
    StationName: '高雄',
    CountyName: '高雄市',
  },
  {
    cityName: '基隆市',
    StationName: '基隆',
    CountyName: '基隆市',
  },
  {
    cityName: '新竹縣',
    StationName: '新竹',
    CountyName: '新竹縣',
  },
  {
    cityName: '新竹市',
    StationName: '新竹市東區',
    CountyName: '新竹市',
  },
  {
    cityName: '苗栗縣',
    StationName: '苗栗',
    CountyName: '苗栗縣',
  },
  {
    cityName: '彰化縣',
    StationName: '彰師大',
    CountyName: '彰化縣',
  },
  {
    cityName: '南投縣',
    StationName: '日月潭',
    CountyName: '南投縣',
  },
  {
    cityName: '雲林縣',
    StationName: '斗六',
    CountyName: '雲林縣',
  },
  {
     cityName: '嘉義縣',
     StationName: '阿里山',
     CountyName: '嘉義縣',
  },
  {
    cityName: '嘉義市',
    StationName: '嘉義',
    CountyName: '嘉義市',
  },
  {
    cityName: '屏東縣',
    StationName: '恆春',
    CountyName: '屏東縣',
  },
];

export const findLocation = (cityName) => {
  return availableLocations.find(location => location.cityName === cityName);
};