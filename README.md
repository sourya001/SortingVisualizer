# 🎯 Enhanced Sorting Visualizer

A beautiful, interactive sorting algorithm visualizer built with React, Vite, and Framer Motion. This project provides real-time visual representation of popular sorting algorithms with smooth animations, statistics tracking, and comprehensive algorithm information.

![Sorting Visualizer Demo](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

## ✨ Features

### 🔧 Core Functionality
- **5 Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort
- **Real-time Visualization**: Watch algorithms work step-by-step with color-coded animations
- **Interactive Controls**: Adjustable array size (10-100 elements) and animation speed
- **Statistics Tracking**: Live comparison count, swap count, and execution time
- **Algorithm Information**: Detailed complexity analysis and descriptions

### 🎨 Visual Design
- **Modern UI**: Clean, professional interface with gradient backgrounds
- **Smooth Animations**: Powered by Framer Motion for fluid transitions
- **Color-coded Elements**:
  - 🔵 **Blue**: Default elements
  - 🟡 **Yellow**: Elements being compared
  - 🔴 **Red**: Elements being swapped
  - 🟢 **Green**: Sorted elements
  - 🟣 **Purple**: Pivot elements (Quick Sort)

### 📱 Responsive Design
- **Mobile-first**: Optimized for all screen sizes
- **Stable Layout**: No movement when adjusting controls
- **Touch-friendly**: Optimized for mobile interactions

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sourya001/SortingVisualizer.git
   cd SortingVisualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 🔍 Sorting Algorithms

### 1. **Bubble Sort**
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Description**: Compares adjacent elements and swaps them if they're in wrong order
- **Best for**: Educational purposes, small datasets

### 2. **Selection Sort**
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Description**: Finds minimum element and places it at the beginning
- **Best for**: Small datasets, memory-constrained environments

### 3. **Insertion Sort**
- **Time Complexity**: O(n²) worst case, O(n) best case
- **Space Complexity**: O(1)
- **Description**: Builds sorted array one element at a time
- **Best for**: Small datasets, nearly sorted arrays

### 4. **Merge Sort**
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(n)
- **Description**: Divide-and-conquer approach that merges sorted subarrays
- **Best for**: Large datasets, stable sorting required

### 5. **Quick Sort**
- **Time Complexity**: O(n log n) average, O(n²) worst case
- **Space Complexity**: O(log n)
- **Description**: Picks pivot and partitions array around it
- **Best for**: Large datasets, in-place sorting

## 🎮 How to Use

1. **Select Algorithm**: Choose from the 5 available sorting algorithms
2. **Adjust Array Size**: Use the slider to set array size (10-100 elements)
3. **Set Speed**: Control animation speed (1-100%)
4. **Generate New Array**: Click "Generate New Array" for random data
5. **Start Sorting**: Click "Start Sorting" to begin visualization
6. **Watch & Learn**: Observe the algorithm's behavior and track statistics

## 🛠️ Technologies Used

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **Animations**: Framer Motion 12.23.9
- **Styling**: CSS3 with CSS Variables
- **Icons**: Lucide React, Heroicons
- **Linting**: ESLint

## 📁 Project Structure

```
SortingVisualizer/
├── public/
│   └── vite.svg
├── src/
│   ├── algorithms/
│   │   └── index.js          # Sorting algorithm implementations
│   ├── components/
│   │   ├── ArrayBar.jsx      # Individual array bar component
│   │   ├── ComplexityInfo.jsx # Algorithm complexity display
│   │   ├── ControlPanel.jsx  # Control buttons and sliders
│   │   └── StatsPanel.jsx    # Statistics display
│   ├── App.jsx              # Main application component
│   ├── App.css             # Global styles
│   ├── index.css           # Base styles
│   └── main.jsx            # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🔧 Customization

### Adding New Algorithms
1. Create algorithm function in `src/algorithms/index.js`
2. Add algorithm info to `src/components/ComplexityInfo.jsx`
3. Add algorithm option to `src/components/ControlPanel.jsx`

### Styling
- Modify CSS variables in `src/App.css` for theme changes
- Update component styles for layout modifications
- Adjust responsive breakpoints for different screen sizes

## 📈 Performance Optimizations

- **CSS Containment**: Prevents layout thrashing
- **Framer Motion**: GPU-accelerated animations
- **Debounced Updates**: Smooth slider interactions
- **Memoized Calculations**: Optimized bar width calculations
- **Responsive Design**: Efficient rendering across devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Framer Motion** for smooth animations
- **Vite** for fast development experience
- **Algorithm Visualizations** community for inspiration

## 📞 Contact

**Developer**: Sourya
- **GitHub**: [@sourya001](https://github.com/sourya001)
- **Repository**: [SortingVisualizer](https://github.com/sourya001/SortingVisualizer)

---

Made with ❤️ and lots of ☕
