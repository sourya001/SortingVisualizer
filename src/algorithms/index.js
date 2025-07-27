// Utility function to create a copy of array with updated properties
const updateArrayItem = (array, index, updates) => {
  return array.map((item, i) => 
    i === index ? { ...item, ...updates } : item
  );
};

// Utility function to swap two elements in array
const swapElements = (array, i, j) => {
  const newArray = [...array];
  [newArray[i].value, newArray[j].value] = [newArray[j].value, newArray[i].value];
  return newArray;
};

// Bubble Sort Implementation
export const bubbleSort = async (initialArray, updateArray, setComparisons, setSwaps) => {
  let array = [...initialArray];
  let comparisons = 0;
  let swaps = 0;
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Highlight comparing elements
      array = updateArrayItem(array, j, { isComparing: true });
      array = updateArrayItem(array, j + 1, { isComparing: true });
      await updateArray(array);
      
      comparisons++;
      setComparisons(comparisons);

      if (array[j].value > array[j + 1].value) {
        // Highlight swapping elements
        array = updateArrayItem(array, j, { isSwapping: true, isComparing: false });
        array = updateArrayItem(array, j + 1, { isSwapping: true, isComparing: false });
        await updateArray(array);

        // Perform swap
        array = swapElements(array, j, j + 1);
        swaps++;
        setSwaps(swaps);
        await updateArray(array);

        // Remove swapping highlight
        array = updateArrayItem(array, j, { isSwapping: false });
        array = updateArrayItem(array, j + 1, { isSwapping: false });
      } else {
        // Remove comparing highlight
        array = updateArrayItem(array, j, { isComparing: false });
        array = updateArrayItem(array, j + 1, { isComparing: false });
      }
      
      await updateArray(array);
    }
    // Mark element as sorted
    array = updateArrayItem(array, n - 1 - i, { isSorted: true });
    await updateArray(array);
  }
  
  // Mark first element as sorted
  array = updateArrayItem(array, 0, { isSorted: true });
  await updateArray(array);
};

// Selection Sort Implementation
export const selectionSort = async (initialArray, updateArray, setComparisons, setSwaps) => {
  let array = [...initialArray];
  let comparisons = 0;
  let swaps = 0;
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    // Highlight current minimum
    array = updateArrayItem(array, minIndex, { isPivot: true });
    await updateArray(array);

    for (let j = i + 1; j < n; j++) {
      // Highlight comparing element
      array = updateArrayItem(array, j, { isComparing: true });
      await updateArray(array);
      
      comparisons++;
      setComparisons(comparisons);

      if (array[j].value < array[minIndex].value) {
        // Remove old minimum highlight
        array = updateArrayItem(array, minIndex, { isPivot: false });
        minIndex = j;
        // Highlight new minimum
        array = updateArrayItem(array, minIndex, { isPivot: true });
      }
      
      // Remove comparing highlight
      array = updateArrayItem(array, j, { isComparing: false });
      await updateArray(array);
    }

    if (minIndex !== i) {
      // Highlight swapping elements
      array = updateArrayItem(array, i, { isSwapping: true });
      array = updateArrayItem(array, minIndex, { isSwapping: true, isPivot: false });
      await updateArray(array);

      // Perform swap
      array = swapElements(array, i, minIndex);
      swaps++;
      setSwaps(swaps);
      await updateArray(array);

      // Remove swapping highlight
      array = updateArrayItem(array, i, { isSwapping: false });
      array = updateArrayItem(array, minIndex, { isSwapping: false });
    } else {
      array = updateArrayItem(array, minIndex, { isPivot: false });
    }

    // Mark element as sorted
    array = updateArrayItem(array, i, { isSorted: true });
    await updateArray(array);
  }
  
  // Mark last element as sorted
  array = updateArrayItem(array, n - 1, { isSorted: true });
  await updateArray(array);
};

// Insertion Sort Implementation
export const insertionSort = async (initialArray, updateArray, setComparisons, setSwaps) => {
  let array = [...initialArray];
  let comparisons = 0;
  let swaps = 0;
  const n = array.length;

  // Mark first element as sorted
  array = updateArrayItem(array, 0, { isSorted: true });
  await updateArray(array);

  for (let i = 1; i < n; i++) {
    let key = array[i].value;
    let j = i - 1;
    
    // Highlight current element being inserted
    array = updateArrayItem(array, i, { isPivot: true });
    await updateArray(array);

    while (j >= 0) {
      // Highlight comparing element
      array = updateArrayItem(array, j, { isComparing: true });
      await updateArray(array);
      
      comparisons++;
      setComparisons(comparisons);

      if (array[j].value > key) {
        // Highlight swapping elements
        array = updateArrayItem(array, j, { isSwapping: true, isComparing: false });
        array = updateArrayItem(array, j + 1, { isSwapping: true });
        await updateArray(array);

        // Perform swap
        array = swapElements(array, j, j + 1);
        swaps++;
        setSwaps(swaps);
        await updateArray(array);

        // Remove swapping highlight
        array = updateArrayItem(array, j, { isSwapping: false });
        array = updateArrayItem(array, j + 1, { isSwapping: false });
        
        j--;
      } else {
        // Remove comparing highlight
        array = updateArrayItem(array, j, { isComparing: false });
        break;
      }
      
      await updateArray(array);
    }

    // Remove pivot highlight and mark as sorted
    array = updateArrayItem(array, j + 1, { isPivot: false, isSorted: true });
    await updateArray(array);
  }
};

// Merge Sort Implementation
export const mergeSort = async (initialArray, updateArray, setComparisons, setSwaps) => {
  let array = [...initialArray];
  let comparisons = 0;
  let swaps = 0;

  const merge = async (arr, left, mid, right) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      // Highlight comparing elements
      array = updateArrayItem(array, k, { isComparing: true });
      await updateArray(array);
      
      comparisons++;
      setComparisons(comparisons);

      if (leftArr[i].value <= rightArr[j].value) {
        array[k] = { ...leftArr[i], isComparing: false };
        i++;
      } else {
        array[k] = { ...rightArr[j], isComparing: false };
        j++;
        swaps++;
        setSwaps(swaps);
      }
      
      k++;
      await updateArray(array);
    }

    while (i < leftArr.length) {
      array[k] = { ...leftArr[i], isComparing: false };
      i++;
      k++;
      await updateArray(array);
    }

    while (j < rightArr.length) {
      array[k] = { ...rightArr[j], isComparing: false };
      j++;
      k++;
      await updateArray(array);
    }

    // Mark merged section as sorted
    for (let idx = left; idx <= right; idx++) {
      array = updateArrayItem(array, idx, { isSorted: true });
    }
    await updateArray(array);
  };

  const mergeSortHelper = async (arr, left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      await mergeSortHelper(arr, left, mid);
      await mergeSortHelper(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
  };

  await mergeSortHelper(array, 0, array.length - 1);
};

// Quick Sort Implementation
export const quickSort = async (initialArray, updateArray, setComparisons, setSwaps) => {
  let array = [...initialArray];
  let comparisons = 0;
  let swaps = 0;

  const partition = async (arr, low, high) => {
    const pivot = arr[high].value;
    
    // Highlight pivot
    array = updateArrayItem(array, high, { isPivot: true });
    await updateArray(array);
    
    let i = low - 1;

    for (let j = low; j < high; j++) {
      // Highlight comparing element
      array = updateArrayItem(array, j, { isComparing: true });
      await updateArray(array);
      
      comparisons++;
      setComparisons(comparisons);

      if (arr[j].value < pivot) {
        i++;
        
        if (i !== j) {
          // Highlight swapping elements
          array = updateArrayItem(array, i, { isSwapping: true });
          array = updateArrayItem(array, j, { isSwapping: true, isComparing: false });
          await updateArray(array);

          // Perform swap
          array = swapElements(array, i, j);
          swaps++;
          setSwaps(swaps);
          await updateArray(array);

          // Remove swapping highlight
          array = updateArrayItem(array, i, { isSwapping: false });
          array = updateArrayItem(array, j, { isSwapping: false });
        } else {
          array = updateArrayItem(array, j, { isComparing: false });
        }
      } else {
        array = updateArrayItem(array, j, { isComparing: false });
      }
      
      await updateArray(array);
    }

    // Place pivot in correct position
    if (i + 1 !== high) {
      array = updateArrayItem(array, i + 1, { isSwapping: true });
      array = updateArrayItem(array, high, { isSwapping: true, isPivot: false });
      await updateArray(array);

      array = swapElements(array, i + 1, high);
      swaps++;
      setSwaps(swaps);
      await updateArray(array);

      array = updateArrayItem(array, i + 1, { isSwapping: false });
      array = updateArrayItem(array, high, { isSwapping: false });
    } else {
      array = updateArrayItem(array, high, { isPivot: false });
    }

    // Mark pivot as sorted
    array = updateArrayItem(array, i + 1, { isSorted: true });
    await updateArray(array);

    return i + 1;
  };

  const quickSortHelper = async (arr, low, high) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    } else if (low === high) {
      // Single element is sorted
      array = updateArrayItem(array, low, { isSorted: true });
      await updateArray(array);
    }
  };

  await quickSortHelper(array, 0, array.length - 1);
};


