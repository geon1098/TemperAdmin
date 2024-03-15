<template>
  <div class="container">
    <h1>{{ getCurrentMonth(currentPage) }}월 {{ getCurrentYear(currentPage) }}년</h1>

    <!-- 테이블 부분 -->
    <div class="temperature-table">
      <table>
        <!-- 테이블 헤더 -->
        <thead>
          <tr>
            <th scope="col">일</th>
            <th scope="col">09시</th>
            <th scope="col">13시</th>
            <th scope="col">17시</th>
            <th scope="col">점검자 이름</th>
            <th scope="col">점검 결과</th>
          </tr>
        </thead>
        <!-- 테이블 바디 -->
        <tbody>
          <!-- eslint-disable-next-line -->
          <tr v-for="(item, index) in visibleTemperatures" :key="index">
  <td>{{ getCurrentDate(index) }}</td>
  <td @click="showModal(index, '09:00')"> {{ convertToNumber(item['09:00'].value) || '-' }}</td>
  <td @click="showModal(index, '13:00')"> {{ convertToNumber(item['13:00'].value) || '-' }}</td>
  <td @click="showModal(index, '17:00')"> {{ convertToNumber(item['17:00'].value) || '-' }}</td>
  <td>{{ selectedTemperature && selectedTemperature.checker !== null ? selectedTemperature.checker : '-' }}</td>
  <td @click="togglecolor(index)">{{ ballcolor[index] ? '⚫' : '⚪' }}</td>
</tr>
        </tbody>
      </table>
    </div>

    <!-- 페이징 부분 -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">이전</button>
      <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="{ active: page === currentPage }">{{ page }}</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">다음</button>
    </div>

    <!-- 모달 부분 -->
    <div v-if="modalVisible" class="modal">
      <div class="modal-content">
        <h2>{{ selectedTemperature.date }}일 {{ selectedTemperature.time }} 시 온도 수정하기</h2>
        <label for="value">온도:</label>
        <input type="number" step="0.1" id="value" v-model="selectedTemperature.temperature">
        <label for="checker">점검자:</label>
        <input type="text" id="checker" v-model="selectedTemperature.checker">
        <button @click="updateTemperature">수정</button>
        <button @click="closeModal">닫기</button>

        <!-- 파일 선택 부분 -->
        <div class="modal-buttons">
          <input type="file" @change="handleFileUpload">
          <button @click="captureFromCamera">카메라로 캡쳐</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Tesseract from 'tesseract.js';

export default {
  data() {
    return {
      temperatures: [],
      selectedTemperature: [],
      ballcolor: Array(360).fill(false),
      imageSrc: null,
      selectedTime: null,
      selectedRowIndex: null,
      currentPage: 1,
      pageSize: 30,
      baseYear: 2024,
      modalVisible: false
    };
  },
  computed: {
    visibleTemperatures() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.temperatures.slice(startIndex, startIndex + this.pageSize)
        .map(item => ({
          '09:00': { ...item['09:00'], checker: item['09:00'] && item['09:00'].checker !== null ? item['09:00'].checker : '' },
          '13:00': { ...item['13:00'], checker: item['13:00'] && item['13:00'].checker !== null ? item['13:00'].checker : '' },
          '17:00': { ...item['17:00'], checker: item['17:00'] && item['17:00'].checker !== null ? item['17:00'].checker : '' },
        }));
    },
    totalPages() {
      return Math.ceil(this.temperatures.length / this.pageSize);
    },
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageSrc = URL.createObjectURL(file);
        this.extractTextFromImage(file);
      } else {
        console.log('파일 선택이 취소되었습니다.');
        this.resetImageData();
      }
    },
    async captureFromCamera() {
      const video = document.createElement('video');
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
          video.play();
          video.onloadedmetadata = () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageDataURL = canvas.toDataURL('image/png');
            this.imageSrc = imageDataURL;
            this.extractTextFromImage(imageDataURL);
            video.srcObject.getTracks().forEach(track => track.stop());
          };
        })
        .catch((error) => {
          console.error('카메라 접근 중 오류 발생:', error);
        });
    },
    extractTextFromImage(file) {
      Tesseract.recognize(
        file,
        'kor',
        { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        this.updateTemperatureFromText(text);
        //추출한 텍스트를 서버로 전송.
        this.sendTemperatureData(text);
      }).catch(error => {
        console.error('OCR 중 오류 발생:', error);
      });
    },
    updateTemperature() {
      const { date, time, temperature, checker } = this.selectedTemperature;
      const index = (this.currentPage - 1) * this.pageSize + this.selectedRowIndex;

      const requestData = {
        id: this.temperatures[index].id,
        temperature09: time === '09:00' ? temperature : null,
        temperature13: time === '13:00' ? temperature : null,
        temperature17: time === '17:00' ? temperature : null,
        checker: checker,
      };

      axios.post('/api/saveTemperature', requestData)
        .then(response => {
          console.log('온도 데이터가 성공적으로 전송됨1:', response.data);
          // 서버로부터 응답을 받은 후 로컬 데이터 업데이트
          this.updateLocalData(index, time, temperature, checker);
        })
        .catch(error => {
          console.error('에러:', error);
        });

      this.closeModal();
    },
    updateLocalData(index, time, temperature, checker) {
  // this.$set(this.temperatures[index], time, { value: temperature, checker: checker });
  this.temperatures[index][time] = { value: temperature, checker: checker };
},
showModal(index, time) {
  this.selectedRowIndex = index;
  this.selectedTime = time;
  const temperatureData = this.temperatures[index][time];
  this.selectedTemperature = {
    date: this.getCurrentDate(index),
    time: time,
    temperature: temperatureData.value || '',
    checker: temperatureData.checker !== null ? temperatureData.checker : '',
    text: this.temperatures[index].text || '',
  };
  this.modalVisible = true;
},
    closeModal() {
      this.selectedTemperature = null;
      this.modalVisible = false;
    },
    togglecolor(index) {
      this.ballcolor[index] = !this.ballcolor[index];
    },
    convertToNumber(text) {
      return text ? Number(text).toFixed(1) : null;
    },
    updateTemperatureFromText(extractedText) {
      const numbers = extractedText.match(/(\d+(\.\d+)?)/g);
      if (numbers) {
        const temperature = parseFloat(numbers[0]);
        if (temperature >= 2 && temperature <= 6) {
          if (this.selectedRowIndex !== null && this.selectedTime !== null) {
            this.temperatures[this.selectedRowIndex][this.selectedTime].value = temperature;
          }
        }
      }
    },
    resetImageData() {
      this.imageSrc = null;
      this.selectedTemperature = null;
      this.selectedTime = null;
      this.selectedRowIndex = null;
    },
    changePage(page) {
      this.currentPage = page;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    getCurrentMonth(page) {
      const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
      return months[(page - 1) % 12];
    },
    getCurrentYear(page) {
      return this.baseYear + Math.floor((page - 1) / 12);
    },
    getCurrentDate(index) {
      const year = this.baseYear + Math.floor((this.currentPage - 1) / 12);
      const month = (this.currentPage - 1) % 12 + 1;
      const startDate = new Date(year, month - 1, 1);
      const daysInMonth = new Date(year, month, 0).getDate();
      const date = startDate.getDate() + index;
      return date <= daysInMonth ? date : '';
    },
    sendTemperatureData(text) {
      const { time, temperature, checker } = this.selectedTemperature;
      axios.post('/api/saveTemperature', {
        temperature09: time === '09:00' ? temperature : null,
        temperature13: time === '13:00' ? temperature : null,
        temperature17: time === '17:00' ? temperature : null,
        checker: time === '09:00' ? checker : null,
        text: text,
      })
        .then(response => {
          console.log('온도 데이터가 성공적으로 전송됨:', response.data);
        })
        .catch(error => {
          console.error('에러:', error);
        });
    },
  },
  created() {
    for (let i = 0; i < 360; i++) {
      this.temperatures.push({
        '09:00': { value: '', checker: '' },
        '13:00': { value: '', checker: '' },
        '17:00': { value: '', checker: '' },
      });
    }
  },
};
</script>


<style>
.container {
  padding: 20px;
}

.image-upload {
  margin-bottom: 20px;
}

.uploaded-image {
  margin-top: 20px;
}

.temperature-table table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.temperature-table th, .temperature-table td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
.temperature-table th {
  background-color: #f2f2f2;
}
.modal {
  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  z-index: 9999; 
  background-color: rgba(0, 0, 0, 0.7); 
  width: 100%;
  height: 100%;
}

.modal-content {
  position: relative;
  background-color: #0e406a;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  margin: auto;
}

.modal-content h2 {
  color: #fff;
  margin-bottom: 20px;
}

.modal-content label {
  color: #fff; 
  display: block; 
  margin-bottom: 10px;
}

.modal-content input[type="number"],
.modal-content input[type="text"] {
  width: calc(100% - 24px); 
  padding: 8px 12px;
  border: none; 
  border-radius: 5px;
  background-color: #fff;
}

.modal-content input[type="number"] {
  margin-bottom: 15px; 
}

.modal-content button {
  background-color: #174592;
  color: white;
  border: none; 
  padding: 10px 20px; 
  border-radius: 5px; 
  cursor: pointer; 
  margin-right: 10px; 
}

.modal-content button:last-child {
  margin-right: 0; 
}

.modal-content button:hover {
  background-color: #082943;
}
.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
.pagination button {
  margin: 0 5px;
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background-color: #fff;
}
.pagination button.active {
  background-color: #4CAF50;
  color: white;
}
.camera-capture button {
  margin-bottom: 10px;
}
.modal-buttons input[type="file"] {
  margin-right: 10px;
}
</style>