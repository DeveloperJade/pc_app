const cardContainer = document.getElementById("stat-cards");
const customerName = document.getElementById("customer-name");
const startSessionBtn = document.getElementById("start-session-btn");
const pcSelect = document.getElementById("pc");

const cardStat = [
  {
    number: "6",
    description: "Total PCs",
  },
  {
    title: "6",
    description: "Available",
  },
  {
    title: "0",
    description: "Occupied",
  },
  {
    title: "$0.00",
    description: "Total Earnings",
  },
];

const pcArr = [
  {
    id: 1,
    pcName: "PC1",
    isOccupied: false,
    customerName: "Jade Bandianon",
    startTime: "9:30",
    pricePerHour: 2.5,
  },
  {
    id: 2,
    pcName: "PC2",
    isOccupied: false,
    customerName: "Faranah Smith",
    startTime: "9:00",
    pricePerHour: 2.5,
  },
  {
    id: 3,
    pcName: "PC3",
    isOccupied: false,
    customerName: "Jojo",
    startTime: "9:00",
    pricePerHour: 2.5,
  },
  {
    id: 4,
    pcName: "PC4",
    isOccupied: false,
    customerName: "Jules",
    startTime: "9:00",
    pricePerHour: 2.5,
  },
  {
    id: 5,
    pcName: "PC5",
    isOccupied: false,
    customerName: "Smith",
    startTime: "9:00",
    pricePerHour: 2.5,
  },
  {
    id: 6,
    pcName: "PC6",
    isOccupied: false,
    customerName: "Tonton",
    startTime: "9:00",
    pricePerHour: 2.5,
  },
  {
    id: 7,
    pcName: "PC7",
    isOccupied: false,
    customerName: "Tantan",
    startTime: "9:00",
    pricePerHour: 2.5,
  },
  {
    id: 8,
    pcName: "PC8",
    isOccupied: false,
    customerName: "Tantan",
    startTime: "9:00",
    pricePerHour: 2.5,
  },
  {
    id: 9,
    pcName: "PC9",
    isOccupied: false,
    customerName: "Tantan",
    startTime: "9:00",
    pricePerHour: 2.5,
  },
  {
    id: 10,
    pcName: "PC10",
    isOccupied: false,
    customerName: "Tantan",
    startTime: "9:00",
    pricePerHour: 2.5,
  },
];

cardStat.forEach((stat) => {
  const card = document.createElement("div");
  card.className = "card";
  const title = document.createElement("h3");
  title.textContent = stat.title || stat.number;
  const description = document.createElement("p");
  description.textContent = stat.description;
  card.appendChild(title);
  card.appendChild(description);
  cardContainer.appendChild(card);
});

for (let i = 0; i < pcArr.length; i++) {
  const computers = pcArr[i];
  const option = document.createElement("option");
  option.value = computers.pcName.toLowerCase();
  option.textContent = computers.pcName;
  pcSelect.appendChild(option);
}

startSessionBtn.addEventListener("click", () => {
  if (customerName.value === "") {
    alert("Please enter a customer name.");
  } else {
    const selectedPc = pcSelect.value;
    const pc = pcArr.find((pc) => pc.pcName.toLowerCase() === selectedPc);

    if (pc && !pc.isOccupied) {
      pc.isOccupied = true;
      pc.customerName = customerName.value;
      alert(`Session started for ${pc.customerName} on ${pc.pcName}`);

      const computerCards = document.querySelectorAll(".computer-card");
      computerCards.forEach((card) => {
        if (card.querySelector("h4").textContent === pc.pcName) {
          card.querySelector("p:nth-child(2)").textContent = "Occupied";
          card.querySelector(
            "p:nth-child(3)"
          ).textContent = `Customer: ${pc.customerName}`;
            card.style.backgroundColor = "#9299f8ff";
        
          const timerDisplay = card.querySelector(".timer-display");
          timerDisplay.style.display = "inline";
          let timeLeft = 120;
          timerDisplay.textContent = "02:00";
          if (timerDisplay.timerInterval) clearInterval(timerDisplay.timerInterval);
          timerDisplay.timerInterval = setInterval(() => {
            timeLeft--;
            const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
            const secs = String(timeLeft % 60).padStart(2, "0");
            timerDisplay.textContent = `${mins}:${secs}`;
            if (timeLeft <= 0) {
              clearInterval(timerDisplay.timerInterval);
              timerDisplay.textContent = "Time's up!";
            }
          }, 1000);
        }
      });
    } else {
      alert("This PC is already occupied or does not exist.");
    }
  }
});

const computerGrids = document.getElementById("computer-grid");

for (let i = 0; i < pcArr.length; i++) {
  const pc = pcArr[i];
  const card = document.createElement("div");
  card.className = "computer-card";

  const pcName = document.createElement("h4");
  pcName.textContent = pc.pcName;

  const status = document.createElement("p");
  status.textContent = pc.isOccupied ? "Occupied" : "Available";

  const customerInfo = document.createElement("p");
  customerInfo.textContent = pc.isOccupied
    ? `Customer: ${pc.customerName}`
    : "No customer";

  const timerDisplay = document.createElement("span");
  timerDisplay.textContent = "02:00";
  timerDisplay.style.display = "none";
  timerDisplay.className = "timer-display";

  card.appendChild(pcName);
  card.appendChild(status);
  card.appendChild(customerInfo);
  card.appendChild(timerDisplay);

  computerGrids.appendChild(card);
}
