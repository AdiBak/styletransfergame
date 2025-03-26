# 🎨 Guess the Style Transferred Images 🎮  

An interactive game where you **identify the content and style images** used to create a **stylized image** via **neural style transfer**.  
Test your ability to recognize styles, challenge yourself with a timer-based scoring system, and enjoy a fun, educational experience in AI-powered art!  

![Game Demo](public/demo-play.mp4) 

---

## 🌟 Inspiration  

I have played around with Google's Arts and Culture games for a while now, and what fascinates me about them is that they often teach you something in a fun way. \
Recently, while taking a computer vision course, I was introduced to the concept of neural style transfer—a fascinating technique that blends different images to create an artistic result. This immediately caught my attention, and I thought: \
💡 "What if I could make a game around this?" \
I remembered Google's games, like Say What You See, Un-Dough, and Odd One Out, where you or the system had to _guess_ something based on clues. I became inspired to craft an idea for a "reverse" style transfer game — where the player must guess the original content and style images that created a given stylized output, and teach a thing or two along the way. 

---

## 🎨 What is Style Transfer?  
**Neural Style Transfer (NST)** is a deep learning technique that applies the artistic style of one image to another image.  

For example, an AI can take a mountain landscape and transform it into a Van Gogh-style painting!

| **Content Image** | **Style Image** | **Stylized Output** |
|------------------|---------------|-------------------|
| ![Content](https://aasraecotreks.com.np/wp-content/uploads/2019/01/Island-Peak.jpg) | ![Style](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg) | ![Stylized](https://i.ibb.co/HsbtQDp/Screenshot-2025-03-25-at-3-44-53-PM.png) |
---

## ⚙️ Development Process  


---

## 💻 Tech Stack  
🔹 **Frontend**: React.js, CSS
🔹 **Style Transfer AI**: [crowsonkb's Pytorch Model](https://github.com/crowsonkb/style-transfer-pytorch)
🔹 **Data Source:** JSON file mapping **stylized images** to their **content & style pairs**, 2 random (incorrect) options, and images captured during the style transfer process.  

---

## 🎮 How to Play  
1️⃣ **Watch the intro video** (or skip it) to understand style transfer.  
2️⃣ **Observe the stylized image** (left side of screen).  
3️⃣ **Select two images** (from 4 choices) that represent the **original content & style**.  
4️⃣ **Earn points based on your speed!**  
5️⃣ **Use the "?" Help button** anytime to pause and learn more.  

💡 **Hint:** Pay close attention to textures & colors to find the correct match!  

Your score is based on how quickly you guess correctly:  
- **< 10 seconds → +100 points**  
- **10 - 20 seconds → +50 points**  
- **20 - 30 seconds → +20 points**  

Total points are displayed at the **bottom left** of the screen. A floating `+100`, `+50`, or `+20` appears when points are added.  

---

## 📜 Credits  
🎨 **Style Transfer Model:**  
- [PyTorch Style Transfer](https://github.com/crowsonkb/style-transfer-pytorch)  

🖼 **Image Datasets Used:**  
- [Impressionist Landscapes](https://www.kaggle.com/datasets/robgonsalves/impressionistlandscapespaintings)  
- [Landscape Pictures](https://www.kaggle.com/arnaud58/landscape-pictures)  
- [Paintings Dataset](https://www.kaggle.com/datasets/heyitsfahd/paintings)  
- [AI-Generated U.S. Cities](https://www.kaggle.com/datasets/jeremycmorgan/photgraphs-of-1000-u-s-cities-ai-generated)  

💻 **Built with ❤️ by [AdiBak]**  

---

## 🚀 Run Locally  
1️⃣ **Clone the Repository:**  
```bash
git clone https://github.com/yourusername/guess-the-style-transferred-images.git
cd guess-the-style-transferred-images
