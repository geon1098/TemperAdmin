<template>
    <div class="header-component">
      <h2 class="textt0">온도 관리</h2>
      <div class="header-info">
        <p class="textt1">장비명: 검체냉장고</p>
        <p class="textt2">설치장소: 병리과</p>
        <p class="textt3">허용온도: 2~6(°C)</p>
        <p class="textt1">점검 온도 (°C)</p>
        <p class="textt1">(적합:⚫ / 부적합:⚪)</p>
      </div>
    </div>
  </template>
  
  <style>
  .header-component {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .textt0 {
    font-size: 24px;
    margin-bottom: 15px;
  }
  
  .header-info p {
    margin: 0;
    font-size: 16px;
  }
  
  .textt1, .textt2, .textt3 {
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
  }
  
  .textt1:last-child, .textt2:last-child, .textt3:last-child {
    border-bottom: none;
  }
  </style>
    
    <script>
    export default {
      name: 'HeaderComponent'
    };
    </script>