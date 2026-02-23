let moduleChain = [];

function addModule(type) {
    moduleChain.push(type);
    alert("Добавлен модуль: " + type);
}

function runSimulation() {
    const volume = parseFloat(document.getElementById("volume").value);
    const bpkIn = parseFloat(document.getElementById("bpk").value);
    const suspendedIn = parseFloat(document.getElementById("suspended").value);

    let currentBpk = bpkIn;
    let currentSuspended = suspendedIn;

    // Коэффициенты очистки
    const efficiencies = {
        coarse: { bpk: 0, suspended: 0.5 },
        aerobic: { bpk: 0.8, suspended: 0.15 },
        settler: { bpk: 0, suspended: 0.4 }
    };

    // Расчёт по цепочке модулей
    for (let module of moduleChain) {
        const eff = efficiencies[module];
        currentBpk = currentBpk * (1 - eff.bpk);
        currentSuspended = currentSuspended * (1 - eff.suspended);
    }

    // Формирование результата
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <h3>Результаты:</h3>
        <p>БПК вход: ${bpkIn} мг/л → выход: ${currentBpk.toFixed(2)} мг/л</p>
        <p>Взвешенные вход: ${suspendedIn} мг/л → выход: ${currentSuspended.toFixed(2)} мг/л</p>
        <p><strong>Статус:</strong> ${
            (currentBpk <= 3 && currentSuspended <= 10) ?
            "Соответствует нормам" : "Не соответствует. Добавьте ещё модули!"
        }</p>
    `;
}