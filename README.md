# 🎨 Guess the Style Transferred Images 🎮  

An interactive game where you **identify the content and style images** used to create a **stylized image** via **neural style transfer**.  
Test your ability to recognize styles, challenge yourself with a timer-based scoring system, and enjoy a fun, educational experience in AI-powered art!  

---

## 🌟 Inspiration  

I've always loved playing games, and developing them. I've particularly enjoyed Google's Arts and Culture games for a while now, and what fascinates me about them is that they often teach you something in a fun way. \
One day, while browsing computer vision applications, I was introduced to the concept of neural style transfer — a fascinating technique that blends different images to create an artistic result. This immediately caught my attention, and I thought: \
💡 "What if I could make a game around this?" \
I remembered Google's games, like _Say What You See, Un-Dough,_ and _Odd One Out_, where you or the system had to _guess_ something based on clues. I became inspired to craft an idea for a "reverse" style transfer game — where the player must guess the original content and style images that created a given stylized output, and teach a thing or two along the way. 

---

## 🎨 What is Style Transfer?  
**Neural Style Transfer (NST)** is a deep learning technique that applies the artistic style of one image to another image.  

For example, an AI can take a mountain landscape and transform it into a Van Gogh-style painting!

| **Content Image** | **Style Image** | **Stylized Output** |
|------------------|---------------|-------------------|
| ![Content](https://aasraecotreks.com.np/wp-content/uploads/2019/01/Island-Peak.jpg) | ![Style](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg) | ![Stylized](https://i.ibb.co/HsbtQDp/Screenshot-2025-03-25-at-3-44-53-PM.png) |

A fundamental aspect of Style Transfer is that it preserves the content image - that is, you can still see the mountain in the result image above - but it transfers the style (such as the colors, strokes, and textures) of the style image, as you can also see in the result.

To further illustrate, notice how the bird is visible in the output, but painted very much like the style image?
<img src="https://miro.medium.com/v2/resize:fit:1042/1*9fmqtmtM3k9Utnr_pSqVOA.png" alt="style transfer example with bird" width="500"> \
Likewise, the cat here is maintained throughout the outputs but it's colored like the style images.
<img src="https://xebia.com/wp-content/uploads/2023/11/style-transfer-example.jpg" alt="style transfer example with cat" width="500"/>

That's how Style Transfer looks. Pretty cool, right?

### How does it work?

There are a few key steps that are generally involved in Style Transfer. Simply put:

1. The images are carefully analyzed.
- The model uses a pre-trained deep learning model (VGG-19), originally trained to recognize objects in photos.
- The model extracts details about shapes and structure (content) as well as textures and colors (style).

2. Information about the content and style images is extracted.
- The content image tells the model what should stay the same - this keeps the shapes and structure intact in the result.
- The style image tells the model how to change the texture, adding brush strokes, patterns, and colors.

3. A new image is formed.
- The model starts with a rough guess (often just noise) and gradually changes it using trial and error (a process known as _gradient descent_).
- It compares the new image with the content and style images and tweaks it hundreds of times until the balance looks right!

The model I leveraged is optimized - it produces better results than the norm.
- It uses a fancy Wasserstein distance (a way to compare images more accurately) to ensure textures look natural in the result.
- It also applies a smoothing technique to prevent the image from looking too messy or noisy (essentially, averaging the results over multiple rounds).
- It learns faster by keeping track of progress and progressively scaling the result at higher resolutions.

That's how Style Transfer works! For more info, you can simply search it up, or read the articles posted in Credits which I found helpful.

---

## ⚙️ Development Process  
It all started with 

---

## 💻 Tech Stack  
🔹 **Frontend**: React.js, CSS \
🔹 **Style Transfer AI**: [crowsonkb's Pytorch Model](https://github.com/crowsonkb/style-transfer-pytorch) \
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

Demo:

---

## 📜 Credits  
🎨 **Style Transfer Model:**  
- [PyTorch Style Transfer](https://github.com/crowsonkb/style-transfer-pytorch)  

🖼 **Image Datasets Used:**  
- [Impressionist Landscapes](https://www.kaggle.com/datasets/robgonsalves/impressionistlandscapespaintings)  
- [Landscape Pictures](https://www.kaggle.com/arnaud58/landscape-pictures)  
- [Paintings Dataset](https://www.kaggle.com/datasets/heyitsfahd/paintings)  
- [AI-Generated U.S. Cities](https://www.kaggle.com/datasets/jeremycmorgan/photgraphs-of-1000-u-s-cities-ai-generated)  

🤔 **Helpful Articles**
- https://medium.com/data-science-group-iitr/artistic-style-transfer-with-convolutional-neural-network-7ce2476039fd (on Style Transfer)
- https://poloclub.github.io/cnn-explainer/ (on Convolutional Neural Networks)

💻 **Built with ❤️ by [AdiBak]**  

---

## 🚀 Run Locally  
1️⃣ **Clone the Repository:**  
```bash
git clone https://github.com/yourusername/guess-the-style-transferred-images.git
cd guess-the-style-transferred-images
