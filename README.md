# 🎨 Guess the Style Transferred Images 🎮  

An interactive game where you **identify the content and style images** used to create a **stylized image** via **neural style transfer**.  
Test your ability to recognize styles, challenge yourself with a timer-based scoring system, and enjoy a fun, educational experience in AI-powered art!  

---

## 🎮 How to Play  
1️⃣ **Watch the intro video** (or skip it) to understand style transfer.  
2️⃣ **Observe the stylized image** (left side of screen).  
3️⃣ **Select two images** (from 4 choices) that represent the **original content & style**.  
4️⃣ **Earn points based on your speed!**  
5️⃣ **Use the "?" Help button** anytime to pause and learn more.  

💡 **Hint:** Pay close attention to shape, texture & color to find the correct match!  

Your score is based on how quickly you guess correctly:  
- **< 10 seconds → +100 points**  
- **10 - 20 seconds → +50 points**  
- **20 - 30 seconds → +20 points**  

Total points are displayed at the **bottom left** of the screen. A floating `+100`, `+50`, or `+20` appears when points are added.  

Demo:

https://github.com/user-attachments/assets/aaca7caa-00a5-4ccd-accd-8e0ff400f985

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

### Data Exploration and Model Selection

The first step involved finding suitable image datasets for the style transfer model. I focused on paintings, landscapes, and cityscapes, as these categories are commonly used in style transfer and well-suited for the game concept. After searching on Kaggle, I found relevant, high-quality datasets containing thousands of images in these categories, totaling approximately 1.1 GB.

Next, I experimented with various style transfer implementations, including [TensorFlow's](https://www.tensorflow.org/tutorials/generative/style_transfer) and [Pytorch's](https://pytorch.org/tutorials/advanced/neural_style_tutorial.html) tutorials, as well as open-source projects like [neural-style-transfer](https://pypi.org/project/neural-style-transfer/), [pastiche](https://pypi.org/project/pastiche/), [gordicaleksa's](https://github.com/gordicaleksa/pytorch-neural-style-transfer), and [crowsonkb's](https://github.com/crowsonkb/style-transfer-pytorch). Crowsonkb's PyTorch-based implementation produced the most visually appealing blend of content and style, so I chose it for this project. The provided Jupyter Notebook also made experimentation easier.

### Style Transfer Model and Game Data

The core game concept is for the player to guess the original content and style images that were used to create the stylized output. Each round presents four image options: two correct (content and style) and two incorrect.

To implement this, I needed a way to generate stylized images and store them along with their source images. Because of storage limitations for the web front-end, I needed image URLs instead of saving images locally. I chose Cloudinary, a content delivery network that provides image URLs via an API. I then modified the style transfer model's cli.py file (the main command-line interface) as follows:

- Image Upload and URL Retrieval: Added a function to upload images to Cloudinary and retrieve their URLs for use in the front-end.

- Iteration Image Tracking: Added an iteration_image_urls attribute to the Callback class to store the URLs of the intermediate images generated during each iteration of the style transfer process. This allows for creating a visual "animation" of the style transfer.

- Modified save_image(): The save_image() function now saves the image to Cloudinary and appends the resulting URL to the iteration_image_urls list.

- Added Incorrect Image Arguments: Added command-line arguments for the two incorrect image options to be displayed in the game.

- write_to_json() Method: Created a write_to_json() function that retrieves the Cloudinary URLs for the content, style, and incorrect image options. It then organizes this data (content URL, style URL, incorrect option URLs, and the list of iteration_image_urls) into a dictionary, and saves this dictionary to a cloud-based JSON "basket" using GetPantry. This JSON file stores all the data needed for each round of the game. This function is called at the end of the script once the final image is created.

To generate data for the game, I created helper functions in the Jupyter Notebook to randomly select four unique images from the image datasets (content, style, and two incorrect options). Finally, I ran the modified style transfer script 150 times in a loop using the command line, resulting in a large JSON file containing the data for 150 game rounds.

### Front-end Interface Implementation

I started by sketching out how the UI should look and function. The main idea was simple: display a stylized image alongside four possible source images—two correct (content and style) and two incorrect. To make the interface intuitive, I positioned the stylized image on the left (occupying 30% of the screen) and arranged the image options in a grid on the right (covering 65%).

Early on, I also considered how to provide clear user feedback. Initially, I used a basic JavaScript alert popup to indicate whether a guess was correct or incorrect. While functional, it felt abrupt and lacked visual engagement. To test the core gameplay, I built a JavaScript prototype on PlayCode.io, which confirmed that my idea worked. With a solid foundation, I transitioned to refining and enhancing the experience.

To develop the final version, I chose ReactJS because of its component-based structure and state management capabilities, which helped efficiently track game progress, selections, and animations. The implementation process involved:

- Fetching Game Data: The JSON file stored all game data, with each entry containing a stylized image, its source images, incorrect options, and style transfer iteration images. I set up React state variables to load and manage this data dynamically.

- Structuring the UI: I created a responsive layout where the stylized image remained fixed on the left, while the image options dynamically updated in the grid on the right.

- User Feedback: I wanted to make things responsive to user interaction. Primarily, the user would select images and be notified if the guess was correct or incorrect, so providing feedback involved:
  - Hover Effects: Enlarged images slightly and thickened their borders. 
  - Selection Effects: Clicking an image applies a pressed-down animation and a blue border to confirm selection. This allows users to see what they chose.
  - Guess Checking: When two images are selected, the game checks if they were correct and lets the user know.
    - If they're correct, they're highlighted in green and a confetti effect drops from the top of the screen.
    - If they're incorrect, briefly shake and turn red before resetting. 
    - In either case, a message is displayed after guessing that says if the guess was correct or not.

- Visualizing the Process: To help players understand style transfer as a stepwise transformation, I included a process visualization feature. 
  - After a correct guess, the user can click to see how the stylized image was made.
  - The game briefly displays intermediate stylization steps between the content and final stylized image. These frames appear in a smooth transition, giving a clear visual of how the style is progressively applied. This adds an educational layer to the game while making correct guesses feel more rewarding.

- Scoring: I introduced a dynamic scoring system based on how quickly correct guesses were made, with the time ranges being 0-10 seconds, 10-20 seconds, and 20-30 seconds and the awarded points being 100, 50, and 20, respectively. I could've further granularized the time intervals for specific amounts of points, but I thought this would complicate things. However, green floating text briefly shows the points acquired after a correct guess, which is a fun little animation. 

- Timer: To encourage faster decision-making, I implemented a countdown timer as a vertical bar positioned between the stylized image and the image option grid, keeping it well in the user's focus. The timer starts at 30 seconds per round and visually depletes with time, and I set its color to reflect the urgency: green when there's 20-30 seconds left, yellow when there's 10-20 seconds left, and red for the final 10 seconds. After time runs out, the correct guesses are highlighted with a message saying as such. 

- Introduction Video: Since many players may not be familiar with style transfer, I created an intro video that explains the concept before gameplay. 
  - Essentially, I crafted a PowerPoint presentation that depicted what it is, some examples of it, and the game's basic rules, and recorded the slideshow. 
  - I embedded this video in the code, allowing users to close it to skip to the game, or watch it entirely before a Play button appears.  

- Help Menu: To provide quick access to instructions, I added a Help Menu, accessible via a question mark button at the top right. 
  - Clicking it pauses the game and opens a window, which can be closed to resume the game.
  - I decided to describe three things in the menu, namely:
    - How to Play – Rules and mechanics, with an embedded demo video ("demo-play.mp4") showing a sample round.
    - What Style Transfer Is – A brief explanation and depiction.
    - Credits – Acknowledging the sources for the style transfer model and image datasets.

With these features in place, the game became intuitive, interactive, and educational. I think the combination of visual feedback, scoring mechanics, a timer, and helpful explanations make for an engaging experience while subtly teaching players about style transfer.

## Things to Add

- Perhaps some music while the user plays

---

## 💻 Tech Stack  

- **Frontend**: React.js, CSS 
- **Style Transfer AI**: [crowsonkb's Pytorch Model](https://github.com/crowsonkb/style-transfer-pytorch) 
- **Data Source:** JSON file mapping URLs of **stylized images** to their **content & style pairs**, 2 random (incorrect) options, and images captured during the style transfer process.  
- **JSON Bucket:** [getpantry.cloud](https://getpantry.cloud) 
- **Image CDN:** [Cloudinary](https://cloudinary.com/)
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
