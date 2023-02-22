// ./src/WeatherSetting.js


// STEP 1：從 react 中載入 useRef
import React, { useRef } from 'react';
import styled from '@emotion/styled';

const WeatherSettingWrapper = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 30px;
`;

const StyledLabel = styled.label`
  display: block;
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 15px;
`;

const StyledInputList = styled.input`
  display: block;
  box-sizing: border-box;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.textColor};
  outline: none;
  width: 100%;
  max-width: 100%;
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;
  padding: 7px 10px;
  margin-bottom: 40px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    user-select: none;
    margin: 0;
    letter-spacing: 0.3px;
    line-height: 1;
    cursor: pointer;
    overflow: visible;
    text-transform: none;
    border: 1px solid transparent;
    background-color: transparent;
    height: 35px;
    width: 80px;
    border-radius: 5px;

    &:focus,
    &.focus {
      outline: 0;
      box-shadow: none;
    }

    &::-moz-focus-inner {
      padding: 0;
      border-style: none;
    }
  }
`;

const Back = styled.button`
  && {
    color: ${({ theme }) => theme.textColor};
    border-color: ${({ theme }) => theme.textColor};
  }
`;

const Save = styled.button`
  && {
    color: white;
    background-color: #40a9f3;
  }
`;

const locations = [
  '嘉義縣', '新北市', '嘉義市', '新竹縣', '新竹市',
  '臺北市', '臺南市', '宜蘭縣', '苗栗縣', '雲林縣',
  '花蓮縣', '臺中市', '臺東縣', '桃園市', '南投縣',
  '高雄市', '金門縣', '屏東縣', '基隆市', '澎湖縣',
  '彰化縣', '連江縣',
];

// STEP 1：從 props 中取出 setCurrentPage 方法
const WeatherSetting2 = ({ setCurrentPage }) => {

  // STEP 2：使用 useRef 建立一個 ref，取名為 inputLocationRef
  const inputLocationRef = useRef(null);

  // STEP 1：定義 handleSave 方法
  const handleSave = () => {
    // STEP 4：
    // 透過 inputLocationRef.current 可以指稱到該 input 元素
    // 透過 inputLocationRef.current.value 即可取得該 input 元素的值
    const locationName = inputLocationRef.current.value;
    console.log(locationName);

    // STEP 2：判斷使用者填寫的地區是否包含在 locations 陣列內
    if (locations.includes(locationName)) {
      // TODO: 儲存地區資訊...
      console.log(`儲存的地區資訊為：${locationName}`);

      // STEP 3：透過 setCurrentPage 導回天氣資訊頁
      setCurrentPage('WeatherCard');
    } else {
      // STEP 4：若不包含在 locations 內，則顯示錯誤提示
      alert(`儲存失敗：您輸入的 ${locationName} 並非有效的地區`);
      return;
    }
  };

  return (
    <WeatherSettingWrapper>
      {console.log('render')}
      <Title>設定(2)</Title>
      <StyledLabel htmlFor="location">地區</StyledLabel>
       
      {/* STEP 3：將 useRef 回傳的物件，指稱為該 input 元素 */}
      {/* STEP 5：在 uncontrolled components 中可以使用 defaultValue 定義預設值 */}

      <StyledInputList 
        list="location-list" 
        id="location" 
        name="location" 
        ref={inputLocationRef}
        defaultValue="台南市"
      />

      <datalist id="location-list">
        {/* 利用迴圈的方式跑出所有 option */}
        {locations.map(location => (
          <option value={location} key={location} />
        ))}
      </datalist>

      <ButtonGroup>
        {/* STEP 2：呼叫 setCurrentPage 方法來換頁 */}
        <Back onClick={() => setCurrentPage('WeatherCard')}>返回</Back>
        {/* STEP 5：將 handleSave 綁定在 onClick 事件 */}
        <Save onClick={handleSave}>儲存</Save>
      </ButtonGroup>
    </WeatherSettingWrapper>
  );
};

export default WeatherSetting2;