const students = [
  { name: "Akansha", score: 85 },
  { name: "Bruce", score: 92 },
  { name: "Chetna", score: 58 },
  { name: "Denzel", score: 74 },
  { name: "Emma", score: 63 },
  { name: "Farhan", score: 20 },
  { name: "Gregory", score: 81 },
  { name: "Hitesh", score: 61 },
  { name: "Isabella", score: 97 },
  { name: "Jacob", score: 30 },
  { name: "Kailash", score: 64 },
  { name: "Leonardo", score: 87 },
  { name: "Miley", score: 62 },
  { name: "Neelima", score: 78 },
  { name: "Oscar", score: 73 },
  { name: "Payal", score: 61 },
  { name: "Rakesh", score: 90 },
  { name: "Susan", score: 21 },
  { name: "Tina", score: 94 },
  { name: "Ujjval", score: 70 },
  { name: "Varun", score: 87 },
];

function averageScore() {
  let sum = 0;
  students.forEach((element) => {
    sum += element.score;
  });
  return sum / students.length;
}

function sortedScore() {
  let temp = students.sort((a, b) => b.score - a.score);
  return {
    highName: temp[0].name,
    highScore: temp[0].score,
    lowName: temp[temp.length - 1].name,
    lowScore: temp[temp.length - 1].score,
  };
}

function gradeDistribution() {
  let A = 0;
  let B = 0;
  let C = 0;
  let D = 0;
  let F = 0;
  let names = "";

  students.forEach((element) => {
    switch (true) {
      case element.score >= 90:
        A++;
        break;

      case element.score >= 80:
        B++;
        break;

      case element.score >= 70:
        C++;
        break;

      case element.score >= 60:
        D++;
        break;

      default:
        names += element.name;
        names += " ";
        F++;
        break;
    }
  });
  return { a: A, b: B, c: C, d: D, f: F, NameArray: names };
}

console.log("Average Score: " + averageScore());
console.log(
  `Highest Score: ${sortedScore().highName} (${sortedScore().highScore})`
);
console.log(
  `Lowest Score: ${sortedScore().lowName} (${sortedScore().lowScore})`
);
console.log(
  `Grade Distribution: {A: ${gradeDistribution().a}, B: ${
    gradeDistribution().b
  }, C: ${gradeDistribution().c}, D: ${gradeDistribution().d}, F: ${
    gradeDistribution().f
  }}`
);
console.log(`Students needing to retake: ${gradeDistribution().NameArray}`);
