// STEP 1：載入 useEffect
import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import WeatherCard from './WeatherCard';
import { ThemeProvider } from 'styled-components';
import sunriseAndSunsetData from "./sunrise-sunset.json";

// STEP 1：載入 useWeatherApi Hook
import useWeatherApi from './useWeatherApi';

// STEP 1：匯入 WeatherSetting
import WeatherSetting from './WeatherSetting';
//import WeatherSetting2 from './WeatherSetting2';
//import RefExample from './RefExample';

// STEP 2：匯入剛剛定義好的 findLocation 方法
import { findLocation } from './utils';

const Container = styled.div`
  /* STEP 3：在 Styled Component 中可以透過 Props 取得對的顏色 */
  ${(props) => console.log("theme : ", props.theme)}
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const getMoment = (locationName) => {
  //console.log('sunriseAndSunsetData is : ', sunriseAndSunsetData);
  // STEP 2：從日出日落時間中找出符合的地區
  const location = sunriseAndSunsetData.find(
    (data) => data.locationName === locationName //data.locationName === locationName 
  );

  //console.log("data.location is : ", location);

  // STEP 3：找不到的話則回傳 null
  if (!location) return null;

  // STEP 4：取得當前時間
  const now = new Date();

  // STEP 5：將當前時間以 "2019-10-08" 的時間格式呈現
  const nowDate = Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
    .format(now)
    .replace(/\//g, "-");

  // STEP 6：從該地區中找到對應的日期
  const locationDate =
    location.time && location.time.find((time) => time.dataTime === nowDate);
  
  console.log("dataDate is : ", locationDate);

  // STEP 7：將日出日落以及當前時間轉成時間戳記（TimeStamp）
  const sunriseTimestamp = new Date(
    `${locationDate.dataTime} ${locationDate.sunrise}`
  ).getTime();

  console.log("sunriseTimestamp is : ", sunriseTimestamp);

  const sunsetTimestamp = new Date(
    `${locationDate.dataTime} ${locationDate.sunset}`
  ).getTime();


  console.log("sunsetTimestamp is : ", sunsetTimestamp);


  const nowTimestamp = now.getTime();


  console.log("nowTimestamp is : ", nowTimestamp);


  console.log("nowTimestamp is : ", sunriseTimestamp <= nowTimestamp && nowTimestamp <= sunsetTimestamp ? "day"
    : "night");

  // STEP 8：若當前時間介於日出和日落中間，則表示為白天，否則為晚上
  return sunriseTimestamp <= nowTimestamp && nowTimestamp <= sunsetTimestamp
    ? "day"
    : "night";
};

// STEP 3：把上面定義好的 styled-component 當成組件使用
const WeatherApp = () => {

// STEP 1：從 localStorage 取出 cityName，並取名為 storageCity
  const storageCity = localStorage.getItem('cityName');

// STEP 1：使用 useState 定義當前要拉取天氣資訊的地區，預設值先定為「臺北市」
// STEP 2：若 storageCity 存在則作為 currentCity 的預設值，否則使用 '臺北市'
  const [currentCity, setCurrentCity] = useState(storageCity || '臺北市');

// STEP 3：根據 currentCity 來找出對應到不同 API 時顯示的地區名稱，找到的地區取名為 locationInfo
  const currentLocation = findLocation(currentCity) || {};

// STEP 1：定義 currentPage 這個 state，預設值是 WeatherCard
  const [currentPage, setCurrentPage] = useState('WeatherCard');

// STEP 2：使用 useWeatherApi Hook 後就能取得 weatherElement 和 fetchData 這兩個方法
// 把 currentLocation 當成參數傳入 useWeatherApi 中
  const [weatherElement, fetchData] = useWeatherApi(currentLocation);

  // STEP 1：使用 useState 並定義 currentTheme 的預設值為 light
  const [currentTheme, setCurrentTheme] = useState('light');  

// STEP 8：現在可以使用 currentLocation 取得地區名稱，因此移除這個多餘的程式碼
//const { locationName, } = weatherElement;

// STEP 1：定義主題配色
const theme = {
  light: {
    backgroundColor: '#ededed',
    foregroundColor: '#f9f9f9',
    boxShadow: '0 1px 3px 0 #999999',
    titleColor: '#212121',
    temperatureColor: '#757575',
    textColor: '#828282',
  },
  dark: {
    backgroundColor: '#1F2022',
    foregroundColor: '#121416',
    boxShadow:
      '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
    titleColor: '#f9f9fa',
    temperatureColor: '#dddddd',
    textColor: '#cccccc',
  },
};

  // STEP 3：透過 useMemo 避免每次都須重新計算取值，記得帶入 dependencies
  //const moment = useMemo(() => getMoment(locationName), [locationName]);
  
  // STEP 4：根據日出日落資料的地區名稱，找出對應的日出日落時間
  const moment = useMemo(() => getMoment(currentLocation.sunriseCityName), [currentLocation.sunriseCityName]);

  //const moment = getMoment(weatherElement.locationName);
  //const moment = useMemo(() => {getMoment(weatherElement.locationName);}, []);
  //const moment = useMemo(getMoment(weatherElement.locationName), []);

  console.log("locationName is : ", weatherElement.locationName);

  console.log("moment is : ", moment);

  // 根據 moment 決定要使用亮色或暗色主題
  useEffect(() => {
    setCurrentTheme(moment === 'day' ? 'light' : 'dark');
    // 記得把 moment 放入 dependencies 中
  }, [moment]);

  // STEP 3-1：當 currentCity 有改變的時候，儲存到 localStorage 中
  useEffect(() => {
    localStorage.setItem('cityName', currentCity);
    // STEP 3-2：dependencies 中放入 currentCity
  }, [currentCity]);

  return (
   <ThemeProvider theme={theme[currentTheme]}>
     <Container>
      {/* STEP 2：利用條件渲染的方式決定要呈現哪個組件 */}
        {currentPage === 'WeatherCard' && (
          <WeatherCard
            // STEP 5：把縣市名稱傳入 WeatherCard 中用以顯示
            cityName={currentLocation.cityName}
            weatherElement={weatherElement}
            moment={moment}
            fetchData={fetchData}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'WeatherSetting' && 
          <WeatherSetting 

          // STEP 6：把縣市名稱傳入 WeatherSetting 中當作表單「地區」欄位的預設值
          cityName={currentLocation.cityName}

          // STEP 7：把 setCurrentCity 傳入，讓 WeatherSetting 可以修改 currentCity
            setCurrentCity={setCurrentCity}

          setCurrentPage={setCurrentPage} />}
     {/*<RefExample />*/}
    </Container>
    
  </ThemeProvider>
  );
};

export default WeatherApp;
