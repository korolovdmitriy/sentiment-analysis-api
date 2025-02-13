require("@tensorflow/tfjs-node"); // Використовуємо Node.js backend для прискорення

const tf = require("@tensorflow/tfjs");
const toxicity = require("@tensorflow-models/toxicity");

const threshold = 0.9; // Поріг впевненості для класифікації токсичності
let model; // Змінна для моделі

// Функція для завантаження моделі
async function loadModel() {
  try {
    console.log("Завантаження моделі...");
    model = await toxicity.load(threshold);
    console.log("Модель успішно завантажено.");
  } catch (error) {
    console.error("Помилка під час завантаження моделі:", error);
    throw new Error("Не вдалося завантажити модель.");
  }
}

// Ініціалізація моделі при запуску
loadModel();

// Функція для аналізу тексту
exports.analyzeSentiment = async (text) => {
  if (!model) {
    throw new Error("Модель ще не завантажена. Будь ласка, спробуйте пізніше.");
  }

  try {
    // Класифікація тексту
    const predictions = await model.classify([text]);

    // Пошук токсичності серед результатів
    const result = predictions.find(
      (prediction) => prediction.label === "toxicity"
    );

    // Перевірка результату
    const sentiment = result.results[0].match ? "negative" : "positive";
    return sentiment;
  } catch (error) {
    console.error("Помилка під час аналізу тексту:", error);
    throw new Error("Не вдалося проаналізувати текст.");
  }
};

// Тестовий виклик функції (опційно)
async function testAnalysis() {
  const testText = "You are an amazing person!";
  try {
    const sentiment = await exports.analyzeSentiment(testText);
    console.log(`Sentiment of the text "${testText}":`, sentiment);
  } catch (error) {
    console.error("Помилка під час тестового аналізу:", error);
  }
}

testAnalysis();
