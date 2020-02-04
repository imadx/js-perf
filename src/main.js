document.addEventListener('DOMContentLoaded', () => {
	// Benchmark script's text area elements
	const benchmarkSetup = document.getElementById('benchmark-setup');
	const benchmark1 = document.getElementById('benchmark-script-1');
	const benchmark2 = document.getElementById('benchmark-script-2');

	// When the #benchmark-run button is clicked start the evaluation
	const actionButtonRun = document.getElementById('benchmark-run');
	const runEvaluation = () => {
		// Read the values from the textarea elements as strings
		// Cache the value as a function to be evaluated for the benchmark
		let functionSetup = new Function(benchmarkSetup.value);
		let function1 = new Function(benchmark1.value);
		let function2 = new Function(benchmark2.value);

		// Iterate the functions n times and track time
		const startTimes = [];
		const endTimes = [];

		const evaluateFunction = evaluatingFunction => {
            // Run the initialization function
            functionSetup();

            // Run the iterations and track the time spent
			startTimes.push(performance.now());
			for (let i = 0; i < 1000; i++) {
				evaluatingFunction();
			}
			endTimes.push(performance.now());
		};

        // Start the evaluations
		evaluateFunction(function1);
		evaluateFunction(function2);

		// Show the output on the benchmark-stats
		const benchmarkStats = document.getElementById('benchmark-stats');
		const executionTime1 = endTimes[0] - startTimes[0];
		const executionTime2 = endTimes[1] - startTimes[1];

		benchmarkStats.innerHTML = `
        <h3>Run times</h3>
        <b>Benchmark 1: </b> ${executionTime1}
        <b>Benchmark 2: </b> ${executionTime2}
        
        <h3>Ratio of 1:2 :</h3>  ${executionTime1 / executionTime2}
        `;
    };
    
	actionButtonRun.addEventListener('click', runEvaluation);
});
