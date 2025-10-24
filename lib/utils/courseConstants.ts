import { ModuleData } from "./types";

export const courseData = {
  courseName: "Foundations of Artificial Intelligence: A Beginner’s Guide",
  modules: [
    "What is Artificial Intelligence?",
    "History and Evolution of AI",
    "Core Concepts: Data, Algorithms, and Logic",
    "Introduction to Machine Learning",
    "Supervised Learning: Regression and Classification",
    "Unsupervised Learning: Clustering and Association",
    "Introduction to Deep Learning and Neural Networks",
    "Natural Language Processing (NLP) Basics",
    "Computer Vision Fundamentals",
    "Reinforcement Learning Concepts",
    "Ethical AI and Societal Impact",
    "Getting Started with AI Tools and Projects",
  ],
};

export const modulesData = [
  {
    moduleId: "cmh28rvr8000uu9uk33c24hwm",
    moduleTitle: "What is Artificial Intelligence?",
    description:
      "This module introduces the fundamental concept of Artificial Intelligence (AI), exploring its definition, goals, and various forms, including Narrow AI (ANI), General AI (AGI), and Superintelligence (ASI). We will delve into what it means for a machine to 'think' or 'reason' and discuss the overarching vision of AI research. \n" +
      "\n" +
      "**Example:** A common example of Narrow AI is a spam filter in your email, which uses AI to classify incoming emails as legitimate or junk based on learned patterns, without possessing general human-like intelligence.",
    referenceVideo: "https://www.youtube.com/watch?v=JmlVs8ugJkQ",
    referenceSite:
      "https://www.ibm.com/cloud/learn/what-is-artificial-intelligence",
  },
  {
    moduleId: "cmh28rvr8000vu9ukkm88f8ve",
    moduleTitle: "History and Evolution of AI",
    description:
      "Explore the rich history of Artificial Intelligence, tracing its roots from ancient philosophical ponderings about intelligent machines to modern breakthroughs. This module covers key milestones, influential figures like Alan Turing and John McCarthy, periods of 'AI winter,' and the recent resurgence driven by advancements in computing power and data. \n" +
      "\n" +
      "**Example:** One significant historical event was IBM's Deep Blue chess computer defeating world champion Garry Kasparov in 1997, a landmark moment demonstrating AI's capability in complex strategic tasks.",
    referenceVideo: "https://www.youtube.com/watch?v=zJg5yU44CqE",
    referenceSite:
      "https://www.britannica.com/technology/artificial-intelligence/History",
  },
  {
    moduleId: "cmh28rvr8000wu9ukq2swlexi",
    moduleTitle: "Core Concepts: Data, Algorithms, and Logic",
    description:
      "This module lays the groundwork for understanding how AI systems operate by examining its three core pillars: Data, Algorithms, and Logic. Learn how data fuels AI, how algorithms provide the step-by-step instructions for processing that data, and how logical rules underpin decision-making in symbolic AI. \n" +
      "\n" +
      "**Example:** Consider a simple weather prediction system. It uses historical weather records (Data), applies a statistical model (Algorithm) to find patterns, and might use predefined rules (Logic) like 'if temperature > 30C and humidity > 80%, then predict heavy rainfall' to make forecasts.",
    referenceVideo: "https://www.youtube.com/watch?v=kYJj8w-1J00",
    referenceSite:
      "https://towardsdatascience.com/data-algorithms-and-ai-659f81f1b67d",
  },
  {
    moduleId: "cmh28rvr8000xu9uktphh55zt",
    moduleTitle: "Introduction to Machine Learning",
    description:
      "Dive into Machine Learning (ML), a powerful subset of AI that enables systems to learn from data without being explicitly programmed. This module introduces the fundamental principles of ML, including different learning paradigms such as supervised, unsupervised, and reinforcement learning, and their wide range of applications. \n" +
      "\n" +
      "**Example:** A classic application is spam detection: an ML model learns from a dataset of emails labeled as 'spam' or 'not spam' to identify and filter out unwanted messages in the future.",
    referenceVideo: "https://www.youtube.com/watch?v=K_k3WmfUaV0",
    referenceSite:
      "https://developers.google.com/machine-learning/crash-course/ml-intro",
  },
  {
    moduleId: "cmh28rvr9000yu9ukvwadsapn",
    moduleTitle: "Supervised Learning: Regression and Classification",
    description:
      "This module provides a detailed exploration of Supervised Learning, a machine learning approach where models learn from labeled datasets. We will differentiate between its two primary types: Regression, used for predicting continuous values, and Classification, used for predicting discrete categories or labels. \n" +
      "\n" +
      "**Example:** For Regression, predicting the future price of a house based on features like size, location, and number of bedrooms. For Classification, determining if an image contains a 'cat' or 'dog'.",
    referenceVideo: "https://www.youtube.com/watch?v=0k57eamCH2s",
    referenceSite:
      "https://towardsdatascience.com/supervised-learning-regression-vs-classification-881c264a4d95",
  },
  {
    moduleId: "cmh28rvr9000zu9ukucnde41o",
    moduleTitle: "Unsupervised Learning: Clustering and Association",
    description:
      "Explore Unsupervised Learning, a machine learning technique where models discover hidden patterns and structures in unlabeled data without explicit guidance. This module focuses on two key unsupervised methods: Clustering, which groups similar data points together, and Association Rule Mining, which identifies relationships between variables. \n" +
      "\n" +
      "**Example:** Clustering can be used for customer segmentation, grouping customers with similar purchasing behaviors for targeted marketing. Association rules might reveal that 'customers who buy bread also tend to buy milk,' which is valuable for retail store layouts.",
    referenceVideo: "https://www.youtube.com/watch?v=ZfXq5jOh02k",
    referenceSite: "https://www.ibm.com/cloud/learn/unsupervised-learning",
  },
  {
    moduleId: "cmh28rvr90010u9uktyg2emrw",
    moduleTitle: "Introduction to Deep Learning and Neural Networks",
    description:
      "Delve into Deep Learning, a specialized subfield of machine learning that utilizes artificial neural networks with multiple layers to learn complex patterns from vast amounts of data. This module introduces the architecture of neural networks, including neurons, layers, weights, and activation functions. \n" +
      "\n" +
      "**Example:** Image recognition systems that can distinguish between thousands of different objects (e.g., identifying a specific breed of dog) often employ deep convolutional neural networks due to their ability to automatically learn hierarchical features from raw image pixels.",
    referenceVideo: "https://www.youtube.com/watch?v=aircAruvnKk",
    referenceSite:
      "https://www.nvidia.com/en-us/deep-learning/what-is-deep-learning/",
  },
  {
    moduleId: "cmh28rvr90011u9uk81pnhvi3",
    moduleTitle: "Natural Language Processing (NLP) Basics",
    description:
      "This module introduces Natural Language Processing (NLP), the branch of AI that enables computers to understand, interpret, and generate human language. We will cover fundamental NLP tasks such as text tokenization, sentiment analysis, named entity recognition, and the basics of machine translation. \n" +
      "\n" +
      "**Example:** A virtual assistant like Siri or Google Assistant uses NLP to understand your spoken commands and queries, converting your speech into text, parsing its meaning, and then formulating an appropriate response.",
    referenceVideo: "https://www.youtube.com/watch?v=Xy_t5b9tWKA",
    referenceSite:
      "https://www.ibm.com/cloud/learn/natural-language-processing",
  },
  {
    moduleId: "cmh28rvr90012u9ukd5vl88fp",
    moduleTitle: "Computer Vision Fundamentals",
    description:
      "Explore Computer Vision, a field of AI that allows computers to 'see' and interpret visual information from the world, much like humans do. This module covers core concepts including image processing, feature extraction, object detection, image classification, and facial recognition. \n" +
      "\n" +
      "**Example:** Self-driving cars heavily rely on computer vision to interpret their surroundings, identifying traffic signs, pedestrians, other vehicles, and lane markings to navigate safely.",
    referenceVideo: "https://www.youtube.com/watch?v=wzJg2gTf5Gg",
    referenceSite:
      "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-computer-vision/",
  },
  {
    moduleId: "cmh28rvr90013u9ukha8herji",
    moduleTitle: "Reinforcement Learning Concepts",
    description:
      "Dive into Reinforcement Learning (RL), a machine learning paradigm where an agent learns to make optimal decisions by interacting with an environment to maximize a cumulative reward. This module introduces key concepts such as agents, environments, states, actions, rewards, and the exploration-exploitation dilemma. \n" +
      "\n" +
      "**Example:** An AI trained to play a game like chess or Go uses reinforcement learning. It learns the best moves by trial and error, receiving rewards for winning and penalties for losing, gradually improving its strategy over many game iterations.",
    referenceVideo: "https://www.youtube.com/watch?v=Jm-z8zXQ-50",
    referenceSite:
      "https://www.deepmind.com/learning-resources/reinforcement-learning-from-scratch",
  },
  {
    moduleId: "cmh28rvr90014u9ukrb59d0cl",
    moduleTitle: "Ethical AI and Societal Impact",
    description:
      "This module addresses the critical ethical considerations and societal impacts of Artificial Intelligence. We will discuss challenges related to algorithmic bias, fairness, privacy, accountability, and the broader implications for employment, economy, and human autonomy as AI becomes more pervasive. \n" +
      "\n" +
      "**Example:** A hiring algorithm that inadvertently discriminates against certain demographic groups due to biases present in its training data raises significant ethical concerns about fairness and equality in employment.",
    referenceVideo: "https://www.youtube.com/watch?v=cM4C26_C_yY",
    referenceSite:
      "https://www.brookings.edu/topics/artificial-intelligence-ai/",
  },
  {
    moduleId: "cmh28rvr90015u9ukrx928nkt",
    moduleTitle: "Getting Started with AI Tools and Projects",
    description:
      "Equip yourself with the practical knowledge to start your AI journey. This module introduces popular programming languages like Python, essential libraries and frameworks such as TensorFlow, PyTorch, and Scikit-learn, and platforms like Google Colab and Kaggle. It encourages hands-on learning through mini-projects. \n" +
      "\n" +
      "**Example:** You could start by building a simple image classifier that distinguishes between cats and dogs using Python with TensorFlow, leveraging a pre-trained model or a small dataset from Kaggle.",
    referenceVideo: "https://www.youtube.com/watch?v=7DHdE-B_s40",
    referenceSite: "https://www.tensorflow.org/tutorials",
  },
];

export const QuizData = [
  {
    question:
      "Which type of Artificial Intelligence is designed to perform a single, specific task extremely well, often outperforming humans in that narrow domain?",
    options: [
      "Artificial General Intelligence (AGI)",
      "Artificial Super Intelligence (ASI)",
      "Artificial Narrow Intelligence (ANI)",
      "Artificial Emotional Intelligence (AEI)",
    ],
    answer: { optionNumber: 3, answer: "Artificial Narrow Intelligence (ANI)" },
  },
  {
    question:
      "What significant event in 1956 is widely considered the birthplace of Artificial Intelligence as a formal academic discipline?",
    options: [
      "The invention of the World Wide Web",
      "The creation of the first personal computer",
      "The Dartmouth Workshop",
      `The publication of Alan Turing's "Computing Machinery and Intelligence"`,
    ],
    answer: { optionNumber: 3, answer: "The Dartmouth Workshop" },
  },
  {
    question:
      "In the context of AI systems, what serves as the raw material that an algorithm processes to learn patterns or make decisions?",
    options: ["Logic", "Heuristics", "Data", "Metadata"],
    answer: { optionNumber: 3, answer: "Data" },
  },
  {
    question:
      "What is the primary distinction between traditional programming and Machine Learning?",
    options: [
      "Traditional programming uses object-oriented languages, while ML uses functional languages.",
      "Traditional programming requires explicit instructions for every task, while ML systems learn from data.",
      "Traditional programming only works on structured data, while ML handles unstructured data.",
      "Traditional programming always produces deterministic output, while ML output is always probabilistic.",
    ],
    answer: {
      optionNumber: 2,
      answer:
        "Traditional programming requires explicit instructions for every task, while ML systems learn from data.",
    },
  },
  {
    question:
      "In Supervised Learning, which task involves predicting a continuous numerical value, such as predicting house prices or temperature?",
    options: [
      "Classification",
      "Clustering",
      "Regression",
      "Association Rule Mining",
    ],
    answer: { optionNumber: 3, answer: "Regression" },
  },
  {
    question:
      "What is the main characteristic of Unsupervised Learning algorithms?",
    options: [
      "They learn from labeled datasets to predict outcomes.",
      "They learn through trial and error with a reward system.",
      "They discover patterns and structures in unlabeled data.",
      "They require human intervention at every decision point.",
    ],
    answer: {
      optionNumber: 3,
      answer: "They discover patterns and structures in unlabeled data.",
    },
  },
  {
    question:
      "Which fundamental component of an Artificial Neural Network is responsible for applying a non-linear transformation to the weighted sum of inputs, introducing complexity into the model?",
    options: ["Weight", "Bias", "Neuron", "Activation Function"],
    answer: { optionNumber: 4, answer: "Activation Function" },
  },
  {
    question:
      "The NLP task of breaking down a text into smaller units, typically words or phrases, is known as:",
    options: [
      "Lemmatization",
      "Stemming",
      "Tokenization",
      "Part-of-Speech Tagging",
    ],
    answer: { optionNumber: 3, answer: "Tokenization" },
  },
  {
    question:
      "Which Computer Vision task aims to identify and locate one or more objects within an image, often by drawing bounding boxes around them?",
    options: [
      "Image Classification",
      "Object Detection",
      "Image Segmentation",
      "Facial Recognition",
    ],
    answer: { optionNumber: 2, answer: "Object Detection" },
  },
  {
    question:
      "In Reinforcement Learning, what does an 'agent' primarily learn to do by interacting with an environment?",
    options: [
      "To classify data into predefined categories.",
      "To group similar data points together.",
      "To make optimal decisions to maximize cumulative reward.",
      "To generate human-like text responses.",
    ],
    answer: {
      optionNumber: 3,
      answer: "To make optimal decisions to maximize cumulative reward.",
    },
  },
];

const modulesTitlesWithIdAndDesc: any[] = [
  {
    moduleId: "cmh28rvr8000uu9uk33c24hwm",
    courseId: "cmh28rvr8000tu9ukvjgil5c0",
    title: "What is Artificial Intelligence?",
    description: "",
  },
  {
    moduleId: "cmh28rvr8000vu9ukkm88f8ve",
    courseId: "cmh28rvr8000tu9ukvjgil5c0",
    title: "History and Evolution of AI",
    description: "",
  },
  {
    moduleId: "cmh28rvr8000wu9ukq2swlexi",
    courseId: "cmh28rvr8000tu9ukvjgil5c0",
    title: "Core Concepts: Data, Algorithms, and Logic",
    description: "",
  },
  {
    moduleId: "cmh28rvr8000xu9uktphh55zt",
    courseId: "cmh28rvr8000tu9ukvjgil5c0",
    title: "Introduction to Machine Learning",
    description: "",
  },
  {
    moduleId: "cmh28rvr9000yu9ukvwadsapn",
    courseId: "cmh28rvr8000tu9ukvjgil5c0",
    title: "Supervised Learning: Regression and Classification",
    description: "",
  },
  {
    moduleId: "cmh28rvr9000zu9ukucnde41o",
    courseId: "cmh28rvr8000tu9ukvjgil5c0",
    title: "Unsupervised Learning: Clustering and Association",
    description: "",
  },
  {
    moduleId: "cmh28rvr90010u9uktyg2emrw",
    courseId: "cmh28rvr8000tu9ukvjgil5c0",
    title: "Introduction to Deep Learning and Neural Networks",
    description: "",
  },
  {
    moduleId: "cmh28rvr90011u9uk81pnhvi3",
    courseId: "cmh28rvr8000tu9ukvjgil5c0",
    title: "Natural Language Processing (NLP) Basics",
    description: "",
  },
  {
    moduleId: "cmh28rvr90012u9ukd5vl88fp",
    courseId: "cmh28rvr8000tu9ukvjgil5c0",
    title: "Computer Vision Fundamentals",
    description: "",
  },
  {
    moduleId: "cmh28rvr90013u9ukha8herji",
    courseId: "cmh28rvr8000tu9ukvjgil5c0",
    title: "Reinforcement Learning Concepts",
    description: "",
  },
  {
    moduleId: "cmh28rvr90014u9ukrb59d0cl",
    courseId: "cmh28rvr8000tu9ukvjgil5c0",
    title: "Ethical AI and Societal Impact",
    description: "",
  },
  {
    moduleId: "cmh28rvr90015u9ukrx928nkt",
    courseId: "cmh28rvr8000tu9ukvjgil5c0",
    title: "Getting Started with AI Tools and Projects",
    description: "",
  },
];

export const modulesTitlesWithId: any[] = [
  {
    moduleId: "cmh28rvr8000uu9uk33c24hwm",
    title: "What is Artificial Intelligence?",
    description: "",
  },
  {
    moduleId: "cmh28rvr8000vu9ukkm88f8ve",
    title: "History and Evolution of AI",
    description: "",
  },
  {
    moduleId: "cmh28rvr8000wu9ukq2swlexi",
    title: "Core Concepts: Data, Algorithms, and Logic",
    description: "",
  },
  {
    moduleId: "cmh28rvr8000xu9uktphh55zt",
    title: "Introduction to Machine Learning",
    description: "",
  },
  {
    moduleId: "cmh28rvr9000yu9ukvwadsapn",
    title: "Supervised Learning: Regression and Classification",
    description: "",
  },
  {
    moduleId: "cmh28rvr9000zu9ukucnde41o",
    title: "Unsupervised Learning: Clustering and Association",
    description: "",
  },
  {
    moduleId: "cmh28rvr90010u9uktyg2emrw",
    title: "Introduction to Deep Learning and Neural Networks",
    description: "",
  },
  {
    moduleId: "cmh28rvr90011u9uk81pnhvi3",
    title: "Natural Language Processing (NLP) Basics",
    description: "",
  },
  {
    moduleId: "cmh28rvr90012u9ukd5vl88fp",
    title: "Computer Vision Fundamentals",
    description: "",
  },
  {
    moduleId: "cmh28rvr90013u9ukha8herji",
    title: "Reinforcement Learning Concepts",
    description: "",
  },
  {
    moduleId: "cmh28rvr90014u9ukrb59d0cl",
    title: "Ethical AI and Societal Impact",
    description: "",
  },
  {
    moduleId: "cmh28rvr90015u9ukrx928nkt",
    title: "Getting Started with AI Tools and Projects",
    description: "",
  },
];
