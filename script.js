document.addEventListener("DOMContentLoaded", function () {
    const digitalClock = document.getElementById("digitalClock");
    const worldClock = document.getElementById("worldClock");
    const dateDisplay = document.getElementById("dateDisplay");
    const greeting = document.getElementById("greeting");
    const canvas = document.getElementById("analogClock");
    const ctx = canvas.getContext("2d");
    const toggleDark = document.getElementById("toggleDark");

    const stopwatchDisplay = document.getElementById("stopwatchDisplay");
    const startStopwatch = document.getElementById("startStopwatch");
    const stopStopwatch = document.getElementById("stopStopwatch");
    const resetStopwatch = document.getElementById("resetStopwatch");

    let stopwatchInterval;
    let stopwatchTime = 0;
    let isRunning = false;

    function updateDigitalClock() {
        digitalClock.textContent = new Date().toLocaleTimeString();
    }

    function updateDate() {
        dateDisplay.textContent = new Date().toDateString();
    }

    function updateGreeting() {
        const hour = new Date().getHours();
        greeting.textContent =
            hour < 12 ? "Good Morning! ☀️" :
            hour < 18 ? "Good Afternoon! 🌤️" :
            "Good Evening! 🌙";
    }

    function updateWorldClock() {
        const cities = [
            { name: "New York", timezone: "America/New_York" },
            { name: "London", timezone: "Europe/London" },
            { name: "Tokyo", timezone: "Asia/Tokyo" }
        ];
    
        worldClock.innerHTML = cities
            .map(city => {
                const time = new Date().toLocaleTimeString('en-US', { timeZone: city.timezone });
                return `<p><strong>${city.name}:</strong> ${time}</p>`;
            })
            .join("");
    }
    
    // Update world clock every second
    setInterval(updateWorldClock, 1000);
    updateWorldClock(); // Call immediately to avoid delay
    

    function drawAnalogClock() {
        const now = new Date();
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours() % 12;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw clock circle
        ctx.beginPath();
        ctx.arc(100, 100, 80, 0, Math.PI * 2);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 4;
        ctx.stroke();

        // Draw clock hands
        function drawHand(length, angle, width, color) {
            ctx.beginPath();
            ctx.lineWidth = width;
            ctx.strokeStyle = color;
            ctx.moveTo(100, 100);
            ctx.lineTo(
                100 + length * Math.cos(angle),
                100 + length * Math.sin(angle)
            );
            ctx.stroke();
        }

        const hourAngle = ((hours + minutes / 60) * 30 - 90) * (Math.PI / 180);
        const minuteAngle = ((minutes + seconds / 60) * 6 - 90) * (Math.PI / 180);
        const secondAngle = (seconds * 6 - 90) * (Math.PI / 180);

        drawHand(40, hourAngle, 6, "white");
        drawHand(60, minuteAngle, 4, "white");
        drawHand(70, secondAngle, 2, "red");
    }

    toggleDark.addEventListener("change", () => document.body.classList.toggle("dark-mode"));

    function updateStopwatch() {
        stopwatchDisplay.textContent = new Date(stopwatchTime * 1000).toISOString().substr(11, 8);
    }

    startStopwatch.addEventListener("click", () => {
        if (!isRunning) {
            isRunning = true;
            stopwatchInterval = setInterval(() => {
                stopwatchTime++;
                updateStopwatch();
            }, 1000);
        }
    });

    stopStopwatch.addEventListener("click", () => { clearInterval(stopwatchInterval); isRunning = false; });
    resetStopwatch.addEventListener("click", () => { stopwatchTime = 0; updateStopwatch(); });

    setInterval(updateDigitalClock, 1000);
    setInterval(updateDate, 1000);
    setInterval(updateGreeting, 1000);
    setInterval(updateWorldClock, 1000);
    setInterval(drawAnalogClock, 1000);
});
