interface TreeNode {
  feature?: number;
  threshold?: number;
  left?: TreeNode;
  right?: TreeNode;
  label?: number;
}

function entropy(labels: number[]): number {
  const total = labels.length;
  const counts = labels.reduce((acc, label) => {
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {} as { [key: number]: number });

  return Object.values(counts).reduce((acc, count) => {
    const p = count / total;
    return acc - p * Math.log2(p);
  }, 0);
}

function informationGain(parentLabels: number[], leftLabels: number[], rightLabels: number[]): number {
  const parentEntropy = entropy(parentLabels);
  const leftWeight = leftLabels.length / parentLabels.length;
  const rightWeight = rightLabels.length / parentLabels.length;
  return parentEntropy - (leftWeight * entropy(leftLabels) + rightWeight * entropy(rightLabels));
}

export function buildTree(data: number[][], labels: number[], depth: number = 0): TreeNode {
  if (labels.every(label => label === labels[0])) {
    return { label: labels[0] };
  }

  if (data[0].length === 0 || depth >= 10) {
    const majorityLabel = labels.reduce((acc, label) => {
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    }, {} as { [key: number]: number });
    const maxLabel = Object.keys(majorityLabel).reduce((a, b) => majorityLabel[+a] > majorityLabel[+b] ? a : b);
    return { label: parseInt(maxLabel) };
  }

  let bestGain = 0;
  let bestFeature = -1;
  let bestThreshold = 0;
  let bestLeftData: number[][] = [];
  let bestRightData: number[][] = [];
  let bestLeftLabels: number[] = [];
  let bestRightLabels: number[] = [];

  for (let feature = 0; feature < data[0].length; feature++) {
    const thresholds = Array.from(new Set(data.map(row => row[feature])));
    thresholds.forEach(threshold => {
      const leftIndices = data.map((row, i) => row[feature] <= threshold ? i : -1).filter(i => i !== -1);
      const rightIndices = data.map((row, i) => row[feature] > threshold ? i : -1).filter(i => i !== -1);

      const leftData = leftIndices.map(i => data[i]);
      const rightData = rightIndices.map(i => data[i]);
      const leftLabels = leftIndices.map(i => labels[i]);
      const rightLabels = rightIndices.map(i => labels[i]);

      const gain = informationGain(labels, leftLabels, rightLabels);
      if (gain > bestGain) {
        bestGain = gain;
        bestFeature = feature;
        bestThreshold = threshold;
        bestLeftData = leftData;
        bestRightData = rightData;
        bestLeftLabels = leftLabels;
        bestRightLabels = rightLabels;
      }
    });
  }

  if (bestGain === 0) {
    const majorityLabel = labels.reduce((acc, label) => {
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    }, {} as { [key: number]: number });
    const maxLabel = Object.keys(majorityLabel).reduce((a, b) => majorityLabel[+a] > majorityLabel[+b] ? a : b);
    return { label: parseInt(maxLabel) };
  }

  return {
    feature: bestFeature,
    threshold: bestThreshold,
    left: buildTree(bestLeftData, bestLeftLabels, depth + 1),
    right: buildTree(bestRightData, bestRightLabels, depth + 1)
  };
}

export function predict(tree: TreeNode, sample: number[]): number {
  if (tree.label !== undefined) {
    return tree.label;
  }

  if (tree.feature !== undefined && tree.threshold !== undefined) {
    if (sample[tree.feature] <= tree.threshold) {
      return predict(tree.left!, sample);
    } else {
      return predict(tree.right!, sample);
    }
  }

  return tree.label ?? 0;
}
